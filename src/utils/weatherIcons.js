const ICON_FILE_NAMES = [
  "Autumn",
  "Cloud",
  "CloudElec",
  "CloudElecrainy",
  "CloudMoon",
  "CloudMoonWind",
  "CloudSunny",
  "CloudSunnyWind",
  "CloudWind",
  "Drop",
  "Drops",
  "Flood",
  "Glasses",
  "Moon-Star",
  "Moon",
  "Moonwind",
  "Rainbow",
  "RainyCloud",
  "Snow",
  "SnowyCloud",
  "SnowyCloudBig",
  "Spring",
  "Stars",
  "Storm-1",
  "Storm",
  "Sun",
  "SunWind",
  "Sunrise",
  "Sunset",
  "Thunder",
  "Toorbin",
  "Umbrella",
  "Wind",
  "WindDirection",
  "thermometer",
  "thermometerblank",
];

const FALLBACK_ICON_NAME = "Cloud";
const FALLBACK_ICON = `/WeatherIcons/${FALLBACK_ICON_NAME}.png`;

const sanitize = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const iconLookup = ICON_FILE_NAMES.reduce((acc, fileName) => {
  acc[sanitize(fileName)] = fileName;
  return acc;
}, {});

const aliasMap = {
  lcloud: "cloud",
  cloudicon: "cloud",
  cloudy: "cloud",
  cloud: "cloud",
  lcloudlsunny: "cloudsunny",
  cloudsunny: "cloudsunny",
  lcloudlwind: "cloudwind",
  cloudwind: "cloudwind",
  lcloudlmoon: "cloudmoon",
  cloudmoon: "cloudmoon",
  lcloudlmoonwind: "cloudmoonwind",
  cloudmoonwind: "cloudmoonwind",
  lcloudldrops: "rainycloud",
  rainycloud: "rainycloud",
  ldrops: "drops",
  drops: "drops",
  drop: "drop",
  sun: "sun",
  lsun: "sun",
  sunrise: "sunrise",
  sunset: "sunset",
  lsunlwind: "sunwind",
  sunwind: "sunwind",
  rainbow: "rainbow",
  storm: "storm",
  lstorm: "storm",
  storm1: "storm-1",
  thunder: "thunder",
  wind: "wind",
  winddirection: "winddirection",
  umbrella: "umbrella",
  snow: "snow",
  snowycloud: "snowycloud",
  snowycloudbig: "snowycloudbig",
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

  return resolved ? `/WeatherIcons/${resolved}.png` : FALLBACK_ICON;
};

export { FALLBACK_ICON };
