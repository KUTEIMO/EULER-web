interface XpBarProps {
  current: number;
  max: number;
  label?: string;
}

export default function XpBar({ current, max, label }: XpBarProps) {
  const pct = max > 0 ? Math.min(100, (current / max) * 100) : 0;
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex justify-between text-xs font-medium text-[var(--euler-muted)]">
          <span>{label}</span>
          <span>
            {current} / {max} XP
          </span>
        </div>
      )}
      <div className="xp-bar-track">
        <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
