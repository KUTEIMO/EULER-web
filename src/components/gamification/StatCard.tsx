import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: 'default' | 'xp' | 'streak' | 'level';
}

const accents = {
  default: 'border-[var(--euler-border)]',
  xp: 'border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-transparent',
  streak: 'border-orange-400/30 bg-gradient-to-br from-orange-500/10 to-transparent',
  level: 'border-teal-400/30 bg-gradient-to-br from-teal-500/15 to-transparent',
};

export default function StatCard({ icon: Icon, label, value, accent = 'default' }: StatCardProps) {
  return (
    <div className={`euler-glass p-5 ${accents[accent]}`}>
      <div className="mb-2 flex items-center gap-2 text-[var(--euler-muted)]">
        <Icon className="h-4 w-4" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="font-display text-3xl font-bold euler-gradient-text">{value}</p>
    </div>
  );
}
