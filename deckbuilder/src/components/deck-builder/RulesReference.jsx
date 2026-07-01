import React from "react";
import { getRuleset } from "@/lib/oldSchoolData";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RulesReference({ rulesetId }) {
  const ruleset = getRuleset(rulesetId);
  const hasRarityCaps = Boolean(ruleset.rarityCaps);

  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-6 text-sm">
        {/* Format Overview */}
        <div>
          <h3 className="text-amber-400 font-semibold text-base mb-2 font-heading">{ruleset.label}</h3>
          <p className="text-stone-400 text-xs leading-relaxed">{ruleset.description}</p>
        </div>

        {/* Deck Construction */}
        <div>
          <h4 className="text-stone-200 font-semibold text-sm mb-2 uppercase tracking-wider">Deck Construction</h4>
          <ul className="text-stone-400 text-xs space-y-1.5 list-disc list-inside">
            {ruleset.maxMainDeckSize ? (
              <li>Exactly {ruleset.maxMainDeckSize} cards in main deck</li>
            ) : (
              <li>Minimum {ruleset.minMainDeckSize} cards in main deck</li>
            )}
            <li>Sideboard up to {ruleset.maxSideboardSize} cards</li>
            <li>Maximum {ruleset.defaultMaxCopies} copies of any card (combined main + sideboard)</li>
            <li>Basic lands (Plains, Island, Swamp, Mountain, Forest) unlimited</li>
            {ruleset.restrictedCards.length > 0 ? <li>Restricted cards: maximum 1 copy</li> : null}
            {hasRarityCaps ? (
              <li>
                Rares max {ruleset.rarityCaps.rare}, uncommons max {ruleset.rarityCaps.uncommon}
              </li>
            ) : null}
          </ul>
        </div>

        {/* Legal Sets */}
        <div>
          <h4 className="text-stone-200 font-semibold text-sm mb-2 uppercase tracking-wider">Legal Sets</h4>
          <div className="flex flex-wrap gap-1.5">
            {ruleset.legalSets.map((s) => (
              <Badge key={s.code} variant="outline" className="border-stone-600 text-stone-400 text-[10px]">
                {s.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Banned Cards */}
        {ruleset.bannedCards.length > 0 ? (
          <div>
            <h4 className="text-red-400 font-semibold text-sm mb-2 uppercase tracking-wider">Banned Cards</h4>
            <div className="space-y-1">
              {ruleset.bannedCards.map((card) => (
                <div key={card} className="text-stone-400 text-xs px-2 py-1 bg-red-950/30 rounded border border-red-900/30">
                  {card}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Restricted Cards */}
        {ruleset.restrictedCards.length > 0 ? (
          <div>
            <h4 className="text-amber-400 font-semibold text-sm mb-2 uppercase tracking-wider">Restricted Cards (max 1)</h4>
            <div className="space-y-1">
              {ruleset.restrictedCards.map((card) => (
                <div key={card} className="text-stone-400 text-xs px-2 py-1 bg-amber-950/20 rounded border border-amber-900/20">
                  {card}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Notable Rules */}
        <div>
          <h4 className="text-stone-200 font-semibold text-sm mb-2 uppercase tracking-wider">Notable Rules</h4>
          <ul className="text-stone-400 text-xs space-y-1.5 list-disc list-inside">
            {ruleset.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div className="text-stone-600 text-[10px] pt-2 border-t border-stone-800">
          Rules per{" "}
          <a href={ruleset.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-500 underline">
            {ruleset.sourceLabel}
          </a>
        </div>
      </div>
    </ScrollArea>
  );
}
