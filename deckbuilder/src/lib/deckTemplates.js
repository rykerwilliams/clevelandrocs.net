import eternalCentralTemplates from "@/data/deck-templates/eternal-central.json";
import swedishTemplates from "@/data/deck-templates/swedish.json";
import atlanticTemplates from "@/data/deck-templates/atlantic.json";
import xPointsTemplates from "@/data/deck-templates/x-points.json";
import singletonTemplates from "@/data/deck-templates/7pt-singleton.json";
import alpha40Templates from "@/data/deck-templates/alpha40.json";
import forgottenRealmsTemplates from "@/data/deck-templates/fallen-empires-40.json";
import a2aTemplates from "@/data/deck-templates/a2a.json";
import middleSchoolTemplates from "@/data/deck-templates/middle-school.json";

const TEMPLATE_DECKS_BY_RULESET = {
  "eternal-central": eternalCentralTemplates,
  swedish: swedishTemplates,
  atlantic: atlanticTemplates,
  "x-points": xPointsTemplates,
  "7pt-singleton": singletonTemplates,
  alpha40: alpha40Templates,
  "fallen-empires-40": forgottenRealmsTemplates,
  a2a: a2aTemplates,
  "middle-school": middleSchoolTemplates,
};

function toDeckEntry(entry = {}) {
  return {
    card_name: entry.card_name || "",
    quantity: Number(entry.quantity) || 0,
    scryfall_id: entry.scryfall_id || "",
    image_uri: entry.image_uri || "",
    mana_cost: entry.mana_cost || "",
    type_line: entry.type_line || "",
    set_name: entry.set_name || "",
    set_code: (entry.set_code || "").toLowerCase(),
    rarity: (entry.rarity || "").toLowerCase(),
    colors: Array.isArray(entry.colors) ? entry.colors : [],
  };
}

export function getTemplatesForRuleset(rulesetId) {
  return TEMPLATE_DECKS_BY_RULESET[rulesetId] || [];
}

export function getTemplateById(rulesetId, templateId) {
  return getTemplatesForRuleset(rulesetId).find((template) => template.id === templateId) || null;
}

export function materializeTemplateDeck(template) {
  if (!template) {
    return { mainDeck: [], sideboard: [] };
  }

  return {
    mainDeck: (template.mainDeck || []).map(toDeckEntry).filter((entry) => entry.card_name && entry.quantity > 0),
    sideboard: (template.sideboard || []).map(toDeckEntry).filter((entry) => entry.card_name && entry.quantity > 0),
  };
}
