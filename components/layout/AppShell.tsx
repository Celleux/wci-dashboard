import type { ReactNode } from "react";
import { TopHeader } from "./TopHeader";
import { LeftSidebar } from "./LeftSidebar";
import { PeekTentacle } from "./PeekTentacle";
import { TaxTicker } from "./TaxTicker";
import { MobileHeader } from "./mobile/MobileHeader";
import { BottomTabBar } from "./mobile/BottomTabBar";
import { BetSlip } from "@/components/betting/BetSlip";
import { WhaleBar } from "@/components/home/WhaleBar";

/**
 * AppShell — full-bleed responsive layout.
 *
 * The document itself scrolls (body scroll). The sidebar is sticky, the header
 * is sticky, and the peek tentacle is fixed to the viewport. No nested scroll
 * container — this guarantees the page scrolls all the way to the bottom.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Mobile header (< md) */}
      <div className="md:hidden sticky top-0 z-40">
        <MobileHeader />
      </div>

      {/* Desktop header (>= md) */}
      <div className="hidden md:block sticky top-0 z-40">
        <TopHeader />
      </div>

      {/* Tax ticker + whale feed — sticky under the header on desktop */}
      <div className="sticky top-[88px] z-30 hidden md:block">
        <TaxTicker />
        <WhaleBar />
      </div>
      <div className="md:hidden">
        <TaxTicker />
        <WhaleBar />
      </div>

      {/* Body: sticky sidebar + naturally-scrolling main */}
      <div className="flex w-full">
        <aside className="hidden md:block sticky top-[156px] self-start h-[calc(100vh-156px)] z-20">
          <LeftSidebar />
        </aside>

        <main
          role="main"
          id="main"
          className="flex-1 min-w-0 px-4 pt-4 pb-[calc(88px+var(--sa-bottom))] md:px-8 md:pt-6 md:pb-16 md:pr-[112px] xl:pr-[128px]"
        >
          {children}
        </main>
      </div>

      {/* Desktop peek tentacle — fixed to right edge */}
      <PeekTentacle />

      {/* Mobile bottom tab bar */}
      <div className="md:hidden">
        <BottomTabBar />
      </div>

      {/* Global BetSlip drawer */}
      <BetSlip />
    </>
  );
}
