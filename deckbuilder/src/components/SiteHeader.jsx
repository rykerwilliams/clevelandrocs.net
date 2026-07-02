import React, { useState } from "react";
import { Menu, X, Search, SunMoon } from "lucide-react";

const NAV_ITEMS = [
  { label: "about", href: "/" },
  { label: "profiles", href: "/profiles/" },
  { label: "articles", href: "/articles/" },
  { label: "deck builder", href: "/builder/" },
];

export default function SiteHeader({ active = "deck builder" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = () => {
    const ninjaKeys = document.querySelector("ninja-keys");
    const openNinjaKeys = ninjaKeys && typeof ninjaKeys.open === "function" ? ninjaKeys.open.bind(ninjaKeys) : null;
    if (openNinjaKeys) {
      openNinjaKeys();
      return;
    }
    window.location.href = "/search/";
  };

  const handleThemeToggle = () => {
    const current = localStorage.getItem("theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.setAttribute("data-theme-setting", next);
  };

  return (
    <div className="border-b border-stone-200 bg-stone-950 text-stone-700">
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

          <button type="button" className="text-stone-600 hover:text-stone-900 transition-colors" title="Search" onClick={handleSearch}>
            <span className="inline-flex items-center gap-1">
              Search
              <Search className="w-4 h-4" />
            </span>
          </button>

          <button type="button" className="text-stone-600 hover:text-stone-900 transition-colors" title="Change theme" onClick={handleThemeToggle}>
            <span className="inline-flex items-center gap-1">
              Theme
              <SunMoon className="w-4 h-4" />
            </span>
          </button>
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
          <button type="button" className="py-1 text-left text-stone-600 hover:text-stone-900" onClick={handleSearch}>
            Search
          </button>
          <button type="button" className="py-1 text-left text-stone-600 hover:text-stone-900" onClick={handleThemeToggle}>
            Change theme
          </button>
        </div>
      )}
    </div>
  );
}
