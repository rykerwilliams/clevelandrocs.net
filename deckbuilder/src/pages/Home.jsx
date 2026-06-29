import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, BookOpen, Layers, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-200">
      <SiteHeader active="Deck Builder" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-stone-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/20 border border-amber-800/30 text-amber-400 text-xs font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            Eternal Central Rules
          </div>

          <h1 className="text-5xl sm:text-7xl font-heading font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-amber-100 to-amber-400 pb-2">
            Old School
            <br />
            93/94
          </h1>

          <p className="mt-6 text-stone-400 text-lg max-w-xl mx-auto leading-relaxed">
            Build decks using only cards from Magic's first two years. Alpha through Fallen Empires — the way the game was meant to be played.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link to="/build">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold px-8 h-12 text-base">
                Build a Deck
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Layers,
              title: "Full Card Library",
              desc: "Browse every card from Alpha, Beta, Unlimited, Arabian Nights, Antiquities, Revised, Legends, The Dark, and Fallen Empires.",
            },
            {
              icon: Shield,
              title: "Rules Enforced",
              desc: "Automatic enforcement of Eternal Central's banned & restricted list, 4-of limit, and deck size requirements.",
            },
            {
              icon: BookOpen,
              title: "Deck Analytics",
              desc: "Visualize your mana curve, color distribution, and card type breakdown as you build.",
            },
          ].map((f) => (
            <div key={f.title} className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 hover:border-amber-900/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-900/20 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-stone-200 font-semibold mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Sets */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-heading font-bold text-stone-200 mb-2">Legal Sets</h2>
          <p className="text-stone-500 text-sm">Cards from these 1993–1994 printings are legal</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "Alpha",
            "Beta",
            "Unlimited",
            "Collector's Edition",
            "Int'l Collector's Edition",
            "Arabian Nights",
            "Antiquities",
            "Revised",
            "Legends",
            "The Dark",
            "Fallen Empires",
          ].map((name) => (
            <div key={name} className="px-4 py-2 rounded-lg bg-stone-900/50 border border-stone-800 text-stone-400 text-sm">
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-800 py-8 text-center">
        <p className="text-stone-600 text-xs">
          Rules per{" "}
          <a
            href="https://www.eternalcentral.com/9394rules/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-500"
          >
            Eternal Central
          </a>{" "}
          · Card data from Scryfall
        </p>
      </footer>
    </div>
  );
}
