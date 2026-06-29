import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLOR_MAP = {
  W: { label: "White", hex: "#F9FAF4", border: "#E8E4D4" },
  U: { label: "Blue", hex: "#0E68AB", border: "#0E68AB" },
  B: { label: "Black", hex: "#2D2D2D", border: "#555" },
  R: { label: "Red", hex: "#D3202A", border: "#D3202A" },
  G: { label: "Green", hex: "#00733E", border: "#00733E" },
  C: { label: "Colorless", hex: "#888", border: "#888" },
};

export default function DeckStats({ mainDeck }) {
  // Mana curve
  const curveData = {};
  const colorData = {};

  mainDeck.forEach((entry) => {
    const manaCost = entry.mana_cost || "";
    // Parse CMC from mana_cost string
    let cmc = 0;
    const matches = manaCost.match(/\{([^}]+)\}/g) || [];
    matches.forEach((m) => {
      const val = m.replace(/[{}]/g, "");
      const num = parseInt(val);
      if (!isNaN(num)) cmc += num;
      else if (val !== "X") cmc += 1;
    });

    // Don't count lands in mana curve
    if (!(entry.type_line || "").includes("Land")) {
      const bucket = cmc >= 7 ? "7+" : String(cmc);
      curveData[bucket] = (curveData[bucket] || 0) + entry.quantity;
    }

    // Color distribution
    const colors = entry.colors || [];
    if (colors.length === 0 && !(entry.type_line || "").includes("Land")) {
      colorData["C"] = (colorData["C"] || 0) + entry.quantity;
    }
    colors.forEach((c) => {
      colorData[c] = (colorData[c] || 0) + entry.quantity;
    });
  });

  const curveChart = ["0", "1", "2", "3", "4", "5", "6", "7+"].map((key) => ({
    cmc: key,
    count: curveData[key] || 0,
  }));

  const colorEntries = Object.entries(colorData)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({
      key,
      ...COLOR_MAP[key],
      count,
    }));

  const totalNonLand = mainDeck
    .filter((e) => !(e.type_line || "").includes("Land"))
    .reduce((s, e) => s + e.quantity, 0);

  if (mainDeck.length === 0) {
    return (
      <div className="p-6 text-center text-stone-600 text-sm">
        Add cards to see deck statistics
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Mana Curve */}
      <div>
        <h4 className="text-stone-400 text-xs uppercase tracking-widest font-semibold mb-3">
          Mana Curve
        </h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={curveChart} barCategoryGap="20%">
              <XAxis
                dataKey="cmc"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#78716c", fontSize: 11 }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#1c1917",
                  border: "1px solid #44403c",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#d6d3d1",
                }}
                cursor={{ fill: "rgba(217, 119, 6, 0.1)" }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {curveChart.map((entry, i) => (
                  <Cell key={i} fill={entry.count > 0 ? "#d97706" : "#44403c"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Color Distribution */}
      <div>
        <h4 className="text-stone-400 text-xs uppercase tracking-widest font-semibold mb-3">
          Color Distribution
        </h4>
        <div className="space-y-2">
          {colorEntries.map((entry) => (
            <div key={entry.key} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border"
                style={{
                  backgroundColor: entry.hex,
                  borderColor: entry.border,
                }}
              />
              <span className="text-stone-400 text-xs w-16">{entry.label}</span>
              <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${totalNonLand > 0 ? (entry.count / totalNonLand) * 100 : 0}%`,
                    backgroundColor: entry.border,
                  }}
                />
              </div>
              <span className="text-stone-500 text-xs font-mono w-6 text-right">
                {entry.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Type Breakdown */}
      <div>
        <h4 className="text-stone-400 text-xs uppercase tracking-widest font-semibold mb-3">
          Card Types
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {["Creature", "Instant", "Sorcery", "Enchantment", "Artifact", "Land"].map(
            (type) => {
              const count = mainDeck
                .filter((e) => (e.type_line || "").includes(type))
                .reduce((s, e) => s + e.quantity, 0);
              return (
                <div
                  key={type}
                  className="bg-stone-800/50 rounded-lg px-3 py-2 flex justify-between items-center"
                >
                  <span className="text-stone-400 text-xs">{type}s</span>
                  <span className="text-amber-400 font-mono text-xs">{count}</span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}