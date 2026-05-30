/** Pibo — compañero matemático de EULER (SVG con expresiones, estilo LOGIKA) */

export type PiboExpression = 'normal' | 'happy' | 'cheering' | 'thoughtful' | 'sad';

interface PiboMascotProps {
  expression?: PiboExpression;
  size?: number;
  className?: string;
}

export default function PiboMascot({
  expression = 'normal',
  size = 120,
  className = '',
}: PiboMascotProps) {
  const uid = 'pibo';
  let mouth = 'M 48,78 Q 60,86 72,78';
  let eyeL = 'M 38,52 Q 46,46 54,52';
  let eyeR = 'M 66,52 Q 74,46 82,52';
  let browL = 'M 34,42 Q 44,38 52,44';
  let browR = 'M 68,44 Q 78,38 86,42';
  const glow = 'var(--euler-mascot-glow, #5eead4)';

  switch (expression) {
    case 'happy':
    case 'cheering':
      mouth = 'M 46,76 Q 60,92 74,76';
      eyeL = 'M 36,54 Q 46,48 56,54';
      eyeR = 'M 64,54 Q 74,48 84,54';
      break;
    case 'thoughtful':
      mouth = 'M 50,80 L 70,80';
      browL = 'M 32,40 Q 42,44 50,42';
      browR = 'M 70,38 Q 80,36 88,40';
      break;
    case 'sad':
      mouth = 'M 50,82 Q 60,74 70,82';
      eyeL = 'M 38,56 Q 46,60 54,56';
      eyeR = 'M 66,56 Q 74,60 82,56';
      break;
    default:
      break;
  }

  const eyes =
    expression === 'happy' || expression === 'cheering' ? (
      <>
        <path d={eyeL} fill="none" stroke={glow} strokeWidth="3" strokeLinecap="round" />
        <path d={eyeR} fill="none" stroke={glow} strokeWidth="3" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="46" cy="54" r="5" fill="none" stroke={glow} strokeWidth="2" />
        <circle cx="46" cy="54" r="2.2" fill={glow} />
        <circle cx="74" cy="54" r="5" fill="none" stroke={glow} strokeWidth="2" />
        <circle cx="74" cy="54" r="2.2" fill={glow} />
      </>
    );

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`mascot-float ${className}`}
      role="img"
      aria-label="Pibo, tu compañero en matemáticas"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`body-${uid}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4db8ad" />
          <stop offset="100%" stopColor="#2a6f6a" />
        </radialGradient>
        <linearGradient id={`belly-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ecfc4" />
          <stop offset="100%" stopColor="#3d9a92" />
        </linearGradient>
        <filter id={`glow-${uid}`}>
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <style>{`
        .pibo-body { transform-origin: 60px 65px; animation: pibo-breathe 3s ease-in-out infinite alternate; }
        @keyframes pibo-breathe { from { transform: scale(1); } to { transform: scale(1.02); } }
      `}</style>
      {/* Orejas tipo mapache-suave */}
      <ellipse cx="28" cy="48" rx="14" ry="18" fill="#2a6f6a" opacity="0.9" />
      <ellipse cx="92" cy="48" rx="14" ry="18" fill="#2a6f6a" opacity="0.9" />
      <ellipse cx="28" cy="50" rx="8" ry="10" fill="#e07a5f" opacity="0.5" />
      <ellipse cx="92" cy="50" rx="8" ry="10" fill="#e07a5f" opacity="0.5" />
      <g className="pibo-body">
        <circle cx="60" cy="62" r="42" fill={`url(#body-${uid})`} />
        <ellipse cx="60" cy="68" rx="28" ry="24" fill={`url(#belly-${uid})`} opacity="0.85" />
        {/* Chip π */}
        <rect x="48" y="58" width="24" height="16" rx="4" fill="#1a3d3a" opacity="0.35" />
        <text
          x="60"
          y="70"
          textAnchor="middle"
          fill="#eef6f5"
          fontSize="14"
          fontWeight="bold"
          fontFamily="Sora, sans-serif"
        >
          π
        </text>
        {/* Visor */}
        <rect x="32" y="44" width="56" height="22" rx="11" fill="#1a2e32" opacity="0.55" />
        <g filter={`url(#glow-${uid})`}>{eyes}</g>
        <path d={browL} fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        <path d={browR} fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        <path d={mouth} fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        {expression === 'cheering' && (
          <>
            <circle cx="22" cy="70" r="4" fill="#e8b84a" opacity="0.9" />
            <circle cx="98" cy="70" r="4" fill="#e8b84a" opacity="0.9" />
            <circle cx="18" cy="58" r="2.5" fill="#7ecfc4" />
            <circle cx="102" cy="58" r="2.5" fill="#7ecfc4" />
          </>
        )}
      </g>
    </svg>
  );
}
