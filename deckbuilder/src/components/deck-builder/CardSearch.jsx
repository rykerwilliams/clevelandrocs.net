import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, Filter, X, ChevronDown, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LEGAL_SETS,
  COLOR_FILTERS,
  TYPE_FILTERS,
  buildScryfallQuery,
  isBanned,
  isRestricted,
} from "@/lib/oldSchoolData";
import CardImage from "@/components/deck-builder/CardImage";
import debounce from "lodash/debounce";

export default function CardSearch({ onAddCard }) {
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
  const scrollRef = useRef(null);

  const fetchCards = useCallback(
    async (query, page = null) => {
      setLoading(true);
      try {
        const url = page
          ? page
          : `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=cards&order=name`;

        const res = await fetch(url);
        if (!res.ok) {
          setCards(page ? (prev) => prev : []);
          setHasMore(false);
          setLoading(false);
          return;
        }
        const data = await res.json();
        const newCards = data.data || [];

        if (page) {
          setCards((prev) => [...prev, ...newCards]);
        } else {
          setCards(newCards);
          setTotalCards(data.total_cards || 0);
        }
        setHasMore(data.has_more || false);
        setNextPage(data.next_page || null);
      } catch {
        if (!page) setCards([]);
      }
      setLoading(false);
    },
    []
  );

  const debouncedSearch = useCallback(
    debounce((s, c, t, st, cm) => {
      const q = buildScryfallQuery({
        search: s,
        colors: c,
        type: t,
        set: st,
        cmc: cm,
      });
      fetchCards(q);
    }, 400),
    [fetchCards]
  );

  useEffect(() => {
    debouncedSearch(search, colors, type, set, cmc);
    return () => debouncedSearch.cancel();
  }, [search, colors, type, set, cmc, debouncedSearch]);

  const toggleColor = (val) => {
    setColors((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setColors([]);
    setType("");
    setSet("");
    setCmc("");
  };

  const hasActiveFilters = colors.length > 0 || type || set || cmc !== "";

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
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
            >
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
            <ChevronDown
              className={`w-3.5 h-3.5 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-stone-500 hover:text-stone-300 text-xs"
            >
              Clear all
            </Button>
          )}
          {!loading && totalCards > 0 && (
            <span className="text-stone-500 text-xs ml-auto">
              {totalCards} cards
            </span>
          )}
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
                    colors.includes(c.value)
                      ? "border-amber-500 ring-2 ring-amber-500/30 scale-110"
                      : "border-stone-600 hover:border-stone-400"
                  }`}
                  style={{
                    backgroundColor:
                      c.value === "C" ? "#888" : c.hex,
                    color:
                      c.value === "W" || c.value === "C"
                        ? "#333"
                        : "#fff",
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
                <SelectItem value="all" className="text-stone-300">All Types</SelectItem>
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
                <SelectItem value="all" className="text-stone-300">All Sets</SelectItem>
                {LEGAL_SETS.map((s) => (
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
                <SelectItem value="any" className="text-stone-300">Any Cost</SelectItem>
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
          <div className="text-center text-stone-500 py-16 text-sm">
            No cards found. Try a different search.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cards.map((card) => (
                <div key={card.id} className="relative group">
                  <CardImage
                    card={card}
                    size="small"
                    onClick={() => onAddCard(card)}
                  />
                  {isRestricted(card.name) && (
                    <Badge className="absolute top-1 right-1 bg-amber-600/90 text-white text-[9px] px-1 py-0">
                      R
                    </Badge>
                  )}
                  {isBanned(card.name) && (
                    <Badge className="absolute top-1 right-1 bg-red-700/90 text-white text-[9px] px-1 py-0">
                      BANNED
                    </Badge>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg pointer-events-none">
                    <p className="text-white text-[10px] font-medium leading-tight truncate">
                      {card.name}
                    </p>
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
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1" />
                  ) : null}
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}