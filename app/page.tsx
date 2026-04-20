import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="card max-w-xl w-full p-8 sm:p-10" style={{ "--card-accent": "var(--gold)" } as React.CSSProperties}>
        <div className="card-accent-bar" aria-hidden />
        <Image
          src="/assets/logo.png"
          alt="World Cup Inu"
          width={96}
          height={96}
          priority
          className="mx-auto mb-6 drop-shadow-2xl"
        />
        <div className="label mb-2">boot sequence</div>
        <h1 className="display text-4xl sm:text-5xl leading-tight mb-4">
          World Cup Inu
        </h1>
        <p className="text-t2 text-base sm:text-lg mb-6">
          Paul's Oracle is waking up. The dashboard is being generated — this
          placeholder will be replaced once the v0 batch orchestrator ships the
          app shell.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="chip chip-gold">v0 queue</span>
          <span className="chip">WC26 · Jun 11 — Jul 19</span>
          <span className="chip chip-live">installable</span>
        </div>
        <p className="mono text-t3 text-xs mt-8">
          <span className="opacity-60">build</span>{" "}
          {new Date().toISOString().slice(0, 10)}
        </p>
      </div>
    </main>
  );
}
