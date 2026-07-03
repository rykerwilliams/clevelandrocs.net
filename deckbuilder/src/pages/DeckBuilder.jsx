import React, { useState, useCallback } from "react";
import { BarChart3, BookOpen, List, Search, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  isBanned,
  isRestricted,
  getMaxCopies,
  getRarityCaps,
  getRarityCount,
  getDeckPointsTotal,
  getCardPointValue,
  getPointsLimit,
  isCardLegal,
  getAllowedOffFormatCardsLimit,
  getAllowedOffFormatCardsCount,
  getQuantityGroupViolations,
  getRuleset,
  RULESET_OPTIONS,
  DEFAULT_RULESET_ID,
} from "@/lib/oldSchoolData";
import { getTemplatesForRuleset, getTemplateById, materializeTemplateDeck } from "@/lib/deckTemplates";
import CardSearch from "@/components/deck-builder/CardSearch";
import DeckList from "@/components/deck-builder/DeckList";
import DeckStats from "@/components/deck-builder/DeckStats";
import RulesReference from "@/components/deck-builder/RulesReference";
import ExportDeck from "@/components/deck-builder/ExportDeck";
import SiteHeader from "@/components/SiteHeader";

export default function DeckBuilder() {
  const { toast } = useToast();

  const [deckName, setDeckName] = useState("Untitled Deck");
  const [mainDeck, setMainDeck] = useState([]);
  const [sideboard, setSideboard] = useState([]);
  const [addingToSideboard, setAddingToSideboard] = useState(false);
  const [mobileTab, setMobileTab] = useState("search");
  const [rulesetId, setRulesetId] = useState(DEFAULT_RULESET_ID);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  const ruleset = getRuleset(rulesetId);
  const templateOptions = getTemplatesForRuleset(rulesetId);
  const rarityCaps = getRarityCaps(rulesetId);
  const offFormatLimit = getAllowedOffFormatCardsLimit(rulesetId);
  const pointsLimit = getPointsLimit(rulesetId);

  const handleRulesetChange = useCallback((value) => {
    setRulesetId(value);
    setSelectedTemplateId("");
  }, []);

  const handleTemplateChange = useCallback(
    (templateId) => {
      if (templateId === "__none__") {
        setSelectedTemplateId("");
        return;
      }

      const template = getTemplateById(rulesetId, templateId);
      if (!template) {
        return;
      }

      const currentCards = mainDeck.reduce((sum, entry) => sum + entry.quantity, 0) + sideboard.reduce((sum, entry) => sum + entry.quantity, 0);
      if (currentCards > 0) {
        const confirmed = window.confirm("Load template decklist and replace current main deck and sideboard?");
        if (!confirmed) {
          return;
        }
      }

      const materialized = materializeTemplateDeck(template);
      setMainDeck(materialized.mainDeck);
      setSideboard(materialized.sideboard);
      setDeckName(template.name || "Untitled Deck");
      setSelectedTemplateId(templateId);
      setAddingToSideboard(false);

      toast({
        title: "Template loaded",
        description: `${template.name} loaded into main deck and sideboard.`,
      });
    },
    [mainDeck, rulesetId, sideboard, toast]
  );

  const clearDeck = useCallback(() => {
    if (mainDeck.length === 0 && sideboard.length === 0) {
      return;
    }

    const confirmed = window.confirm("Clear main deck and sideboard?");
    if (!confirmed) {
      return;
    }

    setMainDeck([]);
    setSideboard([]);
    toast({
      title: "Deck cleared",
      description: "Main deck and sideboard were cleared.",
    });
  }, [mainDeck.length, sideboard.length, toast]);

  const getTotalCopies = useCallback(
    (cardName) => {
      let count = 0;
      const mainEntry = mainDeck.find((e) => e.card_name === cardName);
      if (mainEntry) count += mainEntry.quantity;
      const sideEntry = sideboard.find((e) => e.card_name === cardName);
      if (sideEntry) count += sideEntry.quantity;
      return count;
    },
    [mainDeck, sideboard]
  );

  const addCard = useCallback(
    (card) => {
      const cardName = card.card_name || card.name;
      const cardSetCode = (card.set_code || card.set || "").toLowerCase();
      const cardRarity = (card.rarity || "").toLowerCase();
      const cardPoints = getCardPointValue(cardName, rulesetId);

      if (isBanned(cardName, rulesetId)) {
        toast({
          title: "Card is banned",
          description: `${cardName} is banned in ${ruleset.shortLabel}.`,
          variant: "destructive",
        });
        return;
      }

      if (!isCardLegal({ cardName, setCode: cardSetCode }, rulesetId)) {
        toast({
          title: "Card is not legal",
          description: `${cardName} is not legal in ${ruleset.shortLabel}.`,
          variant: "destructive",
        });
        return;
      }

      const maxCopies = getMaxCopies(cardName, rulesetId, { rarity: cardRarity });
      const totalCopies = getTotalCopies(cardName);

      if (totalCopies >= maxCopies) {
        toast({
          title: isRestricted(cardName, rulesetId) ? "Restricted to 1 copy" : "Maximum copies reached",
          description: `${cardName}: max ${maxCopies} across main deck and sideboard.`,
          variant: "destructive",
        });
        return;
      }

      if (addingToSideboard && ruleset.maxSideboardSize === 0) {
        toast({
          title: "No sideboard in this ruleset",
          description: `${ruleset.shortLabel} does not allow sideboards.`,
          variant: "destructive",
        });
        return;
      }

      if (addingToSideboard && sideboard.reduce((s, e) => s + e.quantity, 0) >= ruleset.maxSideboardSize) {
        toast({
          title: "Sideboard limit reached",
          description: `${ruleset.shortLabel} allows up to ${ruleset.maxSideboardSize} sideboard cards.`,
          variant: "destructive",
        });
        return;
      }

      if (!addingToSideboard && ruleset.maxMainDeckSize != null) {
        const mainCount = mainDeck.reduce((s, e) => s + e.quantity, 0);
        if (mainCount >= ruleset.maxMainDeckSize) {
          toast({
            title: "Deck size limit reached",
            description: `${ruleset.shortLabel} requires exactly ${ruleset.maxMainDeckSize} cards in the main deck.`,
            variant: "destructive",
          });
          return;
        }
      }

      if (!addingToSideboard && rarityCaps) {
        const rarityScopeEntries = ruleset.rarityCapsScope === "main" ? mainDeck : [...mainDeck, ...sideboard];
        const rarityCounts = getRarityCount(rarityScopeEntries);
        if (cardRarity === "rare" && rarityCounts.rare >= rarityCaps.rare) {
          toast({
            title: "Rare limit reached",
            description: `${ruleset.shortLabel} allows up to ${rarityCaps.rare} rares.`,
            variant: "destructive",
          });
          return;
        }
        if (cardRarity === "uncommon" && rarityCounts.uncommon >= rarityCaps.uncommon) {
          toast({
            title: "Uncommon limit reached",
            description: `${ruleset.shortLabel} allows up to ${rarityCaps.uncommon} uncommons.`,
            variant: "destructive",
          });
          return;
        }
      }

      if (!addingToSideboard && offFormatLimit != null) {
        const offFormatCount = getAllowedOffFormatCardsCount(mainDeck, rulesetId);
        if (ruleset.allowedOffFormatCards?.includes(cardName) && offFormatCount >= offFormatLimit) {
          toast({
            title: "Exception list limit reached",
            description: `${ruleset.shortLabel} allows up to ${offFormatLimit} cards from the exception list.`,
            variant: "destructive",
          });
          return;
        }
      }

      if (pointsLimit != null) {
        const currentPoints = getDeckPointsTotal([...mainDeck, ...sideboard], rulesetId);
        if (currentPoints + cardPoints > pointsLimit) {
          toast({
            title: "Points limit reached",
            description: `${ruleset.shortLabel} allows up to ${pointsLimit} points (main + sideboard).`,
            variant: "destructive",
          });
          return;
        }
      }

      const prospectiveMain = addingToSideboard
        ? mainDeck
        : mainDeck.some((e) => e.card_name === cardName)
          ? mainDeck.map((e) => (e.card_name === cardName ? { ...e, quantity: e.quantity + 1 } : e))
          : [
              ...mainDeck,
              {
                card_name: cardName,
                quantity: 1,
              },
            ];
      const prospectiveSide = addingToSideboard
        ? sideboard.some((e) => e.card_name === cardName)
          ? sideboard.map((e) => (e.card_name === cardName ? { ...e, quantity: e.quantity + 1 } : e))
          : [
              ...sideboard,
              {
                card_name: cardName,
                quantity: 1,
              },
            ]
        : sideboard;
      const groupViolations = getQuantityGroupViolations([...prospectiveMain, ...prospectiveSide], rulesetId);
      if (groupViolations.length > 0) {
        const violation = groupViolations[0];
        toast({
          title: `${violation.label} limit reached`,
          description: `${ruleset.shortLabel} allows up to ${violation.maxTotal} ${violation.label} card${violation.maxTotal === 1 ? "" : "s"}.`,
          variant: "destructive",
        });
        return;
      }

      const newEntry = {
        card_name: cardName,
        scryfall_id: card.scryfall_id || card.id,
        quantity: 1,
        image_uri: card.image_uri || card.image_uris?.normal || "",
        mana_cost: card.mana_cost || "",
        type_line: card.type_line || "",
        set_name: card.set_name || "",
        set_code: cardSetCode,
        rarity: cardRarity,
        colors: card.colors || [],
      };

      if (addingToSideboard) {
        setSideboard((prev) => {
          const existing = prev.find((e) => e.card_name === cardName);
          if (existing) {
            return prev.map((e) => (e.card_name === cardName ? { ...e, quantity: e.quantity + 1 } : e));
          }
          return [...prev, newEntry];
        });
      } else {
        setMainDeck((prev) => {
          const existing = prev.find((e) => e.card_name === cardName);
          if (existing) {
            return prev.map((e) => (e.card_name === cardName ? { ...e, quantity: e.quantity + 1 } : e));
          }
          return [...prev, newEntry];
        });
      }
    },
    [addingToSideboard, getTotalCopies, mainDeck, offFormatLimit, pointsLimit, rarityCaps, ruleset, rulesetId, sideboard, toast]
  );

  const incrementCard = useCallback(
    (entry, section) => {
      const maxCopies = getMaxCopies(entry.card_name, rulesetId, { rarity: entry.rarity });
      const totalCopies = getTotalCopies(entry.card_name);

      if (totalCopies >= maxCopies) {
        toast({
          title: isRestricted(entry.card_name, rulesetId) ? "Restricted to 1 copy" : "Maximum copies reached",
          description: `${entry.card_name}: max ${maxCopies} across main + sideboard.`,
          variant: "destructive",
        });
        return;
      }

      if (!isCardLegal({ cardName: entry.card_name, setCode: entry.set_code }, rulesetId)) {
        toast({
          title: "Card is not legal",
          description: `${entry.card_name} is not legal in ${ruleset.shortLabel}.`,
          variant: "destructive",
        });
        return;
      }

      if (section === "sideboard") {
        if (ruleset.maxSideboardSize === 0) {
          toast({
            title: "No sideboard in this ruleset",
            description: `${ruleset.shortLabel} does not allow sideboards.`,
            variant: "destructive",
          });
          return;
        }
        const sideCount = sideboard.reduce((s, e) => s + e.quantity, 0);
        if (sideCount >= ruleset.maxSideboardSize) {
          toast({
            title: "Sideboard limit reached",
            description: `${ruleset.shortLabel} allows up to ${ruleset.maxSideboardSize} sideboard cards.`,
            variant: "destructive",
          });
          return;
        }
      }

      if (section === "main" && ruleset.maxMainDeckSize != null) {
        const mainCount = mainDeck.reduce((s, e) => s + e.quantity, 0);
        if (mainCount >= ruleset.maxMainDeckSize) {
          toast({
            title: "Deck size limit reached",
            description: `${ruleset.shortLabel} requires exactly ${ruleset.maxMainDeckSize} cards in the main deck.`,
            variant: "destructive",
          });
          return;
        }
      }

      if (section === "main" && rarityCaps) {
        const rarityScopeEntries = ruleset.rarityCapsScope === "main" ? mainDeck : [...mainDeck, ...sideboard];
        const rarityCounts = getRarityCount(rarityScopeEntries);
        const rarity = (entry.rarity || "").toLowerCase();

        if (rarity === "rare" && rarityCounts.rare >= rarityCaps.rare) {
          toast({
            title: "Rare limit reached",
            description: `${ruleset.shortLabel} allows up to ${rarityCaps.rare} rares.`,
            variant: "destructive",
          });
          return;
        }
        if (rarity === "uncommon" && rarityCounts.uncommon >= rarityCaps.uncommon) {
          toast({
            title: "Uncommon limit reached",
            description: `${ruleset.shortLabel} allows up to ${rarityCaps.uncommon} uncommons.`,
            variant: "destructive",
          });
          return;
        }
      }

      if (section === "main" && offFormatLimit != null) {
        const offFormatCount = getAllowedOffFormatCardsCount(mainDeck, rulesetId);
        if (ruleset.allowedOffFormatCards?.includes(entry.card_name) && offFormatCount >= offFormatLimit) {
          toast({
            title: "Exception list limit reached",
            description: `${ruleset.shortLabel} allows up to ${offFormatLimit} cards from the exception list.`,
            variant: "destructive",
          });
          return;
        }
      }

      if (pointsLimit != null) {
        const entryPoints = getCardPointValue(entry.card_name, rulesetId);
        const currentPoints = getDeckPointsTotal([...mainDeck, ...sideboard], rulesetId);
        if (currentPoints + entryPoints > pointsLimit) {
          toast({
            title: "Points limit reached",
            description: `${ruleset.shortLabel} allows up to ${pointsLimit} points (main + sideboard).`,
            variant: "destructive",
          });
          return;
        }
      }

      const prospectiveMain =
        section === "main" ? mainDeck.map((e) => (e.card_name === entry.card_name ? { ...e, quantity: e.quantity + 1 } : e)) : mainDeck;
      const prospectiveSide =
        section === "sideboard" ? sideboard.map((e) => (e.card_name === entry.card_name ? { ...e, quantity: e.quantity + 1 } : e)) : sideboard;
      const groupViolations = getQuantityGroupViolations([...prospectiveMain, ...prospectiveSide], rulesetId);
      if (groupViolations.length > 0) {
        const violation = groupViolations[0];
        toast({
          title: `${violation.label} limit reached`,
          description: `${ruleset.shortLabel} allows up to ${violation.maxTotal} ${violation.label} card${violation.maxTotal === 1 ? "" : "s"}.`,
          variant: "destructive",
        });
        return;
      }

      const setter = section === "sideboard" ? setSideboard : setMainDeck;
      setter((prev) => prev.map((e) => (e.card_name === entry.card_name ? { ...e, quantity: e.quantity + 1 } : e)));
    },
    [getTotalCopies, mainDeck, offFormatLimit, pointsLimit, rarityCaps, ruleset, rulesetId, sideboard, toast]
  );

  const decrementCard = useCallback((entry, section) => {
    const setter = section === "sideboard" ? setSideboard : setMainDeck;
    setter((prev) => {
      const existing = prev.find((e) => e.card_name === entry.card_name);
      if (existing && existing.quantity <= 1) {
        return prev.filter((e) => e.card_name !== entry.card_name);
      }
      return prev.map((e) => (e.card_name === entry.card_name ? { ...e, quantity: e.quantity - 1 } : e));
    });
  }, []);

  const deleteCard = useCallback((entry, section) => {
    const setter = section === "sideboard" ? setSideboard : setMainDeck;
    setter((prev) => prev.filter((e) => e.card_name !== entry.card_name));
  }, []);

  const mainCount = mainDeck.reduce((s, e) => s + e.quantity, 0);
  const sideCount = sideboard.reduce((s, e) => s + e.quantity, 0);
  const allEntries = [...mainDeck, ...sideboard];
  const rarityScopeEntries = ruleset.rarityCapsScope === "main" ? mainDeck : [...mainDeck, ...sideboard];
  const rarityCounts = getRarityCount(rarityScopeEntries);
  const rarityValid =
    !rarityCaps ||
    (rarityCounts.rare <= (rarityCaps.rare ?? Number.POSITIVE_INFINITY) &&
      rarityCounts.uncommon <= (rarityCaps.uncommon ?? Number.POSITIVE_INFINITY));
  const illegalEntries = allEntries.filter((entry) => !isCardLegal({ cardName: entry.card_name, setCode: entry.set_code }, rulesetId));
  const setsValid = illegalEntries.length === 0;
  const mainSizeValid = mainCount >= ruleset.minMainDeckSize && (ruleset.maxMainDeckSize == null || mainCount <= ruleset.maxMainDeckSize);
  const sideSizeValid = sideCount <= ruleset.maxSideboardSize;
  const offFormatCount = getAllowedOffFormatCardsCount(mainDeck, rulesetId);
  const offFormatValid = offFormatLimit == null || offFormatCount <= offFormatLimit;
  const pointsTotal = getDeckPointsTotal(allEntries, rulesetId);
  const pointsValid = pointsLimit == null || pointsTotal <= pointsLimit;

  const totalCopiesByCard = allEntries.reduce((acc, entry) => {
    acc[entry.card_name] = (acc[entry.card_name] || 0) + entry.quantity;
    return acc;
  }, {});

  const bannedCardsInDeck = Object.keys(totalCopiesByCard).filter((cardName) => isBanned(cardName, rulesetId));
  const bannedValid = bannedCardsInDeck.length === 0;

  const rarityByCard = allEntries.reduce((acc, entry) => {
    if (!acc[entry.card_name]) {
      acc[entry.card_name] = entry.rarity;
    }
    return acc;
  }, {});

  const copyLimitViolations = Object.entries(totalCopiesByCard).filter(
    ([cardName, totalCopies]) => totalCopies > getMaxCopies(cardName, rulesetId, { rarity: rarityByCard[cardName] })
  );
  const copyLimitsValid = copyLimitViolations.length === 0;
  const quantityGroupViolations = getQuantityGroupViolations(allEntries, rulesetId);
  const quantityGroupsValid = quantityGroupViolations.length === 0;

  const isValid =
    mainSizeValid &&
    sideSizeValid &&
    rarityValid &&
    setsValid &&
    bannedValid &&
    copyLimitsValid &&
    quantityGroupsValid &&
    offFormatValid &&
    pointsValid;

  const validityLabel = ruleset.maxMainDeckSize ? `${mainCount}/${ruleset.maxMainDeckSize}` : `${mainCount}/${ruleset.minMainDeckSize}`;

  return (
    <div className="deckbuilder-theme h-screen overflow-hidden bg-stone-950 flex flex-col">
      <SiteHeader active="deck builder" />

      {/* Top Bar */}
      <header className="h-14 border-b border-stone-800 bg-stone-950/95 backdrop-blur-sm flex items-center px-4 gap-3 shrink-0 sticky top-0 z-30">
        <Input
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          className="bg-transparent border-none text-stone-200 font-semibold text-base focus-visible:ring-0 focus-visible:ring-offset-0 max-w-xs px-2 h-9"
        />

        <Select value={rulesetId} onValueChange={handleRulesetChange}>
          <SelectTrigger className="w-52 h-8 bg-stone-900 border-stone-700 text-stone-300 text-xs">
            <SelectValue placeholder="Ruleset" />
          </SelectTrigger>
          <SelectContent className="bg-stone-900 border-stone-700">
            {RULESET_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-stone-300">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTemplateId || "__none__"} onValueChange={handleTemplateChange}>
          <SelectTrigger className="w-72 h-8 bg-stone-900 border-stone-700 text-stone-300 text-xs">
            <SelectValue placeholder="Template decklist" />
          </SelectTrigger>
          <SelectContent className="bg-stone-900 border-stone-700">
            <SelectItem value="__none__" className="text-stone-500">
              Start from template...
            </SelectItem>
            {templateOptions.map((template) => (
              <SelectItem key={template.id} value={template.id} className="text-stone-300">
                <div className="flex flex-col leading-tight">
                  <span>{template.name}</span>
                  {template.description ? <span className="text-[10px] text-stone-500 mt-0.5">{template.description}</span> : null}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 ml-auto">
          {/* Validity indicator */}
          <div
            className={`hidden sm:flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded ${
              isValid ? "text-emerald-400 bg-emerald-900/20" : "text-amber-400 bg-amber-900/20"
            }`}
          >
            {isValid ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            {validityLabel}
          </div>

          {pointsLimit != null ? (
            <div
              className={`hidden sm:flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded ${
                pointsValid ? "text-sky-300 bg-sky-900/20" : "text-red-300 bg-red-900/20"
              }`}
            >
              PTS {pointsTotal}/{pointsLimit}
            </div>
          ) : null}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearDeck}
            disabled={mainDeck.length === 0 && sideboard.length === 0}
            className="text-xs h-8 text-stone-400 hover:text-red-400 hover:bg-stone-800"
          >
            Clear deck
          </Button>

          <ExportDeck deckName={deckName} mainDeck={mainDeck} sideboard={sideboard} rulesetLabel={ruleset.label} />

          {/* Sideboard toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAddingToSideboard(!addingToSideboard)}
            disabled={ruleset.maxSideboardSize === 0}
            className={`text-xs h-8 ${
              addingToSideboard
                ? "text-amber-400 bg-amber-900/20 hover:bg-amber-900/30 hover:text-amber-300"
                : "text-stone-400 hover:text-stone-300 hover:bg-stone-800"
            }`}
          >
            {addingToSideboard ? "Adding to SB" : "Adding to Main"}
          </Button>
        </div>
      </header>

      {/* Mobile Tab Nav */}
      <div className="sm:hidden flex border-b border-stone-800 bg-stone-950">
        {[
          { key: "search", label: "Search", icon: Search },
          { key: "deck", label: `Deck (${mainCount})`, icon: List },
          { key: "stats", label: "Stats", icon: BarChart3 },
          { key: "rules", label: "Rules", icon: BookOpen },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setMobileTab(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
              mobileTab === tab.key ? "text-amber-400 border-b-2 border-amber-400" : "text-stone-500"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden sm:flex flex-1">
          {/* Card Search Panel */}
          <div className="w-80 lg:w-96 border-r border-stone-800 flex flex-col shrink-0">
            <CardSearch onAddCard={addCard} rulesetId={rulesetId} />
          </div>

          {/* Deck Panel */}
          <div className="flex-1 flex flex-col min-w-0">
            <DeckList
              mainDeck={mainDeck}
              sideboard={sideboard}
              onAdd={incrementCard}
              onRemove={decrementCard}
              onDelete={deleteCard}
              rulesetId={rulesetId}
            />
          </div>

          {/* Stats / Rules Panel */}
          <div className="w-72 lg:w-80 border-l border-stone-800 shrink-0">
            <Tabs defaultValue="stats" className="h-full flex flex-col">
              <TabsList className="bg-stone-900 mx-2 mt-2 h-8">
                <TabsTrigger value="stats" className="text-xs data-[state=active]:bg-stone-800 data-[state=active]:text-amber-400">
                  <BarChart3 className="w-3.5 h-3.5 mr-1" />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="rules" className="text-xs data-[state=active]:bg-stone-800 data-[state=active]:text-amber-400">
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  Rules
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stats" className="flex-1 overflow-y-auto mt-0">
                <DeckStats mainDeck={mainDeck} />
              </TabsContent>
              <TabsContent value="rules" className="flex-1 overflow-hidden mt-0">
                <RulesReference rulesetId={rulesetId} mainDeck={mainDeck} sideboard={sideboard} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden flex-1 flex flex-col overflow-hidden">
          {mobileTab === "search" && <CardSearch onAddCard={addCard} rulesetId={rulesetId} />}
          {mobileTab === "deck" && (
            <DeckList
              mainDeck={mainDeck}
              sideboard={sideboard}
              onAdd={incrementCard}
              onRemove={decrementCard}
              onDelete={deleteCard}
              rulesetId={rulesetId}
            />
          )}
          {mobileTab === "stats" && (
            <div className="flex-1 overflow-y-auto">
              <DeckStats mainDeck={mainDeck} />
            </div>
          )}
          {mobileTab === "rules" && (
            <div className="flex-1 overflow-hidden">
              <RulesReference rulesetId={rulesetId} mainDeck={mainDeck} sideboard={sideboard} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
