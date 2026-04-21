export default function MyBetsLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading your bets">
      <div className="card relative p-6" style={{ ["--card-accent" as string]: "var(--fifa-teal)" }}>
        <div className="card-accent-bar" aria-hidden />
        <div className="grid gap-6 md:grid-cols-[auto_1fr]">
          <div className="sk" style={{ width: 170, height: 170, borderRadius: "50%" }} />
          <div className="flex flex-col gap-3">
            <div className="sk" style={{ width: 250, height: 24 }} />
            <div className="sk" style={{ width: "50%", height: 48 }} />
            <div className="sk" style={{ width: "80%", height: 18 }} />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 mt-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="sk" style={{ height: 78, borderRadius: 18 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="sk" style={{ width: 96, height: 36, borderRadius: 10 }} />
        ))}
      </div>

      <div className="card relative p-5" style={{ ["--card-accent" as string]: "var(--gold)" }}>
        <div className="card-accent-bar" aria-hidden />
        <div className="sk" style={{ width: "100%", height: 120 }} />
      </div>

      {Array.from({ length: 3 }).map((group, g) => (
        <div key={g} className="flex flex-col gap-3">
          <div className="sk" style={{ width: 160, height: 20 }} />
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="card relative p-4"
              style={{ ["--card-accent" as string]: "var(--hair-strong)" }}
            >
              <div className="sk" style={{ width: "100%", height: 48 }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
