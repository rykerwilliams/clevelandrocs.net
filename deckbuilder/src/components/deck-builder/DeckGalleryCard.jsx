import React, { useState } from "react";
import { Minus, Plus, X, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { isRestricted, isBasicLand, getMaxCopies } from "@/lib/oldSchoolData";

export default function DeckGalleryCard({ entry, onAdd, onRemove, onDelete, section }) {
  const [imgError, setImgError] = useState(false);
  const restricted = isRestricted(entry.card_name);
  const maxCopies = getMaxCopies(entry.card_name);
  const overLimit = !isBasicLand(entry.card_name) && entry.quantity > maxCopies;

  return (
    <div className="relative group">
      <div className={`relative rounded-lg overflow-hidden ${overLimit ? "ring-2 ring-red-500" : ""}`}>
        {imgError || !entry.image_uri ? (
          <div className="aspect-[5/7] bg-stone-800 flex items-center justify-center p-3 text-center">
            <span className="text-stone-400 text-xs font-medium">{entry.card_name}</span>
          </div>
        ) : (
          <img
            src={entry.image_uri}
            alt={entry.card_name}
            className="w-full aspect-[5/7] object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {/* Quantity badge */}
        <div className="absolute top-1.5 left-1.5 bg-stone-950/90 text-amber-400 text-xs font-mono font-bold px-1.5 py-0.5 rounded">
          {entry.quantity}×
        </div>

        {/* Restricted badge */}
        {restricted && (
          <Badge className="absolute top-1.5 right-1.5 bg-amber-600/90 text-white text-[9px] px-1 py-0">
            R
          </Badge>
        )}

        {/* Hover controls */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 pt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
          <button
            onClick={() => onRemove(entry, section)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-stone-800/90 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onAdd(entry, section)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-600/90 hover:bg-amber-500 text-stone-950 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(entry, section)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-stone-800/90 hover:bg-red-700 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Over-limit indicator */}
        {overLimit && (
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-red-700/90 text-white text-[9px] px-1.5 py-0.5 rounded">
            <AlertTriangle className="w-2.5 h-2.5" />
            Limit
          </div>
        )}
      </div>
    </div>
  );
}