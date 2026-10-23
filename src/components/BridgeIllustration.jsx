// A stone arch bridge at sunrise. The deck planks lay in one after another on load.
const PLANK_COUNT = 24

export default function BridgeIllustration({ className = '' }) {
  const planks = Array.from({ length: PLANK_COUNT }, (_, i) => i)

  return (
    <svg
      className={`bridge-art ${className}`}
      viewBox="0 0 640 420"
      role="img"
      aria-label="A stone arch bridge over a river at sunrise, its deck built plank by plank"
    >
      <rect width="640" height="420" fill="var(--bridge-sky)" />
      <circle cx="470" cy="170" r="78" fill="var(--sun)" />
      <circle cx="470" cy="170" r="108" fill="var(--sun)" opacity="0.18" />

      {/* distant hills */}
      <path d="M0 250 C90 200 160 230 250 205 C340 180 420 225 520 200 C570 188 610 205 640 215 V300 H0 Z" fill="var(--bridge-hill)" />

      {/* river */}
      <rect y="300" width="640" height="120" fill="var(--bridge-river)" />
      <g stroke="var(--bridge-ripple)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M60 360 q12 -8 24 0 t24 0" />
        <path d="M250 380 q12 -8 24 0 t24 0" />
        <path d="M420 355 q12 -8 24 0 t24 0" />
        <path d="M530 392 q12 -8 24 0 t24 0" />
      </g>

      {/* railing */}
      <g stroke="var(--bridge-stone)" strokeWidth="3">
        <line x1="40" y1="212" x2="600" y2="212" />
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={52 + i * 32} y1="212" x2={52 + i * 32} y2="240" />
        ))}
      </g>

      {/* stone body with four arched openings */}
      <path
        fill="var(--bridge-stone)"
        fillRule="evenodd"
        d="M40 258 H600 V340 H40 Z
           M70 340 V318 A55 55 0 0 1 180 318 V340 Z
           M200 340 V318 A55 55 0 0 1 310 318 V340 Z
           M330 340 V318 A55 55 0 0 1 440 318 V340 Z
           M460 340 V318 A55 55 0 0 1 570 318 V340 Z"
      />

      {/* deck */}
      <rect x="34" y="240" width="572" height="18" rx="3" fill="var(--bridge-deck)" />
      {planks.map((i) => (
        <rect
          key={i}
          className="bridge-plank"
          x={44 + i * 23.5}
          y="243"
          width="19"
          height="12"
          rx="2"
          style={{ animationDelay: `${0.25 + i * 0.045}s` }}
        />
      ))}

      {/* reflection */}
      <g fill="var(--bridge-stone)" opacity="0.18">
        <rect x="70" y="344" width="110" height="10" rx="5" />
        <rect x="330" y="344" width="110" height="10" rx="5" />
      </g>
    </svg>
  )
}
