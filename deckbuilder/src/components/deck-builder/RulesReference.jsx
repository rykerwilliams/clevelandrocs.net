import React from "react";
import { BANNED_CARDS, RESTRICTED_CARDS, LEGAL_SETS } from "@/lib/oldSchoolData";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RulesReference() {
  return (
    <ScrollArea className="h-full">
      <div className="p-5 space-y-6 text-sm">
        {/* Format Overview */}
        <div>
          <h3 className="text-amber-400 font-semibold text-base mb-2 font-heading">
            93/94 Old School Format
          </h3>
          <p className="text-stone-400 text-xs leading-relaxed">
            Old School 93-94 is a throwback format using only cards printed in
            Magic's first two years (1993–1994). Rules per Eternal Central.
          </p>
        </div>

        {/* Deck Construction */}
        <div>
          <h4 className="text-stone-200 font-semibold text-sm mb-2 uppercase tracking-wider">
            Deck Construction
          </h4>
          <ul className="text-stone-400 text-xs space-y-1.5 list-disc list-inside">
            <li>Minimum 60 cards in main deck</li>
            <li>Sideboard up to 15 cards</li>
            <li>Maximum 4 copies of any card (combined main + sideboard)</li>
            <li>Basic lands (Plains, Island, Swamp, Mountain, Forest) unlimited</li>
            <li>Restricted cards: maximum 1 copy</li>
            <li>Mana burn is in effect</li>
          </ul>
        </div>

        {/* Legal Sets */}
        <div>
          <h4 className="text-stone-200 font-semibold text-sm mb-2 uppercase tracking-wider">
            Legal Sets
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {LEGAL_SETS.map((s) => (
              <Badge
                key={s.code}
                variant="outline"
                className="border-stone-600 text-stone-400 text-[10px]"
              >
                {s.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Banned Cards */}
        <div>
          <h4 className="text-red-400 font-semibold text-sm mb-2 uppercase tracking-wider">
            Banned Cards
          </h4>
          <div className="space-y-1">
            {BANNED_CARDS.map((card) => (
              <div
                key={card}
                className="text-stone-400 text-xs px-2 py-1 bg-red-950/30 rounded border border-red-900/30"
              >
                {card}
              </div>
            ))}
          </div>
        </div>

        {/* Restricted Cards */}
        <div>
          <h4 className="text-amber-400 font-semibold text-sm mb-2 uppercase tracking-wider">
            Restricted Cards (max 1)
          </h4>
          <div className="space-y-1">
            {RESTRICTED_CARDS.map((card) => (
              <div
                key={card}
                className="text-stone-400 text-xs px-2 py-1 bg-amber-950/20 rounded border border-amber-900/20"
              >
                {card}
              </div>
            ))}
          </div>
        </div>

        {/* Notable Rules */}
        <div>
          <h4 className="text-stone-200 font-semibold text-sm mb-2 uppercase tracking-wider">
            Notable Rules
          </h4>
          <ul className="text-stone-400 text-xs space-y-1.5 list-disc list-inside">
            <li>Mana burn is in effect</li>
            <li>London Mulligan rule</li>
            <li>Chaos Orb uses EC flip rules</li>
            <li>No intentional draws in EC tournaments</li>
          </ul>
        </div>

        <div className="text-stone-600 text-[10px] pt-2 border-t border-stone-800">
          Rules per{" "}
          <a
            href="https://www.eternalcentral.com/9394rules/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-500 underline"
          >
            Eternal Central
          </a>
        </div>
      </div>
    </ScrollArea>
  );
}