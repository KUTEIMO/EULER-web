import { Download, Smartphone } from 'lucide-react';
import { BRANDING } from '../config/branding';

interface ApkDownloadCardProps {
  variant?: 'default' | 'landing';
}

export default function ApkDownloadCard({ variant = 'default' }: ApkDownloadCardProps) {
  const isLanding = variant === 'landing';

  return (
    <div
      className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
        isLanding
          ? 'rounded-2xl border border-white/15 p-6 backdrop-blur-lg'
          : 'euler-glass p-6'
      }`}
      style={isLanding ? { background: 'rgba(255,255,255,0.08)' } : undefined}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-lg"
          style={{
            background: 'linear-gradient(135deg, var(--euler-primary), var(--euler-primary-light))',
          }}
        >
          <Smartphone className={`h-6 w-6 ${isLanding ? 'text-white' : 'text-white'}`} />
        </div>
        <div className={isLanding ? 'text-white' : ''}>
          <h3 className="font-display font-semibold">App Android</h3>
          <p className={`text-sm ${isLanding ? 'text-white/75' : 'text-[var(--euler-muted)]'}`}>
            Lleva EULER en el bolsillo. Misma cuenta Firebase que la web.
          </p>
        </div>
      </div>
      <a
        href={BRANDING.apkDownloadUrl}
        className={`btn-coral shrink-0 ${isLanding ? 'shadow-lg' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Download className="h-5 w-5" />
        Descargar APK
      </a>
    </div>
  );
}
