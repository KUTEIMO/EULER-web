import { Link } from 'react-router-dom';
import { Brain, Flame, Route, Target, Trophy, Users, Zap } from 'lucide-react';
import EulerMark from '../components/euler/EulerMark';
import PiboMascot from '../components/mascot/PiboMascot';
import ApkDownloadCard from '../components/ApkDownloadCard';
import LanguageSelector from '../components/LanguageSelector';
import { getLandingLocale } from '../i18n/landing';
import { useLocaleStore } from '../store/localeStore';

const featureIcons = [Target, Route, Zap, Users];

const stats = [
  { value: '5–10', key: 'statLesson' as const },
  { value: '+10', key: 'statXp' as const },
  { value: '9–11', key: 'statGrades' as const },
];

export default function Landing() {
  const locale = useLocaleStore((s) => s.locale);
  const t = getLandingLocale(locale);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(165deg, #1e3d3a 0%, #2d5c57 28%, #4a8f86 55%, #7ec4b8 78%, #f0d4c8 100%)',
        }}
      />
      <div className="euler-stars opacity-60" aria-hidden />
      <div className="euler-orb left-[10%] top-16 h-72 w-72 bg-teal-200/40" />
      <div className="euler-orb bottom-10 right-[15%] h-64 w-64 bg-orange-200/35" />

      <header className="relative z-10 border-b border-white/15 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <EulerMark height={32} className="brightness-0 invert drop-shadow" />
            <span className="font-display text-lg font-bold text-white">EULER</span>
          </div>
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/about"
              className="hidden rounded-lg px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 sm:inline"
            >
              {t.navAbout}
            </Link>
            <LanguageSelector variant="light" />
            <Link
              to="/login"
              className="rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              {t.navLogin}
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="text-white animate-fade-in-up">
            <span className="icfes-pill mb-4 border-white/30 bg-white/10 text-amber-200">
              {t.pill}
            </span>
            <h1 className="font-display mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {t.heroHeadline}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-white/90">{t.heroSub}</p>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-white/75">{t.icfesPitch}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/register" className="btn-coral shadow-lg shadow-orange-900/20">
                {t.ctaStart}
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                {t.ctaLogin}
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {stats.map((s) => (
                <div key={s.key}>
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-xs uppercase tracking-wide text-white/70">{t[s.key]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex flex-col items-center animate-fade-in-up">
            <div
              className="rounded-3xl border border-white/20 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <PiboMascot expression="cheering" size={160} className="mx-auto" />
              <p className="mt-4 text-center font-display text-lg font-semibold text-white">
                {t.piboHello} <span className="text-teal-200">{t.piboName}</span>
              </p>
              <p className="mt-2 text-center text-sm text-white/80">{t.piboDesc}</p>
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
              <Flame className="h-4 w-4 text-orange-300" />
              {t.streak}
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
            {t.whyTitle}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-white/75">{t.whyDesc}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.features.map(({ title, desc }, i) => {
              const Icon = featureIcons[i];
              return (
                <div
                  key={title}
                  className="euler-glass-hover rounded-2xl border-white/15 p-5 text-white"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <div
                    className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  >
                    <Icon className="h-6 w-6 text-teal-200" />
                  </div>
                  <h3 className="font-display font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          className="mt-16 rounded-3xl border border-white/15 p-8 text-center backdrop-blur-lg sm:p-12"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <Brain className="mx-auto mb-4 h-10 w-10 text-teal-200" />
          <h2 className="font-display text-2xl font-bold text-white">{t.missionTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/80">{t.missionDesc}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {t.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/90"
              >
                {tag === t.tags[0] && <Trophy className="mr-1 inline h-4 w-4" />}
                {tag}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <ApkDownloadCard variant="landing" />
        </div>
      </main>
    </div>
  );
}
