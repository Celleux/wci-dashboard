// betslip.jsx — BetSlip drawer + tentacle-grab-slip choreography (hero moment)

const BetSlip = ({ open, pick, state, onClose, onPlaced }) => {
  const [stake, setStake] = React.useState(50);
  const [phase, setPhase] = React.useState('idle'); // idle | submitting | flying
  const odds = 1.85;
  const burn = (stake * 0.005).toFixed(2);
  const multiplier = state.wci >= 250000 ? 2 : 1;
  const payout = stake * odds * (multiplier > 1 ? 1.25 : 1);
  const tentacleRef = React.useRef(null);
  const slipRef = React.useRef(null);

  React.useEffect(() => {
    if (open) { setPhase('idle'); setStake(50); }
  }, [open, pick]);

  const submit = () => {
    setPhase('submitting');
    setTimeout(() => setPhase('flying'), 100);
    setTimeout(() => {
      onPlaced({ pick, stake, payout });
      setPhase('idle');
    }, 1100);
  };

  if (!open) return null;

  const accent = pick?.side === 'home' ? 'var(--fifa-teal)' : pick?.side === 'draw' ? 'var(--fifa-yellow)' : 'var(--fifa-magenta)';

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, zIndex: 40,
        background: 'rgba(5, 8, 20, 0.55)',
        backdropFilter: 'blur(6px)',
        animation: 'fade-in 240ms var(--ease)',
      }} />
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 480, zIndex: 41,
        background: 'linear-gradient(180deg, #0F1730 0%, #070B1A 100%)',
        borderLeft: '1px solid var(--hair-strong)',
        boxShadow: '-24px 0 64px -12px rgba(0,0,0,0.7), -1px 0 0 0 ' + accent,
        animation: 'drawer-in 320ms var(--ease)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Peek tentacle */}
        <div ref={tentacleRef} style={{
          position: 'absolute', right: -60, top: 220, zIndex: 2,
          width: 180, height: 180,
          animation: phase === 'idle' ? 'tentacle-sway 4s ease-in-out infinite' : 'none',
          transition: 'transform 800ms var(--ease)',
          transform: phase === 'flying' ? 'translate(-260px, 20px) rotate(-40deg)' : 'translate(0,0)',
          transformOrigin: 'right center',
        }}>
          <svg viewBox="0 0 180 180" width="180" height="180">
            <defs>
              <linearGradient id="dtg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9E63D6" />
                <stop offset="100%" stopColor="#3E1A6B" />
              </linearGradient>
            </defs>
            <path d="M 180 90 Q 120 70 80 90 Q 50 100 30 80 Q 20 70 40 60"
                  stroke="url(#dtg)" strokeWidth="22" strokeLinecap="round" fill="none" />
            <circle cx="35" cy="62" r="4" fill="#C896F0" />
            <circle cx="50" cy="78" r="4" fill="#C896F0" />
            <circle cx="75" cy="85" r="4" fill="#C896F0" />
          </svg>
        </div>
        <style>{`
          @keyframes tentacle-sway {
            0%, 100% { transform: rotate(-3deg) translateY(0); }
            50% { transform: rotate(5deg) translateY(-6px); }
          }
        `}</style>

        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--hair)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div className="label">Bet Slip</div>
            <div className="display" style={{ fontSize: 18, marginTop: 2 }}>
              {pick?.match?.teams?.[0]} <span style={{ color: 'var(--t3)' }}>vs</span> {pick?.match?.teams?.[1]}
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--hair)',
            color: 'var(--t2)', cursor: 'pointer',
          }}>✕</button>
        </div>

        <div ref={slipRef} style={{
          flex: 1, padding: 24, overflowY: 'auto',
          animation: phase === 'flying' ? 'slip-fly 1s var(--ease) forwards' : 'none',
        }}>
          {/* Selected outcome */}
          <div style={{
            padding: 18, borderRadius: 14,
            background: 'linear-gradient(180deg, rgba(24,34,68,0.7), rgba(15,23,48,0.7))',
            border: `1px solid ${accent}`,
            boxShadow: `0 0 32px -12px ${accent}`,
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div className="label" style={{ color: accent }}>Your Pick</div>
                <div className="display" style={{ fontSize: 28, marginTop: 4 }}>{pick?.outcome}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="label">Odds</div>
                <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: accent }}>{odds}×</div>
              </div>
            </div>
          </div>

          {/* Stake input */}
          <div style={{ marginBottom: 14 }}>
            <div className="label" style={{ marginBottom: 8 }}>Stake · USDC</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '14px 16px', borderRadius: 12,
              background: 'rgba(0,0,0,0.3)', border: '1px solid var(--hair-strong)',
            }}>
              <span className="mono" style={{ fontSize: 28, color: 'var(--t3)' }}>$</span>
              <input type="number" value={stake} onChange={e => setStake(Math.max(0, parseInt(e.target.value) || 0))}
                     className="mono" style={{
                       flex: 1, background: 'transparent', border: 'none', outline: 'none',
                       color: 'var(--t1)', fontSize: 28, fontWeight: 700,
                     }} />
              <span style={{ color: 'var(--t3)', fontSize: 12 }}>USDC</span>
            </div>
          </div>

          {/* Quick chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 24 }}>
            {[10, 50, 100, 'MAX'].map(v => (
              <button key={v} onClick={() => setStake(v === 'MAX' ? state.usdc : v)}
                      style={{
                        padding: '10px 0', borderRadius: 10,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--hair)',
                        color: 'var(--t1)', cursor: 'pointer',
                        fontSize: 13, fontWeight: 600, fontFamily: 'JetBrains Mono',
                      }}>
                {v === 'MAX' ? 'MAX' : `$${v}`}
              </button>
            ))}
          </div>

          {/* Breakdown */}
          <div style={{
            padding: 16, background: 'rgba(0,0,0,0.25)', borderRadius: 12,
            border: '1px solid var(--hair)', display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {[
              ['Stake', `$${stake.toFixed(2)}`, null],
              ['WCI burn (0.5%)', `~$${burn}`, 'var(--fifa-orange)'],
              [`Multiplier ${multiplier}×`, multiplier > 1 ? 'Active' : '250K WCI needed', multiplier > 1 ? 'var(--lime)' : 'var(--t3)'],
              ['Platform skim (6%)', `–$${(stake * 0.06).toFixed(2)}`, 'var(--t3)'],
            ].map(([l, v, c]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: 'var(--t2)' }}>{l}</span>
                <span className="mono" style={{ color: c || 'var(--t1)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--hair)', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--t1)', fontSize: 14, fontWeight: 600 }}>Potential payout</span>
              <span className="mono" style={{ color: 'var(--gold)', fontSize: 20, fontWeight: 700 }}>
                ${payout.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div style={{ padding: 24, borderTop: '1px solid var(--hair)' }}>
          <button className="btn-3d" onClick={submit} disabled={phase !== 'idle'}
                  style={{ width: '100%', padding: '22px', fontSize: 16 }}>
            {phase === 'idle' ? 'Place Bet' : 'Paul is locking it in…'}
          </button>
        </div>
      </div>

      {/* Flying tentacle (full-screen choreography) */}
      {phase === 'flying' && <FlyingTentacle />}
    </>
  );
};

// Full-screen tentacle that sweeps across during submit
const FlyingTentacle = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none',
  }}>
    {/* Tentacle sweep */}
    <div style={{
      position: 'absolute', right: 460, top: 280,
      width: 400, height: 120,
      animation: 'tent-fly 1s var(--ease) forwards',
      transformOrigin: 'right center',
    }}>
      <svg viewBox="0 0 400 120" width="400" height="120">
        <defs>
          <linearGradient id="ftg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3E1A6B" />
            <stop offset="60%" stopColor="#9E63D6" />
            <stop offset="100%" stopColor="#C896F0" />
          </linearGradient>
        </defs>
        <path d="M 400 60 Q 300 20 200 70 Q 100 110 20 60"
              stroke="url(#ftg)" strokeWidth="28" strokeLinecap="round" fill="none"
              filter="drop-shadow(0 8px 20px rgba(122,63,191,0.6))" />
        <circle cx="40" cy="60" r="6" fill="#C896F0" />
        <circle cx="80" cy="78" r="5" fill="#C896F0" />
        <circle cx="130" cy="88" r="5" fill="#C896F0" />
        {/* Tip (the grabbing part) */}
        <circle cx="20" cy="60" r="16" fill="#9E63D6" stroke="#3E1A6B" strokeWidth="3" />
      </svg>
    </div>
    <style>{`
      @keyframes tent-fly {
        0%   { transform: translateX(200px) rotate(0deg); opacity: 0; }
        20%  { transform: translateX(0) rotate(0deg); opacity: 1; }
        60%  { transform: translateX(-400px) rotate(-6deg); opacity: 1; }
        100% { transform: translateX(-1200px) rotate(-30deg) scale(0.6); opacity: 0; }
      }
      @keyframes slip-particle {
        0%   { opacity: 0; transform: translate(0,0) scale(0.6); }
        30%  { opacity: 1; }
        100% { opacity: 0; transform: var(--p-end) scale(0.2); }
      }
    `}</style>

    {/* Gold trail particles */}
    {[...Array(12)].map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        right: 440 + i * 30, top: 330 + Math.sin(i) * 20,
        width: 8, height: 8, borderRadius: '50%',
        background: 'radial-gradient(circle, #FFE085, #F2B705 60%, transparent 80%)',
        boxShadow: '0 0 12px #F2B705',
        animation: `slip-particle 900ms ${i * 40}ms var(--ease) forwards`,
        '--p-end': `translate(-${600 + i * 20}px, ${-100 - i * 8}px)`,
      }} />
    ))}

    {/* Shrinking slip card */}
    <div style={{
      position: 'absolute', right: 80, top: 280,
      width: 200, height: 80, borderRadius: 12,
      background: 'linear-gradient(180deg, var(--bg-elevated), var(--bg-surface))',
      border: '1.5px solid var(--gold)',
      boxShadow: '0 0 40px -8px var(--gold), inset 0 1px 0 rgba(255,255,255,0.1)',
      padding: 14,
      animation: 'slip-shrink 1s var(--ease) forwards',
    }}>
      <div className="label" style={{ color: 'var(--gold)' }}>Slip</div>
      <div className="mono" style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>$50.00</div>
      <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>USA to win · 1.85×</div>
    </div>
    <style>{`
      @keyframes slip-shrink {
        0%   { transform: translate(0,0) rotate(0) scale(1); opacity: 1; }
        35%  { transform: translate(-40px, -20px) rotate(-4deg) scale(1); opacity: 1; }
        65%  { transform: translate(-400px, -60px) rotate(-12deg) scale(0.7); opacity: 1; }
        100% { transform: translate(-900px, -200px) rotate(-30deg) scale(0.2); opacity: 0; }
      }
    `}</style>

    {/* Portal glow at the end */}
    <div style={{
      position: 'absolute', left: 40, top: 80,
      width: 240, height: 240, borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(242,183,5,0.35), rgba(122,63,191,0.25) 50%, transparent 70%)',
      animation: 'portal 1s var(--ease) forwards',
    }} />
    <style>{`
      @keyframes portal {
        0%   { opacity: 0; transform: scale(0.5); }
        60%  { opacity: 0; transform: scale(0.5); }
        85%  { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1.4); }
      }
    `}</style>
  </div>
);

Object.assign(window, { BetSlip });
