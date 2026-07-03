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

const SWEDISH_RESTRICTED = [
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
  "Mishra's Workshop",
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

const SEVEN_POINT_SINGLETON_ANTE_BANNED = ["Contract from Below", "Darkpact", "Demonic Attorney", "Jeweled Bird", "Rebirth", "Tempest Efreet"];

const SEVEN_POINT_SINGLETON_POINTS_2025 = {
  "Ancestral Recall": 4,
  Braingeyser: 3,
  "Control Magic": 3,
  Disintegrate: 3,
  Fireball: 3,
  "Library of Alexandria": 3,
  "Mind Twist": 3,
  Armageddon: 2,
  "Black Lotus": 2,
  "Demonic Tutor": 2,
  Earthquake: 2,
  "Falling Star": 2,
  "Land Tax": 2,
  "Mana Drain": 2,
  Moat: 2,
  "Mox Emerald": 2,
  "Mox Jet": 2,
  "Mox Pearl": 2,
  "Mox Ruby": 2,
  "Mox Sapphire": 2,
  "Sol Ring": 2,
  "The Abyss": 2,
  "Time Walk": 2,
  Amnesia: 1,
  Balance: 1,
  "Black Vise": 1,
  "Dark Ritual": 1,
  "Drain Life": 1,
  "Guardian Beast": 1,
  "Hymn to Tourach": 1,
  "Icy Manipulator": 1,
  Karakas: 1,
  "Mana Vault": 1,
  "Maze of Ith": 1,
  "Old Man of the Sea": 1,
  Pestilence: 1,
  Pyrotechnics: 1,
  Recall: 1,
  Regrowth: 1,
  "Steal Artifact": 1,
  Triskelion: 1,
  "Winter Orb": 1,
};

const ALPHA40_MODERATED = [
  "Berserk",
  "Black Vise",
  "Copper Tablet",
  "Counterspell",
  "Hurricane",
  "Hypnotic Specter",
  "Ice Storm",
  "Icy Manipulator",
  "Juggernaut",
  "Lightning Bolt",
  "Orcish Oriflamme",
  "Psionic Blast",
  "Sinkhole",
  "Stone Rain",
  "Swords to Plowshares",
];

const ALPHA40_FAST_MANA = ["Black Lotus", "Mana Vault", "Mox Emerald", "Mox Jet", "Mox Pearl", "Mox Ruby", "Mox Sapphire", "Sol Ring"];
const ALPHA40_POWER = ["Ancestral Recall", "Fastbond", "Time Vault", "Time Walk", "Timetwister", "Wheel of Fortune"];
const ALPHA40_DRAW = ["Ancestral Recall", "Braingeyser", "Demonic Tutor", "Howling Mine", "Jayemdae Tome", "Regrowth"];
const ALPHA40_DESTRUCTION = ["Armageddon", "Balance", "Chaos Orb", "Nevinyrral's Disk"];
const ALPHA40_CHARMS = ["Crystal Rod", "Iron Star", "Ivory Cup", "Soul Net", "Throne of Bone", "Wooden Sphere"];

const X_POINTS_2026 = {
  "Ancestral Recall": 6,
  "Mind Twist": 4,
  "Black Lotus": 3,
  "Demonic Tutor": 3,
  "Library of Alexandria": 3,
  Balance: 2,
  Braingeyser: 2,
  "Hymn to Tourach": 2,
  "Land Tax": 2,
  "Mox Emerald": 2,
  "Mox Jet": 2,
  "Mox Pearl": 2,
  "Mox Ruby": 2,
  "Mox Sapphire": 2,
  "Sol Ring": 2,
  "Mana Vault": 2,
  "Time Walk": 2,
  Timetwister: 2,
  "Wheel of Fortune": 2,
  Armageddon: 1,
  "Mana Drain": 1,
  "Maze of Ith": 1,
  "Icy Manipulator": 1,
  "Mishra's Workshop": 1,
  Moat: 1,
  Recall: 1,
  Regrowth: 1,
  "The Abyss": 1,
};

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
    label: "Eternal Central",
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
  swedish: {
    id: "swedish",
    label: "Swedish",
    shortLabel: "Swedish",
    description: "Traditional 93/94 Swedish ruleset with no reprints allowed.",
    sourceLabel: "MT Goldframe",
    sourceUrl: "https://mtgoldframe.com/old-school-93-94/",
    legalSets: [
      { code: "lea", name: "Alpha" },
      { code: "leb", name: "Beta" },
      { code: "2ed", name: "Unlimited" },
      { code: "sum", name: "Summer Magic" },
      { code: "arn", name: "Arabian Nights" },
      { code: "atq", name: "Antiquities" },
      { code: "leg", name: "Legends" },
      { code: "drk", name: "The Dark" },
    ],
    bannedCards: ATLANTIC_BANNED,
    restrictedCards: SWEDISH_RESTRICTED,
    minMainDeckSize: 60,
    maxMainDeckSize: null,
    maxSideboardSize: 15,
    defaultMaxCopies: 4,
    notes: ["No reprints allowed", "Mana burn is in effect", "London Mulligan rule"],
  },
  atlantic: {
    id: "atlantic",
    label: "Atlantic",
    shortLabel: "Atlantic",
    description: "Atlantic 93/94 baseline ruleset blending EC and Swedish B&R.",
    sourceLabel: "Sentinel Old School",
    sourceUrl: "https://sentineloldschoolmtg.com/atlantic-93-94/",
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
    notes: ["Mana burn is in effect", "London Mulligan rule", "No set reprint policy is enforced by this builder"],
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
    maxPointsTotal: 10,
    pointsByCardName: X_POINTS_2026,
    notes: [
      "Uses Atlantic 93/94 rules and B&R list",
      "You may play up to 10 points across main deck and sideboard (X-Points 2026)",
      "Regular constructed format (not singleton)",
      "Reprint policy: same art, same frame, all languages, including AP, CE/IE, WCD, and M30",
      "No proxies",
    ],
  },
  "7pt-singleton": {
    id: "7pt-singleton",
    label: "7pt Singleton",
    shortLabel: "7pt",
    description: "Singleton 93/94 format with a 7-point cap for designated power cards.",
    sourceLabel: "7pts Singleton",
    sourceUrl: "https://7pts-singleton.com/",
    legalSets: [
      { code: "lea", name: "Alpha" },
      { code: "leb", name: "Beta" },
      { code: "arn", name: "Arabian Nights" },
      { code: "atq", name: "Antiquities" },
      { code: "leg", name: "Legends" },
      { code: "drk", name: "The Dark" },
      { code: "fem", name: "Fallen Empires" },
    ],
    bannedCards: SEVEN_POINT_SINGLETON_ANTE_BANNED,
    restrictedCards: [],
    minMainDeckSize: 60,
    maxMainDeckSize: 60,
    maxSideboardSize: 0,
    defaultMaxCopies: 1,
    maxPointsTotal: 7,
    pointsByCardName: SEVEN_POINT_SINGLETON_POINTS_2025,
    allowedOffFormatCards: ["Arena", "Sewers of Estark", "Nalathni Dragon"],
    notes: [
      "Exactly 60 cards in main deck",
      "No sideboard",
      "Singleton: all non-basic lands are max 1 copy",
      "Only ante cards are banned",
      "Maximum 7 points across point cards",
      "Reprint policy is broader than strict set legality; this builder enforces baseline sets plus listed promos",
    ],
  },
  alpha40: {
    id: "alpha40",
    label: "Alpha 40",
    shortLabel: "Alpha 40",
    description: "Alpha-only format with per-card rarity limits and restricted card groups.",
    sourceLabel: "MT Goldframe",
    sourceUrl: "https://mtgoldframe.com/alpha-40/",
    legalSets: [{ code: "lea", name: "Alpha" }],
    bannedCards: [],
    restrictedCards: [],
    minMainDeckSize: 40,
    maxMainDeckSize: null,
    maxSideboardSize: 0,
    defaultMaxCopies: 4,
    rarityCaps: {
      common: 99,
      uncommon: 6,
      rare: 3,
    },
    rarityCapsScope: "main",
    maxCopiesByCardName: Object.fromEntries(ALPHA40_MODERATED.map((name) => [name, 3])),
    quantityGroups: [
      { id: "alpha40-fast-mana", label: "Fast Mana", maxTotal: 1, cards: ALPHA40_FAST_MANA },
      { id: "alpha40-power", label: "Power", maxTotal: 1, cards: ALPHA40_POWER },
      { id: "alpha40-draw", label: "Draw", maxTotal: 1, cards: ALPHA40_DRAW },
      { id: "alpha40-destruction", label: "Destruction", maxTotal: 1, cards: ALPHA40_DESTRUCTION },
      { id: "alpha40-charms", label: "Charm", maxTotal: 1, cards: ALPHA40_CHARMS },
    ],
    notes: [
      "Minimum 40 cards in main deck",
      "No sideboards",
      "Alpha cards only",
      "Commons unlimited, up to 6 total uncommons and up to 3 total rares in the main deck",
      "Moderated cards are max 3 each",
      "At most one total card from each category: Fast Mana, Power, Draw, Destruction, Charm",
      "Ancestral Recall counts toward both Power and Draw categories",
    ],
  },
  "fallen-empires-40": {
    id: "fallen-empires-40",
    label: "Forgotten Realms",
    shortLabel: "FR",
    description: "Constructed format using Modern rules with mana burn, featuring The Dark, Fallen Empires, and Homelands.",
    sourceLabel: "Cleveland ROCS",
    sourceUrl: "https://clevelandrocs.net/builder/",
    legalSets: [
      { code: "drk", name: "The Dark" },
      { code: "fem", name: "Fallen Empires" },
      { code: "hml", name: "Homelands" },
    ],
    bannedCards: ["An-Zerrin Ruins", "Apocalypse Chime", "Timmerian Fiends"],
    restrictedCards: ["Hymn to Tourach", "Maze of Ith", "Serrated Arrows"],
    minMainDeckSize: 60,
    maxMainDeckSize: null,
    maxSideboardSize: 15,
    defaultMaxCopies: 4,
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
      "Modern rules are used",
      "Mana burn is in effect",
      "Minimum 60 cards in main deck",
      "Sideboard up to 15 cards",
      "Legal sets: The Dark, Fallen Empires, Homelands",
      "Banned: An-Zerrin Ruins, Apocalypse Chime, Timmerian Fiends",
      "Restricted (max 1): Hymn to Tourach, Maze of Ith, Serrated Arrows",
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

export function getMaxCopies(cardName, rulesetId = DEFAULT_RULESET_ID, context = {}) {
  const ruleset = getRuleset(rulesetId);
  const rarity = (context.rarity || "").toLowerCase();

  if (ruleset.unlimitedCardsByName?.includes(cardName)) return 99;

  const override = ruleset.maxCopiesByCardName?.[cardName];
  if (typeof override === "number") return override;

  const rarityLimit = ruleset.maxCopiesByRarity?.[rarity];
  if (typeof rarityLimit === "number") return rarityLimit;

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

export function getQuantityGroupViolations(entries = [], rulesetId = DEFAULT_RULESET_ID) {
  const groups = getRuleset(rulesetId).quantityGroups || [];
  return groups
    .map((group) => {
      const names = new Set(group.cards || []);
      const total = entries.reduce((sum, entry) => {
        if (names.has(entry.card_name)) {
          return sum + (entry.quantity || 0);
        }
        return sum;
      }, 0);

      return {
        id: group.id,
        label: group.label,
        total,
        maxTotal: group.maxTotal,
      };
    })
    .filter((group) => group.total > group.maxTotal);
}

export function getRarityCaps(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).rarityCaps || null;
}

export function getPointsLimit(rulesetId = DEFAULT_RULESET_ID) {
  return getRuleset(rulesetId).maxPointsTotal ?? null;
}

export function getCardPointValue(cardName, rulesetId = DEFAULT_RULESET_ID) {
  const pointsMap = getRuleset(rulesetId).pointsByCardName || {};
  return pointsMap[cardName] || 0;
}

export function getDeckPointsTotal(entries = [], rulesetId = DEFAULT_RULESET_ID) {
  return entries.reduce((sum, entry) => sum + getCardPointValue(entry.card_name, rulesetId) * (entry.quantity || 0), 0);
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
