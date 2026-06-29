// 93/94 Old School format data per Eternal Central rules

export const LEGAL_SETS = [
  { code: "lea", name: "Alpha" },
  { code: "leb", name: "Beta" },
  { code: "2ed", name: "Unlimited" },
  { code: "cei", name: "Collector's Edition" },
  { code: "ced", name: "International Collector's Edition" },
  { code: "arn", name: "Arabian Nights" },
  { code: "atq", name: "Antiquities" },
  { code: "3ed", name: "Revised" },
  { code: "leg", name: "Legends" },
  { code: "drk", name: "The Dark" },
  { code: "fem", name: "Fallen Empires" },
];

export const BANNED_CARDS = [
  "Bronze Tablet",
  "Contract from Below",
  "Darkpact",
  "Demonic Attorney",
  "Jeweled Bird",
  "Rebirth",
  "Tempest Efreet",
];

export const RESTRICTED_CARDS = [
  "Ancestral Recall",
  "Balance",
  "Black Lotus",
  "Braingeyser",
  "Chaos Orb",
  "Channel",
  "Demonic Tutor",
  "Library of Alexandria",
  "Mana Drain",
  "Mind Twist",
  "Mox Emerald",
  "Mox Jet",
  "Mox Pearl",
  "Mox Ruby",
  "Mox Sapphire",
  "Recall",
  "Regrowth",
  "Sol Ring",
  "Time Vault",
  "Time Walk",
  "Timetwister",
  "Wheel of Fortune",
];

export const BASIC_LANDS = ["Plains", "Island", "Swamp", "Mountain", "Forest"];

export const COLOR_FILTERS = [
  { label: "White", value: "W", hex: "#F9FAF4" },
  { label: "Blue", value: "U", hex: "#0E68AB" },
  { label: "Black", value: "B", hex: "#150B00" },
  { label: "Red", value: "R", hex: "#D3202A" },
  { label: "Green", value: "G", hex: "#00733E" },
  { label: "Colorless", value: "C", hex: "#A0A0A0" },
];

export const TYPE_FILTERS = [
  "Creature",
  "Instant",
  "Sorcery",
  "Enchantment",
  "Artifact",
  "Land",
];

export function isBanned(cardName) {
  return BANNED_CARDS.includes(cardName);
}

export function isRestricted(cardName) {
  return RESTRICTED_CARDS.includes(cardName);
}

export function isBasicLand(cardName) {
  return BASIC_LANDS.includes(cardName);
}

export function getMaxCopies(cardName) {
  if (isBasicLand(cardName)) return 99;
  if (isBanned(cardName)) return 0;
  if (isRestricted(cardName)) return 1;
  return 4;
}

// Build Scryfall search query for legal 93/94 cards
export function buildScryfallQuery({ search = "", colors = [], type = "", set = "", cmc = "" }) {
  const setCodes = LEGAL_SETS.map((s) => s.code);
  const setQuery = set ? `e:${set}` : `(${setCodes.map((c) => `e:${c}`).join(" or ")})`;
  
  let q = setQuery;
  
  if (search) {
    q += ` ${search}`;
  }
  
  if (colors.length > 0) {
    if (colors.includes("C")) {
      q += ` c=colorless`;
    } else {
      q += ` c:${colors.join("")}`;
    }
  }
  
  if (type) {
    q += ` t:${type}`;
  }
  
  if (cmc !== "") {
    if (cmc === "7") {
      q += ` cmc>=7`;
    } else {
      q += ` cmc=${cmc}`;
    }
  }
  
  // Exclude banned cards
  BANNED_CARDS.forEach((card) => {
    q += ` -!"${card}"`;
  });
  
  return q;
}