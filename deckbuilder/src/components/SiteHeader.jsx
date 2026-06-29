import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "about", href: "/" },
  { label: "profiles", href: "/profiles/" },
  { label: "articles", href: "/articles/" },
  { label: "Deck Builder", href: "/builder/" },
];

export default function SiteHeader({ active = "Deck Builder" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="border-b border-stone-200 bg-white text-stone-700">
      <div className="max-w-6xl mx-auto h-12 px-4 flex items-center gap-4">
        <a href="/" className="text-sm sm:text-base font-light tracking-tight text-stone-900">
          clevelandrocs.net
        </a>

        <div className="ml-auto hidden sm:flex items-center gap-4 text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === active;
            return (
              <a key={item.label} href={item.href} className={isActive ? "text-stone-900 font-semibold" : "hover:text-stone-900 transition-colors"}>
                {item.label}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          className="ml-auto sm:hidden text-stone-600 hover:text-stone-900"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-stone-200 px-4 py-2 flex flex-col gap-1 text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === active;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`py-1 ${isActive ? "text-stone-900 font-semibold" : "text-stone-600 hover:text-stone-900"}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
