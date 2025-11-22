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
const FALLBACK_ICON = `/WeatherIcons/${FALLBACK_ICON_NAME}.svg`;

const sanitize = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const iconLookup = ICON_FILE_NAMES.reduce((acc, fileName) => {
  acc[sanitize(fileName)] = fileName;
  return acc;
}, {});

const aliasMap = {
  // clouds
  lcloud: "Partly_Cloudy",
  cloud: "Partly_Cloudy",
  cloudy: "Partly_Cloudy",
  partlycloudy: "Partly_Cloudy",

  // sun
  lsun: "Sunny",
  sun: "Sunny",
  sunny: "Sunny",

  // storm / thunder
  lstorm: "Thunderstorm",
  storm: "Thunderstorm",
  thunder: "Thunderstorm",
  thunderstorm: "Thunderstorm",

  // rain variants
  ldrops: "Light_Rain",
  drops: "Light_Rain",
  drop: "Light_Rain",
  lightrain: "Light_Rain",
  moderaterain: "Moderate_Rain",
  moderaterainy: "Moderate_Rain",

  // snow variants
  lightsnow: "Light_Snow",
  heavysnow: "Heavy_Snow",
  moderatesnow: "Moderate_Snow",

  // other
  fog: "Foggy",
  foggy: "Foggy",
  haze: "Haze",
  hail: "Hail",
  blowing_sand: "Blowing_Sand",
  nightsky: "Night",
  night: "Night",
  overcast: "Overcast",
  unknown: "Unknown",
};

const resolveFromLookup = (sanitizedKey) => {
  if (!sanitizedKey) return null;
  if (iconLookup[sanitizedKey]) {
    return iconLookup[sanitizedKey];
  }

  const aliasTarget = aliasMap[sanitizedKey];
  if (aliasTarget && iconLookup[aliasTarget]) {
    return iconLookup[aliasTarget];
  }

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

export const getWeatherIconPath = (iconName) => {
  if (!iconName) {
    return FALLBACK_ICON;
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

  return resolved ? `/WeatherIcons/${resolved}.svg` : FALLBACK_ICON;
};

export { FALLBACK_ICON };
