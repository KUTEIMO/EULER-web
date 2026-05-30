import { useLocaleStore, type Locale } from '../store/localeStore';

interface LanguageSelectorProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export default function LanguageSelector({ variant = 'dark', className = '' }: LanguageSelectorProps) {
  const { locale, setLocale } = useLocaleStore();

  const base =
    variant === 'light'
      ? 'bg-white/10 text-white border-white/20'
      : 'bg-[var(--euler-surface)] text-[var(--euler-text)] border-[var(--euler-border)]';

  const active =
    variant === 'light' ? 'bg-white text-teal-900' : 'bg-[var(--euler-primary)] text-white';

  const inactive =
    variant === 'light'
      ? 'text-white/80 hover:bg-white/10'
      : 'text-[var(--euler-muted)] hover:bg-[var(--euler-bg-soft)]';

  function select(next: Locale) {
    setLocale(next);
  }

  return (
    <div
      className={`inline-flex rounded-lg border p-0.5 text-xs font-semibold uppercase tracking-wide ${base} ${className}`}
      role="group"
      aria-label="Language"
    >
      {(['es', 'en'] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => select(code)}
          className={`rounded-md px-2.5 py-1 transition ${locale === code ? active : inactive}`}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
