import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function FormatChecklist({ ruleset, checks }) {
  const failingChecks = checks.filter((check) => !check.passed);

  return (
    <div className="p-4 border-b border-stone-800 bg-stone-950/50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-stone-300 text-xs uppercase tracking-widest font-semibold">Format Checklist</h4>
        <span className={`text-[10px] font-mono ${failingChecks.length === 0 ? "text-emerald-400" : "text-amber-400"}`}>
          {failingChecks.length === 0 ? "LEGAL" : `${failingChecks.length} issue${failingChecks.length === 1 ? "" : "s"}`}
        </span>
      </div>

      <div className="space-y-2.5">
        {checks.map((check) => (
          <div key={check.key} className="flex items-start gap-2.5">
            {check.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            )}
            <div className="min-w-0">
              <p className={`text-xs ${check.passed ? "text-stone-300" : "text-amber-300"}`}>{check.label}</p>
              {check.detail ? <p className="text-[11px] text-stone-500 leading-snug mt-0.5">{check.detail}</p> : null}
            </div>
          </div>
        ))}
      </div>

      {failingChecks.length === 0 ? <p className="text-[11px] text-emerald-400 mt-3">Deck is legal for {ruleset.shortLabel}.</p> : null}
    </div>
  );
}
