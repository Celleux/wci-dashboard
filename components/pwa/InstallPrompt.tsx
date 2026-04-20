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
        "fixed left-1/2 z-50 w-[min(400px,calc(100vw-24px))] -translate-x-1/2 rounded-2xl p-4 shadow-2xl",
        "bottom-[calc(82px+var(--sa-bottom))] md:bottom-6"
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(41,31,82,0.95), rgba(20,16,40,0.95))",
        border: "1px solid var(--hair-strong)",
        backdropFilter: "blur(18px)",
      }}
    >
      <div className="label mb-1">Install WCI</div>
      <h3 className="display text-base mb-1">
        Keep Paul in your pocket
      </h3>
      <p className="text-t2 text-sm mb-3">
        {variant === "ios"
          ? "Tap the share icon in Safari, then choose \u201cAdd to Home Screen\u201d."
          : "One tap installs WCI as a standalone app with offline support."}
      </p>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={dismiss}
          className="label px-3 py-2 rounded-lg hover:bg-[rgba(255,255,255,0.04)]"
        >
          Maybe later
        </button>
        {variant === "android" && (
          <button type="button" className="btn-3d" onClick={install}>
            Install
          </button>
        )}
      </div>
    </div>
  );
}
