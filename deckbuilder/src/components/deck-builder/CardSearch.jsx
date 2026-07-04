import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, Filter, X, ChevronDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COLOR_FILTERS, TYPE_FILTERS, buildScryfallQuery, isRestricted, getLegalSets, isCardLegal } from "@/lib/oldSchoolData";
import CardImage from "@/components/deck-builder/CardImage";
import debounce from "lodash/debounce";

const POWER_NINE = ["Ancestral Recall", "Time Walk", "Timetwister", "Black Lotus", "Mox Sapphire", "Mox Pearl", "Mox Jet", "Mox Emerald", "Mox Ruby"];

export default function CardSearch({ onAddCard, rulesetId }) {
  const [search, setSearch] = useState("");
  const [colors, setColors] = useState([]);
  const [type, setType] = useState("");
  const [set, setSet] = useState("");
  const [cmc, setCmc] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [totalCards, setTotalCards] = useState(0);
  const [hoverPreview, setHoverPreview] = useState(null);
  const scrollRef = useRef(null);
  const legalSets = getLegalSets(rulesetId);

  const filterLegalCards = useCallback(
    (list) =>
      list.filter((card) => {
        const cardName = card.name || card.card_name || "";
        const setCode = (card.set || card.set_code || "").toLowerCase();
        return isCardLegal({ cardName, setCode }, rulesetId);
      }),
    [rulesetId]
  );

  const getPreviewPosition = (clientX, clientY) => {
    const previewWidth = 260;
    const previewHeight = 364;
    const margin = 12;
    const x = Math.min(clientX + 20, window.innerWidth - previewWidth - margin);
    const y = Math.max(margin, Math.min(clientY - previewHeight / 2, window.innerHeight - previewHeight - margin));
    return { x, y };
  };

  const handleCardHoverStart = (card, event) => {
    const imageUri = card.image_uris?.normal || card.image_uris?.small || card.image_uri || "";
    if (!imageUri) return;
    const { x, y } = getPreviewPosition(event.clientX, event.clientY);
    setHoverPreview({
      imageUri,
      cardName: card.name,
      x,
      y,
    });
  };

  const handleCardHoverMove = (event) => {
    setHoverPreview((prev) => {
      if (!prev) return prev;
      const { x, y } = getPreviewPosition(event.clientX, event.clientY);
      return { ...prev, x, y };
    });
  };

  const handleCardHoverEnd = () => {
    setHoverPreview(null);
  };

  const fetchCards = useCallback(
    async (query, page = null) => {
      setLoading(true);
      try {
        const url = page ? page : `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards&order=name`;

        const res = await fetch(url);
        if (!res.ok) {
          setCards(page ? (prev) => prev : []);
          setHasMore(false);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const newCards = filterLegalCards(data.data || []);

        if (page) {
          setCards((prev) => [...prev, ...newCards]);
        } else {
          setCards(newCards);
          setTotalCards(newCards.length);
        }
        setHasMore(data.has_more || false);
        setNextPage(data.next_page || null);
      } catch {
        if (!page) setCards([]);
      }
      setLoading(false);
    },
    [filterLegalCards]
  );

  const debouncedSearch = useCallback(
    debounce((s, c, t, st, cm) => {
      const q = buildScryfallQuery({
        search: s,
        colors: c,
        type: t,
        set: st,
        cmc: cm,
        rulesetId,
      });
      fetchCards(q);
    }, 400),
    [fetchCards, rulesetId]
  );

  useEffect(() => {
    debouncedSearch(search, colors, type, set, cmc);
    return () => debouncedSearch.cancel();
  }, [search, colors, type, set, cmc, debouncedSearch]);

  useEffect(() => {
    setSet("");
  }, [rulesetId]);

  const toggleColor = (val) => {
    setColors((prev) => (prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]));
  };

  const clearFilters = () => {
    setSearch("");
    setColors([]);
    setType("");
    setSet("");
    setCmc("");
  };

  const hasActiveFilters = colors.length > 0 || type || set || cmc !== "";

  const handleAddPowerNine = () => {
    POWER_NINE.forEach((name) => {
      onAddCard({
        name,
        set: "lea",
        set_code: "lea",
      });
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-stone-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cards..."
            className="pl-10 bg-stone-900 border-stone-700 text-stone-200 placeholder:text-stone-500 focus-visible:ring-amber-600/50"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="text-stone-400 hover:text-amber-400 hover:bg-stone-800 text-xs"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" />
            Filters
            <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleAddPowerNine} className="text-stone-400 hover:text-amber-400 hover:bg-stone-800 text-xs">
            Add Power 9
          </Button>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-stone-500 hover:text-stone-300 text-xs">
              Clear all
            </Button>
          )}
          {!loading && totalCards > 0 && <span className="text-stone-500 text-xs ml-auto">{totalCards} cards</span>}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-3 pt-1">
            {/* Color filters */}
            <div className="flex flex-wrap gap-1.5">
              {COLOR_FILTERS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => toggleColor(c.value)}
                  className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center text-xs font-bold ${
                    colors.includes(c.value) ? "border-amber-500 ring-2 ring-amber-500/30 scale-110" : "border-stone-600 hover:border-stone-400"
                  }`}
                  style={{
                    backgroundColor: c.value === "C" ? "#888" : c.hex,
                    color: c.value === "W" || c.value === "C" ? "#333" : "#fff",
                  }}
                  title={c.label}
                >
                  {c.value}
                </button>
              ))}
            </div>

            {/* Type filter */}
            <Select value={type} onValueChange={(v) => setType(v === "all" ? "" : v)}>
              <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-300 h-8 text-xs">
                <SelectValue placeholder="Card Type" />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-stone-700">
                <SelectItem value="all" className="text-stone-300">
                  All Types
                </SelectItem>
                {TYPE_FILTERS.map((t) => (
                  <SelectItem key={t} value={t.toLowerCase()} className="text-stone-300">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Set filter */}
            <Select value={set} onValueChange={(v) => setSet(v === "all" ? "" : v)}>
              <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-300 h-8 text-xs">
                <SelectValue placeholder="Set" />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-stone-700">
                <SelectItem value="all" className="text-stone-300">
                  All Sets
                </SelectItem>
                {legalSets.map((s) => (
                  <SelectItem key={s.code} value={s.code} className="text-stone-300">
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* CMC filter */}
            <Select value={cmc} onValueChange={(v) => setCmc(v === "any" ? "" : v)}>
              <SelectTrigger className="bg-stone-900 border-stone-700 text-stone-300 h-8 text-xs">
                <SelectValue placeholder="Mana Cost" />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-stone-700">
                <SelectItem value="any" className="text-stone-300">
                  Any Cost
                </SelectItem>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <SelectItem key={n} value={String(n)} className="text-stone-300">
                    {n === 7 ? "7+" : String(n)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Card Grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3">
        {loading && cards.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center text-stone-500 py-16 text-sm">No cards found. Try a different search.</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="relative group isolate"
                  onMouseEnter={(e) => handleCardHoverStart(card, e)}
                  onMouseMove={handleCardHoverMove}
                  onMouseLeave={handleCardHoverEnd}
                >
                  <CardImage card={card} size="small" onClick={() => onAddCard(card)} />
                  {isRestricted(card.name, rulesetId) && (
                    <Badge className="absolute top-1 right-1 bg-amber-600/90 text-white text-[9px] px-1 py-0">R</Badge>
                  )}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg pointer-events-none">
                    <p className="text-white text-[10px] font-medium leading-tight truncate">{card.name}</p>
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fetchCards(null, nextPage)}
                  disabled={loading}
                  className="text-amber-500 hover:text-amber-400 hover:bg-stone-800 text-xs"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {hoverPreview && (
        <div
          className="fixed z-50 pointer-events-none rounded-xl border border-stone-700/80 bg-stone-900/95 p-1 shadow-2xl"
          style={{ left: `${hoverPreview.x}px`, top: `${hoverPreview.y}px`, width: "260px" }}
          aria-hidden="true"
        >
          <img src={hoverPreview.imageUri} alt={hoverPreview.cardName} className="w-full rounded-lg" loading="lazy" />
        </div>
      )}
    </div>
  );
}
