import type { ReactNode } from "react";
import { TopHeader } from "./TopHeader";
import { LeftSidebar } from "./LeftSidebar";
import { PeekTentacle } from "./PeekTentacle";
import { TaxTicker } from "./TaxTicker";
import { MobileHeader } from "./mobile/MobileHeader";
import { BottomTabBar } from "./mobile/BottomTabBar";

/**
 * AppShell — responsive layout shell.
 *
 * Mobile (< md): MobileHeader + content + BottomTabBar, safe-area aware.
 * Desktop (>= md): TopHeader + LeftSidebar + content + PeekTentacle.
 *
 * All toggling is CSS-only (no useEffect/useViewport) so SSR is stable.
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

      {/* Tax ticker — inline under header on all breakpoints */}
      <TaxTicker />

      <div className="flex flex-1 min-h-0">
        {/* Desktop sidebar */}
        <div className="hidden md:flex">
          <LeftSidebar />
        </div>

        <main
          role="main"
          id="main"
          className="main-scroll relative flex-1 min-w-0 overflow-y-auto pb-[calc(72px+var(--sa-bottom))] md:pb-0 sa-pl sa-pr"
        >
          <div className="mx-auto w-full max-w-[1400px] px-4 pt-4 pb-10 md:px-6 md:pt-6">
            {children}
          </div>
        </main>

        {/* Desktop peek tentacle */}
        <div className="hidden md:flex">
          <PeekTentacle />
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="md:hidden">
        <BottomTabBar />
      </div>
    </div>
  );
}
