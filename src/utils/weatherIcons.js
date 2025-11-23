const ICON_FILE_NAMES = [
  "Blowing_Sand",
  "Foggy",
  "Hail",
  "Haze",
  "Heavy_Snow",
  "Light_Rain",
  "Light_Snow",
  "Moderate_Rain",
  "Moderate_Snow",
  "Night",
  "Overcast",
  "Partly_Cloudy",
  "Sunny",
  "Thunderstorm",
  "Unknown",
];

const FALLBACK_ICON_NAME = "Unknown";

const getFallbackIcon = (theme = "light") => {
  const folder = theme === "dark" ? "WeatherIconsDark" : "WeatherIconsLight";
  return `/${folder}/${FALLBACK_ICON_NAME}.svg`;
};

const FALLBACK_ICON = getFallbackIcon();

const sanitize = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const iconLookup = ICON_FILE_NAMES.reduce((acc, fileName) => {
  acc[sanitize(fileName)] = fileName;
  return acc;
}, {});
// Build an alias map from the canonical filenames so there is a direct alias
// entry for every file (sanitized -> original file name). This mirrors the
// list of files in the icon pack and avoids inventing any new aliases.
const aliasMap = Object.keys(iconLookup).reduce((acc, key) => {
  acc[key] = iconLookup[key];
  return acc;
}, {});

const resolveFromLookup = (sanitizedKey) => {
  if (!sanitizedKey) return null;

  // First, try exact match against canonical filenames
  if (iconLookup[sanitizedKey]) return iconLookup[sanitizedKey];

  // Fall back to alias map populated from canonical names
  if (aliasMap[sanitizedKey]) return aliasMap[sanitizedKey];

  return null;
};

const stripLeadingLFromSegments = (iconName = "") => {
  const stripped = iconName
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((segment) => segment.replace(/^l(?=[a-z])/i, ""))
    .join("");

  return sanitize(stripped);
};

export const getWeatherIconPath = (iconName, theme = "light") => {
  if (!iconName) {
    return getFallbackIcon(theme);
  }

  const normalized = sanitize(iconName);
  let resolved = resolveFromLookup(normalized);

  if (!resolved) {
    const stripped = stripLeadingLFromSegments(iconName);
    resolved = resolveFromLookup(stripped);
  }

  if (!resolved && /\.png$/i.test(iconName)) {
    const withoutExtension = iconName.replace(/\.png$/i, "");
    resolved = resolveFromLookup(sanitize(withoutExtension));
  }

  // accept svg filenames too
  if (!resolved && /\.svg$/i.test(iconName)) {
    const withoutExtension = iconName.replace(/\.svg$/i, "");
    resolved = resolveFromLookup(sanitize(withoutExtension));
  }

  const folder = theme === "dark" ? "WeatherIconsDark" : "WeatherIconsLight";
  return resolved ? `/${folder}/${resolved}.svg` : getFallbackIcon(theme);
};

export { FALLBACK_ICON };
