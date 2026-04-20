import type { ReactNode } from "react";
import { TopHeader } from "./TopHeader";
import { LeftSidebar } from "./LeftSidebar";
import { PeekTentacle } from "./PeekTentacle";
import { TaxTicker } from "./TaxTicker";
import { MobileHeader } from "./mobile/MobileHeader";
import { BottomTabBar } from "./mobile/BottomTabBar";

/**
 * AppShell — responsive full-bleed layout.
 *
 * Mobile (< md): MobileHeader + content + BottomTabBar, safe-area aware.
 * Desktop (>= md): TopHeader + LeftSidebar(260) + content + peek tentacle.
 *
 * Content is FULL-BLEED — no max-width wrapper. The PeekTentacle hangs from
 * the right edge so the glowing ring sticks out without a visible scroll gap.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Mobile header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>
      {/* Desktop header */}
      <div className="hidden md:block">
        <TopHeader />
      </div>

      {/* Tax ticker */}
      <TaxTicker />

      <div className="relative flex flex-1 min-h-0">
        {/* Desktop sidebar */}
        <div className="hidden md:flex">
          <LeftSidebar />
        </div>

        {/* Main content fills the rest of the viewport. No max-width. */}
        <main
          role="main"
          id="main"
          className="main-scroll relative flex-1 min-w-0 overflow-y-auto pb-[calc(72px+var(--sa-bottom))] md:pb-10"
        >
          <div className="w-full px-4 pt-4 pb-10 md:px-8 md:pt-6 md:pr-[96px] xl:pr-[112px]">
            {children}
          </div>
        </main>

        {/* Desktop peek tentacle — fixed to the right edge */}
        <PeekTentacle />
      </div>

      {/* Mobile bottom tab bar */}
      <div className="md:hidden">
        <BottomTabBar />
      </div>
    </div>
  );
}
