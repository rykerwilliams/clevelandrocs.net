import React, { useState } from "react";
import { Minus, Plus, X, AlertTriangle, LayoutGrid, List as ListIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { isRestricted, isBasicLand, getMaxCopies, getRuleset } from "@/lib/oldSchoolData";
import DeckGalleryCard from "@/components/deck-builder/DeckGalleryCard";

function DeckEntry({ entry, onAdd, onRemove, onDelete, section, onNameHoverStart, onNameHoverMove, onNameHoverEnd, rulesetId }) {
  const restricted = isRestricted(entry.card_name, rulesetId);
  const maxCopies = getMaxCopies(entry.card_name, rulesetId);
  const overLimit = !isBasicLand(entry.card_name) && entry.quantity > maxCopies;

  return (
    <div
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-stone-800/60 transition-colors ${overLimit ? "bg-red-900/20" : ""}`}
    >
      <span className="text-amber-400 font-mono text-xs w-5 text-right shrink-0">{entry.quantity}×</span>
      <span
        className="text-stone-200 text-sm truncate flex-1"
        onMouseEnter={(e) => onNameHoverStart(entry, e)}
        onMouseMove={onNameHoverMove}
        onMouseLeave={onNameHoverEnd}
      >
        {entry.card_name}
      </span>
      {restricted && (
        <Badge variant="outline" className="border-amber-600 text-amber-500 text-[9px] px-1 py-0 shrink-0">
          R
        </Badge>
      )}
      {overLimit && <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
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

export default function DeckList({ mainDeck, sideboard, onAdd, onRemove, onDelete, rulesetId }) {
  const [view, setView] = useState("list");
  const [hoverPreview, setHoverPreview] = useState(null);
  const ruleset = getRuleset(rulesetId);

  const getPreviewPosition = (clientX, clientY) => {
    const previewWidth = 240;
    const previewHeight = 336;
    const margin = 12;
    const x = Math.min(clientX + 18, window.innerWidth - previewWidth - margin);
    const y = Math.max(margin, Math.min(clientY - previewHeight / 2, window.innerHeight - previewHeight - margin));
    return { x, y };
  };

  const handleNameHoverStart = (entry, event) => {
    if (!entry.image_uri) return;
    const { x, y } = getPreviewPosition(event.clientX, event.clientY);
    setHoverPreview({
      imageUri: entry.image_uri,
      cardName: entry.card_name,
      x,
      y,
    });
  };

  const handleNameHoverMove = (event) => {
    setHoverPreview((prev) => {
      if (!prev) return prev;
      const { x, y } = getPreviewPosition(event.clientX, event.clientY);
      return { ...prev, x, y };
    });
  };

  const handleNameHoverEnd = () => {
    setHoverPreview(null);
  };

  const mainCount = mainDeck.reduce((s, e) => s + e.quantity, 0);
  const sideCount = sideboard.reduce((s, e) => s + e.quantity, 0);
  const mainTarget = ruleset.maxMainDeckSize || ruleset.minMainDeckSize;
  const mainGroups = groupByType(mainDeck);
  const sideGroups = groupByType(sideboard);

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Main Deck Header */}
      <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between">
        <h3 className="text-stone-200 font-semibold text-sm tracking-wide uppercase">Main Deck</h3>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center gap-0.5 bg-stone-900 rounded-md p-0.5 border border-stone-800">
            <button
              onClick={() => setView("list")}
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                view === "list" ? "bg-stone-700 text-amber-400" : "text-stone-500 hover:text-stone-300"
              }`}
              title="List view"
            >
              <ListIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView("gallery")}
              className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                view === "gallery" ? "bg-stone-700 text-amber-400" : "text-stone-500 hover:text-stone-300"
              }`}
              title="Gallery view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
          <span
            className={`text-xs font-mono ${
              mainCount >= ruleset.minMainDeckSize && (ruleset.maxMainDeckSize == null || mainCount <= ruleset.maxMainDeckSize)
                ? "text-emerald-400"
                : "text-amber-400"
            }`}
          >
            {mainCount} / {mainTarget}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-2">
        {mainDeck.length === 0 ? (
          <p className="text-stone-600 text-xs text-center py-8 px-4">Click cards from the browser to add them to your deck</p>
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
                  onNameHoverStart={handleNameHoverStart}
                  onNameHoverMove={handleNameHoverMove}
                  onNameHoverEnd={handleNameHoverEnd}
                  rulesetId={rulesetId}
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
                    rulesetId={rulesetId}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sideboard */}
      <div className="px-4 py-3 border-t border-b border-stone-800 flex items-center justify-between">
        <h3 className="text-stone-200 font-semibold text-sm tracking-wide uppercase">Sideboard</h3>
        <span className={`text-xs font-mono ${sideCount <= ruleset.maxSideboardSize ? "text-emerald-400" : "text-red-400"}`}>
          {sideCount} / {ruleset.maxSideboardSize}
        </span>
      </div>

      <div className="px-1 py-2">
        {sideboard.length === 0 ? (
          <p className="text-stone-600 text-xs text-center py-4 px-4">No sideboard cards</p>
        ) : view === "list" ? (
          sideboard.map((entry) => (
            <DeckEntry
              key={entry.card_name}
              entry={entry}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              section="sideboard"
              onNameHoverStart={handleNameHoverStart}
              onNameHoverMove={handleNameHoverMove}
              onNameHoverEnd={handleNameHoverEnd}
              rulesetId={rulesetId}
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
                rulesetId={rulesetId}
              />
            ))}
          </div>
        )}
      </div>

      {hoverPreview && (
        <div
          className="fixed z-50 pointer-events-none rounded-xl border border-stone-700/80 bg-stone-900/95 p-1 shadow-2xl"
          style={{ left: `${hoverPreview.x}px`, top: `${hoverPreview.y}px`, width: "240px" }}
          aria-hidden="true"
        >
          <img src={hoverPreview.imageUri} alt={hoverPreview.cardName} className="w-full rounded-lg" loading="lazy" />
        </div>
      )}
    </div>
  );
}
