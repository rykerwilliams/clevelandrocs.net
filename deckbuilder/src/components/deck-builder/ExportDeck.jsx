import React, { useState } from "react";
import { Copy, Check, Download, Image as ImageIcon, Loader2 } from "lucide-react";
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

function getGridDimensions(cardCount, cardHeightOverWidth) {
  if (cardCount <= 0) return { columns: 1, rows: 1 };
  const columns = Math.max(1, Math.ceil(Math.sqrt(cardCount * cardHeightOverWidth)));
  const rows = Math.max(1, Math.ceil(cardCount / columns));
  return { columns, rows };
}

export default function ExportDeck({ deckName, mainDeck, sideboard, rulesetLabel }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportingImage, setExportingImage] = useState(false);
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

  const handleDownloadImage = async () => {
    const cardSlots = mainDeck.flatMap((entry) => Array.from({ length: entry.quantity }, () => entry));
    if (cardSlots.length === 0) {
      toast({ title: "No cards to export", description: "Add cards to your main deck first.", variant: "destructive" });
      return;
    }

    setExportingImage(true);
    try {
      const cardWidth = 200;
      const cardHeight = 280;
      const gap = 12;
      const padding = 20;
      const labelHeight = 48;
      const cardHeightOverWidth = cardHeight / cardWidth;

      const { columns, rows } = getGridDimensions(cardSlots.length, cardHeightOverWidth);
      const width = padding * 2 + columns * cardWidth + (columns - 1) * gap;
      const height = padding * 2 + labelHeight + rows * cardHeight + (rows - 1) * gap;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not available");

      ctx.fillStyle = "#0c0a09";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#e7e5e4";
      ctx.font = "700 26px system-ui, -apple-system, Segoe UI, sans-serif";
      ctx.fillText(deckName, padding, padding + 24);
      ctx.fillStyle = "#a8a29e";
      ctx.font = "500 16px system-ui, -apple-system, Segoe UI, sans-serif";
      ctx.fillText(`${rulesetLabel} • ${cardSlots.length} cards`, padding, padding + 44);

      const imageCache = new Map();
      const uniqueUris = [...new Set(cardSlots.map((entry) => entry.image_uri).filter(Boolean))];

      await Promise.all(
        uniqueUris.map(
          (uri) =>
            new Promise((resolve) => {
              const img = new window.Image();
              img.crossOrigin = "anonymous";
              img.onload = () => {
                imageCache.set(uri, img);
                resolve();
              };
              img.onerror = () => resolve();
              img.src = uri;
            })
        )
      );

      cardSlots.forEach((entry, index) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const x = padding + column * (cardWidth + gap);
        const y = padding + labelHeight + row * (cardHeight + gap);
        const img = imageCache.get(entry.image_uri);

        if (img) {
          ctx.drawImage(img, x, y, cardWidth, cardHeight);
        } else {
          ctx.fillStyle = "#1c1917";
          ctx.fillRect(x, y, cardWidth, cardHeight);
          ctx.fillStyle = "#a8a29e";
          ctx.font = "600 15px system-ui, -apple-system, Segoe UI, sans-serif";
          ctx.fillText(entry.card_name, x + 10, y + 26, cardWidth - 20);
        }

        if (entry.quantity > 1) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
          ctx.fillRect(x + 8, y + 8, 46, 26);
          ctx.fillStyle = "#fbbf24";
          ctx.font = "700 16px system-ui, -apple-system, Segoe UI, sans-serif";
          ctx.fillText(`x${entry.quantity}`, x + 16, y + 26);
        }
      });

      const imageUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = `${deckName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_grid.png`;
      a.click();
    } catch {
      toast({ title: "Failed to export image", variant: "destructive" });
    } finally {
      setExportingImage(false);
    }
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
            <Button
              onClick={handleDownloadImage}
              variant="outline"
              size="sm"
              disabled={exportingImage}
              className="border-stone-700 text-stone-300 hover:bg-stone-800 h-9"
            >
              {exportingImage ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <ImageIcon className="w-4 h-4 mr-1.5" />}
              Download .png
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
