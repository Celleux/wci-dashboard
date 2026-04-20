// toasts.jsx — the 4 toast/modal character moments (equal citizens to the hero)

const WinToast = ({ amount, onClose }) => (
  <div style={{
    position: 'fixed', top: 100, right: 32, zIndex: 60,
    width: 380, padding: 20,
    background: 'linear-gradient(180deg, #1a2845, #0F1730)',
    border: '1.5px solid var(--lime)',
    borderRadius: 16,
    boxShadow: '0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(181,214,0,0.2), 0 0 48px -8px var(--lime)',
    animation: 'toast-in 520ms var(--ease), lime-pulse 2s ease-in-out infinite',
    display: 'flex', gap: 14, alignItems: 'center',
  }}>
    <style>{`
      @keyframes lime-pulse {
        0%, 100% { box-shadow: 0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(181,214,0,0.2), 0 0 48px -8px var(--lime); }
        50%      { box-shadow: 0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(181,214,0,0.35), 0 0 72px -6px var(--lime); }
      }
      @keyframes wiggle { 0%,100%{transform:rotate(-3deg);} 50%{transform:rotate(3deg);} }
      @keyframes confetti-drop {
        from { transform: translateY(-40px) rotate(0); opacity: 0; }
        20% { opacity: 1; }
        to { transform: translateY(220px) rotate(720deg); opacity: 0; }
      }
    `}</style>
    {/* Confetti */}
    {[...Array(14)].map((_, i) => (
      <div key={i} style={{
        position: 'absolute', top: 0,
        left: 20 + i * 26,
        width: 6, height: 10,
        background: ['var(--fifa-red)','var(--fifa-yellow)','var(--lime)','var(--fifa-purple)','var(--fifa-teal)'][i % 5],
        animation: `confetti-drop 1.8s ${i * 60}ms ease-out infinite`,
      }} />
    ))}
    <div style={{ width: 88, height: 88, flexShrink: 0, animation: 'wiggle 1.2s ease-in-out infinite' }}>
      <img src="assets/chibi_jumping.png" width="88" height="88" style={{ filter: 'drop-shadow(0 4px 12px rgba(181,214,0,0.4))' }} />
    </div>
    <div style={{ flex: 1 }}>
      <div className="display" style={{ fontSize: 22, letterSpacing: '-0.02em', color: 'var(--lime)' }}>GOAAAAL.</div>
      <div style={{ fontSize: 13, color: 'var(--t2)', marginTop: 4 }}>
        <span className="mono" style={{ color: 'var(--lime)', fontWeight: 700 }}>+${amount.toFixed(2)}</span> claimable
      </div>
      <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>USA beat Mexico 2–1 · Paul called it</div>
    </div>
    <button onClick={onClose} style={{
      position: 'absolute', top: 8, right: 8, width: 24, height: 24,
      border: 'none', background: 'transparent', color: 'var(--t3)', cursor: 'pointer',
    }}>✕</button>
  </div>
);

const LossToast = ({ onClose, onMint }) => (
  <div style={{
    position: 'fixed', top: 100, right: 32, zIndex: 60,
    width: 400, padding: 20,
    background: 'linear-gradient(180deg, #2a1525, #1a0820)',
    border: '1.5px solid var(--coral)',
    borderRadius: 16,
    boxShadow: '0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(220,60,60,0.25), 0 0 48px -8px var(--coral)',
    animation: 'toast-in 520ms var(--ease)',
  }}>
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 88, height: 88, flexShrink: 0, animation: 'wiggle 2.4s ease-in-out infinite' }}>
        <img src="assets/chibi_tarot.png" width="88" height="88" style={{ filter: 'drop-shadow(0 4px 12px rgba(122,63,191,0.5))' }} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="display" style={{ fontSize: 20, letterSpacing: '-0.02em', color: 'var(--coral)' }}>Tough break.</div>
        <div style={{ fontSize: 13, color: 'var(--t2)', marginTop: 4 }}>
          Paul minted you a <span style={{ color: 'var(--fifa-purple)', fontWeight: 600 }}>Cope Card</span>. Hold it, flip it, trade it.
        </div>
      </div>
      <button onClick={onClose} style={{
        width: 24, height: 24, flexShrink: 0,
        border: 'none', background: 'transparent', color: 'var(--t3)', cursor: 'pointer',
      }}>✕</button>
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
      <button onClick={onMint} className="btn-3d" style={{ flex: 1, padding: '10px', fontSize: 12 }}>Mint NFT</button>
      <button onClick={onClose} style={{
        padding: '10px 14px', borderRadius: 10,
        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--hair)',
        color: 'var(--t2)', cursor: 'pointer', fontSize: 12, fontWeight: 500,
      }}>Not now</button>
    </div>
  </div>
);

// Empty state (centered, not a toast)
const EmptyState = ({ onClose }) => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 55,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(5,8,20,0.75)', backdropFilter: 'blur(8px)',
    animation: 'fade-in 320ms var(--ease)',
  }} onClick={onClose}>
    <div onClick={e => e.stopPropagation()} style={{
      width: 480, padding: '40px 32px',
      background: 'linear-gradient(180deg, #182244, #0F1730)',
      border: '1.5px solid var(--hair-strong)',
      borderRadius: 20,
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8), 0 0 60px -12px var(--fifa-teal)',
      textAlign: 'center',
      position: 'relative',
    }}>
      <div style={{ width: 220, height: 220, margin: '0 auto', position: 'relative' }}>
        <img src="assets/chibi_cheerful.png" width="220" height="220" style={{ animation: 'breathe 3s ease-in-out infinite' }} />
        <div style={{
          position: 'absolute', right: -8, bottom: 20, width: 24, height: 24, borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fff, #B8C2D9 40%, #4a5470)',
          animation: 'ball-bounce 1.4s ease-in-out infinite',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        }} />
      </div>
      <style>{`
        @keyframes ball-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
      <div className="display" style={{ fontSize: 28, marginTop: 16, letterSpacing: '-0.02em' }}>
        Paul's got a pick.
      </div>
      <div style={{ color: 'var(--t2)', fontSize: 14, marginTop: 8, maxWidth: 320, margin: '8px auto 0' }}>
        No bets yet. Pick a match from the list and dive in — Paul scanned 14 fixtures today.
      </div>
      <button onClick={onClose} className="btn-3d" style={{ marginTop: 24, padding: '14px 28px' }}>Browse matches</button>
    </div>
  </div>
);

const ContrarianToast = ({ onClose }) => (
  <div style={{
    position: 'fixed', top: 100, right: 32, zIndex: 60,
    width: 420, padding: 20,
    background: 'linear-gradient(180deg, #1a1030, #0F1730)',
    border: '1.5px solid var(--fifa-purple)',
    borderRadius: 16,
    boxShadow: '0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(122,63,191,0.25), 0 0 60px -8px var(--fifa-purple)',
    animation: 'toast-in 520ms var(--ease)',
  }}>
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ width: 96, height: 96, flexShrink: 0 }}>
        <img src="assets/chibi_galaxy.png" width="96" height="96" style={{ filter: 'drop-shadow(0 4px 16px rgba(122,63,191,0.6))', animation: 'breathe 2.4s ease-in-out infinite' }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <Chip style={{ color: 'var(--fifa-purple)', borderColor: 'rgba(122,63,191,0.3)', fontSize: 10 }}>CONTRARIAN</Chip>
        </div>
        <div className="display" style={{ fontSize: 18, letterSpacing: '-0.01em' }}>
          Paul sees something the market doesn't.
        </div>
        <div style={{ fontSize: 12, color: 'var(--t2)', marginTop: 8 }}>
          <span className="mono" style={{ color: 'var(--fifa-purple)' }}>GER</span> vs <span className="mono">JPN</span> · crowd is 71% <span className="mono">GER</span>, Paul says <span className="mono" style={{ color: 'var(--gold)' }}>DRAW @ 64%</span>.
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <button className="btn-3d" style={{ padding: '8px 14px', fontSize: 11 }}>Follow Paul</button>
          <button onClick={onClose} style={{
            padding: '8px 14px', borderRadius: 8,
            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--hair)',
            color: 'var(--t2)', cursor: 'pointer', fontSize: 11, fontWeight: 500,
          }}>Dismiss</button>
        </div>
      </div>
      <button onClick={onClose} style={{
        width: 24, height: 24, flexShrink: 0,
        border: 'none', background: 'transparent', color: 'var(--t3)', cursor: 'pointer',
      }}>✕</button>
    </div>
  </div>
);

Object.assign(window, { WinToast, LossToast, EmptyState, ContrarianToast });
