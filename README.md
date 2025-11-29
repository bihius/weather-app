# Weather App

A modern, feature-rich weather application built with React, Vite, and Tailwind CSS. Get real-time weather forecasts for any city worldwide with a beautiful, responsive interface.

## ✨ Features

### Core Functionality
- **🌍 Worldwide City Search** - Search for any city globally using Nominatim (OpenStreetMap)
- **🌤️ Real-time Weather Data** - Current conditions and 5-day forecasts via Open-Meteo API
- **⭐ Favorites System** - Save your favorite cities for quick access
- **🔍 Smart Search** - Debounced city search with autocomplete suggestions

### User Experience
- **🌓 Dark/Light Mode** - Toggle between themes with persistent preferences
- **🌡️ Temperature Units** - Switch between Celsius, Fahrenheit, and Kelvin
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI** - Beautiful gradient headers and smooth animations

### Technical Features
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and builds
- **🔄 State Management** - Redux Toolkit for temperature unit, React Context for theme/favorites
- **🧭 React Router** - Multi-page navigation with URL-based routing
- **💾 Local Storage** - Persistent user preferences and favorites

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **State Management:** Redux Toolkit, React Context API
- **Routing:** React Router DOM 7
- **Package Manager:** pnpm
- **Linting:** ESLint 9
- **APIs:**
  - [Open-Meteo](https://open-meteo.com/) - Free weather API (no key required)
  - [Nominatim](https://nominatim.org/) - Free geocoding API (no key required)

## 📦 Installation

### Prerequisites
- Node.js 22 or higher
- pnpm 9 or higher

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🚀 Usage

### Home Page
- View popular cities with current weather
- Search for any city worldwide
- Click on a city card to view detailed weather

### Weather Details Page
- View comprehensive weather information
- See current conditions and 5-day forecast
- Add/remove cities from favorites using the star icon
- Navigate back using the header

### Favorites Page
- Access all your saved favorite cities
- Quick overview of weather for all favorites
- Click any favorite to view detailed weather

### Settings Page
- Toggle between light and dark themes
- Switch temperature units (Celsius, Fahrenheit, Kelvin)
- All preferences are saved automatically

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── AppHeader/       # Application header with navigation
│   │   ├── CityCard/        # City weather card component
│   │   ├── SearchBar/       # City search with autocomplete
│   │   └── WeatherDetails/  # Detailed weather display
│   ├── contexts/            # React Context providers
│   │   ├── SettingsContext.jsx  # Theme and favorites management
│   │   └── useSettings.js    # Settings hook
│   ├── pages/               # Page components
│   │   ├── HomePage.jsx     # Main page with popular cities
│   │   ├── WeatherDetailsPage.jsx  # Weather details view
│   │   ├── SettingsPage.jsx       # Settings and preferences
│   │   └── FavoritesPage.jsx       # Favorites list
│   ├── services/            # API services
│   │   ├── citySearch.js    # City search API integration
│   │   └── weatherService.js # Weather API integration
│   ├── store/               # Redux store
│   │   ├── store.js         # Redux store configuration
│   │   ├── temperatureUnitSlice.js  # Temperature unit reducer
│   │   └── hooks.js         # Typed Redux hooks
│   ├── utils/               # Utility functions
│   │   ├── cityName.js      # City name formatting
│   │   ├── temperature.js  # Temperature conversion
│   │   └── weatherIconMapper.js  # Weather icon mapping
│   ├── App.jsx              # Main app component with routes
│   └── main.jsx             # Application entry point
├── .github/
│   └── workflows/           # GitHub Actions workflows
│       ├── main.yml         # CI/CD pipeline
│       ├── release.yml      # Release automation
│       └── perfomance.yml   # Performance testing
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🧪 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linter
pnpm lint

# Run tests (placeholder)
pnpm test
```

## 🐳 Docker

### Build Docker Image
```bash
docker build -t weather-app .
```

### Run Container
```bash
docker run -p 80:80 weather-app
```

The app will be available at `http://localhost`

### Docker Compose
```bash
docker-compose up
```

## 🔄 CI/CD

The project includes automated CI/CD pipelines:

- **Main Workflow** (`main.yml`): Runs on push/PR to main/dev branches
  - Linting
  - Testing
  - Security audit
  - Docker image build and push to GitHub Container Registry

- **Release Workflow** (`release.yml`): Runs on version tag push (v*)
  - Builds application
  - Generates changelog from commits
  - Creates GitHub release
  - Builds and pushes Docker image with version tags

- **Performance Workflow** (`perfomance.yml`): Runs weekly and on main branch pushes
  - Lighthouse CI performance testing
  - Generates performance reports

## 📝 API Information

### Weather API (Open-Meteo)
- **Free:** No API key required
- **Coverage:** Worldwide
- **Rate Limits:** Generous free tier
- **Data:** Current conditions, hourly and daily forecasts

### Geocoding API (Nominatim)
- **Free:** No API key required
- **Coverage:** Worldwide
- **Rate Limits:** Please use responsibly (1 request per second recommended)
- **Data:** City coordinates and location information

## 🎯 Key Features Explained

### Favorites System
- Cities are saved with coordinates for accurate weather retrieval
- Favorites persist across browser sessions using localStorage
- Supports cities at coordinates (0, 0) and negative coordinates

### Temperature Units
- Managed with Redux Toolkit for global state
- Supports Celsius (°C), Fahrenheit (°F), and Kelvin (K)
- Preferences saved to localStorage

### Theme Management
- Light and dark modes
- Theme preference persists across sessions
- Smooth transitions between themes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for free weather data
- [Nominatim](https://nominatim.org/) for free geocoding services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://react.dev/) and [Vite](https://vitejs.dev/) teams

---

Made with ❤️ using React and modern web technologies
