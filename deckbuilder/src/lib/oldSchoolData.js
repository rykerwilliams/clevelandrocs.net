// Deck construction rulesets used by the builder.

const ETERNAL_CENTRAL_BANNED = ["Bronze Tablet", "Contract from Below", "Darkpact", "Demonic Attorney", "Jeweled Bird", "Rebirth", "Tempest Efreet"];

const ETERNAL_CENTRAL_RESTRICTED = [
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

export const DEFAULT_RULESET_ID = "eternal-central";

export const RULESETS = {
  "eternal-central": {
    id: "eternal-central",
    label: "Old School 93/94 (Eternal Central)",
    shortLabel: "93/94 EC",
    description: "Cards from 1993-1994 per Eternal Central rules.",
    sourceLabel: "Eternal Central",
    sourceUrl: "https://www.eternalcentral.com/9394rules/",
    legalSets: [
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
    ],
    bannedCards: ETERNAL_CENTRAL_BANNED,
    restrictedCards: ETERNAL_CENTRAL_RESTRICTED,
    minMainDeckSize: 60,
    maxMainDeckSize: null,
    maxSideboardSize: 15,
    defaultMaxCopies: 4,
    notes: ["Mana burn is in effect", "London Mulligan rule", "Chaos Orb uses EC flip rules", "No intentional draws in EC tournaments"],
  },
  alpha40: {
    id: "alpha40",
    label: "Alpha 40",
    shortLabel: "Alpha 40",
    description: "Decks are built from Alpha only with rarity caps.",
    sourceLabel: "MT Goldframe",
    sourceUrl: "https://mtgoldframe.com/alpha-40/",
    legalSets: [{ code: "lea", name: "Alpha" }],
    bannedCards: [],
    restrictedCards: [],
    minMainDeckSize: 40,
    maxMainDeckSize: 40,
    maxSideboardSize: 0,
    defaultMaxCopies: 4,
    rarityCaps: {
      rare: 3,
      uncommon: 6,
    },
    rarityCapsScope: "main",
    notes: ["Exactly 40 cards in main deck", "Alpha cards only", "Up to 3 rares and 6 uncommons"],
  },
};

export const RULESET_OPTIONS = Object.values(RULESETS).map((ruleset) => ({
  value: ruleset.id,
  label: ruleset.label,
}));

export const BASIC_LANDS = ["Plains", "Island", "Swamp", "Mountain", "Forest"];

export const COLOR_FILTERS = [
  { label: "White", value: "W", hex: "#F9FAF4" },
  { label: "Blue", value: "U", hex: "#0E68AB" },
  { label: "Black", value: "B", hex: "#150B00" },
  { label: "Red", value: "R", hex: "#D3202A" },
  { label: "Green", value: "G", hex: "#00733E" },
  { label: "Colorless", value: "C", hex: "#A0A0A0" },
];

export const TYPE_FILTERS = ["Creature", "Instant", "Sorcery", "Enchantment", "Artifact", "Land"];

export function getRuleset(rulesetId = DEFAULT_RULESET_ID) {
  return RULESETS[rulesetId] || RULESETS[DEFAULT_RULESET_ID];
}

export function getLegalSets(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).legalSets;
}

export function getBannedCards(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).bannedCards;
}

export function getRestrictedCards(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).restrictedCards;
}

export function isBanned(cardName, rulesetId = DEFAULT_RULESET_ID) {
  return getBannedCards(rulesetId).includes(cardName);
}

export function isRestricted(cardName, rulesetId = DEFAULT_RULESET_ID) {
  return getRestrictedCards(rulesetId).includes(cardName);
}

export function isBasicLand(cardName) {
  return BASIC_LANDS.includes(cardName);
}

export function getMaxCopies(cardName, rulesetId = DEFAULT_RULESET_ID) {
  const ruleset = getRuleset(rulesetId);
  if (isBasicLand(cardName)) return 99;
  if (isBanned(cardName, rulesetId)) return 0;
  if (isRestricted(cardName, rulesetId)) return 1;
  return ruleset.defaultMaxCopies || 4;
}

export function isSetLegal(setCode, rulesetId = DEFAULT_RULESET_ID) {
  if (!setCode) return true;
  const legalSetCodes = new Set(getLegalSets(rulesetId).map((s) => s.code));
  return legalSetCodes.has(String(setCode).toLowerCase());
}

export function getRarityCaps(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).rarityCaps || null;
}

export function getRarityCount(entries = []) {
  return entries.reduce(
    (acc, entry) => {
      const rarity = (entry.rarity || "").toLowerCase();
      if (rarity === "rare" || rarity === "uncommon" || rarity === "common") {
        acc[rarity] += entry.quantity || 0;
      }
      return acc;
    },
    { rare: 0, uncommon: 0, common: 0 }
  );
}

// Build Scryfall search query for legal 93/94 cards
export function buildScryfallQuery({ search = "", colors = [], type = "", set = "", cmc = "", rulesetId = DEFAULT_RULESET_ID }) {
  const ruleset = getRuleset(rulesetId);
  const setCodes = ruleset.legalSets.map((s) => s.code);
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
  ruleset.bannedCards.forEach((card) => {
    q += ` -!"${card}"`;
  });

  return q;
}

// Backward-compatible named exports for existing imports.
export const LEGAL_SETS = getLegalSets();
export const BANNED_CARDS = getBannedCards();
export const RESTRICTED_CARDS = getRestrictedCards();
