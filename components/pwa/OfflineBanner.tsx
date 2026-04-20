"use client";

import { useEffect, useState } from "react";

/** Sticky banner — shows when navigator.onLine === false. */
export function OfflineBanner() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (online) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 w-full px-4 py-2 text-center text-sm font-semibold"
      style={{
        background: "linear-gradient(180deg, rgba(245,208,32,0.2), rgba(245,208,32,0.1))",
        borderBottom: "1px solid rgba(245,208,32,0.4)",
        color: "var(--gold)",
        paddingTop: "calc(0.5rem + var(--sa-top))",
      }}
    >
      You&apos;re offline. Bets you place now will sync when you reconnect.
    </div>
  );
}
