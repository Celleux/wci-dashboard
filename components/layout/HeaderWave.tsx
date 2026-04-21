"use client";

interface HeaderWaveProps {
  headerH?: number;
  notchR?: number;
}

/**
 * Mechanical notched edge for the desktop TopHeader.
 *
 *   1. Clipped base panel with the U-shaped notch cut out.
 *   2. Rainbow gradient SVG stroke tracing the notch curve (chrome edge).
 *   3. Inner highlight stroke on the notch (satin lip).
 *   4. Corner rivets / bottom accent bar for a more built, mechanical look.
 */
export function HeaderWave({ headerH = 88, notchR = 96 }: HeaderWaveProps) {
  const notchDepth = headerH - 6;

  return (
    <>
      {/* 1. Base panel clipped to the notch silhouette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          height: headerH,
          background:
            "linear-gradient(180deg, rgba(38,24,70,0.96) 0%, rgba(16,10,32,0.95) 55%, rgba(10,6,21,0.92) 100%)",
          clipPath: `polygon(
            0 0,
            calc(50% - ${notchR + 14}px) 0,
            calc(50% - ${notchR + 2}px) 6px,
            calc(50% - ${notchR * 0.45}px) ${notchDepth}px,
            calc(50% + ${notchR * 0.45}px) ${notchDepth}px,
            calc(50% + ${notchR + 2}px) 6px,
            calc(50% + ${notchR + 14}px) 0,
            100% 0,
            100% 100%,
            0 100%
          )`,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5)",
        }}
      />

      {/* 2. Rainbow stroke tracing the notch curve + 3. Inner satin highlight */}
      <NotchStroke headerH={headerH} notchR={notchR} />

      {/* 4. Bottom accent line — thin rainbow hairline */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: headerH - 1,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(245,208,32,0.45) 18%, rgba(0,185,178,0.45) 50%, rgba(245,208,32,0.45) 82%, transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Inner rim */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: headerH,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.08) 50%, transparent 95%)",
          pointerEvents: "none",
        }}
      />

      {/* Corner rivets for mechanical feel */}
      {[16, "auto" as const].map((left, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: headerH - 12,
            left: i === 0 ? (left as number) : "auto",
            right: i === 1 ? 16 : "auto",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #FFE85B 0%, var(--gold) 40%, #7a5b00 100%)",
            boxShadow:
              "inset 0 -1px 0 rgba(0,0,0,0.6), 0 0 6px rgba(245,208,32,0.5)",
          }}
        />
      ))}
    </>
  );
}

function NotchStroke({ headerH, notchR }: { headerH: number; notchR: number }) {
  const notchW = notchR * 2 + 28;
  const notchDepth = headerH - 6;
  const cx = (notchW + 60) / 2;
  const ns = cx - notchR;
  const ne = cx + notchR;

  const notchPath = `
    M 0 1
    L ${ns - 14} 1
    Q ${ns - 6} 1 ${ns - 2} 6
    C ${ns + 4} ${notchDepth * 0.3 + 1}, ${cx - notchR * 0.45} ${notchDepth + 1}, ${cx} ${notchDepth + 1}
    C ${cx + notchR * 0.45} ${notchDepth + 1}, ${ne - 4} ${notchDepth * 0.3 + 1}, ${ne + 2} 6
    Q ${ne + 6} 1 ${ne + 14} 1
    L ${notchW + 60} 1
  `;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        transform: "translateX(-50%)",
        width: notchW + 60,
        height: headerH + 4,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox={`0 0 ${notchW + 60} ${headerH + 4}`}
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="notchEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--fifa-red)"     stopOpacity="0" />
            <stop offset="12%"  stopColor="var(--fifa-orange)"  stopOpacity="0.8" />
            <stop offset="28%"  stopColor="var(--fifa-yellow)"  stopOpacity="1" />
            <stop offset="50%"  stopColor="var(--gold)"         stopOpacity="1" />
            <stop offset="72%"  stopColor="var(--fifa-teal)"    stopOpacity="1" />
            <stop offset="88%"  stopColor="var(--fifa-purple)"  stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--fifa-magenta)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="notchSatin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="edgeGlow" x="-5%" y="-50%" width="110%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Outer soft glow under the edge */}
        <path
          d={notchPath}
          fill="none"
          stroke="url(#notchEdge)"
          strokeWidth="5"
          opacity="0.4"
          filter="url(#edgeGlow)"
        />
        {/* Crisp rainbow edge */}
        <path
          d={notchPath}
          fill="none"
          stroke="url(#notchEdge)"
          strokeWidth="2.2"
        />
        {/* Inner satin lip (1px above) */}
        <path
          d={notchPath}
          fill="none"
          stroke="url(#notchSatin)"
          strokeWidth="1"
          opacity="0.65"
          transform="translate(0,1)"
        />
      </svg>
    </div>
  );
}
