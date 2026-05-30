import { Link } from 'react-router-dom';
import { BRANDING } from '../config/branding';
import EulerMark from '../components/euler/EulerMark';
import ApkDownloadCard from '../components/ApkDownloadCard';

export default function About() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-[var(--euler-muted)] hover:underline">
          ← Inicio
        </Link>
        <EulerMark height={48} />
        <h1 className="font-display text-4xl font-bold">Sobre {BRANDING.acronym}</h1>
        <p className="text-lg">{BRANDING.longName}</p>
        <p>{BRANDING.missionShort}</p>
        <p className="text-[var(--euler-muted)]">{BRANDING.audienceGrades}</p>
        <div className="euler-glass p-6 text-sm text-[var(--euler-muted)]">
          <p>{BRANDING.author1}</p>
          <p>{BRANDING.author2}</p>
          <p>{BRANDING.authorProgram}</p>
          <p>{BRANDING.authorMeta}</p>
        </div>
        <ApkDownloadCard />
        <Link to="/register" className="btn-primary inline-flex">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}
