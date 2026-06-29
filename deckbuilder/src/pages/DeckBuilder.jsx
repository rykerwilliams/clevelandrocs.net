import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BarChart3, BookOpen, List, Search, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { isBanned, isRestricted, getMaxCopies } from "@/lib/oldSchoolData";
import CardSearch from "@/components/deck-builder/CardSearch";
import DeckList from "@/components/deck-builder/DeckList";
import DeckStats from "@/components/deck-builder/DeckStats";
import RulesReference from "@/components/deck-builder/RulesReference";
import ExportDeck from "@/components/deck-builder/ExportDeck";

export default function DeckBuilder() {
  const { toast } = useToast();

  const [deckName, setDeckName] = useState("Untitled Deck");
  const [mainDeck, setMainDeck] = useState([]);
  const [sideboard, setSideboard] = useState([]);
  const [addingToSideboard, setAddingToSideboard] = useState(false);
  const [mobileTab, setMobileTab] = useState("search");

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

      if (isBanned(cardName)) {
        toast({
          title: "Card is banned",
          description: `${cardName} is banned in 93/94.`,
          variant: "destructive",
        });
        return;
      }

      const maxCopies = getMaxCopies(cardName);
      const totalCopies = getTotalCopies(cardName);

      if (totalCopies >= maxCopies) {
        toast({
          title: isRestricted(cardName) ? "Restricted to 1 copy" : "Maximum copies reached",
          description: `${cardName}: max ${maxCopies} across main deck and sideboard.`,
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
    [addingToSideboard, getTotalCopies, toast]
  );

  const incrementCard = useCallback(
    (entry, section) => {
      const maxCopies = getMaxCopies(entry.card_name);
      const totalCopies = getTotalCopies(entry.card_name);

      if (totalCopies >= maxCopies) {
        toast({
          title: isRestricted(entry.card_name) ? "Restricted to 1 copy" : "Maximum copies reached",
          description: `${entry.card_name}: max ${maxCopies} across main + sideboard.`,
          variant: "destructive",
        });
        return;
      }

      const setter = section === "sideboard" ? setSideboard : setMainDeck;
      setter((prev) => prev.map((e) => (e.card_name === entry.card_name ? { ...e, quantity: e.quantity + 1 } : e)));
    },
    [getTotalCopies, toast]
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
  const isValid = mainCount >= 60 && sideCount <= 15;

  return (
    <div className="h-screen overflow-hidden bg-stone-950 flex flex-col">
      <div className="border-b border-stone-800/80 bg-stone-950/95 backdrop-blur-sm">
        <div className="px-4 h-10 flex items-center justify-center text-xs tracking-wide text-stone-400">
          <a href="/about/" className="hover:text-amber-400 transition-colors">
            about
          </a>
          <span className="mx-2 text-stone-600">|</span>
          <a href="/profiles/" className="hover:text-amber-400 transition-colors">
            profiles
          </a>
          <span className="mx-2 text-stone-600">|</span>
          <a href="/articles/" className="hover:text-amber-400 transition-colors">
            articles
          </a>
          <span className="mx-2 text-stone-600">|</span>
          <Link to="/build" className="hover:text-amber-400 transition-colors">
            deck builder
          </Link>
        </div>
      </div>

      {/* Top Bar */}
      <header className="h-14 border-b border-stone-800 bg-stone-950/95 backdrop-blur-sm flex items-center px-4 gap-3 shrink-0 sticky top-0 z-30">
        <Link to="/" className="text-stone-500 hover:text-stone-300 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <Input
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          className="bg-transparent border-none text-stone-200 font-semibold text-base focus-visible:ring-0 focus-visible:ring-offset-0 max-w-xs px-2 h-9"
        />

        <div className="flex items-center gap-2 ml-auto">
          {/* Validity indicator */}
          <div
            className={`hidden sm:flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded ${
              isValid ? "text-emerald-400 bg-emerald-900/20" : "text-amber-400 bg-amber-900/20"
            }`}
          >
            {isValid ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            {mainCount}/60
          </div>

          <ExportDeck deckName={deckName} mainDeck={mainDeck} sideboard={sideboard} />

          {/* Sideboard toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAddingToSideboard(!addingToSideboard)}
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
            <CardSearch onAddCard={addCard} />
          </div>

          {/* Deck Panel */}
          <div className="flex-1 flex flex-col min-w-0">
            <DeckList mainDeck={mainDeck} sideboard={sideboard} onAdd={incrementCard} onRemove={decrementCard} onDelete={deleteCard} />
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
                <RulesReference />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden flex-1 flex flex-col overflow-hidden">
          {mobileTab === "search" && <CardSearch onAddCard={addCard} />}
          {mobileTab === "deck" && (
            <DeckList mainDeck={mainDeck} sideboard={sideboard} onAdd={incrementCard} onRemove={decrementCard} onDelete={deleteCard} />
          )}
          {mobileTab === "stats" && (
            <div className="flex-1 overflow-y-auto">
              <DeckStats mainDeck={mainDeck} />
            </div>
          )}
          {mobileTab === "rules" && (
            <div className="flex-1 overflow-hidden">
              <RulesReference />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
