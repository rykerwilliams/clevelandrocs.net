import React, { useState } from "react";
import { Minus, Plus, X, AlertTriangle, LayoutGrid, List as ListIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { isRestricted, isBasicLand, getMaxCopies } from "@/lib/oldSchoolData";
import DeckGalleryCard from "@/components/deck-builder/DeckGalleryCard";

function DeckEntry({ entry, onAdd, onRemove, onDelete, section }) {
  const restricted = isRestricted(entry.card_name);
  const maxCopies = getMaxCopies(entry.card_name);
  const overLimit = !isBasicLand(entry.card_name) && entry.quantity > maxCopies;

  return (
    <div
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-stone-800/60 transition-colors ${
        overLimit ? "bg-red-900/20" : ""
      }`}
    >
      <span className="text-amber-400 font-mono text-xs w-5 text-right shrink-0">
        {entry.quantity}×
      </span>
      <span className="text-stone-200 text-sm truncate flex-1">
        {entry.card_name}
      </span>
      {restricted && (
        <Badge
          variant="outline"
          className="border-amber-600 text-amber-500 text-[9px] px-1 py-0 shrink-0"
        >
          R
        </Badge>
      )}
      {overLimit && (
        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
      )}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => onRemove(entry, section)}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-stone-700 text-stone-400 hover:text-stone-200"
        >
          <Minus className="w-3 h-3" />
        </button>
        <button
          onClick={() => onAdd(entry, section)}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-stone-700 text-stone-400 hover:text-stone-200"
        >
          <Plus className="w-3 h-3" />
        </button>
        <button
          onClick={() => onDelete(entry, section)}
          className="w-5 h-5 flex items-center justify-center rounded hover:bg-stone-700 text-stone-400 hover:text-red-400"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function groupByType(entries) {
  const groups = {};
  entries.forEach((entry) => {
    const typeLine = entry.type_line || "Other";
    let category = "Other";
    if (typeLine.includes("Creature")) category = "Creatures";
    else if (typeLine.includes("Instant")) category = "Instants";
    else if (typeLine.includes("Sorcery")) category = "Sorceries";
    else if (typeLine.includes("Enchantment")) category = "Enchantments";
    else if (typeLine.includes("Artifact")) category = "Artifacts";
    else if (typeLine.includes("Land")) category = "Lands";

    if (!groups[category]) groups[category] = [];
    groups[category].push(entry);
  });

  const order = ["Creatures", "Instants", "Sorceries", "Enchantments", "Artifacts", "Lands", "Other"];
  const sorted = {};
  order.forEach((cat) => {
    if (groups[cat]) sorted[cat] = groups[cat];
  });
  return sorted;
}

export default function DeckList({
  mainDeck,
  sideboard,
  onAdd,
  onRemove,
  onDelete,
}) {
  const [view, setView] = useState("list");
  const mainCount = mainDeck.reduce((s, e) => s + e.quantity, 0);
  const sideCount = sideboard.reduce((s, e) => s + e.quantity, 0);
  const mainGroups = groupByType(mainDeck);
  const sideGroups = groupByType(sideboard);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Main Deck Header */}
      <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between">
        <h3 className="text-stone-200 font-semibold text-sm tracking-wide uppercase">
          Main Deck
        </h3>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center gap-0.5 bg-stone-900 rounded-md p-0.5 border border-stone-800">
            <button
              onClick={() => setView("list")}
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                view === "list"
                  ? "bg-stone-700 text-amber-400"
                  : "text-stone-500 hover:text-stone-300"
              }`}
              title="List view"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView("gallery")}
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                view === "gallery"
                  ? "bg-stone-700 text-amber-400"
                  : "text-stone-500 hover:text-stone-300"
              }`}
              title="Gallery view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
          <span
            className={`text-xs font-mono ${
              mainCount >= 60 ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {mainCount} / 60
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-2">
        {mainDeck.length === 0 ? (
          <p className="text-stone-600 text-xs text-center py-8 px-4">
            Click cards from the browser to add them to your deck
          </p>
        ) : view === "list" ? (
          Object.entries(mainGroups).map(([category, entries]) => (
            <div key={category} className="mb-3">
              <p className="text-stone-500 text-[10px] uppercase tracking-widest font-semibold px-3 mb-1">
                {category} ({entries.reduce((s, e) => s + e.quantity, 0)})
              </p>
              {entries.map((entry) => (
                <DeckEntry
                  key={entry.card_name}
                  entry={entry}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  section="main"
                />
              ))}
            </div>
          ))
        ) : (
          Object.entries(mainGroups).map(([category, entries]) => (
            <div key={category} className="mb-4">
              <p className="text-stone-500 text-[10px] uppercase tracking-widest font-semibold px-3 mb-2">
                {category} ({entries.reduce((s, e) => s + e.quantity, 0)})
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 px-2">
                {entries.map((entry) => (
                  <DeckGalleryCard
                    key={entry.card_name}
                    entry={entry}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onDelete={onDelete}
                    section="main"
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sideboard */}
      <div className="px-4 py-3 border-t border-b border-stone-800 flex items-center justify-between">
        <h3 className="text-stone-200 font-semibold text-sm tracking-wide uppercase">
          Sideboard
        </h3>
        <span
          className={`text-xs font-mono ${
            sideCount <= 15 ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {sideCount} / 15
        </span>
      </div>

      <div className="px-1 py-2">
        {sideboard.length === 0 ? (
          <p className="text-stone-600 text-xs text-center py-4 px-4">
            No sideboard cards
          </p>
        ) : view === "list" ? (
          sideboard.map((entry) => (
            <DeckEntry
              key={entry.card_name}
              entry={entry}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              section="sideboard"
            />
          ))
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 px-2">
            {sideboard.map((entry) => (
              <DeckGalleryCard
                key={entry.card_name}
                entry={entry}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                section="sideboard"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}