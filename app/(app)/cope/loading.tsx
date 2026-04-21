export default function CopeLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading cope cards">
      <div className="card relative p-6" style={{ ["--card-accent" as string]: "var(--fifa-orange)" }}>
        <div className="card-accent-bar" aria-hidden />
        <div className="grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
          <div className="sk" style={{ width: 180, height: 180, borderRadius: "50%" }} />
          <div className="flex flex-col gap-3">
            <div className="sk" style={{ width: 220, height: 24 }} />
            <div className="sk" style={{ width: "55%", height: 48 }} />
            <div className="sk" style={{ width: "90%", height: 18 }} />
            <div className="sk" style={{ width: "75%", height: 18 }} />
          </div>
          <div className="hidden md:block">
            <div className="sk" style={{ width: 140, height: 64 }} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="sk" style={{ width: 90, height: 36, borderRadius: 10 }} />
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="card relative p-4"
            style={{ ["--card-accent" as string]: "var(--fifa-orange)" }}
          >
            <div className="card-accent-bar" aria-hidden />
            <div className="flex flex-col gap-3">
              <div className="sk" style={{ width: "60%", height: 16 }} />
              <div className="sk" style={{ height: 180, borderRadius: 14 }} />
              <div className="sk" style={{ width: "85%", height: 14 }} />
              <div className="sk" style={{ width: "70%", height: 14 }} />
              <div className="flex gap-2">
                <div className="sk" style={{ flex: 1, height: 36, borderRadius: 10 }} />
                <div className="sk" style={{ flex: 1, height: 36, borderRadius: 10 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
