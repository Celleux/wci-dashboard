// data.jsx — FIFA 26 groups + realistic upcoming matches

// Group colors match the infographic 1:1
const GROUPS = {
  A: { color: 'var(--grp-a)', teams: ['MEX', 'RSA', 'KOR', 'CZE'] },
  B: { color: 'var(--grp-b)', teams: ['CAN', 'BIH', 'QAT', 'SUI'] },
  C: { color: 'var(--grp-c)', teams: ['BRA', 'MAR', 'HAI', 'SCO'] },
  D: { color: 'var(--grp-d)', teams: ['USA', 'PAR', 'AUS', 'TUR'] },
  E: { color: 'var(--grp-e)', teams: ['GER', 'CUW', 'CIV', 'ECU'] },
  F: { color: 'var(--grp-f)', teams: ['NED', 'JPN', 'SWE', 'TUN'] },
  G: { color: 'var(--grp-g)', teams: ['BEL', 'EGY', 'IRN', 'NZL'] },
  H: { color: 'var(--grp-h)', teams: ['ESP', 'CPV', 'KSA', 'URU'] },
  I: { color: 'var(--grp-i)', teams: ['FRA', 'SEN', 'IRQ', 'NOR'] },
  J: { color: 'var(--grp-j)', teams: ['ARG', 'ALG', 'AUT', 'JOR'] },
  K: { color: 'var(--grp-k)', teams: ['POR', 'COD', 'UZB', 'COL'] },
  L: { color: 'var(--grp-l)', teams: ['ENG', 'CRO', 'GHA', 'PAN'] },
};

// Team color pairs (for badge gradients)
const TEAM_COLORS = {
  MEX: ['#006341', '#CE1126'], RSA: ['#007749', '#FFB81C'], KOR: ['#FFFFFF', '#CD2E3A'], CZE: ['#D7141A', '#11457E'],
  CAN: ['#FF0000', '#FFFFFF'], BIH: ['#002F6C', '#FECB00'], QAT: ['#8A1538', '#FFFFFF'], SUI: ['#FF0000', '#FFFFFF'],
  BRA: ['#FEDB00', '#009B3A'], MAR: ['#C1272D', '#006233'], HAI: ['#00209F', '#D21034'], SCO: ['#0065BF', '#FFFFFF'],
  USA: ['#B22234', '#0B1F3F'], PAR: ['#D52B1E', '#0038A8'], AUS: ['#00843D', '#FFCD00'], TUR: ['#E30A17', '#FFFFFF'],
  GER: ['#000000', '#FFCE00'], CUW: ['#002B7F', '#F9E814'], CIV: ['#FF8200', '#009A44'], ECU: ['#FFD100', '#E8112D'],
  NED: ['#F36C21', '#21468B'], JPN: ['#FFFFFF', '#BC002D'], SWE: ['#006AA7', '#FECC00'], TUN: ['#E70013', '#FFFFFF'],
  BEL: ['#000000', '#FAE042'], EGY: ['#CE1126', '#000000'], IRN: ['#239F40', '#DA0000'], NZL: ['#0C2340', '#FFFFFF'],
  ESP: ['#C60B1E', '#FFC400'], CPV: ['#003893', '#CF2027'], KSA: ['#006C35', '#FFFFFF'], URU: ['#0038A8', '#FFFFFF'],
  FRA: ['#0055A4', '#EF4135'], SEN: ['#00853F', '#FDEF42'], IRQ: ['#007A3D', '#CE1126'], NOR: ['#EF2B2D', '#002868'],
  ARG: ['#74ACDF', '#FFFFFF'], ALG: ['#006233', '#FFFFFF'], AUT: ['#ED2939', '#FFFFFF'], JOR: ['#000000', '#007A3D'],
  POR: ['#FF0000', '#046A38'], COD: ['#007FFF', '#F7D618'], UZB: ['#1EB53A', '#0099B5'], COL: ['#FCD116', '#003893'],
  ENG: ['#FFFFFF', '#CE1124'], CRO: ['#FF0000', '#FFFFFF'], GHA: ['#FCD116', '#006B3F'], PAN: ['#D21034', '#005293'],
};

const TEAM_NAMES = {
  MEX: 'Mexico', RSA: 'South Africa', KOR: 'Korea Republic', CZE: 'Czechia',
  CAN: 'Canada', BIH: 'Bosnia', QAT: 'Qatar', SUI: 'Switzerland',
  BRA: 'Brazil', MAR: 'Morocco', HAI: 'Haiti', SCO: 'Scotland',
  USA: 'USA', PAR: 'Paraguay', AUS: 'Australia', TUR: 'Türkiye',
  GER: 'Germany', CUW: 'Curaçao', CIV: "Côte d'Ivoire", ECU: 'Ecuador',
  NED: 'Netherlands', JPN: 'Japan', SWE: 'Sweden', TUN: 'Tunisia',
  BEL: 'Belgium', EGY: 'Egypt', IRN: 'Iran', NZL: 'New Zealand',
  ESP: 'Spain', CPV: 'Cape Verde', KSA: 'Saudi Arabia', URU: 'Uruguay',
  FRA: 'France', SEN: 'Senegal', IRQ: 'Iraq', NOR: 'Norway',
  ARG: 'Argentina', ALG: 'Algeria', AUT: 'Austria', JOR: 'Jordan',
  POR: 'Portugal', COD: 'DR Congo', UZB: 'Uzbekistan', COL: 'Colombia',
  ENG: 'England', CRO: 'Croatia', GHA: 'Ghana', PAN: 'Panama',
};

// Find which group a team is in
const teamGroup = (code) => {
  for (const [g, {teams}] of Object.entries(GROUPS)) if (teams.includes(code)) return g;
  return null;
};

// Stadiums (FWC26 venues, generic names to avoid IP issues — these are location-based)
const VENUES = [
  'MetLife, East Rutherford', 'AT&T, Arlington', 'SoFi, Inglewood',
  'Mercedes, Atlanta', 'BMO, Toronto', 'BC Place, Vancouver',
  'Estadio Azteca, Mexico City', 'Akron, Guadalajara', 'Lumen, Seattle',
  'Gillette, Boston', 'NRG, Houston', 'Lincoln, Philadelphia',
  'Arrowhead, Kansas City', 'Levi\'s, Bay Area', 'BBVA, Monterrey',
  'Hard Rock, Miami',
];

// Upcoming & live matches (hand-curated realistic ones, MD1/MD2/MD3 group stage)
const MATCHES_DATA = {
  live: [
    { id: 'l1', teams: ['USA', 'TUR'], group: 'D', minute: 67, score: [1, 1],
      pools: [420, 180, 340], pick: 'USA', conf: 78, venue: 'SoFi, Inglewood', md: 'MD2' },
    { id: 'l2', teams: ['BRA', 'SCO'], group: 'C', minute: 34, score: [2, 0],
      pools: [610, 210, 180], pick: 'BRA', conf: 88, venue: 'Estadio Azteca, Mexico City', md: 'MD2' },
    { id: 'l3', teams: ['FRA', 'NOR'], group: 'I', minute: 82, score: [2, 2],
      pools: [510, 250, 380], pick: 'FRA', conf: 62, venue: 'MetLife, East Rutherford', md: 'MD2' },
  ],
  upcoming: [
    { id: 'u1', teams: ['ENG', 'CRO'], group: 'L', kick: '2h 14m', kickMs: 2*3600e3 + 14*60e3,
      pools: [380, 220, 360], pick: 'ENG', conf: 54, venue: 'AT&T, Arlington', md: 'MD1' },
    { id: 'u2', teams: ['ARG', 'AUT'], group: 'J', kick: '5h 02m', kickMs: 5*3600e3 + 2*60e3,
      pools: [620, 150, 140], pick: 'ARG', conf: 84, venue: 'Mercedes, Atlanta', md: 'MD1' },
    { id: 'u3', teams: ['GER', 'ECU'], group: 'E', kick: '8h 40m', kickMs: 8*3600e3 + 40*60e3,
      pools: [420, 180, 260], pick: 'GER', conf: 69, venue: 'Gillette, Boston', md: 'MD1' },
    { id: 'u4', teams: ['NED', 'JPN'], group: 'F', kick: '1d 3h', kickMs: 27*3600e3,
      pools: [310, 180, 290], pick: 'NED', conf: 58, venue: 'Lumen, Seattle', md: 'MD1' },
    { id: 'u5', teams: ['POR', 'COL'], group: 'K', kick: '1d 8h', kickMs: 32*3600e3,
      pools: [420, 160, 380], pick: 'POR', conf: 61, venue: 'NRG, Houston', md: 'MD2' },
    { id: 'u6', teams: ['ESP', 'URU'], group: 'H', kick: '1d 11h', kickMs: 35*3600e3,
      pools: [510, 180, 220], pick: 'ESP', conf: 74, venue: 'BMO, Toronto', md: 'MD2' },
    { id: 'u7', teams: ['BEL', 'IRN'], group: 'G', kick: '2d 2h', kickMs: 50*3600e3,
      pools: [360, 210, 180], pick: 'BEL', conf: 66, venue: 'BC Place, Vancouver', md: 'MD2' },
  ],
  final: [
    { id: 'f1', teams: ['MEX', 'KOR'], group: 'A', score: [2, 1], result: 'W', stake: 50, payout: 92.37, venue: 'Estadio Azteca' },
    { id: 'f2', teams: ['CAN', 'QAT'], group: 'B', score: [2, 0], result: 'W', stake: 25, payout: 51.50, venue: 'BMO, Toronto' },
    { id: 'f3', teams: ['BRA', 'HAI'], group: 'C', score: [3, 0], result: 'W', stake: 40, payout: 68.20, venue: 'Mercedes, Atlanta' },
    { id: 'f4', teams: ['AUS', 'PAR'], group: 'D', score: [1, 2], result: 'L', stake: 30, payout: 0, venue: 'Lumen, Seattle' },
  ],
};

// Leaderboard data — top 10 tentacle oracles
const LEADERBOARD = [
  { rank: 1, handle: 'PAUL.eth', country: 'GER', pnl: 42180, roi: 214, bets: 89, streak: 11, badge: 'oracle' },
  { rank: 2, handle: 'kraken_bets', country: 'JPN', pnl: 28340, roi: 178, bets: 124, streak: 7, badge: 'whale' },
  { rank: 3, handle: 'squiddington', country: 'ENG', pnl: 19820, roi: 145, bets: 156, streak: 4, badge: 'whale' },
  { rank: 4, handle: 'nostradame', country: 'FRA', pnl: 14200, roi: 132, bets: 78, streak: 6, badge: 'oracle' },
  { rank: 5, handle: 'tifosi_42', country: 'BRA', pnl: 9870, roi: 119, bets: 203, streak: 2, badge: null },
  { rank: 6, handle: 'YOU', country: 'USA', pnl: 1274, roi: 108, bets: 23, streak: 3, you: true },
  { rank: 7, handle: '0xOracle', country: 'KOR', pnl: 840, roi: 104, bets: 41, streak: 1, badge: null },
  { rank: 8, handle: 'orange_blob', country: 'NED', pnl: 612, roi: 102, bets: 67, streak: 0, badge: null },
  { rank: 9, handle: 'pepecopa', country: 'ARG', pnl: 420, roi: 99, bets: 54, streak: 0, badge: null },
  { rank: 10, handle: 'degen_gk', country: 'ESP', pnl: 180, roi: 97, bets: 88, streak: 0, badge: null },
];

// Player profile
const PROFILE = {
  handle: 'paulfan.eth',
  wallet: '0xA3F7...D912',
  pfp: 'assets/chibi_jumping.png',
  country: 'USA',
  joined: 'Mar 2026',
  rank: 6,
  totalRank: 2847,
  pnl: 1274.45,
  roi: 108,
  bets: 23,
  wins: 14,
  losses: 9,
  streak: 3,
  wci: 312000,
  usdc: 2450,
  claimable: 92.37,
};

Object.assign(window, { GROUPS, TEAM_COLORS, TEAM_NAMES, VENUES, MATCHES_DATA, LEADERBOARD, PROFILE, teamGroup });
