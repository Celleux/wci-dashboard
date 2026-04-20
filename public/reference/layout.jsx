// layout.jsx — premium notched header + bigger logo + soccer-style sidebar

// ── LogoOrb: BIG 3D center piece (protruding through notch) ──
const LogoOrb = ({ size = 140 }) => (
  <div style={{
    position: 'relative',
    width: size, height: size,
    animation: 'orb-float 4s ease-in-out infinite',
    filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(245,208,32,0.4))',
  }}>
    {/* Outer rainbow halo (blurred) */}
    <div style={{
      position: 'absolute', inset: -10,
      borderRadius: '50%',
      background: 'conic-gradient(from 0deg, var(--fifa-red), var(--fifa-orange), var(--fifa-yellow), var(--fifa-lime), var(--fifa-teal), var(--fifa-blue), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))',
      filter: 'blur(14px)',
      opacity: 0.75,
      animation: 'spin 12s linear infinite',
    }} />
    {/* Conic ring border */}
    <div style={{
      position: 'absolute', inset: 0,
      borderRadius: '50%',
      background: 'conic-gradient(from 180deg, var(--fifa-yellow), var(--fifa-red), var(--fifa-purple), var(--fifa-teal), var(--fifa-yellow))',
      padding: 4,
      animation: 'spin 10s linear infinite reverse',
    }}>
      {/* Inner gold ring */}
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: 'linear-gradient(180deg, #F5D020 0%, #B8860B 100%)',
        padding: 3,
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.3)',
      }}>
        {/* Dark hub with logo */}
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 25%, #2a1f50 0%, #0A0615 80%)',
          boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.15), inset 0 -6px 12px rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Specular highlight */}
          <div style={{
            position: 'absolute', top: 6, left: 14, width: '45%', height: '30%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.45), transparent)',
            pointerEvents: 'none',
          }} />
          <img src="assets/logo.png" width={size * 0.75} height={size * 0.75}
               style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.6))' }} />
        </div>
      </div>
    </div>
  </div>
);

// ── HeaderWave — with the notch cutout in the middle ──
// Uses 3-part approach: solid L/R bg rectangles, fixed-size SVG notch in center.
const HeaderWave = ({ headerH = 100, notchR = 110 }) => {
  const notchW = notchR * 2 + 20; // extra padding on sides
  const notchDepth = headerH - 8;
  return (
    <>
      {/* Solid background with notch cut out via clip-path */}
      <div style={{
        position: 'absolute', inset: 0, height: headerH,
        background: 'linear-gradient(180deg, rgba(26, 16, 48, 0.95), rgba(10, 6, 21, 0.9))',
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
      }} />

      {/* Rainbow edge tracing the notch — use an SVG just for the stroke */}
      <svg width="100%" height={headerH + 10} viewBox="0 0 100 1" preserveAspectRatio="none"
           style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'none' }}>
      </svg>

      {/* Rainbow edge — absolutely positioned div in center */}
      <div style={{
        position: 'absolute', left: '50%', top: 0,
        transform: 'translateX(-50%)',
        width: notchW + 60, height: headerH + 2,
        pointerEvents: 'none',
      }}>
        <svg viewBox={`0 0 ${notchW + 60} ${headerH + 2}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="notchEdge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--fifa-red)" stopOpacity="0"/>
              <stop offset="15%" stopColor="var(--fifa-orange)" stopOpacity="0.7"/>
              <stop offset="30%" stopColor="var(--fifa-yellow)" stopOpacity="1"/>
              <stop offset="50%" stopColor="var(--gold)" stopOpacity="1"/>
              <stop offset="70%" stopColor="var(--fifa-teal)" stopOpacity="1"/>
              <stop offset="85%" stopColor="var(--fifa-purple)" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="var(--fifa-magenta)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          {(() => {
            const cx = (notchW + 60) / 2;
            const ns = cx - notchR;
            const ne = cx + notchR;
            return (
              <path d={`
                M 0 1
                L ${ns - 10} 1
                Q ${ns - 5} 1 ${ns} 9
                C ${ns + 10} ${notchDepth * 0.4 + 1}, ${cx - notchR * 0.4} ${notchDepth + 1}, ${cx} ${notchDepth + 1}
                C ${cx + notchR * 0.4} ${notchDepth + 1}, ${ne - 10} ${notchDepth * 0.4 + 1}, ${ne} 9
                Q ${ne + 5} 1 ${ne + 10} 1
                L ${notchW + 60} 1
              `} fill="none" stroke="url(#notchEdge)" strokeWidth="2" />
            );
          })()}
        </svg>
      </div>

      {/* Bottom accent line across full width */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: headerH - 1, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(245,208,32,0.4) 20%, rgba(0,185,178,0.4) 50%, rgba(245,208,32,0.4) 80%, transparent)',
        pointerEvents: 'none',
      }} />
    </>
  );
};

// ── Top Header Bar ─────────────────────────────────────
const TopHeader = ({ activeTab, onTab, claimable, onClaim }) => {
  const tabsL = ['Dashboard', 'Matches', 'My Bets'];
  const tabsR = ['Leaderboard', 'Oracle', 'Docs'];
  const HEADER_H = 100;
  return (
    <header style={{
      position: 'relative', zIndex: 40,
      height: HEADER_H,
      flexShrink: 0,
      background: 'transparent',
    }}>
      {/* Backdrop blur layer */}
      <div style={{
        position: 'absolute', inset: 0, height: HEADER_H,
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
      }} />
      <HeaderWave headerH={HEADER_H} notchR={110} />

      <div style={{ position: 'relative', height: HEADER_H, display: 'flex', alignItems: 'center', padding: '0 24px', maxWidth: 1560, margin: '0 auto' }}>
        {/* Left: wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-red))',
            padding: 2,
            filter: 'drop-shadow(0 2px 6px rgba(245,208,32,0.4))',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0A0615', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="assets/logo.png" width="36" height="36" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <div className="display" style={{
              fontSize: 20, letterSpacing: '-0.02em', whiteSpace: 'nowrap',
              background: 'linear-gradient(180deg, #fff, #C9C0E8 75%, #8A7DC8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>WORLD CUP INU</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.2em', fontWeight: 700, marginTop: 4 }}>
              THE ORACLE · V2
            </div>
          </div>
        </div>

        {/* Left tabs */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 28 }}>
          {tabsL.map(t => (
            <HeaderTab key={t} label={t} active={activeTab === t} onClick={() => onTab(t)} />
          ))}
        </div>

        {/* Spacer — the notch is above this */}
        <div style={{ flex: 1, minWidth: 180, position: 'relative' }}>
          {/* Protruding Logo Orb — positioned absolute to dangle below header */}
          <div style={{
            position: 'absolute',
            top: 6, left: '50%', transform: 'translateX(-50%)',
            zIndex: 10,
          }}>
            <LogoOrb size={120} />
          </div>
        </div>

        {/* Right tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {tabsR.map(t => (
            <HeaderTab key={t} label={t} active={activeTab === t} onClick={() => onTab(t)} />
          ))}
        </div>

        {/* Claim CTA + wallet badge */}
        <div style={{ marginLeft: 20, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {claimable > 0 && (
            <button onClick={onClaim} className="btn-3d" style={{ padding: '10px 16px', fontSize: 12 }}>
              CLAIM <span className="mono" style={{ marginLeft: 4 }}>${claimable.toFixed(2)}</span>
            </button>
          )}
          <WalletBadge />
        </div>
      </div>
    </header>
  );
};

const HeaderTab = ({ label, active, onClick }) => (
  <button onClick={onClick} style={{
    padding: '10px 16px',
    background: active
      ? 'linear-gradient(180deg, rgba(245,208,32,0.25), rgba(245,208,32,0.08))'
      : 'transparent',
    border: '1px solid ' + (active ? 'rgba(245,208,32,0.5)' : 'transparent'),
    color: active ? 'var(--gold)' : 'var(--t2)',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.01em',
    cursor: 'pointer',
    transition: 'all 160ms var(--ease)',
    boxShadow: active
      ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 0 24px -6px var(--gold)'
      : 'none',
    textShadow: active ? '0 0 12px rgba(245,208,32,0.5)' : 'none',
    whiteSpace: 'nowrap',
  }}
  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--t1)'; } }}
  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--t2)'; } }}
  >{label}</button>
);

const WalletBadge = () => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '6px 12px 6px 6px',
    background: 'linear-gradient(180deg, #1D1740, #141028)',
    border: '1px solid var(--hair-strong)',
    borderRadius: 999,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.5)',
  }}>
    <div style={{
      width: 26, height: 26, borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, #627EEA, #3C5099)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
    }}>
      <svg width="10" height="16" viewBox="0 0 10 16">
        <path d="M 5 0 L 5 6 L 10 8 L 5 0 Z M 5 0 L 5 6 L 0 8 L 5 0 Z M 0 9 L 5 11.5 L 10 9 L 5 16 L 0 9 Z"
              fill="#fff" opacity="0.9"/>
      </svg>
    </div>
    <span className="mono" style={{ fontSize: 11, color: 'var(--t1)', fontWeight: 600 }}>0xA3F7…D912</span>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--fifa-lime)', boxShadow: '0 0 8px var(--fifa-lime)' }} />
  </div>
);

// ── Left Sidebar ────────────────────────────────
const LeftSidebar = ({ profile, activeTab, onTab }) => {
  const nav = [
    { key: 'Dashboard',  label: 'Dashboard',    icon: 'home' },
    { key: 'Matches',    label: 'Live Matches', icon: 'live', badge: 3 },
    { key: 'My Bets',    label: 'My Bets',      icon: 'slip', badge: 3 },
    { key: 'Leaderboard',label: 'Leaderboard',  icon: 'trophy' },
    { key: 'Oracle',     label: "Paul's Oracle",icon: 'octopus' },
    { key: 'Cope',       label: 'Cope Cards',   icon: 'card' },
    { key: 'Staking',    label: 'Staking',      icon: 'stake' },
    { key: 'Docs',       label: 'Docs',         icon: 'doc' },
  ];

  return (
    <aside style={{
      width: 260,
      height: '100%',
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid var(--hair-strong)',
      background: 'linear-gradient(180deg, rgba(26, 18, 52, 0.85), rgba(10, 6, 21, 0.95))',
      boxShadow: 'inset -1px 0 0 rgba(245,208,32,0.08), 2px 0 20px -4px rgba(0,0,0,0.6)',
      flexShrink: 0,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Scrollable content region */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '14px 12px 4px',
        display: 'flex', flexDirection: 'column', gap: 12,
        scrollbarWidth: 'thin',
      }} className="sidebar-scroll">
        <ProfileCard profile={profile} />
        <WalletCard profile={profile} />

        {/* Nav */}
        <div style={{ marginTop: 2 }}>
          <div className="label" style={{ marginBottom: 8, padding: '0 4px', color: 'var(--t3)', fontSize: 9, letterSpacing: '0.2em' }}>NAVIGATION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {nav.map(n => (
              <SidebarNavItem key={n.key} item={n} active={activeTab === n.key} onClick={() => onTab(n.key)} />
            ))}
          </div>
        </div>

        <RankCard profile={profile} />
      </div>

      {/* Sticky bottom: Streak bonus — always visible */}
      <div style={{ padding: '8px 12px 12px', borderTop: '1px solid var(--hair)' }}>
        <div style={{
          padding: 12, borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(245,208,32,0.2), rgba(232,57,44,0.1))',
          border: '1px solid rgba(245,208,32,0.3)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 12px -4px rgba(245,208,32,0.3)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 24 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div className="label" style={{ color: 'var(--gold)', fontSize: 9 }}>STREAK</div>
              <div className="display" style={{ fontSize: 14, color: '#fff' }}>
                <span className="mono">{profile.streak}</span> MATCHES
              </div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 6 }}>
            <span style={{ color: 'var(--fifa-lime)', fontWeight: 700 }}>+5%</span> payout on next win
          </div>
        </div>
      </div>
    </aside>
  );
};

// ── Soccer-style nav item with crisp field lines ──
const SidebarNavItem = ({ item, active, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 12px 9px 10px',
        borderRadius: 10,
        cursor: 'pointer',
        background: active
          ? 'linear-gradient(90deg, rgba(245,208,32,0.18), rgba(245,208,32,0.02))'
          : hover ? 'rgba(255,255,255,0.04)' : 'transparent',
        border: '1px solid ' + (active ? 'rgba(245,208,32,0.4)' : hover ? 'rgba(255,255,255,0.08)' : 'transparent'),
        boxShadow: active
          ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 16px -6px var(--gold)'
          : 'none',
        transition: 'all 140ms var(--ease)',
        overflow: 'hidden',
      }}
    >
      {/* Left accent bar — soccer field sideline */}
      {active && (
        <div style={{
          position: 'absolute', left: 0, top: 4, bottom: 4, width: 3,
          background: 'linear-gradient(180deg, var(--gold), var(--fifa-orange))',
          borderRadius: '0 2px 2px 0',
          boxShadow: '0 0 8px var(--gold)',
        }} />
      )}
      {/* Icon tile */}
      <div style={{
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 8,
        background: active
          ? 'linear-gradient(180deg, rgba(245,208,32,0.2), rgba(245,208,32,0.05))'
          : 'linear-gradient(180deg, #201838, #110A24)',
        border: '1px solid ' + (active ? 'rgba(245,208,32,0.3)' : 'var(--hair)'),
        boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        <NavIcon kind={item.icon} active={active} />
      </div>
      <span style={{
        flex: 1,
        fontSize: 13,
        fontWeight: active ? 700 : 600,
        color: active ? 'var(--gold)' : hover ? 'var(--t1)' : 'var(--t2)',
        letterSpacing: '0.005em',
      }}>{item.label}</span>
      {item.badge && (
        <span className="mono" style={{
          fontSize: 10, fontWeight: 700,
          padding: '2px 6px', borderRadius: 999,
          background: 'linear-gradient(180deg, var(--fifa-red), var(--fifa-orange))',
          color: '#fff',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(232,57,44,0.5)',
          minWidth: 18, textAlign: 'center',
        }}>{item.badge}</span>
      )}
    </div>
  );
};

// Crisp soccer-themed icons
const NavIcon = ({ kind, active }) => {
  const c = active ? 'var(--gold)' : 'var(--t2)';
  const common = { fill: 'none', stroke: c, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'home':
      return <svg width="14" height="14" viewBox="0 0 16 16"><path {...common} d="M2 7 L8 2 L14 7 V13 H10 V9 H6 V13 H2 Z"/></svg>;
    case 'live':
      return <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" {...common} /><circle cx="8" cy="8" r="2" fill={c}/></svg>;
    case 'slip':
      return <svg width="14" height="14" viewBox="0 0 16 16"><path {...common} d="M4 2 H12 V14 L10 12 L8 14 L6 12 L4 14 Z M6 6 H10 M6 9 H10"/></svg>;
    case 'trophy':
      return <svg width="14" height="14" viewBox="0 0 16 16"><path {...common} d="M5 3 H11 V7 Q11 10 8 10 Q5 10 5 7 Z M3 3 Q3 6 5 6.5 M13 3 Q13 6 11 6.5 M8 10 V13 M5 13 H11"/></svg>;
    case 'octopus':
      return <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="8" cy="6" r="4" {...common}/><path {...common} d="M4 9 Q3 12 4 14 M6 10 Q5 13 6 14 M8 10 V14 M10 10 Q11 13 10 14 M12 9 Q13 12 12 14"/></svg>;
    case 'card':
      return <svg width="14" height="14" viewBox="0 0 16 16"><rect x="2.5" y="3" width="11" height="10" rx="1.5" {...common}/><path {...common} d="M5 6 H11 M5 9 H9"/></svg>;
    case 'stake':
      return <svg width="14" height="14" viewBox="0 0 16 16"><path {...common} d="M8 2 L2 5 L8 8 L14 5 Z M2 8 L8 11 L14 8 M2 11 L8 14 L14 11"/></svg>;
    case 'doc':
      return <svg width="14" height="14" viewBox="0 0 16 16"><path {...common} d="M4 2 H10 L13 5 V14 H4 Z M10 2 V5 H13 M6 8 H11 M6 11 H11"/></svg>;
    default:
      return null;
  }
};

const ProfileCard = ({ profile }) => (
  <div style={{
    padding: 12,
    borderRadius: 14,
    background: 'linear-gradient(180deg, rgba(139,71,214,0.22), rgba(46,111,230,0.08))',
    border: '1px solid rgba(139,71,214,0.35)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 20px -8px var(--fifa-purple)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: 'conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-red))',
        padding: 2,
        position: 'relative',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: '#1a1030',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src={profile.pfp} width="48" height="48"
               style={{ transform: 'scale(1.4) translateY(4px)' }} />
        </div>
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 12, height: 12, borderRadius: '50%',
          background: 'var(--fifa-lime)',
          border: '2px solid #1a1030',
          boxShadow: '0 0 8px var(--fifa-lime)',
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="display" style={{ fontSize: 14, lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.handle}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
          <FlagRect code={profile.country} w={16} h={11} />
          <span style={{ fontSize: 10, color: 'var(--t3)' }}>Since {profile.joined}</span>
        </div>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--hair)' }}>
      <MiniStat label="Bets" value={profile.bets} color="var(--fifa-teal)" />
      <MiniStat label="Wins" value={profile.wins} color="var(--fifa-lime)" />
      <MiniStat label="ROI" value={`${profile.roi}%`} color="var(--gold)" />
    </div>
  </div>
);

const MiniStat = ({ label, value, color }) => (
  <div style={{ textAlign: 'center' }}>
    <div className="mono display" style={{ fontSize: 14, color, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 8, color: 'var(--t3)', marginTop: 2, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>{label}</div>
  </div>
);

const WalletCard = ({ profile }) => (
  <div style={{
    padding: 12,
    borderRadius: 14,
    background: 'linear-gradient(180deg, #1D1740, #141028)',
    border: '1px solid var(--hair-strong)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 16px -6px rgba(0,0,0,0.6)',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <div className="label" style={{ fontSize: 9 }}>WALLET</div>
      <span className="mono" style={{ fontSize: 9, color: 'var(--t3)' }}>{profile.wallet}</span>
    </div>

    {/* WCI balance */}
    <div style={{
      padding: '8px 10px',
      borderRadius: 9,
      background: 'linear-gradient(90deg, rgba(245,208,32,0.12), transparent)',
      border: '1px solid rgba(245,208,32,0.2)',
      marginBottom: 5,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, var(--fifa-yellow), var(--gold-deep))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.5)',
      }}>🐙</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9, color: 'var(--t3)' }}>WCI</div>
        <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)', lineHeight: 1 }}>{(profile.wci/1000).toFixed(1)}K</div>
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fifa-lime)' }}>+4.2%</div>
    </div>

    {/* USDC balance */}
    <div style={{
      padding: '8px 10px',
      borderRadius: 9,
      background: 'linear-gradient(90deg, rgba(46,111,230,0.12), transparent)',
      border: '1px solid rgba(46,111,230,0.2)',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #4ED1E6, #2E6FE6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 800, fontSize: 11,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.5)',
      }}>$</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 9, color: 'var(--t3)' }}>USDC</div>
        <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fifa-cyan)', lineHeight: 1 }}>{profile.usdc.toFixed(0)}</div>
      </div>
    </div>

    {profile.claimable > 0 && (
      <button style={{
        width: '100%',
        marginTop: 6, padding: '7px 10px',
        borderRadius: 8,
        background: 'linear-gradient(180deg, rgba(159, 214, 52, 0.25), rgba(159, 214, 52, 0.1))',
        border: '1px solid rgba(159, 214, 52, 0.45)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 0 12px -4px var(--fifa-lime)',
        cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 10, color: 'var(--fifa-lime)', fontWeight: 700, letterSpacing: '0.1em' }}>CLAIM</span>
        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fifa-lime)' }}>+${profile.claimable.toFixed(2)}</span>
      </button>
    )}
  </div>
);

const RankCard = ({ profile }) => (
  <div style={{
    padding: 12, borderRadius: 14,
    background: 'linear-gradient(180deg, rgba(0,185,178,0.18), rgba(46,111,230,0.05))',
    border: '1px solid rgba(0,185,178,0.35)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 16px -8px var(--fifa-teal)',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Field-line decoration */}
    <div style={{
      position: 'absolute', right: -20, top: -20, width: 80, height: 80,
      borderRadius: '50%', border: '2px solid rgba(0,185,178,0.15)',
    }} />
    <div className="label" style={{ color: 'var(--fifa-teal)', fontSize: 9 }}>LEADERBOARD RANK</div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 3 }}>
      <div className="display mono" style={{ fontSize: 30, color: 'var(--fifa-cyan)', lineHeight: 1, textShadow: '0 2px 8px rgba(0,185,178,0.4)' }}>#{profile.rank}</div>
      <div style={{ fontSize: 10, color: 'var(--t3)' }}>of {profile.totalRank.toLocaleString()}</div>
    </div>
    <div style={{ marginTop: 6, fontSize: 10, color: 'var(--t2)' }}>
      Top <span className="mono" style={{ color: 'var(--gold)', fontWeight: 700 }}>{((profile.rank/profile.totalRank)*100).toFixed(1)}%</span>
    </div>
    <div className="mono" style={{
      position: 'absolute', right: 8, top: 8,
      fontSize: 9, color: 'var(--fifa-lime)',
      padding: '2px 5px', borderRadius: 4,
      background: 'rgba(159,214,52,0.18)',
      border: '1px solid rgba(159,214,52,0.4)',
      zIndex: 1,
    }}>▲ 12</div>
  </div>
);

// ── Peek Tentacle (right edge, calls bet drawer on hover) ──
const PeekTentacle = ({ onOpen, active }) => (
  <div
    onClick={onOpen}
    onMouseEnter={onOpen}
    style={{
      position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)',
      width: 80, height: 280,
      zIndex: 35,
      cursor: 'pointer',
      pointerEvents: active ? 'none' : 'auto',
    }}>
    <svg viewBox="0 0 80 280" width="80" height="280" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="tentGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B2FA8"/>
          <stop offset="50%" stopColor="#9D52D9"/>
          <stop offset="100%" stopColor="#6B2FA8"/>
        </linearGradient>
        <radialGradient id="suctionG" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFB5A0"/>
          <stop offset="100%" stopColor="#E89070"/>
        </radialGradient>
        <filter id="tentGlow">
          <feGaussianBlur stdDeviation="4"/>
          <feComponentTransfer><feFuncA type="linear" slope="1.5"/></feComponentTransfer>
        </filter>
      </defs>
      <path d="M 80 80 Q 40 100 30 140 Q 20 180 50 210 Q 70 230 80 230"
            stroke="#9D52D9" strokeWidth="36" fill="none" strokeLinecap="round"
            opacity="0.35" filter="url(#tentGlow)">
        <animate attributeName="opacity" values="0.25;0.5;0.25" dur="2.5s" repeatCount="indefinite"/>
      </path>
      <g style={{ transformOrigin: '80px 140px', animation: 'tentacle-peek 3s ease-in-out infinite' }}>
        <path d="M 80 80 Q 35 110 28 150 Q 22 195 52 220 Q 72 232 80 230"
              stroke="url(#tentGrad)" strokeWidth="26" fill="none" strokeLinecap="round" />
        <path d="M 80 80 Q 35 110 28 150 Q 22 195 52 220 Q 72 232 80 230"
              stroke="#4A1D7A" strokeWidth="26" fill="none" strokeLinecap="round" opacity="0.3" />
        {[[68, 92], [42, 112], [30, 165], [42, 210]].map((pts, i) => (
          <circle key={i} cx={pts[0]} cy={pts[1]} r="5" fill="url(#suctionG)" opacity="0.9" />
        ))}
        <circle cx="80" cy="230" r="10" fill="url(#tentGrad)" />
      </g>
      <g transform="translate(10, 140)">
        <rect x="-6" y="-12" width="40" height="24" rx="4" fill="rgba(0,0,0,0.6)" stroke="var(--gold)" strokeWidth="1"/>
        <text x="14" y="4" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--gold)" fontFamily="monospace" letterSpacing="0.1em">BET</text>
      </g>
    </svg>
  </div>
);

// spin keyframe + sidebar scrollbar styling
const _layoutStyle = document.createElement('style');
_layoutStyle.textContent = `
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.sidebar-scroll::-webkit-scrollbar { width: 4px; }
.sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(245,208,32,0.25); border-radius: 2px; }
.sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
`;
document.head.appendChild(_layoutStyle);

Object.assign(window, { TopHeader, LeftSidebar, LogoOrb, PeekTentacle });
