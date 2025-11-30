# Stage 1: Dependencies
# Install dependencies separately for better caching
FROM node:22-alpine3.22 AS dependencies
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
# Build the application
FROM dependencies AS builder
WORKDIR /app

# Copy source code
COPY . .

# Build the application
# This will use the node_modules from the dependencies stage
RUN pnpm build

# Stage 3: Production
# Serve the built application with nginx
FROM nginx:1.25-alpine AS production

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check (install wget for health check)
RUN apk add --no-cache wget
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
