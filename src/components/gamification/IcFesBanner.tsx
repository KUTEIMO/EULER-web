import { Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IcFesBannerProps {
  goalLabel?: string;
  ctaTo?: string;
  compact?: boolean;
}

export default function IcFesBanner({ goalLabel = 'Saber 11', ctaTo = '/s/path', compact }: IcFesBannerProps) {
  return (
    <div className="euler-card-accent p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--euler-gold), var(--euler-coral))',
            }}
          >
            <Target className="h-7 w-7 text-white" aria-hidden />
          </div>
          <div>
            <span className="icfes-pill mb-2">Enfoque pruebas</span>
            <h2 className="font-display text-xl font-bold sm:text-2xl">
              Prepara tu <span className="euler-gradient-text">{goalLabel}</span>
            </h2>
            <p className="mt-1 max-w-lg text-sm text-[var(--euler-muted)]">
              Rutas cortas de matemáticas pensadas para reducir ansiedad, practicar con feedback
              inmediato y ganar confianza antes del ICFES.
            </p>
          </div>
        </div>
        {!compact && (
          <Link to={ctaTo} className="btn-primary shrink-0">
            <TrendingUp className="h-4 w-4" />
            Ver mi ruta
          </Link>
        )}
      </div>
    </div>
  );
}
