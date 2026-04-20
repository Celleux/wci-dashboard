// dashboard.jsx — (legacy TopNav + PoolBar kept as fallbacks)
// Main layout now lives in layout.jsx (TopHeader, LeftSidebar, PeekTentacle).
// Main match list, stats, panels live in panels.jsx.

// Keep a minimal legacy TopNav for the States Gallery page (no sidebar there).
const TopNav = ({ activeTab, onTab, wciBalance, usdcBalance }) => (
  <nav className="glass" style={{
    position: 'sticky', top: 0, zIndex: 30,
    height: 64, padding: '0 28px',
    display: 'flex', alignItems: 'center', gap: 24,
    borderRadius: 0, borderLeft: 0, borderRight: 0, borderTop: 0,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <img src="assets/logo.png" width="36" height="36" style={{ borderRadius: '50%' }} />
      <div className="display" style={{ fontSize: 18 }}>WCI<span style={{ color: 'var(--t3)', fontWeight: 500, marginLeft: 6 }}>· Dash</span></div>
    </div>
    <div style={{ flex: 1 }} />
    <div className="chip mono" style={{ color: 'var(--gold)' }}>WCI {wciBalance}</div>
    <div className="chip mono" style={{ color: 'var(--fifa-cyan)' }}>${usdcBalance}</div>
  </nav>
);

Object.assign(window, { TopNav });
