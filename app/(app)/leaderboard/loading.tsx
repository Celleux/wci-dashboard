export default function LeaderboardLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading leaderboard">
      <div className="card relative p-6" style={{ ["--card-accent" as string]: "var(--gold)" }}>
        <div className="card-accent-bar" aria-hidden />
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <div className="sk" style={{ width: 180, height: 180, borderRadius: "50%" }} />
          <div className="flex flex-col gap-3">
            <div className="sk" style={{ width: 280, height: 24 }} />
            <div className="sk" style={{ width: "50%", height: 48 }} />
            <div className="sk" style={{ width: "80%", height: 16 }} />
          </div>
          <div className="hidden md:block">
            <div className="sk" style={{ width: 140, height: 58 }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="sk" style={{ width: 120, height: 36, borderRadius: 10 }} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="card relative p-5"
            style={{ ["--card-accent" as string]: "var(--fifa-teal)" }}
          >
            <div className="card-accent-bar" aria-hidden />
            <div className="flex flex-col gap-3">
              <div className="sk" style={{ width: 60, height: 34 }} />
              <div className="sk" style={{ width: "80%", height: 24 }} />
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="sk" style={{ height: 42 }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card relative p-5" style={{ ["--card-accent" as string]: "var(--fifa-teal)" }}>
        <div className="card-accent-bar" aria-hidden />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="sk" style={{ width: "100%", height: 46, borderRadius: 12 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
