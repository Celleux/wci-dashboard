"use client";

import { create } from "zustand";

export type BetSide = "home" | "draw" | "away";

export interface BetPick {
  fixtureId: number | string;
  home: string; // TeamCode
  away: string; // TeamCode
  side: BetSide;
  label: string; // outcome label shown, e.g. "USA" | "DRAW" | "TUR"
  odds: number; // decimal odds at entry
  kickoff?: string;
  venue?: string;
  md?: string;
  group?: string;
}

type Phase = "idle" | "submitting" | "flying";

interface BetSlipState {
  open: boolean;
  pick: BetPick | null;
  stake: number;
  phase: Phase;
  setOpen: (open: boolean) => void;
  setPick: (pick: BetPick | null) => void;
  pickOutcome: (pick: BetPick) => void;
  setStake: (s: number) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

export const useBetSlip = create<BetSlipState>((set, get) => ({
  open: false,
  pick: null,
  stake: 25,
  phase: "idle",
  setOpen: (open) => set({ open }),
  setPick: (pick) => set({ pick }),
  pickOutcome: (pick) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try { navigator.vibrate([10]); } catch { /* ignore */ }
    }
    set({ pick, open: true, phase: "idle" });
  },
  setStake: (stake) => set({ stake: Math.max(0, stake) }),
  submit: async () => {
    const { pick, stake } = get();
    if (!pick || stake <= 0) return;
    set({ phase: "submitting" });
    await new Promise((r) => setTimeout(r, 700));
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try { navigator.vibrate([60, 40, 60]); } catch { /* ignore */ }
    }
    set({ phase: "flying" });
    await new Promise((r) => setTimeout(r, 600));
    set({ phase: "idle", open: false, pick: null, stake: 25 });
  },
  reset: () => set({ open: false, pick: null, stake: 25, phase: "idle" }),
}));
