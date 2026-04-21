export default function MatchesLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading matches">
      <div className="card relative p-6" style={{ ["--card-accent" as string]: "var(--fifa-cyan)" }}>
        <div className="card-accent-bar" aria-hidden />
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <div className="sk" style={{ width: 180, height: 180, borderRadius: "50%" }} />
          <div className="flex flex-col gap-3">
            <div className="sk" style={{ width: 220, height: 24 }} />
            <div className="sk" style={{ width: "60%", height: 48 }} />
            <div className="sk" style={{ width: "85%", height: 16 }} />
            <div className="sk" style={{ width: "70%", height: 16 }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="sk" style={{ width: 72, height: 36, borderRadius: 10 }} />
        ))}
      </div>

      <div className="card relative p-4" style={{ ["--card-accent" as string]: "var(--fifa-teal)" }}>
        <div className="card-accent-bar" aria-hidden />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="sk"
              style={{ width: "100%", height: 56, borderRadius: 12 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
