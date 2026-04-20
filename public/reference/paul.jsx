// paul.jsx — Cute chibi octopus character (no dog, no third eye).
// Round body + 8 tentacles that attach clearly to the body.
// 5 tentacles curl UP holding soccer balls; 3 curl DOWN in a meditation pose.
// Tentacles extend OUTSIDE the card bounds for a sticker-like 3D feel.
// Interactivity: cursor look-at, hover bounce, click squish, periodic wink, ball juggle.

// ——————— Proper soccer ball: pentagon-hexagon pattern ———————
const SoccerBall = ({ r = 26, x = 0, y = 0, spin = 0 }) => {
  // Build a convincing ball: white base + central black pentagon + 5 surrounding black wedges
  const pentPts = (cx, cy, radius, rot = 0) => {
    const out = [];
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + rot;
      out.push(`${cx + Math.cos(a) * radius},${cy + Math.sin(a) * radius}`);
    }
    return out.join(' ');
  };
  // Outer black wedges (hex approximations) positioned between pentagon points
  const outerPatches = [];
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2 + Math.PI / 5; // offset to sit between pent vertices
    const cx = Math.cos(a) * r * 0.78;
    const cy = Math.sin(a) * r * 0.78;
    outerPatches.push({ cx, cy, a });
  }
  return (
    <g transform={`translate(${x},${y}) rotate(${spin})`}>
      {/* outer black stroke ring */}
      <circle cx="0" cy="0" r={r} fill="#ffffff" stroke="#0a0512" strokeWidth="2.5" />
      {/* center black pentagon */}
      <polygon points={pentPts(0, 0, r * 0.33)} fill="#0a0512" />
      {/* lines from central pentagon vertices outward to edge */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        return (
          <line key={`r${i}`}
                x1={Math.cos(a) * r * 0.33} y1={Math.sin(a) * r * 0.33}
                x2={Math.cos(a) * r} y2={Math.sin(a) * r}
                stroke="#0a0512" strokeWidth="2" strokeLinecap="round" />
        );
      })}
      {/* surrounding black hex wedges */}
      {outerPatches.map((p, i) => (
        <polygon
          key={`p${i}`}
          points={pentPts(p.cx, p.cy, r * 0.22, p.a + Math.PI / 2)}
          fill="#0a0512"
          transform={`rotate(${(p.a * 180) / Math.PI + 90} ${p.cx} ${p.cy})`}
        />
      ))}
      {/* shine */}
      <ellipse cx={-r * 0.4} cy={-r * 0.5} rx={r * 0.28} ry={r * 0.14}
               fill="#ffffff" opacity="0.95" transform={`rotate(-20 ${-r * 0.4} ${-r * 0.5})`} />
    </g>
  );
};

// ——————— A tentacle that curls upward holding a ball ———————
// All tentacles ORIGINATE from a single attachment point on the body base.
// They curve out, then up, and end at (ballX, ballY).
// `flex` (0..1) modulates bend amount for subtle animation.
const UpTentacle = ({ anchor, ball, side, flex = 0, spin = 0, holdsBall = true }) => {
  // Compute cubic bezier from anchor → control → ball
  const dx = ball.x - anchor.x;
  const dy = ball.y - anchor.y;
  const outSign = side === 'left' ? -1 : 1;

  // Two control points to get an S-curve: out sideways, then up to ball
  const c1x = anchor.x + outSign * (60 + flex * 15);
  const c1y = anchor.y - 10;
  const c2x = ball.x - outSign * 30;
  const c2y = ball.y + 35;

  // Build a tapered ribbon along the path (varying thickness)
  const samples = 36;
  const topPts = [];
  const botPts = [];
  const cupPts = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const mt = 1 - t;
    // cubic bezier position
    const px = mt * mt * mt * anchor.x + 3 * mt * mt * t * c1x + 3 * mt * t * t * c2x + t * t * t * ball.x;
    const py = mt * mt * mt * anchor.y + 3 * mt * mt * t * c1y + 3 * mt * t * t * c2y + t * t * t * ball.y;
    // tangent
    const tx = 3 * mt * mt * (c1x - anchor.x) + 6 * mt * t * (c2x - c1x) + 3 * t * t * (ball.x - c2x);
    const ty = 3 * mt * mt * (c1y - anchor.y) + 6 * mt * t * (c2y - c1y) + 3 * t * t * (ball.y - c2y);
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;
    // thickness tapers from 26 at base to 12 at tip (where ball sits)
    const thick = 26 * (1 - t) * 0.7 + 14 * t + 6;
    topPts.push([px + nx * thick, py + ny * thick]);
    botPts.push([px - nx * thick, py - ny * thick]);
    // suction cups on the INNER side (toward body center)
    if (i > 2 && i < samples - 2 && i % 4 === 0) {
      const innerSign = side === 'left' ? 1 : -1; // inner = opposite to outSign
      const cupx = px + nx * thick * innerSign * 0.55;
      const cupy = py + ny * thick * innerSign * 0.55;
      cupPts.push({ x: cupx, y: cupy, size: thick * 0.35 + 1 });
    }
  }
  const ribbonPath =
    `M ${topPts[0][0]} ${topPts[0][1]} ` +
    topPts.slice(1).map((p) => `L ${p[0]} ${p[1]}`).join(' ') +
    ` L ${botPts[botPts.length - 1][0]} ${botPts[botPts.length - 1][1]} ` +
    botPts.slice(0, -1).reverse().map((p) => `L ${p[0]} ${p[1]}`).join(' ') +
    ' Z';

  return (
    <g>
      <path d={ribbonPath} fill="url(#tentGrad)" stroke="#2A0F4A" strokeWidth="3" strokeLinejoin="round" />
      <path d={ribbonPath} fill="url(#tentShine)" opacity="0.45" />
      {cupPts.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.size * 0.55}
                fill="#FFB38A" stroke="#5a1a3a" strokeWidth="1.3" opacity="0.95" />
      ))}
      {holdsBall && <SoccerBall r={ball.r || 30} x={ball.x} y={ball.y} spin={spin} />}
    </g>
  );
};

// ——————— Seated/crossed bottom tentacles (meditation pose) ———————
const BaseTentacle = ({ path, side = 'right' }) => (
  <g>
    <path d={path} fill="url(#tentGrad)" stroke="#2A0F4A" strokeWidth="3" strokeLinejoin="round" />
    <path d={path} fill="url(#tentShine)" opacity="0.4" />
  </g>
);

// ——————— Main Studio Paul ———————
const PaulStudio = ({ size = 460, mood = 'idle', lookAt = { x: 0, y: 0 }, t = 0 }) => {
  const pupilDx = Math.max(-4, Math.min(4, lookAt.x * 4));
  const pupilDy = Math.max(-3, Math.min(3, lookAt.y * 3));

  // Breathing
  const breath = 1 + Math.sin(t * 1.2) * 0.015;

  // Body center
  const bx = 260, by = 240;

  // Five up-tentacle balls: arranged in an arc above the head
  // Slight bob per ball based on time
  const ballConfigs = [
    { angle: -130, dist: 210, phase: 0.0 },
    { angle: -100, dist: 200, phase: 0.7 },
    { angle: -90,  dist: 230, phase: 1.4 }, // top center (biggest arc)
    { angle: -80,  dist: 200, phase: 2.1 },
    { angle: -50,  dist: 210, phase: 2.8 },
  ];
  const balls = ballConfigs.map((b, i) => {
    const rad = (b.angle * Math.PI) / 180;
    const bob = Math.sin(t * 1.3 + b.phase) * 8;
    return {
      x: bx + Math.cos(rad) * b.dist,
      y: by + Math.sin(rad) * b.dist + bob,
      spin: (t * (i % 2 === 0 ? 60 : -50)) + i * 30,
      flex: Math.sin(t * 1.1 + b.phase),
      side: i < 2 ? 'left' : i > 2 ? 'right' : 'right',
      r: i === 2 ? 40 : 34, // bigger balls, biggest in the middle
    };
  });

  // Anchors for the 5 up-tentacles — spread across the top half of the body perimeter
  const upAnchors = [
    { x: bx - 110, y: by - 40 },
    { x: bx - 70,  y: by - 90 },
    { x: bx,       y: by - 110 },
    { x: bx + 70,  y: by - 90 },
    { x: bx + 110, y: by - 40 },
  ];

  // Three bottom tentacles (meditation pose) — anchors at bottom of body
  // These curl out-and-under, crossing at the front
  const basePaths = [
    // far-left curls down and to the right (toward center)
    `M ${bx - 90} ${by + 95}
     C ${bx - 150} ${by + 140}, ${bx - 160} ${by + 200}, ${bx - 80} ${by + 220}
     C ${bx - 40} ${by + 230}, ${bx - 10} ${by + 225}, ${bx + 5} ${by + 215}
     C ${bx - 20} ${by + 205}, ${bx - 50} ${by + 195}, ${bx - 70} ${by + 180}
     C ${bx - 110} ${by + 160}, ${bx - 115} ${by + 125}, ${bx - 90} ${by + 95} Z`,
    // far-right curls down and to the left
    `M ${bx + 90} ${by + 95}
     C ${bx + 150} ${by + 140}, ${bx + 160} ${by + 200}, ${bx + 80} ${by + 220}
     C ${bx + 40} ${by + 230}, ${bx + 10} ${by + 225}, ${bx - 5} ${by + 215}
     C ${bx + 20} ${by + 205}, ${bx + 50} ${by + 195}, ${bx + 70} ${by + 180}
     C ${bx + 110} ${by + 160}, ${bx + 115} ${by + 125}, ${bx + 90} ${by + 95} Z`,
    // center (crossed short)
    `M ${bx - 40} ${by + 105}
     C ${bx - 20} ${by + 180}, ${bx + 20} ${by + 190}, ${bx + 50} ${by + 160}
     C ${bx + 30} ${by + 170}, ${bx + 5} ${by + 175}, ${bx - 5} ${by + 170}
     C ${bx - 30} ${by + 160}, ${bx - 35} ${by + 140}, ${bx - 40} ${by + 105} Z`,
  ];

  return (
    <svg viewBox="0 0 520 560" width={size} height={size * 560 / 520} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="bodyGrad" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#D8A8FF" />
          <stop offset="35%" stopColor="#A066E0" />
          <stop offset="70%" stopColor="#7A3FBF" />
          <stop offset="100%" stopColor="#4A1F7A" />
        </radialGradient>
        <radialGradient id="bellyGrad" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#FFD6FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8C4FC8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cheekGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF8FCC" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FF8FCC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rim" cx="75%" cy="18%" r="45%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tentGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B078E8" />
          <stop offset="55%" stopColor="#7A3FBF" />
          <stop offset="100%" stopColor="#3E1A6B" />
        </linearGradient>
        <radialGradient id="tentShine" cx="35%" cy="25%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
          <feOffset dx="0" dy="8" />
          <feComponentTransfer><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={bx} cy={by + 260} rx="170" ry="18" fill="#000" opacity="0.4" />

      {/* Floating sparkles (behind) */}
      <g>
        {[
          { x: 80, y: 120, c: '#FFE89A', s: 6 },
          { x: 450, y: 100, c: '#FFE89A', s: 5 },
          { x: 60, y: 280, c: '#D8A8FF', s: 4 },
          { x: 480, y: 280, c: '#D8A8FF', s: 4 },
          { x: 130, y: 50, c: '#FFFFFF', s: 3 },
          { x: 400, y: 60, c: '#FFFFFF', s: 3 },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.x},${s.y}) rotate(${t * 20 + i * 30})`}
             opacity={0.6 + Math.sin(t * 2 + i) * 0.35}>
            {/* 4-point sparkle */}
            <path d={`M 0 -${s.s} L ${s.s * 0.3} -${s.s * 0.3} L ${s.s} 0 L ${s.s * 0.3} ${s.s * 0.3} L 0 ${s.s} L -${s.s * 0.3} ${s.s * 0.3} L -${s.s} 0 L -${s.s * 0.3} -${s.s * 0.3} Z`}
                  fill={s.c} />
          </g>
        ))}
      </g>

      {/* Up-tentacles (behind body) — odd indices */}
      <g filter="url(#softShadow)">
        {upAnchors.map((a, i) => (i % 2 === 1) && (
          <UpTentacle key={`upb${i}`} anchor={a} ball={balls[i]} side={balls[i].side}
                      flex={balls[i].flex} spin={balls[i].spin} />
        ))}
      </g>

      {/* Body */}
      <g style={{ transformOrigin: `${bx}px ${by}px`, transform: `scale(${breath})` }}>
        <ellipse cx={bx} cy={by} rx="130" ry="120" fill="url(#bodyGrad)" stroke="#2A0F4A" strokeWidth="3.5" />
        <ellipse cx={bx} cy={by + 25} rx="95" ry="75" fill="url(#bellyGrad)" />
        <ellipse cx={bx} cy={by} rx="130" ry="120" fill="url(#rim)" />
        {/* Darker spots (scattered on mantle) */}
        <circle cx={bx - 60} cy={by - 70} r="11" fill="#3E1A6B" opacity="0.45" />
        <circle cx={bx - 30} cy={by - 95} r="7" fill="#3E1A6B" opacity="0.45" />
        <circle cx={bx + 50} cy={by - 80} r="9" fill="#3E1A6B" opacity="0.45" />
        <circle cx={bx + 75} cy={by - 45} r="6" fill="#3E1A6B" opacity="0.4" />
      </g>

      {/* Cheeks */}
      <ellipse cx={bx - 70} cy={by + 30} rx="24" ry="13" fill="url(#cheekGrad)" />
      <ellipse cx={bx + 70} cy={by + 30} rx="24" ry="13" fill="url(#cheekGrad)" />

      {/* Eyes — left open, right wink (or both open based on mood) */}
      <g>
        {/* Left eye (normal) */}
        <ellipse cx={bx - 42} cy={by - 5} rx="13" ry="17" fill="#0A0512" />
        <circle cx={bx - 39 + pupilDx * 0.3} cy={by - 10 + pupilDy * 0.3} r="4.5" fill="#FFFFFF" />

        {/* Right eye — default is a CLOSED WINK like the reference */}
        {mood === 'wink' || mood === 'idle' ? (
          <path d={`M ${bx + 28} ${by - 5} Q ${bx + 42} ${by - 16} ${bx + 58} ${by - 5}`}
                stroke="#0A0512" strokeWidth="5" strokeLinecap="round" fill="none" />
        ) : (
          <>
            <ellipse cx={bx + 42} cy={by - 5} rx="13" ry="17" fill="#0A0512" />
            <circle cx={bx + 45 + pupilDx * 0.3} cy={by - 10 + pupilDy * 0.3} r="4.5" fill="#FFFFFF" />
          </>
        )}
      </g>

      {/* Mouth — small content smile */}
      <path d={`M ${bx - 12} ${by + 35} Q ${bx} ${by + 45} ${bx + 12} ${by + 35}`}
            stroke="#2A0F4A" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Bottom seated tentacles (in front of body) */}
      <g filter="url(#softShadow)">
        {basePaths.map((p, i) => <BaseTentacle key={`base${i}`} path={p} side={i === 1 ? 'right' : 'left'} />)}
        {/* Suction cup dots along the crossed bottom tentacles */}
        {[
          { x: bx - 110, y: by + 180 }, { x: bx - 70, y: by + 210 }, { x: bx - 30, y: by + 218 },
          { x: bx + 110, y: by + 180 }, { x: bx + 70, y: by + 210 }, { x: bx + 30, y: by + 218 },
        ].map((c, i) => (
          <circle key={`bcup${i}`} cx={c.x} cy={c.y} r="4"
                  fill="#FFB38A" stroke="#5a1a3a" strokeWidth="1.2" opacity="0.9" />
        ))}
      </g>

      {/* Up-tentacles (in front of body) — even indices */}
      <g filter="url(#softShadow)">
        {upAnchors.map((a, i) => (i % 2 === 0) && (
          <UpTentacle key={`upf${i}`} anchor={a} ball={balls[i]} side={balls[i].side}
                      flex={balls[i].flex} spin={balls[i].spin} />
        ))}
      </g>
    </svg>
  );
};

// ——————— Line treatment (simplified, same silhouette) ———————
const PaulLine = ({ size = 460 }) => (
  <svg viewBox="0 0 520 560" width={size} height={size * 560 / 520}>
    <ellipse cx="260" cy="500" rx="150" ry="14" fill="#000" opacity="0.3" />
    {/* 5 up-tentacles with balls */}
    {[-130, -100, -90, -80, -50].map((ang, i) => {
      const rad = (ang * Math.PI) / 180;
      const ax = 260 + (i < 2 ? -1 : i > 2 ? 1 : 0) * (i === 2 ? 0 : 90);
      const ay = 240 - 50;
      const bx = 260 + Math.cos(rad) * (i === 2 ? 230 : 200);
      const by = 240 + Math.sin(rad) * (i === 2 ? 230 : 200);
      return (
        <g key={i}>
          <path d={`M ${ax} ${ay} Q ${(ax + bx) / 2 + (i < 2 ? -30 : 30)} ${(ay + by) / 2} ${bx} ${by}`}
                stroke="#1a0633" strokeWidth="12" strokeLinecap="round" fill="none" />
          <circle cx={bx} cy={by} r="22" fill="#fff" stroke="#1a0633" strokeWidth="2" />
          <polygon points={[[0,-7],[6.7,-2.2],[4.1,5.7],[-4.1,5.7],[-6.7,-2.2]].map(p=>`${bx+p[0]},${by+p[1]}`).join(' ')} fill="#1a0633" />
        </g>
      );
    })}
    <ellipse cx="260" cy="240" rx="125" ry="115" fill="#8C4FC8" stroke="#1a0633" strokeWidth="3" />
    <ellipse cx="220" cy="200" rx="55" ry="45" fill="#D8A8FF" opacity="0.5" />
    <ellipse cx="218" cy="235" rx="13" ry="17" fill="#1a0633" />
    <path d="M 288 235 Q 302 224 318 235" stroke="#1a0633" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M 248 275 Q 260 285 272 275" stroke="#1a0633" strokeWidth="3.5" strokeLinecap="round" fill="none" />
  </svg>
);

const PaulChibi = ({ size = 460 }) => (
  <img src="assets/chibi_oracle.png" alt="Paul the Oracle"
       width={size} height={size * 560 / 520}
       style={{ display: 'block', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }} />
);

// ——————— Host: renders selected treatment ———————
const PaulHero = ({ treatment = 'studio', reaching = false }) => {
  const [mood, setMood] = React.useState('idle');
  const [lookAt, setLookAt] = React.useState({ x: 0, y: 0 });
  const [time, setTime] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (treatment !== 'studio') return;
    let raf;
    let start = performance.now();
    const loop = (now) => {
      setTime((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [treatment]);

  // Briefly open both eyes every 4-6s (flip from wink → both open → back to wink)
  React.useEffect(() => {
    if (treatment !== 'studio') return;
    let t;
    const cycle = () => {
      setMood('focus'); // both eyes open
      setTimeout(() => setMood('idle'), 450); // back to wink
      t = setTimeout(cycle, 4000 + Math.random() * 2500);
    };
    t = setTimeout(cycle, 2500);
    return () => clearTimeout(t);
  }, [treatment]);

  React.useEffect(() => {
    if (treatment !== 'studio') return;
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      setLookAt({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [treatment]);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 450);
  };

  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'center bottom',
    cursor: treatment === 'studio' ? 'pointer' : 'default',
    transform: clicked
      ? 'scale(0.94) translateY(4px)'
      : hovered ? 'scale(1.035)' : 'scale(1)',
    transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    filter: hovered && treatment === 'studio'
      ? 'drop-shadow(0 20px 40px rgba(168,85,247,0.4))'
      : 'none',
  };

  return (
    <div ref={ref} style={wrapperStyle}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         onClick={handleClick}>
      {treatment === 'studio' && <PaulStudio mood={reaching ? 'focus' : mood} lookAt={lookAt} t={time} />}
      {treatment === 'chibi' && <PaulChibi />}
      {treatment === 'line' && <PaulLine />}
    </div>
  );
};

Object.assign(window, { PaulHero, PaulStudio, PaulLine, PaulChibi, SoccerBall });
