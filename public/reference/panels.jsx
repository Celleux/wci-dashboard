// panels.jsx — hero, next match, matches list, scoreboards, footers
// Uses: FlagRect, GROUPS, MATCHES_DATA, LEADERBOARD, TEAM_NAMES, teamGroup

// ── 3D-lifted flag frame ─────────────────────────
const FlagFrame = ({ code, w = 36, h = 24 }) => (
  <div style={{
    width: w + 4, height: h + 4,
    padding: 2,
    borderRadius: 5,
    background: 'linear-gradient(180deg, #2a1f50 0%, #0A0615 100%)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.4), 0 2px 0 rgba(0,0,0,0.5), 0 4px 8px -2px rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>
    <FlagRect code={code} w={w} h={h} />
  </div>
);

// ── Team badge with flag ─────────────────────────
const TeamTile = ({ code, size = 'md' }) => {
  const S = { sm: { box: 44, flag: 32, label: 12 }, md: { box: 64, flag: 48, label: 14 }, lg: { box: 92, flag: 72, label: 20 } }[size];
  const g = teamGroup(code);
  const gColor = g ? `var(--grp-${g.toLowerCase()})` : 'var(--t3)';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: S.box, height: S.box, borderRadius: 14,
        background: `linear-gradient(180deg, ${gColor}, #0A0615)`,
        padding: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.35), 0 4px 0 rgba(0,0,0,0.6), 0 10px 20px -4px ${gColor}`,
        transform: 'perspective(400px) rotateX(4deg)',
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 9,
          background: '#0A0615',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
        }}>
          <FlagRect code={code} w={S.flag} h={S.flag * 2/3} />
        </div>
      </div>
      <span className="display mono" style={{ fontSize: S.label, letterSpacing: '0.05em', color: 'var(--t1)' }}>{code}</span>
    </div>
  );
};

// ── Hero: Paul character card ───────────────────────────
const PaulHeroCard = ({ treatment, reaching }) => (
  <AccentCard accent="var(--fifa-purple)" offset={0}
              style={{ padding: 0, height: 520, overflow: 'visible', position: 'relative',
                       background: 'linear-gradient(180deg, rgba(139, 71, 214, 0.22), rgba(20, 16, 40, 0.95))' }}>
    {/* Pattern layer */}
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden',
      backgroundImage: `url('assets/pattern.jpg')`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      opacity: 0.25, mixBlendMode: 'screen', filter: 'saturate(1.2) brightness(0.9)',
    }} />
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 22,
      background: 'radial-gradient(ellipse at 30% 60%, transparent 0%, rgba(10,6,21,0.6) 80%)',
    }} />

    {/* Rotating rainbow glow behind Paul */}
    <div style={{
      position: 'absolute', inset: '10% 10% -20% -20%',
      background: 'conic-gradient(from 0deg, var(--fifa-red), var(--fifa-yellow), var(--fifa-teal), var(--fifa-purple), var(--fifa-magenta), var(--fifa-red))',
      opacity: 0.18, filter: 'blur(50px)',
      animation: 'spin 30s linear infinite',
      pointerEvents: 'none',
      borderRadius: '50%',
    }} />

    {/* Header */}
    <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 4, maxWidth: '55%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--fifa-lime)', boxShadow: '0 0 12px var(--fifa-lime)' }} />
        <div className="label" style={{ color: 'var(--fifa-lime)' }}>THE ORACLE · LIVE</div>
      </div>
      <div className="display" style={{ fontSize: 64, letterSpacing: '-0.03em', lineHeight: 0.9, marginTop: 6,
        background: 'linear-gradient(180deg, #fff, var(--gold))',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>PAUL</div>
      <div style={{ color: 'var(--t2)', fontSize: 12, marginTop: 8, display: 'flex', gap: 6, alignItems: 'center' }}>
        <span className="mono" style={{ color: 'var(--fifa-lime)', fontWeight: 700 }}>38W</span>
        <span style={{ color: 'var(--t4)' }}>·</span>
        <span className="mono" style={{ color: 'var(--coral)', fontWeight: 700 }}>12L</span>
        <span style={{ color: 'var(--t4)' }}>·</span>
        <span className="mono" style={{ color: 'var(--gold)', fontWeight: 700 }}>76% ROI</span>
      </div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
        <Chip kind="gold" style={{ fontSize: 10, height: 26 }}>78% CONFIDENCE TODAY</Chip>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 999, background: 'rgba(10,6,21,0.6)', border: '1px solid var(--hair-strong)' }}>
          <FlagRect code="USA" w={18} h={12} />
          <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>USA</span>
          <span style={{ fontSize: 10, color: 'var(--t3)' }}>vs</span>
          <FlagRect code="TUR" w={18} h={12} />
          <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>TUR</span>
        </div>
      </div>
    </div>

    {/* Paul — positioned to the right so text has space on left */}
    <div style={{
      position: 'absolute', right: -20, bottom: 0, top: 40,
      display: 'flex',
      alignItems: 'flex-end', justifyContent: 'flex-end',
      zIndex: 2,
      pointerEvents: 'none',
    }}>
      <div style={{ transform: 'scale(0.85)', transformOrigin: 'bottom right' }}>
        <PaulHero treatment={treatment} reaching={reaching} />
      </div>
    </div>

    {/* Bottom stats bar */}
    <div style={{
      position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 3,
      display: 'flex', gap: 8,
    }}>
      {[
        ['STREAK', '🔥 5', 'var(--fifa-orange)'],
        ['TOP %', '0.1%', 'var(--gold)'],
        ['FOLLOWERS', '12.8K', 'var(--fifa-teal)'],
      ].map(([l, v, c]) => (
        <div key={l} style={{
          flex: 1, padding: '8px 10px',
          background: 'rgba(10, 6, 21, 0.75)',
          border: `1px solid ${c}33`,
          borderRadius: 10,
          backdropFilter: 'blur(10px)',
        }}>
          <div className="label" style={{ fontSize: 9, color: c }}>{l}</div>
          <div className="display mono" style={{ fontSize: 16, color: '#fff', marginTop: 2 }}>{v}</div>
        </div>
      ))}
    </div>
  </AccentCard>
);

// ── Next Match card (hero card right) ───────────────────
const NextMatchCard = ({ onPickOutcome, paulTentacleRef }) => {
  const kickoffTarget = React.useMemo(() => Date.now() + 2 * 3600 * 1000 + 14 * 60 * 1000 + 33 * 1000, []);
  const pools = [420, 180, 340];
  const total = pools[0] + pools[1] + pools[2];

  return (
    <AccentCard accent="var(--fifa-red)" offset={1}
                style={{ padding: 28, height: 520, position: 'relative', overflow: 'hidden' }}>
      {/* decorative group stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4,
        background: 'linear-gradient(90deg, var(--grp-d), var(--grp-a))',
        boxShadow: '0 0 20px var(--grp-d)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="group-tile" style={{ '--group-color': 'var(--grp-d)', width: 22, height: 22, fontSize: 12, borderRadius: 6 }}>D</div>
            <div className="label">NEXT KICK · GROUP D · MATCHDAY 2</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16 }}>
            <TeamTile code="USA" size="md" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div className="display" style={{ fontSize: 14, color: 'var(--t3)', fontWeight: 600 }}>VS</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--t4)' }}>SoFi</div>
            </div>
            <TeamTile code="TUR" size="md" />
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <Chip kind="gold" style={{ fontSize: 10, height: 26 }}>PAUL'S PICK</Chip>
          <div className="display mono" style={{ fontSize: 32, marginTop: 6, color: 'var(--gold)', letterSpacing: '-0.02em', lineHeight: 1 }}>USA</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fifa-lime)', marginTop: 4 }}>Market pool split 54/21/25</div>
        </div>
      </div>

      {/* Countdown */}
      <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--hair)' }}>
        <div className="label" style={{ marginBottom: 8 }}>KICKOFF COUNTDOWN</div>
        <Countdown target={kickoffTarget} />
      </div>

      {/* Confidence bar */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div className="label">PAUL'S CONFIDENCE</div>
          <span className="mono" style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 700 }}>78%</span>
        </div>
        <ConfidenceBar value={78} color="var(--gold)" />
      </div>

      {/* Outcomes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 20 }}>
        <OutcomeBtn label="USA" pool={pools[0]} total={total} accent="var(--grp-d)"
                    onClick={() => onPickOutcome({ match: { teams: ['USA','TUR'], id: 'next', group: 'D' }, outcome: 'USA', side: 'home' })} />
        <OutcomeBtn label="DRAW" pool={pools[1]} total={total} accent="var(--fifa-yellow)"
                    onClick={() => onPickOutcome({ match: { teams: ['USA','TUR'], id: 'next', group: 'D' }, outcome: 'DRAW', side: 'draw' })} />
        <OutcomeBtn label="TUR" pool={pools[2]} total={total} accent="var(--fifa-red)"
                    onClick={() => onPickOutcome({ match: { teams: ['USA','TUR'], id: 'next', group: 'D' }, outcome: 'TUR', side: 'away' })} />
      </div>

      <button className="btn-3d" ref={paulTentacleRef}
              onClick={() => onPickOutcome({ match: { teams: ['USA','TUR'], id: 'next', group: 'D' }, outcome: 'USA', side: 'home' })}
              style={{ width: '100%', padding: '16px', marginTop: 14, fontSize: 15 }}>
        🐙 PLACE BET · FOLLOW PAUL →
      </button>
    </AccentCard>
  );
};

// ── Colorful, group-aware Match Row ────────────────
const MatchRow = ({ match, tab, expanded, onExpand, onPickOutcome }) => {
  const gColor = `var(--grp-${match.group.toLowerCase()})`;
  const total = match.pools ? match.pools[0] + match.pools[1] + match.pools[2] : 1;

  return (
    <div style={{
      borderRadius: 18,
      border: `1px solid ${expanded ? gColor : 'var(--hair-strong)'}`,
      background: `linear-gradient(180deg, rgba(41, 31, 82, 0.55), rgba(20, 16, 40, 0.92))`,
      overflow: 'hidden',
      transition: 'all 240ms var(--ease)',
      boxShadow: expanded
        ? `0 0 0 1px ${gColor}, 0 0 80px -10px ${gColor}, inset 0 1px 0 rgba(255,255,255,0.06), 0 14px 32px -10px rgba(0,0,0,0.8)`
        : 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4), 0 4px 0 rgba(0,0,0,0.5), 0 10px 20px -6px rgba(0,0,0,0.55)',
      position: 'relative',
      transform: expanded ? 'translateY(-2px)' : 'none',
    }}>
      {/* Group accent stripe — thicker, glowing */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 5,
        background: `linear-gradient(180deg, ${gColor}, ${gColor}aa)`,
        boxShadow: expanded ? `4px 0 24px ${gColor}` : `2px 0 8px ${gColor}66`,
      }} />

      <div onClick={onExpand} style={{ padding: '16px 20px 16px 26px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Group tile — BIGGER */}
        <div className="group-tile" style={{ '--group-color': gColor, width: 36, height: 36, fontSize: 16, borderRadius: 9, flexShrink: 0 }}>{match.group}</div>

        {/* Status */}
        <div style={{ width: 90, flexShrink: 0 }}>
          {tab === 'live' && <Chip kind="live" style={{ fontSize: 10, height: 22 }}>LIVE · {match.minute}'</Chip>}
          {tab === 'upcoming' && <Chip style={{ fontSize: 10, height: 22, color: 'var(--t2)' }}><span className="mono">T−{match.kick}</span></Chip>}
          {tab === 'final' && <Chip style={{ fontSize: 10, height: 22, color: match.result === 'W' ? 'var(--fifa-lime)' : 'var(--coral)', borderColor: match.result === 'W' ? 'rgba(159,214,52,0.3)' : 'rgba(232,57,44,0.3)' }}>FINAL · {match.result === 'W' ? 'WON' : 'LOST'}</Chip>}
        </div>

        {/* Teams — BIGGER flags, framed */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
          <FlagFrame code={match.teams[0]} w={36} h={24} />
          <span className="display mono" style={{ fontSize: 20, color: 'var(--t1)' }}>{match.teams[0]}</span>
          <span style={{ color: 'var(--t4)', fontSize: 13, margin: '0 6px', fontWeight: 600 }}>vs</span>
          <span className="display mono" style={{ fontSize: 20, color: 'var(--t1)' }}>{match.teams[1]}</span>
          <FlagFrame code={match.teams[1]} w={36} h={24} />
          <span style={{ fontSize: 11, color: 'var(--t3)', marginLeft: 10 }}>· {match.venue}</span>
        </div>

        {/* Score */}
        {match.score && (
          <div className="display mono" style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {match.score[0]}<span style={{ color: 'var(--t4)', margin: '0 6px' }}>–</span>{match.score[1]}
          </div>
        )}

        {/* Paul pick */}
        {match.pick && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 10px 4px 8px', borderRadius: 999,
            background: 'linear-gradient(180deg, rgba(245,208,32,0.2), rgba(245,208,32,0.05))',
            border: '1px solid rgba(245,208,32,0.35)',
          }}>
            <span style={{ fontSize: 14 }}>🐙</span>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)' }}>{match.pick}</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--t2)' }}>{match.conf}%</span>
          </div>
        )}

        <svg width="14" height="14" viewBox="0 0 16 16" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 200ms', color: 'var(--t3)', flexShrink: 0 }}>
          <path d="M 4 6 L 8 10 L 12 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {expanded && match.pools && (
        <div style={{ padding: '0 18px 18px 22px', borderTop: '1px solid var(--hair)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, marginBottom: 6, fontSize: 11, color: 'var(--t3)' }}>
            <span className="label">POOL DISTRIBUTION</span>
            <span className="mono" style={{ color: 'var(--gold)', fontWeight: 700 }}>${total.toLocaleString()}K TOTAL</span>
          </div>

          {/* Segmented pool bar with colors */}
          <div className="pool-seg" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <span style={{ width: `${(match.pools[0]/total)*100}%`, background: `linear-gradient(180deg, ${gColor}, ${gColor}88)`, float: 'left' }} />
            <span style={{ width: `${(match.pools[1]/total)*100}%`, background: 'linear-gradient(180deg, var(--fifa-yellow), var(--gold-deep))', float: 'left' }} />
            <span style={{ width: `${(match.pools[2]/total)*100}%`, background: 'linear-gradient(180deg, var(--fifa-magenta), var(--fifa-pink))', float: 'left' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14 }}>
            <OutcomeBtn label={match.teams[0]} pool={match.pools[0]} total={total} accent={gColor}
                        onClick={(e) => { e.stopPropagation(); onPickOutcome({ match, outcome: match.teams[0], side: 'home' }); }} />
            <OutcomeBtn label="DRAW" pool={match.pools[1]} total={total} accent="var(--fifa-yellow)"
                        onClick={(e) => { e.stopPropagation(); onPickOutcome({ match, outcome: 'DRAW', side: 'draw' }); }} />
            <OutcomeBtn label={match.teams[1]} pool={match.pools[2]} total={total} accent="var(--fifa-magenta)"
                        onClick={(e) => { e.stopPropagation(); onPickOutcome({ match, outcome: match.teams[1], side: 'away' }); }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t3)', marginTop: 10 }}>
            <span>Over/Under 2.5 · Total Goals · pool <span className="mono">${Math.round(total * 0.45)}K</span></span>
            <span>Both to score · <span className="mono">${Math.round(total * 0.28)}K</span></span>
            <span>Correct score · <span className="mono">${Math.round(total * 0.14)}K</span></span>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Outcome button ─────────────────
const OutcomeBtn = ({ label, pool, total, accent, onClick }) => {
  const pct = (pool / total) * 100;
  const implied = (total / pool).toFixed(2);
  return (
    <button className="btn-outcome" onClick={onClick}
            style={{ '--outcome-accent': accent, padding: 12 }}>
      <div style={{ fontSize: 10, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{label}</div>
      <div className="display mono" style={{ fontSize: 22, fontWeight: 800, color: accent, marginTop: 2, letterSpacing: '-0.01em' }}>{implied}×</div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--t3)', marginTop: 2 }}>${pool}K · {pct.toFixed(0)}%</div>
    </button>
  );
};

// ── Matches list ─────────────────
const MatchesList = ({ onPickOutcome, expanded, setExpanded }) => {
  const [tab, setTab] = React.useState('upcoming');
  const [groupFilter, setGroupFilter] = React.useState('ALL');
  let items = MATCHES_DATA[tab] || [];
  if (groupFilter !== 'ALL') items = items.filter(m => m.group === groupFilter);

  return (
    <AccentCard accent="var(--fifa-teal)" offset={2} style={{ padding: 24, minHeight: 640 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h3 className="card-title" style={{ fontSize: 22 }}>Matches</h3>
          <div style={{ fontSize: 12, color: 'var(--t3)', marginTop: 2 }}>FIFA World Cup 26™ · Group Stage</div>
        </div>
        <div style={{ display: 'flex', gap: 3, padding: 4, background: 'rgba(0,0,0,0.4)', borderRadius: 12, boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }}>
          {[['live', `Live (${MATCHES_DATA.live.length})`],['upcoming', `Upcoming (${MATCHES_DATA.upcoming.length})`],['final', `Final (${MATCHES_DATA.final.length})`]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
                    style={{
                      padding: '8px 16px', border: 'none', cursor: 'pointer',
                      borderRadius: 8, fontSize: 12, fontWeight: 700,
                      background: tab === k ? 'linear-gradient(180deg, #1D1740, #141028)' : 'transparent',
                      color: tab === k ? 'var(--gold)' : 'var(--t3)',
                      boxShadow: tab === k ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.4)' : 'none',
                      transition: 'all 160ms',
                    }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Group filter scroller */}
      <div style={{ display: 'flex', gap: 4, overflowX: 'auto', marginBottom: 14, paddingBottom: 4 }}>
        {['ALL', ...Object.keys(GROUPS)].map(g => {
          const gColor = g === 'ALL' ? 'var(--t2)' : `var(--grp-${g.toLowerCase()})`;
          const active = groupFilter === g;
          return (
            <button key={g} onClick={() => setGroupFilter(g)} style={{
              flexShrink: 0, padding: '6px 10px', borderRadius: 8,
              border: `1px solid ${active ? gColor : 'var(--hair)'}`,
              background: active ? `${gColor}22` : 'transparent',
              color: active ? gColor : 'var(--t3)',
              fontSize: 11, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.05em',
            }}>{g === 'ALL' ? 'ALL' : `GROUP ${g}`}</button>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(m => (
          <MatchRow key={m.id} match={m} tab={tab}
                    expanded={expanded === m.id}
                    onExpand={() => setExpanded(expanded === m.id ? null : m.id)}
                    onPickOutcome={onPickOutcome} />
        ))}
        {items.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--t3)' }}>No matches.</div>
        )}
      </div>
    </AccentCard>
  );
};

// ── Stats strip ──────────────────
const StatsStrip = ({ state }) => {
  const pnl = state.pnl;
  const pnlPositive = pnl >= 0;
  const stats = [
    { label: 'Total Handle', value: 1247830, prefix: '$', color: 'var(--fifa-red)',    spark: [20,24,22,28,30,32,38,42,40,48,52,58] },
    { label: 'Active Bettors', value: 2847,  color: 'var(--fifa-purple)', spark: [10,14,12,18,22,24,28,30,32,30,34,38] },
    { label: 'WCI Burned',    value: 412380, color: 'var(--fifa-orange)', spark: [5,8,10,12,14,18,22,24,28,32,38,44] },
    { label: 'Your P&L', value: Math.abs(pnl), prefix: pnlPositive ? '+$' : '-$',
      color: pnlPositive ? 'var(--fifa-lime)' : 'var(--coral)',
      spark: pnlPositive ? [2,1,3,2,5,4,6,8,7,10,12,14] : [14,12,10,8,6,5,4,3,2,1,0,-2] },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      {stats.map(s => (
        <div key={s.label} className="stat-tile" style={{ '--tile-color': s.color }}>
          <div className="label">{s.label}</div>
          <div className="display mono" style={{ fontSize: 32, marginTop: 6, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}>
            <CountUp to={s.value} prefix={s.prefix || ''} />
          </div>
          <div style={{ marginTop: 10, color: s.color }}>
            <Sparkline points={s.spark} color={s.color} height={26} width={200} />
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Paul's Scoreboard (3 stacked cards) ─────────
const PaulsScoreboard = () => {
  const points = [0, 1, 2, 1, 3, 4, 5, 4, 6, 7, 8, 9, 10, 12, 14, 15, 17, 18, 20, 22, 24, 26];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <AccentCard accent="var(--fifa-purple)" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 className="card-title">Oracle Prediction</h3>
          <Chip kind="gold" style={{ fontSize: 10, height: 22 }}>LIVE</Chip>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 88, height: 88, flexShrink: 0, animation: 'breathe 3s ease-in-out infinite' }}>
            <img src="assets/chibi_oracle.png" width="88" height="88" style={{ filter: 'drop-shadow(0 8px 16px rgba(139,71,214,0.6))' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--t3)' }}>TODAY'S TOP PICK</div>
            <div className="display mono" style={{ fontSize: 24, marginTop: 2, color: 'var(--gold)' }}>USA</div>
            <div style={{ fontSize: 11, color: 'var(--t2)', marginTop: 4 }}>Over market by <span className="mono" style={{ color: 'var(--fifa-lime)', fontWeight: 700 }}>+12%</span></div>
          </div>
          <svg width="64" height="64" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
            <circle cx="36" cy="36" r="28" fill="none" stroke="var(--gold)" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 28 * 0.78} ${2 * Math.PI * 28}`}
                    strokeLinecap="round"
                    transform="rotate(-90 36 36)"
                    style={{ filter: 'drop-shadow(0 0 6px var(--gold))' }} />
            <text x="36" y="40" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="JetBrains Mono">78%</text>
          </svg>
        </div>
      </AccentCard>

      <AccentCard accent="var(--fifa-orange)" style={{ padding: 18 }}>
        <h3 className="card-title" style={{ marginBottom: 10 }}>Paul's Confession</h3>
        <div style={{
          height: 110, borderRadius: 12,
          background: `linear-gradient(135deg, rgba(255,122,31,0.25), rgba(139,71,214,0.2)), url('assets/chibi_galaxy.png')`,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right -6px center',
          border: '1px solid var(--hair)',
          padding: 14,
          position: 'relative',
          cursor: 'pointer',
        }}>
          <div className="label" style={{ color: 'var(--fifa-orange)' }}>T−120 CLIP · 2:08</div>
          <div style={{ fontSize: 12, color: 'var(--t1)', marginTop: 4, maxWidth: '55%', fontWeight: 600 }}>Paul admits his least-confident pick of the day.</div>
          <div style={{ position: 'absolute', bottom: 10, right: 14, width: 36, height: 36, borderRadius: '50%',
                        background: 'linear-gradient(180deg, var(--fifa-yellow), var(--gold-deep))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.4), 0 4px 12px rgba(245,208,32,0.6)' }}>
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M 3 2 L 10 6 L 3 10 Z" fill="#000"/></svg>
          </div>
        </div>
      </AccentCard>

      <AccentCard accent="var(--fifa-lime)" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 className="card-title">Paul's Ledger</h3>
          <div className="mono" style={{ color: 'var(--fifa-lime)', fontSize: 13, fontWeight: 800 }}>+26 net</div>
        </div>
        <div style={{ color: 'var(--fifa-lime)' }}>
          <Sparkline points={points} color="var(--fifa-lime)" height={52} width={300} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--t3)', marginTop: 8 }}>
          <span>MD 1</span>
          <span>MD 12 · Today</span>
        </div>
      </AccentCard>
    </div>
  );
};

// ── Premium Leaderboard ──────────
const TentacleLeaderboard = () => (
  <AccentCard accent="var(--fifa-purple)" style={{ padding: 20 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
      <div>
        <h3 className="card-title">🐙 Tentacle Oracles</h3>
        <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>Top oracles · 7d</div>
      </div>
      <Chip kind="gold" style={{ fontSize: 10 }}>SEASON 1</Chip>
    </div>

    {/* Podium top 3 */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: 8, marginBottom: 14, alignItems: 'end' }}>
      {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((u, i) => {
        const height = [88, 110, 72][i];
        const rank = [2, 1, 3][i];
        const medal = ['🥈', '🥇', '🥉'][i];
        const color = ['var(--t2)', 'var(--gold)', '#CD7F32'][i];
        return (
          <div key={u.handle} style={{
            height, padding: '10px 6px',
            background: `linear-gradient(180deg, ${color}22, ${color}05)`,
            border: `1px solid ${color}44`,
            borderRadius: 12, textAlign: 'center',
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.4), 0 0 20px -8px ${color}`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 4,
          }}>
            <div style={{ fontSize: 20 }}>{medal}</div>
            <FlagRect code={u.country} w={20} h={14} />
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--t1)' }}>{u.handle.length > 10 ? u.handle.slice(0, 9) + '…' : u.handle}</div>
            <div className="mono" style={{ fontSize: 11, color, fontWeight: 700 }}>+${(u.pnl/1000).toFixed(1)}K</div>
          </div>
        );
      })}
    </div>

    {/* Rest of leaderboard */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {LEADERBOARD.slice(3).map(u => (
        <div key={u.handle} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px',
          background: u.you ? 'linear-gradient(90deg, rgba(245,208,32,0.12), rgba(245,208,32,0.02))' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${u.you ? 'rgba(245,208,32,0.35)' : 'var(--hair)'}`,
          borderRadius: 10,
          boxShadow: u.you ? '0 0 16px -8px var(--gold)' : 'none',
        }}>
          <span className="mono" style={{ color: u.you ? 'var(--gold)' : 'var(--t3)', fontSize: 11, width: 22, fontWeight: 700 }}>#{u.rank}</span>
          <FlagRect code={u.country} w={18} h={12} />
          <span style={{ flex: 1, fontSize: 12, fontWeight: u.you ? 700 : 500, color: u.you ? 'var(--gold)' : 'var(--t1)' }}>{u.handle}</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--t3)' }}>{u.roi}%</span>
          {u.streak > 0 && <span className="mono" style={{ fontSize: 10, color: 'var(--fifa-orange)' }}>🔥{u.streak}</span>}
          <span className="mono" style={{ fontSize: 11, color: u.pnl >= 0 ? 'var(--fifa-lime)' : 'var(--coral)', fontWeight: 700, width: 60, textAlign: 'right' }}>
            {u.pnl >= 0 ? '+' : '-'}${(Math.abs(u.pnl)/1000).toFixed(1)}K
          </span>
        </div>
      ))}
    </div>
  </AccentCard>
);

// ── Right rail ──────────
const RightRail = ({ state, onClaim }) => {
  const [betsTab, setBetsTab] = React.useState('active');
  const activeBets = state.activeBets;
  const settledBets = MATCHES_DATA.final;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <AccentCard accent="var(--fifa-yellow)" style={{ padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 className="card-title">My Bets</h3>
          <div style={{ display: 'flex', gap: 2, padding: 3, background: 'rgba(0,0,0,0.35)', borderRadius: 8 }}>
            {[['active', `Active (${activeBets.length})`], ['settled', `Settled (${settledBets.length})`]].map(([k, l]) => (
              <button key={k} onClick={() => setBetsTab(k)}
                      style={{
                        padding: '4px 10px', border: 'none', cursor: 'pointer',
                        borderRadius: 6, fontSize: 11, fontWeight: 600,
                        background: betsTab === k ? 'linear-gradient(180deg, #1D1740, #141028)' : 'transparent',
                        color: betsTab === k ? 'var(--gold)' : 'var(--t3)',
                      }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {(betsTab === 'active' ? activeBets : settledBets).map((b, i) => (
            <BetRow key={i} bet={b} settled={betsTab === 'settled'} />
          ))}
          {(betsTab === 'active' ? activeBets : settledBets).length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--t3)', fontSize: 12 }}>
              No {betsTab} bets yet.
            </div>
          )}
        </div>
        {state.claimable > 0 && (
          <button className="btn-3d" onClick={onClaim}
                  style={{ width: '100%', marginTop: 12, padding: '12px', fontSize: 13 }}>
            CLAIM ${state.claimable.toFixed(2)}
          </button>
        )}
      </AccentCard>

      <TentacleLeaderboard />
    </div>
  );
};

const BetRow = ({ bet, settled }) => {
  const g = bet.teams ? teamGroup(bet.teams[0]) : null;
  const gColor = g ? `var(--grp-${g.toLowerCase()})` : 'var(--t3)';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
      background: 'rgba(0,0,0,0.3)', borderRadius: 10, border: '1px solid var(--hair)',
      borderLeft: `3px solid ${gColor}`,
    }}>
      <FlagRect code={bet.teams?.[0]} w={16} h={11} />
      <FlagRect code={bet.teams?.[1]} w={16} h={11} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: 'var(--t1)', fontWeight: 600 }}>
          {bet.teams ? `${bet.teams[0]} vs ${bet.teams[1]}` : 'Match'}
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--t3)' }}>
          {bet.outcome || bet.teams?.[0]} · ${bet.stake}
        </div>
      </div>
      {settled ? (
        <div className="mono" style={{
          fontSize: 13, fontWeight: 800,
          color: bet.result === 'W' ? 'var(--fifa-lime)' : 'var(--coral)',
        }}>
          {bet.result === 'W' ? `+$${bet.payout.toFixed(2)}` : `–$${bet.stake}`}
        </div>
      ) : (
        <div className="mono" style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>
          → ${bet.potential?.toFixed(2) || '—'}
        </div>
      )}
    </div>
  );
};

// ── Footer marquee ──────────────
const TentacleFooter = () => {
  const items = [
    ['BRA', '-$42.1K'], ['ENG', '-$38.4K'], ['JPN', '-$29.8K'],
    ['ITA', '-$24.2K'], ['MEX', '-$18.9K'], ['POR', '-$14.3K'],
    ['NED', '-$11.7K'], ['ARG', '-$8.1K'], ['KOR', '-$6.9K'],
    ['FRA', '-$4.2K'], ['GER', '-$2.8K'], ['ESP', '+$1.9K'],
    ['BEL', '+$3.4K'], ['URU', '-$5.6K'], ['CRO', '-$7.2K'],
  ];
  const renderItems = (keyPfx) => items.map((it, i) => (
    <div key={keyPfx + i} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '6px 14px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid var(--hair)',
      fontSize: 12, flexShrink: 0,
    }}>
      <FlagRect code={it[0]} w={20} h={14} />
      <span style={{ color: 'var(--t1)', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{it[0]}</span>
      <span className="mono" style={{
        color: it[1].startsWith('+') ? 'var(--fifa-lime)' : 'var(--coral)',
        fontWeight: 800, fontSize: 12,
      }}>{it[1]}</span>
    </div>
  ));
  return (
    <div style={{
      position: 'relative',
      height: 56,
      borderRadius: 16,
      background: 'linear-gradient(90deg, rgba(232,57,44,0.08), rgba(139,71,214,0.08), rgba(232,57,44,0.08))',
      border: '1px solid var(--hair-strong)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 20px -8px rgba(0,0,0,0.6)',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center',
    }}>
      {/* Left: LIVE badge */}
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 16px', height: '100%',
        borderRight: '1px solid var(--hair-strong)',
        background: 'linear-gradient(90deg, rgba(232,57,44,0.2), transparent)',
        zIndex: 2,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--fifa-red)',
          boxShadow: '0 0 12px var(--fifa-red)',
          animation: 'pulse-dot 1.2s ease-in-out infinite',
        }} />
        <span className="label" style={{ color: 'var(--fifa-red)', fontSize: 10, letterSpacing: '0.25em' }}>🐙 WHALE TICKER · LIVE</span>
      </div>

      {/* Marquee area */}
      <div style={{
        flex: 1, overflow: 'hidden', height: '100%',
        maskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="marquee" style={{ gap: 10, alignItems: 'center' }}>
          {renderItems('a')}
          {renderItems('b')}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PaulHeroCard, NextMatchCard, MatchesList, StatsStrip, PaulsScoreboard, RightRail, TentacleFooter, TentacleLeaderboard, TeamTile });
