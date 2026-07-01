import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

function groupByType(entries) {
  const groups = {};
  entries.forEach((entry) => {
    const typeLine = entry.type_line || "Other";
    let category = "Other";
    if (typeLine.includes("Creature")) category = "Creatures";
    else if (typeLine.includes("Instant")) category = "Instants";
    else if (typeLine.includes("Sorcery")) category = "Sorceries";
    else if (typeLine.includes("Enchantment")) category = "Enchantments";
    else if (typeLine.includes("Artifact")) category = "Artifacts";
    else if (typeLine.includes("Land")) category = "Lands";
    if (!groups[category]) groups[category] = [];
    groups[category].push(entry);
  });
  const order = ["Creatures", "Instants", "Sorceries", "Enchantments", "Artifacts", "Lands", "Other"];
  const sorted = {};
  order.forEach((cat) => {
    if (groups[cat]) sorted[cat] = groups[cat];
  });
  return sorted;
}

function formatDeckText(deckName, mainDeck, sideboard, rulesetLabel) {
  const mainCount = mainDeck.reduce((s, e) => s + e.quantity, 0);
  const sideCount = sideboard.reduce((s, e) => s + e.quantity, 0);
  let text = `// ${deckName}\n// ${rulesetLabel}\n// ${mainCount} main, ${sideCount} sideboard\n\n`;

  const mainGroups = groupByType(mainDeck);
  Object.entries(mainGroups).forEach(([category, entries]) => {
    const count = entries.reduce((s, e) => s + e.quantity, 0);
    text += `// ${category} (${count})\n`;
    entries.forEach((entry) => {
      text += `${entry.quantity} ${entry.card_name}\n`;
    });
    text += "\n";
  });

  if (sideboard.length > 0) {
    text += `// Sideboard (${sideCount})\n`;
    sideboard.forEach((entry) => {
      text += `${entry.quantity} ${entry.card_name}\n`;
    });
  }

  return text;
}

export default function ExportDeck({ deckName, mainDeck, sideboard, rulesetLabel }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const deckText = formatDeckText(deckName, mainDeck, sideboard, rulesetLabel);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deckText);
      setCopied(true);
      toast({ title: "Decklist copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([deckText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${deckName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-stone-400 hover:text-amber-400 hover:bg-stone-800 h-8 text-xs">
          <Download className="w-3.5 h-3.5 mr-1" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-stone-900 border-stone-700 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-stone-200 flex items-center gap-2">
            <Download className="w-4 h-4 text-amber-500" />
            Export Decklist
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Button onClick={handleCopy} size="sm" className="flex-1 bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold h-9">
              {copied ? <Check className="w-4 h-4 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
              {copied ? "Copied!" : "Copy to Clipboard"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm" className="border-stone-700 text-stone-300 hover:bg-stone-800 h-9">
              <Download className="w-4 h-4 mr-1.5" />
              Download .txt
            </Button>
          </div>
          <div className="relative">
            <pre className="bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-400 text-xs font-mono whitespace-pre-wrap max-h-80 overflow-y-auto">
              {deckText}
            </pre>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
