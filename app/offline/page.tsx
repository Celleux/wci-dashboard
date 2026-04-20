import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Offline",
  description: "Paul is sleeping. Check your connection.",
};

export default function OfflinePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="card max-w-md w-full p-8"
        style={{ "--card-accent": "var(--fifa-teal)" } as React.CSSProperties}
      >
        <div className="card-accent-bar" aria-hidden />
        <Image
          src="/assets/chibi_jars.png"
          alt=""
          width={140}
          height={140}
          className="mx-auto mb-6 opacity-90"
          priority
        />
        <div className="label mb-2">offline</div>
        <h1 className="display text-3xl mb-3">Paul is resting</h1>
        <p className="text-t2 mb-6">
          You're offline. Your bets are safe — anything you submit now will be
          queued and sent the moment you reconnect.
        </p>
        <span className="chip chip-live">background sync ready</span>
      </div>
    </main>
  );
}
