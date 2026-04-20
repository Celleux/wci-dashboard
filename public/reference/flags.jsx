// flags.jsx — SVG flag components for all 48 teams (stylized, compact)

const FlagRect = ({ code, w = 24, h = 16, style = {} }) => {
  const s = { width: w, height: h, borderRadius: 2, overflow: 'hidden', flexShrink: 0, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)', display: 'inline-block', verticalAlign: 'middle', ...style };
  const f = FLAG_SVG[code];
  if (!f) {
    const [a, b] = (window.TEAM_COLORS && window.TEAM_COLORS[code]) || ['#666', '#999'];
    return <span style={{ ...s, background: `linear-gradient(135deg, ${a} 50%, ${b} 50%)` }} />;
  }
  return <span style={s} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 16" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">${f}</svg>` }} />;
};

// Simple stylized flags (not legally-accurate reproductions — sufficient for UI)
const FLAG_SVG = {
  // A
  MEX: '<rect width="8" height="16" fill="#006341"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#CE1126"/><circle cx="12" cy="8" r="2" fill="#8B5A2B"/>',
  RSA: '<rect width="24" height="16" fill="#fff"/><polygon points="0,0 10,8 0,16" fill="#007749"/><polygon points="0,0 10,8 24,0" fill="#DE3831"/><polygon points="0,16 10,8 24,16" fill="#002395"/><rect y="5" width="10" height="6" fill="#FFB81C"/><polygon points="0,5 0,11 10,8" fill="#000"/>',
  KOR: '<rect width="24" height="16" fill="#fff"/><circle cx="12" cy="8" r="3" fill="#CD2E3A"/><path d="M 12 5 A 3 3 0 0 1 12 11 A 1.5 1.5 0 0 0 12 8 A 1.5 1.5 0 0 1 12 5 Z" fill="#003478"/>',
  CZE: '<rect width="24" height="8" fill="#fff"/><rect y="8" width="24" height="8" fill="#D7141A"/><polygon points="0,0 10,8 0,16" fill="#11457E"/>',
  // B
  CAN: '<rect width="6" height="16" fill="#FF0000"/><rect x="6" width="12" height="16" fill="#fff"/><rect x="18" width="6" height="16" fill="#FF0000"/><polygon points="12,4 13,7 16,7 13.5,9 14.5,12 12,10 9.5,12 10.5,9 8,7 11,7" fill="#FF0000"/>',
  BIH: '<rect width="24" height="16" fill="#002F6C"/><polygon points="9,0 24,0 24,16 15,16" fill="#FECB00"/><g fill="#fff"><circle cx="11" cy="2" r="0.6"/><circle cx="13" cy="4" r="0.6"/><circle cx="15" cy="6" r="0.6"/><circle cx="17" cy="8" r="0.6"/><circle cx="19" cy="10" r="0.6"/><circle cx="21" cy="12" r="0.6"/><circle cx="23" cy="14" r="0.6"/></g>',
  QAT: '<rect width="8" height="16" fill="#fff"/><rect x="8" width="16" height="16" fill="#8A1538"/>',
  SUI: '<rect width="24" height="16" fill="#FF0000"/><rect x="10" y="4" width="4" height="8" fill="#fff"/><rect x="8" y="6" width="8" height="4" fill="#fff"/>',
  // C
  BRA: '<rect width="24" height="16" fill="#009B3A"/><polygon points="12,2 22,8 12,14 2,8" fill="#FEDB00"/><circle cx="12" cy="8" r="3" fill="#002776"/>',
  MAR: '<rect width="24" height="16" fill="#C1272D"/><polygon points="12,5 13,8 16,8 13.5,9.5 14.5,12 12,10.5 9.5,12 10.5,9.5 8,8 11,8" fill="none" stroke="#006233" stroke-width="0.5"/>',
  HAI: '<rect width="24" height="8" fill="#00209F"/><rect y="8" width="24" height="8" fill="#D21034"/>',
  SCO: '<rect width="24" height="16" fill="#0065BF"/><path d="M 0 0 L 24 16 M 24 0 L 0 16" stroke="#fff" stroke-width="2.5"/>',
  // D
  USA: '<rect width="24" height="16" fill="#fff"/><rect y="0" width="24" height="1.8" fill="#B22234"/><rect y="3.6" width="24" height="1.8" fill="#B22234"/><rect y="7.2" width="24" height="1.8" fill="#B22234"/><rect y="10.8" width="24" height="1.8" fill="#B22234"/><rect y="14.4" width="24" height="1.6" fill="#B22234"/><rect width="10" height="8.6" fill="#0B1F3F"/>',
  PAR: '<rect width="24" height="5.3" fill="#D52B1E"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#0038A8"/>',
  AUS: '<rect width="24" height="16" fill="#00008B"/><rect width="12" height="8" fill="#00008B"/><path d="M 0 0 L 12 8 M 12 0 L 0 8" stroke="#fff" stroke-width="1"/><path d="M 0 0 L 12 8 M 12 0 L 0 8" stroke="#FF0000" stroke-width="0.5"/><rect x="5" width="2" height="8" fill="#fff"/><rect y="3" width="12" height="2" fill="#fff"/><rect x="5.3" width="1.4" height="8" fill="#FF0000"/><rect y="3.3" width="12" height="1.4" fill="#FF0000"/>',
  TUR: '<rect width="24" height="16" fill="#E30A17"/><circle cx="9" cy="8" r="3" fill="#fff"/><circle cx="10" cy="8" r="2.5" fill="#E30A17"/><polygon points="13,8 15,7.2 14.3,9 15.5,10.5 13.5,10 12.2,11.5 12.5,9.5 11,8.5 13,8.5" fill="#fff"/>',
  // E
  GER: '<rect width="24" height="5.3" fill="#000"/><rect y="5.3" width="24" height="5.3" fill="#DD0000"/><rect y="10.6" width="24" height="5.4" fill="#FFCE00"/>',
  CUW: '<rect width="24" height="16" fill="#002B7F"/><rect y="10" width="24" height="2" fill="#F9E814"/><polygon points="4,3 5,4.5 7,4.5 5.5,5.5 6,7 4,6 2,7 2.5,5.5 1,4.5 3,4.5" fill="#fff"/>',
  CIV: '<rect width="8" height="16" fill="#FF8200"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#009A44"/>',
  ECU: '<rect width="24" height="8" fill="#FFD100"/><rect y="8" width="24" height="4" fill="#0038A8"/><rect y="12" width="24" height="4" fill="#E8112D"/>',
  // F
  NED: '<rect width="24" height="5.3" fill="#AE1C28"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#21468B"/>',
  JPN: '<rect width="24" height="16" fill="#fff"/><circle cx="12" cy="8" r="4" fill="#BC002D"/>',
  SWE: '<rect width="24" height="16" fill="#006AA7"/><rect x="7" width="3" height="16" fill="#FECC00"/><rect y="6.5" width="24" height="3" fill="#FECC00"/>',
  TUN: '<rect width="24" height="16" fill="#E70013"/><circle cx="12" cy="8" r="4" fill="#fff"/><circle cx="13" cy="8" r="3" fill="#E70013"/>',
  // G
  BEL: '<rect width="8" height="16" fill="#000"/><rect x="8" width="8" height="16" fill="#FAE042"/><rect x="16" width="8" height="16" fill="#EF3340"/>',
  EGY: '<rect width="24" height="5.3" fill="#CE1126"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#000"/><circle cx="12" cy="8" r="1" fill="#C09300"/>',
  IRN: '<rect width="24" height="5.3" fill="#239F40"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#DA0000"/>',
  NZL: '<rect width="24" height="16" fill="#0C2340"/><rect width="12" height="8" fill="#0C2340"/><path d="M 0 0 L 12 8 M 12 0 L 0 8" stroke="#fff" stroke-width="1"/><path d="M 0 0 L 12 8 M 12 0 L 0 8" stroke="#CE1126" stroke-width="0.5"/><rect x="5" width="2" height="8" fill="#fff"/><rect y="3" width="12" height="2" fill="#fff"/><rect x="5.3" width="1.4" height="8" fill="#CE1126"/><rect y="3.3" width="12" height="1.4" fill="#CE1126"/>',
  // H
  ESP: '<rect width="24" height="4" fill="#AA151B"/><rect y="4" width="24" height="8" fill="#F1BF00"/><rect y="12" width="24" height="4" fill="#AA151B"/>',
  CPV: '<rect width="24" height="16" fill="#003893"/><rect y="7" width="24" height="3" fill="#fff"/><rect y="8" width="24" height="1" fill="#CF2027"/>',
  KSA: '<rect width="24" height="16" fill="#006C35"/><text x="12" y="9" text-anchor="middle" fill="#fff" font-size="3" font-family="serif">اللَّه</text>',
  URU: '<rect width="24" height="16" fill="#fff"/><rect y="1.8" width="24" height="1.8" fill="#0038A8"/><rect y="5.4" width="24" height="1.8" fill="#0038A8"/><rect y="9" width="24" height="1.8" fill="#0038A8"/><rect y="12.6" width="24" height="1.8" fill="#0038A8"/><rect width="10" height="9" fill="#fff"/><circle cx="5" cy="4.5" r="2" fill="#FCD116"/>',
  // I
  FRA: '<rect width="8" height="16" fill="#0055A4"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#EF4135"/>',
  SEN: '<rect width="8" height="16" fill="#00853F"/><rect x="8" width="8" height="16" fill="#FDEF42"/><rect x="16" width="8" height="16" fill="#E31B23"/><polygon points="12,6 13,8 15,8 13.5,9.2 14,11 12,10 10,11 10.5,9.2 9,8 11,8" fill="#00853F"/>',
  IRQ: '<rect width="24" height="5.3" fill="#CE1126"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#000"/><text x="12" y="9" text-anchor="middle" fill="#007A3D" font-size="2.5">الله</text>',
  NOR: '<rect width="24" height="16" fill="#EF2B2D"/><rect x="6" width="2" height="16" fill="#fff"/><rect y="6" width="24" height="3" fill="#fff"/><rect x="6.5" width="1" height="16" fill="#002868"/><rect y="6.5" width="24" height="2" fill="#002868"/>',
  // J
  ARG: '<rect width="24" height="5.3" fill="#74ACDF"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#74ACDF"/><circle cx="12" cy="8" r="1.2" fill="#F6B40E"/>',
  ALG: '<rect width="12" height="16" fill="#006233"/><rect x="12" width="12" height="16" fill="#fff"/><circle cx="12" cy="8" r="2" fill="#D21034"/><polygon points="13,7 15,8 13,9 13.5,8" fill="#D21034"/>',
  AUT: '<rect width="24" height="5.3" fill="#ED2939"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#ED2939"/>',
  JOR: '<rect width="24" height="5.3" fill="#000"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#007A3D"/><polygon points="0,0 8,8 0,16" fill="#CE1126"/>',
  // K
  POR: '<rect width="24" height="16" fill="#FF0000"/><rect width="10" height="16" fill="#046A38"/><circle cx="10" cy="8" r="2" fill="#FCD116"/>',
  COD: '<rect width="24" height="16" fill="#007FFF"/><polygon points="0,11 24,3 24,7 0,15" fill="#F7D618"/><polygon points="0,11 24,3 24,6 0,14" fill="#CE1021"/><polygon points="3,1 4,3 6,3 4.5,4.5 5,6.5 3,5.3 1,6.5 1.5,4.5 0,3 2,3" fill="#F7D618"/>',
  UZB: '<rect width="24" height="16" fill="#1EB53A"/><rect width="24" height="5.3" fill="#0099B5"/><rect y="5" width="24" height="0.3" fill="#CE1126"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="0.3" fill="#CE1126"/>',
  COL: '<rect width="24" height="8" fill="#FCD116"/><rect y="8" width="24" height="4" fill="#003893"/><rect y="12" width="24" height="4" fill="#CE1126"/>',
  // L
  ENG: '<rect width="24" height="16" fill="#fff"/><rect x="10" width="4" height="16" fill="#CE1124"/><rect y="6" width="24" height="4" fill="#CE1124"/>',
  CRO: '<rect width="24" height="16" fill="#FF0000"/><rect y="5.3" width="24" height="5.3" fill="#fff"/><rect y="10.6" width="24" height="5.4" fill="#171796"/><g transform="translate(10, 5)"><rect width="4" height="4" fill="#fff"/><rect x="1" width="1" height="1" fill="#FF0000"/><rect x="2" y="1" width="1" height="1" fill="#FF0000"/></g>',
  GHA: '<rect width="24" height="5.3" fill="#CE1126"/><rect y="5.3" width="24" height="5.3" fill="#FCD116"/><rect y="10.6" width="24" height="5.4" fill="#006B3F"/><polygon points="12,6.5 13,8 14.5,8 13.2,9 13.7,10.5 12,9.6 10.3,10.5 10.8,9 9.5,8 11,8" fill="#000"/>',
  PAN: '<rect width="24" height="16" fill="#fff"/><rect width="12" height="8" fill="#fff"/><rect x="12" width="12" height="8" fill="#D21034"/><rect y="8" width="12" height="8" fill="#005293"/><polygon points="6,2 7,5 10,5 7.5,6.5 8.5,9.5 6,8 3.5,9.5 4.5,6.5 2,5 5,5" fill="#005293"/><polygon points="18,10 19,13 22,13 19.5,14.5 20.5,17.5 18,16 15.5,17.5 16.5,14.5 14,13 17,13" fill="#D21034"/>',
};

Object.assign(window, { FlagRect });
