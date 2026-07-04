import React, { useState } from "react";
import { ExternalLink, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PHASE_URL = "https://phase-rs.dev";

function buildPhaseImportText(mainDeck = [], sideboard = []) {
  const lines = ["Deck"];

  mainDeck.forEach((entry) => {
    if (!entry?.card_name || !entry?.quantity) return;
    lines.push(`${entry.quantity} ${entry.card_name}`);
  });

  if (sideboard.length > 0) {
    lines.push("", "Sideboard");
    sideboard.forEach((entry) => {
      if (!entry?.card_name || !entry?.quantity) return;
      lines.push(`${entry.quantity} ${entry.card_name}`);
    });
  }

  return lines.join("\n");
}

export default function TestInPhase({ mainDeck = [], sideboard = [] }) {
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const { toast } = useToast();

  const mainCount = mainDeck.reduce((sum, entry) => sum + (entry.quantity || 0), 0);

  const copyDeckToClipboard = async () => {
    const deckText = buildPhaseImportText(mainDeck, sideboard);
    await navigator.clipboard.writeText(deckText);
  };

  const handleOpenPhase = async () => {
    if (mainCount === 0) {
      toast({
        title: "Deck is empty",
        description: "Add cards before testing in Phase.",
        variant: "destructive",
      });
      return;
    }

    try {
      await copyDeckToClipboard();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Deck copied for Phase",
        description: "Phase opened in a new tab. Use Import and paste your decklist.",
      });
    } catch {
      toast({
        title: "Could not copy decklist",
        description: "Phase opened in a new tab. Export manually if paste is unavailable.",
      });
    }

    window.open(PHASE_URL, "_blank", "noopener,noreferrer");
    setShowHelp(true);
  };

  const handleCopyAgain = async () => {
    try {
      await copyDeckToClipboard();
      toast({ title: "Deck copied", description: "Paste it into Phase import." });
    } catch {
      toast({ title: "Could not copy decklist", variant: "destructive" });
    }
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleOpenPhase} className="text-stone-400 hover:text-emerald-400 hover:bg-stone-800 h-8 text-xs">
        {copied ? <Check className="w-3.5 h-3.5 mr-1" /> : <ExternalLink className="w-3.5 h-3.5 mr-1" />}
        {copied ? "Copied" : "Test in Phase"}
      </Button>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="bg-stone-900 border-stone-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-stone-200">Test In Phase</DialogTitle>
          </DialogHeader>

          <div className="space-y-3 text-sm text-stone-300">
            <p>Your decklist is ready for import.</p>
            <ol className="list-decimal list-inside space-y-1 text-stone-400 text-xs">
              <li>Open Phase deck builder/import.</li>
              <li>Choose paste-text import.</li>
              <li>Paste and start your test game.</li>
            </ol>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleCopyAgain} size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-stone-950">
                <Copy className="w-4 h-4 mr-1.5" />
                Copy Again
              </Button>
              <Button asChild variant="outline" size="sm" className="border-stone-700 text-stone-300 hover:bg-stone-800">
                <a href={PHASE_URL} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                  Open Phase
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
