"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "wci-install-dismissed";

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(display-mode: standalone)").matches) return true;
  // @ts-ignore — iOS Safari-specific flag
  if (window.navigator?.standalone) return true;
  return false;
}

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

/**
 * Install prompt — iOS Safari gets a custom "Add to Home Screen" banner
 * (no `beforeinstallprompt` event). Android / desktop Chrome get the native prompt
 * via the captured BeforeInstallPromptEvent.
 */
export function InstallPrompt() {
  const [bip, setBip] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState<"ios" | "android">("android");

  useEffect(() => {
    if (isStandalone()) return;
    if (typeof localStorage !== "undefined" && localStorage.getItem(DISMISS_KEY) === "1") return;

    if (isIOS()) {
      setVariant("ios");
      const t = setTimeout(() => setShow(true), 30_000);
      return () => clearTimeout(t);
    }

    setVariant("android");
    const handler = (e: Event) => {
      e.preventDefault();
      setBip(e as BIPEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  };

  const install = async () => {
    if (!bip) return;
    await bip.prompt();
    const { outcome } = await bip.userChoice;
    if (outcome === "accepted") dismiss();
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Install World Cup Inu"
      className={cn(
        "fixed left-1/2 z-50 w-[min(380px,calc(100vw-16px))] -translate-x-1/2 rounded-2xl p-3.5 shadow-2xl",
        // Sit above the 64px mobile bottom tab bar + safe-area; pin to bottom-right on desktop
        "bottom-[calc(76px+var(--sa-bottom,0px))] md:bottom-5 md:left-auto md:right-5 md:translate-x-0"
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(41,31,82,0.96), rgba(20,16,40,0.96))",
        border: "1px solid var(--hair-strong)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 18px 40px -12px rgba(0,0,0,0.7), 0 0 22px -6px var(--fifa-purple)",
      }}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 28,
          height: 28,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid var(--hair)",
          color: "var(--t3)",
          fontSize: 14,
          cursor: "pointer",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        ×
      </button>
      <div className="label mb-1" style={{ color: "var(--gold)" }}>
        Install WCI26
      </div>
      <h3 className="display text-base mb-1">Keep Paul in your pocket</h3>
      <p className="text-t2 text-xs mb-3 pr-8">
        {variant === "ios"
          ? "Tap share \u2197 in Safari, then \u201cAdd to Home Screen\u201d."
          : "One tap installs WCI26 as a standalone app with offline support."}
      </p>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={dismiss}
          className="label px-3 py-2 rounded-lg text-t3 hover:bg-[rgba(255,255,255,0.04)]"
        >
          Later
        </button>
        {variant === "android" && (
          <button
            type="button"
            className="btn-3d"
            style={{ padding: "8px 14px", minHeight: 36, fontSize: 11 }}
            onClick={install}
          >
            Install
          </button>
        )}
      </div>
    </div>
  );
}
