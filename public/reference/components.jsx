// components.jsx — shared UI primitives

const AccentCard = ({ accent = 'var(--fifa-teal)', offset = 0, className = '', style = {}, children, ...rest }) => (
  <div className={`card ${className}`} data-offset={offset}
       style={{ '--card-accent': accent, ...style }} {...rest}>
    {children}
  </div>
);

const Chip = ({ children, kind = 'default', style = {} }) => {
  const cls = kind === 'gold' ? 'chip chip-gold' : kind === 'live' ? 'chip chip-live' : 'chip';
  return <span className={cls} style={style}>{children}</span>;
};

const Countdown = ({ target }) => {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (v) => String(v).padStart(2, '0');
  return (
    <div className="mono" style={{
      fontSize: 64, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff',
      textShadow: '0 0 24px rgba(242,183,5,0.25)',
      lineHeight: 1,
    }}>
      <span style={{ color: 'var(--t3)', fontSize: 28, marginRight: 8 }}>T−</span>
      <TickDigit v={pad(h)} />:<TickDigit v={pad(m)} />:<TickDigit v={pad(s)} />
    </div>
  );
};

const TickDigit = ({ v }) => {
  const [prev, setPrev] = React.useState(v);
  const [anim, setAnim] = React.useState(false);
  React.useEffect(() => {
    if (v !== prev) {
      setAnim(true);
      const t = setTimeout(() => { setPrev(v); setAnim(false); }, 120);
      return () => clearTimeout(t);
    }
  }, [v, prev]);
  return (
    <span style={{
      display: 'inline-block',
      transform: anim ? 'translateY(-4px)' : 'translateY(0)',
      opacity: anim ? 0.5 : 1,
      transition: 'all 120ms var(--ease)',
    }}>{v}</span>
  );
};

// Count-up animated number
const CountUp = ({ to, duration = 1200, prefix = '', suffix = '', decimals = 0 }) => {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const e = 1 - Math.pow(1 - t, 3);
      setV(to * e);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{prefix}{v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>;
};

// Mini sparkline
const Sparkline = ({ points = [], color = 'currentColor', height = 28, width = 100, fill = true }) => {
  if (!points.length) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => [
    (i / (points.length - 1)) * width,
    height - ((p - min) / range) * height,
  ]);
  const d = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const fillD = fill ? `${d} L ${width} ${height} L 0 ${height} Z` : null;
  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      {fill && <path d={fillD} fill={color} opacity="0.15" />}
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// Confidence bar with shimmer
const ConfidenceBar = ({ value, color = 'var(--gold)' }) => (
  <div style={{
    height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)',
    overflow: 'hidden', position: 'relative',
  }}>
    <div className="shimmer" style={{
      width: `${value}%`, height: '100%', background: color,
      position: 'relative', overflow: 'hidden',
      boxShadow: `0 0 12px ${color}`,
    }} />
  </div>
);

// Stacked pool-size bar for H/D/A
const PoolBar = ({ home = 420, draw = 180, away = 340 }) => {
  const total = home + draw + away;
  const hp = (home / total) * 100;
  const dp = (draw / total) * 100;
  const ap = (away / total) * 100;
  return (
    <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
      <div style={{ width: `${hp}%`, background: 'var(--fifa-teal)' }} />
      <div style={{ width: `${dp}%`, background: 'var(--t3)' }} />
      <div style={{ width: `${ap}%`, background: 'var(--fifa-magenta)' }} />
    </div>
  );
};

Object.assign(window, { AccentCard, Chip, Countdown, CountUp, Sparkline, ConfidenceBar, PoolBar });
