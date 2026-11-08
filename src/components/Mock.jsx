/**
 * Hand-drawn SVG product sketches for each build — abstract UI only, no invented features.
 * Every sketch shares a 320×200 canvas; colours come from `.mk-*` classes in sections.css.
 */
const range = (n) => Array.from({ length: n }, (_, i) => i);

function Rows({ x, y, n, w, gap = 12 }) {
  return range(n).map((i) => <rect key={i} className="mk-panel" x={x} y={y + i * gap} width={w - (i % 3) * 14} height="5" rx="1" />);
}

function Frame({ title, children }) {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect className="mk-bg" width="320" height="200" />
      <rect className="mk-panel" width="320" height="16" />
      {[10, 19, 28].map((cx) => <circle key={cx} className="mk-dim" cx={cx} cy="8" r="2.5" />)}
      <text className="mk-txt" x="160" y="11" textAnchor="middle" style={{ fontSize: 7 }}>{title}</text>
      {children}
    </svg>
  );
}

const Dashboard = () => (
  <Frame title="4healths · app 01–04">
    <rect className="mk-panel" y="16" width="56" height="184" />
    <Rows x={10} y={30} n={8} w={36} gap={14} />
    <rect className="mk-sig" x="10" y="44" width="36" height="5" rx="1" />
    {range(4).map((i) => (
      <g key={i}>
        <rect className="mk-panel" x={68 + i * 62} y="28" width="54" height="40" />
        <text className="mk-big" x={74 + i * 62} y="56" style={{ fontSize: 18 }}>0{i + 1}</text>
      </g>
    ))}
    <rect className="mk-panel" x="68" y="78" width="178" height="110" />
    <polyline className="mk-s-sig" strokeWidth="1.6" points="76,170 98,150 120,158 142,128 164,136 186,110 208,118 236,92" />
    <polyline className="mk-s-sel" strokeWidth="1" strokeDasharray="3 3" points="76,176 98,168 120,170 142,154 164,160 186,146 208,150 236,136" />
    <rect className="mk-panel" x="254" y="78" width="54" height="110" />
    <Rows x={260} y={88} n={7} w={42} gap={13} />
    <circle className="mk-ok" cx="300" cy="22" r="3" />
  </Frame>
);

const Auth = () => (
  <Frame title="keycloak · multitenant realm">
    {['A', 'B', 'C'].map((t, i) => (
      <g key={t}>
        <rect className="mk-panel" x="18" y={34 + i * 52} width="74" height="38" />
        <text className="mk-txt" x="28" y={57 + i * 52}>tenant {t}</text>
        <path className="mk-line" d={`M92 ${53 + i * 52} C 120 ${53 + i * 52}, 120 108, 140 108`} />
      </g>
    ))}
    <rect className="mk-s-sel" x="140" y="70" width="70" height="76" strokeWidth="1.2" />
    <path className="mk-sig" d="M175 84 l14 6 v12 c0 10 -7 16 -14 19 c-7 -3 -14 -9 -14 -19 v-12 z" />
    <text className="mk-txt" x="175" y="136" textAnchor="middle">realm</text>
    <path className="mk-line" d="M210 108 C 228 108, 228 50, 246 50 M210 108 L246 108 M210 108 C 228 108, 228 166, 246 166" />
    {['role:admin', 'role:user', 'role:read'].map((r, i) => (
      <g key={r}>
        <rect className="mk-panel" x="246" y={38 + i * 58} width="62" height="24" />
        <text className="mk-txt" x="254" y={54 + i * 58} style={{ fontSize: 8 }}>{r}</text>
      </g>
    ))}
    <circle className="mk-ok" cx="300" cy="44" r="2.5" />
    <circle className="mk-ok" cx="300" cy="102" r="2.5" />
    <circle className="mk-amb" cx="300" cy="160" r="2.5" />
  </Frame>
);

const Agent = () => (
  <Frame title="channel360 · agent workspace">
    <rect className="mk-panel" x="12" y="26" width="296" height="22" />
    <rect className="mk-sig" x="20" y="34" width="40" height="6" rx="1" />
    <Rows x={70} y={34} n={1} w={60} />
    <rect className="mk-bg" x="240" y="31" width="60" height="12" />
    {range(3).map((c) => (
      <g key={c}>
        <rect className="mk-panel" x={12 + c * 100} y="58" width="92" height="132" opacity=".6" />
        {range(3).map((r) => (
          <g key={r}>
            <rect className="mk-bg" x={18 + c * 100} y={66 + r * 40} width="80" height="32" />
            <Rows x={24 + c * 100} y={73 + r * 40} n={2} w={60} gap={9} />
            <rect className={['mk-ok', 'mk-amb', 'mk-sel'][(c + r) % 3]} x={86 + c * 100} y={72 + r * 40} width="6" height="6" rx="3" />
          </g>
        ))}
      </g>
    ))}
  </Frame>
);

const Policy = () => (
  <Frame title="paisaplan · digital insurance">
    <rect className="mk-panel" x="20" y="30" width="150" height="156" />
    <rect className="mk-sig" x="32" y="42" width="22" height="22" rx="11" />
    <Rows x={62} y={46} n={2} w={90} gap={10} />
    <text className="mk-big" x="32" y="104" style={{ fontSize: 22 }}>₹ ••,•••</text>
    <Rows x={32} y={120} n={4} w={120} gap={14} />
    <rect className="mk-sig" x="32" y="168" width="126" height="10" />
    {range(4).map((i) => (
      <g key={i}>
        <rect className="mk-panel" x="184" y={30 + i * 40} width="120" height="32" />
        <Rows x={194} y={42 + i * 40} n={1} w={64} />
        <rect className="mk-bg" x="276" y={41 + i * 40} width="20" height="10" rx="5" />
        <circle className={i % 2 ? 'mk-dim' : 'mk-ok'} cx={i % 2 ? 281 : 291} cy={46 + i * 40} r="4" />
      </g>
    ))}
  </Frame>
);

const Upgrade = () => (
  <Frame title="node.js · runtime upgrade">
    <text className="mk-txt" x="28" y="40" style={{ fill: 'var(--ok)' }}>✓ compatibility resolved</text>
    <text className="mk-txt" x="28" y="54" style={{ fill: 'var(--mute)' }}>$ node --version</text>
    <text className="mk-big" x="28" y="116" style={{ fontSize: 64, opacity: 0.28 }}>14</text>
    <path className="mk-s-sig" strokeWidth="2" d="M112 94 h66 m-10 -8 l10 8 l-10 8" />
    <text className="mk-big" x="188" y="116" style={{ fontSize: 64 }}>20</text>
    <rect className="mk-ok" x="28" y="138" width="264" height="6" />
    {[16, 18].map((v, i) => (
      <g key={v}>
        <circle className="mk-ok" cx={116 + i * 46} cy="141" r="4" />
        <text className="mk-txt" x={116 + i * 46} y="160" textAnchor="middle">v{v}</text>
      </g>
    ))}
    <text className="mk-txt" x="28" y="160">v14</text>
    <text className="mk-txt" x="292" y="160" textAnchor="end">v20</text>
    <text className="mk-txt" x="28" y="184" style={{ fill: 'var(--mute)' }}>node.js runtime migration</text>
  </Frame>
);

const Forms = () => (
  <Frame title="awgment · form.io builder">
    <rect className="mk-panel" y="16" width="74" height="184" />
    {['text', 'select', 'date', 'check', 'file', 'button'].map((t, i) => (
      <g key={t}>
        <rect className="mk-bg" x="8" y={26 + i * 26} width="58" height="18" />
        <text className="mk-txt" x="14" y={38 + i * 26} style={{ fontSize: 7.5 }}>{t}</text>
      </g>
    ))}
    <rect className="mk-s-sel" x="90" y="28" width="216" height="160" strokeDasharray="4 3" />
    {range(3).map((i) => (
      <g key={i}>
        <Rows x={102} y={40 + i * 38} n={1} w={50} />
        <rect className="mk-panel" x="102" y={50 + i * 38} width="190" height="16" />
      </g>
    ))}
    <rect className="mk-s-sel" x="100" y="86" width="194" height="36" strokeWidth="1.4" />
    <rect className="mk-sel" x="100" y="78" width="40" height="8" />
    <rect className="mk-sig" x="102" y="160" width="60" height="18" />
    <path className="mk-s-sig" strokeWidth="1.2" strokeDasharray="3 3" d="M66 87 C 80 87, 82 100, 98 100" />
  </Frame>
);

const MOCKS = { dashboard: Dashboard, auth: Auth, agent: Agent, policy: Policy, upgrade: Upgrade, forms: Forms };

export default function Mock({ type }) {
  const Cmp = MOCKS[type];
  return Cmp ? <Cmp /> : null;
}
