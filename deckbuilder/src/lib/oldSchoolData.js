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

const ATLANTIC_RESTRICTED = [
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
  "Regrowth",
  "Sol Ring",
  "Strip Mine",
  "Time Walk",
  "Timetwister",
  "Wheel of Fortune",
];

const ATLANTIC_BANNED = ["Bronze Tablet", "Contract from Below", "Darkpact", "Demonic Attorney", "Jeweled Bird", "Rebirth", "Tempest Efreet"];

const A2A_RESTRICTED = [
  "Ancestral Recall",
  "Balance",
  "Black Lotus",
  "Braingeyser",
  "Chaos Orb",
  "Channel",
  "Demonic Consultation",
  "Demonic Tutor",
  "Library of Alexandria",
  "Mana Crypt",
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

const A2A_BANNED = [
  "Amulet of Quoz",
  "Bronze Tablet",
  "Contract from Below",
  "Darkpact",
  "Demonic Attorney",
  "Jeweled Bird",
  "Rebirth",
  "Tempest Efreet",
  "Timmerian Fiends",
];

const MIDDLE_SCHOOL_BANNED = [
  "Amulet of Quoz",
  "Balance",
  "Brainstorm",
  "Bronze Tablet",
  "Channel",
  "Dark Ritual",
  "Demonic Consultation",
  "Flash",
  "Goblin Recruiter",
  "Imperial Seal",
  "Jeweled Bird",
  "Mana Crypt",
  "Mana Vault",
  "Memory Jar",
  "Mind's Desire",
  "Mind Twist",
  "Rebirth",
  "Strip Mine",
  "Tempest Efreet",
  "Timmerian Fiends",
  "Tolarian Academy",
  "Vampiric Tutor",
  "Windfall",
  "Yawgmoth's Bargain",
  "Yawgmoth's Will",
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
  "x-points": {
    id: "x-points",
    label: "X-Points",
    shortLabel: "X-Points",
    description: "Atlantic 93/94 with the X-Points 2026 point system.",
    sourceLabel: "X-point Old School",
    sourceUrl: "https://xpointoldschool.com/rules-points/",
    legalSets: [
      { code: "lea", name: "Alpha" },
      { code: "leb", name: "Beta" },
      { code: "arn", name: "Arabian Nights" },
      { code: "atq", name: "Antiquities" },
      { code: "leg", name: "Legends" },
      { code: "drk", name: "The Dark" },
      { code: "fem", name: "Fallen Empires" },
    ],
    bannedCards: ATLANTIC_BANNED,
    restrictedCards: ATLANTIC_RESTRICTED,
    minMainDeckSize: 60,
    maxMainDeckSize: null,
    maxSideboardSize: 15,
    defaultMaxCopies: 4,
    notes: [
      "Uses Atlantic 93/94 rules and B&R list",
      "You may play up to 10 points across main deck and sideboard (X-Points 2026)",
      "Regular constructed format (not singleton)",
      "Reprint policy: same art, same frame, all languages, including AP, CE/IE, WCD, and M30",
      "No proxies",
    ],
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
  "fallen-empires-40": {
    id: "fallen-empires-40",
    label: "Fallen Empires 40",
    shortLabel: "FE40",
    description: "40-card decks built from Fallen Empires, with Alpha basic lands and a limited exception list.",
    sourceLabel: "Cleveland ROCS",
    sourceUrl: "https://clevelandrocs.net/builder/",
    legalSets: [{ code: "fem", name: "Fallen Empires" }],
    bannedCards: ["Hymn to Tourach"],
    restrictedCards: [],
    minMainDeckSize: 40,
    maxMainDeckSize: 40,
    maxSideboardSize: 5,
    defaultMaxCopies: 4,
    allowAlphaBasicLands: true,
    maxCopiesByCardName: {
      "Hand of Justice": 2,
      "Icatian Javelineers": 2,
      "Dwarven Catapult": 2,
    },
    allowedOffFormatCards: [
      "Balance of Power",
      "Butcher Orgg",
      "Calciform Pools",
      "Coral Colony",
      "Deathbloom Thallid",
      "Deathspore Thallid",
      "Disciple of Tevesh Szat",
      "Dreadship Reef",
      "Dwarven Bloodboiler",
      "Emmessi Tome",
      "Emperor Mihail II",
      "Empty the Warrens",
      "Endrek Sahr, Master Breeder",
      "Feral Abomination",
      "Flagstones of Trokair",
      "Fodder Cannon",
      "Fungal Infection",
      "Fungal Plots",
      "Fungal Reaches",
      "Gaze of Justice",
      "Goblin Matron",
      "Goblin Oriflamme",
      "Greenseeker",
      "Haunting Hymn",
      "Havenwood Wurm",
      "High Ground",
      "Homarid Explorer",
      "Icatian Crier",
      "Khod, Etlan Shiis Envoy",
      "Mindstab",
      "Molten Slagheap",
      "Monstrous War-Leech",
      "Mycologist",
      "Orcish Bloodpainter",
      "Pallid Mycoderm",
      "Psychotrope Thallid",
      "Quagmire Druid",
      "Saltcrusted Steppe",
      "Saproling Migration",
      "Sarpadian Empires, Vol. VII",
      "Sarpadian Simulacrum",
      "Savage Thallid",
      "Shade of Trokair",
      "Slinn Voda, the Rising Deep",
      "Sporecrown Thallid",
      "Sporesower Thallid",
      "Sporoloth Ancient",
      "Sprouting Goblin",
      "Svyelun of Sea and Sky",
      "Sword of the Meek",
      "Tatyova, Benthic Druid",
      "Thallid Germinator",
      "Thallid Omnivore",
      "Thallid Shell-Dweller",
      "Thallid Soothsayer",
      "Thelon of Havenwood",
      "Thelonite Hermit",
      "Thrull Surgeon",
      "Tourach, Dread Cantor",
      "Tourach's Canticle",
      "Trained Orgg",
      "Utopia Mycon",
      "Veteran Armorsmith",
      "Veteran Swordsmith",
      "Viscerid Deepwalker",
      "Vitaspore Thallid",
      "Voda Sea Scavenger",
      "Vodalian Hexcatcher",
      "Vodalian Hypnotist",
      "Vodalian Merchant",
      "Vodalian Mindsinger",
      "Vodalian Mystic",
      "Vodalian Serpent",
      "Vodalian Wave-Knight",
      "Vohar, Vodalian Desecrator",
      "Volshe Tideturner",
      "Waylay",
      "Yavimaya Sapherd",
    ],
    allowedOffFormatCardsMaxTotal: 9,
    allowedOffFormatCardsEachMaxCopies: 1,
    notes: [
      "Exactly 40 cards in main deck",
      "Fallen Empires cards only",
      "Alpha basic lands are allowed",
      "Hymn to Tourach is banned",
      "Hand of Justice, Icatian Javelineers, and Dwarven Catapult are max 2 copies",
      "Up to 9 cards from Sarpadian Scryings may be included in decks (following normal deckbuilding rules)!",
    ],
  },
  a2a: {
    id: "a2a",
    label: "A2A (Alpha to Alliances)",
    shortLabel: "A2A",
    description: "Old-frame format covering Alpha through Alliances with specific promo allowances.",
    sourceLabel: "Cleveland ROCS",
    sourceUrl: "https://clevelandrocs.net/builder/",
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
      { code: "4ed", name: "Fourth Edition" },
      { code: "ice", name: "Ice Age" },
      { code: "chr", name: "Chronicles" },
      { code: "hml", name: "Homelands" },
      { code: "ren", name: "Renaissance" },
      { code: "all", name: "Alliances" },
    ],
    bannedCards: A2A_BANNED,
    restrictedCards: A2A_RESTRICTED,
    minMainDeckSize: 60,
    maxMainDeckSize: null,
    maxSideboardSize: 15,
    defaultMaxCopies: 4,
    allowedOffFormatCards: ["Arena", "Giant Badger", "Mana Crypt", "Nalathni Dragon", "Sewers of Estark", "Windseeker Centaur"],
    maxCopiesByCardName: {
      Arena: 1,
      "Giant Badger": 1,
      "Mana Crypt": 1,
      "Nalathni Dragon": 1,
      "Sewers of Estark": 1,
      "Windseeker Centaur": 1,
    },
    unlimitedCardsByName: ["Aurochs", "Bog Rats", "Diseased Vermin", "Plague Rats", "Pestilence Rats"],
    notes: [
      "Minimum 60 cards in main deck",
      "Arena, Giant Badger, Mana Crypt, Nalathni Dragon, Sewers of Estark, and Windseeker Centaur are legal promos",
      "Aurochs and Rat creatures (Bog Rats, Diseased Vermin, Plague Rats, Pestilence Rats) have unlimited copies",
      "Restricted list applies at 1 copy each",
      "All ante cards are banned",
    ],
  },
  "middle-school": {
    id: "middle-school",
    label: "Middle School",
    shortLabel: "MS",
    description: "Old-frame 1995-2003 format with promo allowances and no restricted list.",
    sourceLabel: "Eternal Central",
    sourceUrl: "https://www.eternalcentral.com/middleschoolrules/",
    legalSets: [
      { code: "4ed", name: "Fourth Edition" },
      { code: "ice", name: "Ice Age" },
      { code: "chr", name: "Chronicles" },
      { code: "ren", name: "Renaissance" },
      { code: "hml", name: "Homelands" },
      { code: "all", name: "Alliances" },
      { code: "mir", name: "Mirage" },
      { code: "vis", name: "Visions" },
      { code: "5ed", name: "Fifth Edition" },
      { code: "wth", name: "Weatherlight" },
      { code: "por", name: "Portal" },
      { code: "tmp", name: "Tempest" },
      { code: "sth", name: "Stronghold" },
      { code: "exo", name: "Exodus" },
      { code: "p02", name: "Portal Second Age" },
      { code: "usg", name: "Urza's Saga" },
      { code: "ulg", name: "Urza's Legacy" },
      { code: "6ed", name: "Sixth Edition" },
      { code: "uds", name: "Urza's Destiny" },
      { code: "ptk", name: "Portal Three Kingdoms" },
      { code: "s99", name: "Starter 1999" },
      { code: "mmq", name: "Mercadian Masques" },
      { code: "nem", name: "Nemesis" },
      { code: "pcy", name: "Prophecy" },
      { code: "inv", name: "Invasion" },
      { code: "pls", name: "Planeshift" },
      { code: "apc", name: "Apocalypse" },
      { code: "ody", name: "Odyssey" },
      { code: "tor", name: "Torment" },
      { code: "jud", name: "Judgment" },
      { code: "ons", name: "Onslaught" },
      { code: "lgn", name: "Legions" },
      { code: "scg", name: "Scourge" },
    ],
    bannedCards: MIDDLE_SCHOOL_BANNED,
    restrictedCards: [],
    minMainDeckSize: 60,
    maxMainDeckSize: null,
    maxSideboardSize: 15,
    defaultMaxCopies: 4,
    allowReprintsOfLegalCards: true,
    legalReprintBrowseNames: ["Arena", "Sewers of Estark", "Nalathni Dragon", "Giant Badger", "Windseeker Centaur"],
    allowedOffFormatCards: [
      "Arena",
      "Sewers of Estark",
      "Nalathni Dragon",
      "Giant Badger",
      "Windseeker Centaur",
      "Fireball",
      "Counterspell",
      "Disenchant",
      "Incinerate",
    ],
    notes: [
      "Minimum 60 cards in main deck",
      "No restricted list",
      "Mana burn happens",
      "Judgment Wish cycle works as originally designed",
      "Damage uses the stack",
      "London Mulligan rule",
      "Reprints of legal cards are allowed, including CE/ICE, World Championship, artist proofs, and modern-bordered reprints",
      "Arena, Sewers of Estark, Nalathni Dragon, Giant Badger, and Windseeker Centaur are legal book promos; Mana Crypt is banned",
      "Arena League and DCI membership promos from the era are legal",
      "No official no-draw rule in EC Middle School tournaments",
    ],
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

  if (ruleset.unlimitedCardsByName?.includes(cardName)) return 99;

  const override = ruleset.maxCopiesByCardName?.[cardName];
  if (typeof override === "number") return override;

  if (ruleset.allowedOffFormatCards?.includes(cardName) && typeof ruleset.allowedOffFormatCardsEachMaxCopies === "number") {
    return ruleset.allowedOffFormatCardsEachMaxCopies;
  }

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

export function isCardLegal({ cardName = "", setCode = "" }, rulesetId = DEFAULT_RULESET_ID) {
  const ruleset = getRuleset(rulesetId);
  const normalizedSetCode = String(setCode || "").toLowerCase();

  if (isBanned(cardName, rulesetId)) return false;
  if (isSetLegal(normalizedSetCode, rulesetId)) return true;

  if (ruleset.allowAlphaBasicLands && normalizedSetCode === "lea" && isBasicLand(cardName)) {
    return true;
  }

  if (ruleset.allowedOffFormatCards?.includes(cardName)) {
    return true;
  }

  return false;
}

export function getAllowedOffFormatCards(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).allowedOffFormatCards || [];
}

export function getAllowedOffFormatCardsLimit(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).allowedOffFormatCardsMaxTotal ?? null;
}

export function getAllowedOffFormatCardsCount(entries = [], rulesetId = DEFAULT_RULESET_ID) {
  const allowed = new Set(getAllowedOffFormatCards(rulesetId));
  return entries.reduce((sum, entry) => {
    if (allowed.has(entry.card_name)) {
      return sum + (entry.quantity || 0);
    }
    return sum;
  }, 0);
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
  const normalizedSearch = search.trim().toLowerCase();

  let setQuery;
  if (set) {
    setQuery = `e:${set}`;
  } else {
    const setTerms = setCodes.map((c) => `e:${c}`);

    if (ruleset.allowAlphaBasicLands) {
      setTerms.push("e:lea");
    }

    const browseNames = ruleset.legalReprintBrowseNames || [];
    if (browseNames.length > 0 && (!normalizedSearch || browseNames.some((name) => name.toLowerCase().includes(normalizedSearch)))) {
      setTerms.push(...browseNames.map((name) => `name:"${name}"`));
    } else if (ruleset.allowedOffFormatCards?.length && normalizedSearch) {
      const exactMatch = ruleset.allowedOffFormatCards.find((name) => name.toLowerCase() === normalizedSearch);
      if (exactMatch) {
        setTerms.push(`name:"${exactMatch}"`);
      }
    }

    setQuery = `(${setTerms.join(" or ")})`;
  }

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
