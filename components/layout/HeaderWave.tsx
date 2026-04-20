"use client";

interface HeaderWaveProps {
  headerH?: number;
  notchR?: number;
}

/**
 * Notched SVG edge for the desktop TopHeader.
 * Renders three layers:
 *  1. Solid clipped background with the U-shaped notch cut out.
 *  2. Rainbow gradient SVG stroke tracing the notch curve.
 *  3. Hairline bottom accent across full width.
 */
export function HeaderWave({ headerH = 100, notchR = 110 }: HeaderWaveProps) {
  const notchW = notchR * 2 + 20;
  const notchDepth = headerH - 8;
  const cx = (notchW + 60) / 2;
  const ns = cx - notchR;
  const ne = cx + notchR;

  return (
    <>
      {/* 1. Clipped background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          height: headerH,
          background:
            "linear-gradient(180deg, rgba(26,16,48,0.95), rgba(10,6,21,0.90))",
          clipPath: `polygon(
            0 0,
            calc(50% - ${notchR + 10}px) 0,
            calc(50% - ${notchR}px) 8px,
            calc(50% - ${notchR * 0.4}px) ${notchDepth}px,
            calc(50% + ${notchR * 0.4}px) ${notchDepth}px,
            calc(50% + ${notchR}px) 8px,
            calc(50% + ${notchR + 10}px) 0,
            100% 0,
            100% 100%,
            0 100%
          )`,
        }}
      />

      {/* 2. Rainbow notch stroke */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: notchW + 60,
          height: headerH + 2,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox={`0 0 ${notchW + 60} ${headerH + 2}`}
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="notchEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="var(--fifa-red)"     stopOpacity="0" />
              <stop offset="15%"  stopColor="var(--fifa-orange)"  stopOpacity="0.7" />
              <stop offset="30%"  stopColor="var(--fifa-yellow)"  stopOpacity="1" />
              <stop offset="50%"  stopColor="var(--gold)"         stopOpacity="1" />
              <stop offset="70%"  stopColor="var(--fifa-teal)"    stopOpacity="1" />
              <stop offset="85%"  stopColor="var(--fifa-purple)"  stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--fifa-magenta)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`
              M 0 1
              L ${ns - 10} 1
              Q ${ns - 5} 1 ${ns} 9
              C ${ns + 10} ${notchDepth * 0.4 + 1}, ${cx - notchR * 0.4} ${notchDepth + 1}, ${cx} ${notchDepth + 1}
              C ${cx + notchR * 0.4} ${notchDepth + 1}, ${ne - 10} ${notchDepth * 0.4 + 1}, ${ne} 9
              Q ${ne + 5} 1 ${ne + 10} 1
              L ${notchW + 60} 1
            `}
            fill="none"
            stroke="url(#notchEdge)"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* 3. Bottom accent line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: headerH - 1,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(245,208,32,0.4) 20%, rgba(0,185,178,0.4) 50%, rgba(245,208,32,0.4) 80%, transparent)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
