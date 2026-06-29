import React, { useState } from "react";

export default function CardImage({ card, size = "normal", onClick, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageUri =
    card.image_uris?.normal ||
    card.image_uris?.small ||
    card.image_uri ||
    "";

  const smallUri =
    size === "small"
      ? card.image_uris?.small || card.image_uri || imageUri
      : imageUri;

  return (
    <div
      className={`relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105 hover:z-10 ${className}`}
      onClick={onClick}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-800/30 animate-pulse rounded-lg" />
      )}
      {error ? (
        <div className="flex items-center justify-center bg-stone-800 text-stone-400 text-xs p-4 rounded-lg aspect-[5/7]">
          {card.name}
        </div>
      ) : (
        <img
          src={smallUri}
          alt={card.name}
          className={`w-full rounded-lg transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}