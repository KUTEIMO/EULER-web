import type { ReactNode } from 'react';
import {
  BookOpen,
  Code2,
  Database,
  Flame,
  Globe,
  Home,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { useIsMobileSlides } from '../../hooks/useMediaQuery';
import PiboMascot from '../mascot/PiboMascot';
import type { Locale } from '../../store/localeStore';

function copy(locale: Locale) {
  return locale === 'en'
    ? {
        landingPill: 'ICFES · Saber 11',
        landingTitle: 'Math that prepares you for Saber 11',
        landingBtn: 'Start free',
        dailyMission: 'Daily mission',
        hello: 'Hello, Ana',
        grade: 'Grade 10 · Goal: Saber 11',
        level: 'Level 3',
        xp: 'XP',
        streak: 'Streak',
        accuracy: 'Accuracy',
        todayChallenge: "Today's challenge",
        lessonTitle: 'Linear equations',
        lessonUnit: 'Algebra · Unit 2',
        theory: 'Theory',
        practice: 'Practice',
        theoryText: 'If 2x + 4 = 10, isolate x step by step.',
        question: 'What is the value of x?',
        ranking: 'Class ranking',
        code: 'Join code AB12CD',
        teacher: 'Teacher panel',
        shareCode: 'Share with students',
        student: 'Student app',
        joinGroup: 'Join group',
        chat1: 'Can someone help with #3?',
        chat2: 'Sure! Check step 2.',
        webApps: 'Web apps',
        mobileApps: 'Mobile apps',
        cloud: 'Cloud · Firebase',
        edTech: 'Education tech',
        path: 'Lesson path',
        home: 'Home',
        groups: 'Groups',
        results: 'Results',
        piboTip: 'Great try — keep going!',
        signIn: 'Sign in',
        gradesLabel: 'grades',
      }
    : {
        landingPill: 'ICFES · Saber 11',
        landingTitle: 'Matemáticas para el Saber 11',
        landingBtn: 'Empezar gratis',
        dailyMission: 'Tu misión diaria',
        hello: 'Hola, Ana',
        grade: 'Grado 10 · Meta: Saber 11',
        level: 'Nivel 3',
        xp: 'XP',
        streak: 'Racha',
        accuracy: 'Precisión',
        todayChallenge: 'Reto de hoy',
        lessonTitle: 'Ecuaciones lineales',
        lessonUnit: 'Álgebra · Unidad 2',
        theory: 'Teoría',
        practice: 'Práctica',
        theoryText: 'Si 2x + 4 = 10, despeja x paso a paso.',
        question: '¿Cuál es el valor de x?',
        ranking: 'Ranking del curso',
        code: 'Código AB12CD',
        teacher: 'Panel docente',
        shareCode: 'Comparte con estudiantes',
        student: 'App estudiante',
        joinGroup: 'Unirse al grupo',
        chat1: '¿Alguien ayuda con la #3?',
        chat2: '¡Claro! Mira el paso 2.',
        webApps: 'Apps web',
        mobileApps: 'Apps móviles',
        cloud: 'Nube · Firebase',
        edTech: 'EdTech',
        path: 'Ruta',
        home: 'Inicio',
        groups: 'Grupos',
        results: 'Resultados',
        piboTip: '¡Buen intento — sigue así!',
        signIn: 'Acceder',
        gradesLabel: 'grados',
      };
}

export function MockBrowser({
  children,
  url,
  size = 'md',
  compact = false,
}: {
  children: ReactNode;
  url: string;
  size?: 'md' | 'lg';
  compact?: boolean;
}) {
  return (
    <div
      className={`slide-mock-browser ${size === 'lg' ? 'slide-mock-browser-lg' : ''}${
        compact ? ' slide-mock-browser-compact' : ''
      }`}
    >
      <div className="slide-mock-chrome">
        <span className="slide-mock-dot red" />
        <span className="slide-mock-dot yellow" />
        <span className="slide-mock-dot green" />
        <span className="slide-mock-url">{url}</span>
      </div>
      <div className="slide-mock-screen">{children}</div>
    </div>
  );
}

function MockAppShell({
  locale,
  active,
  children,
  compact = false,
}: {
  locale: Locale;
  active: 'home' | 'path' | 'groups';
  children: ReactNode;
  compact?: boolean;
}) {
  const t = copy(locale);
  const tabs = [
    { id: 'home' as const, icon: Home, label: t.home },
    { id: 'path' as const, icon: BookOpen, label: t.path },
    { id: 'groups' as const, icon: Users, label: t.groups },
  ];
  return (
    <div className={`slide-mock-app${compact ? ' slide-mock-app-compact' : ''}`}>
      <aside className="slide-mock-sidebar">
        <div className="slide-mock-sidebar-logo">π</div>
        {tabs.map(({ id, icon: Icon, label }) => (
          <div key={id} className={`slide-mock-nav ${active === id ? 'active' : ''}`}>
            <Icon size={10} strokeWidth={2.25} />
            <span>{label}</span>
          </div>
        ))}
      </aside>
      <div className="slide-mock-app-main">{children}</div>
    </div>
  );
}

export function MockLanding({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy(locale);
  return (
    <MockBrowser url="pefcmeem-euler-web.web.app" size="lg" compact={compact}>
      <div className="slide-mock-landing">
        <div className="slide-mock-landing-nav">
          <span className="slide-mock-landing-logo">EULER</span>
          <span className="slide-mock-landing-sign">{t.signIn}</span>
        </div>
        <div className="slide-mock-landing-body">
          <div className="slide-mock-landing-text">
            <span className="slide-mock-pill">{t.landingPill}</span>
            <p className="slide-mock-h">{t.landingTitle}</p>
            <span className="slide-mock-btn">{t.landingBtn}</span>
            <div className="slide-mock-landing-stats">
              <div><strong>5–10</strong><span>min</span></div>
              <div><strong>+10</strong><span>XP</span></div>
              <div><strong>9–11</strong><span>{t.gradesLabel}</span></div>
            </div>
          </div>
          {!compact && (
            <div className="slide-mock-pibo-card">
              <PiboMascot expression="cheering" size={56} />
            </div>
          )}
        </div>
      </div>
    </MockBrowser>
  );
}

export function MockDashboard({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy(locale);
  return (
    <MockBrowser url="pefcmeem-euler-web.web.app/s/home" size="lg" compact={compact}>
      <MockAppShell locale={locale} active="home" compact={compact}>
        <div className="slide-mock-dash">
          <div className="slide-mock-dash-head">
            <div>
              <p className="slide-mock-label">{t.dailyMission}</p>
              <p className="slide-mock-h sm">{t.hello}</p>
              <p className="slide-mock-meta">{t.grade}</p>
            </div>
            {!compact && <PiboMascot expression="happy" size={44} />}
          </div>
          <div className="slide-mock-banner">ICFES · {t.grade.split('·')[1]?.trim()}</div>
          <div className="slide-mock-xp">
            <div className="slide-mock-xp-row">
              <span>{t.level}</span>
              <span className="slide-mock-xp-num">120 / 200 XP</span>
            </div>
            <div className="slide-mock-xp-bar">
              <div className="slide-mock-xp-fill" />
            </div>
          </div>
          <div className="slide-mock-stats">
            <div><Sparkles size={10} /><strong>3</strong><span>{t.level}</span></div>
            <div><Star size={10} /><strong>120</strong><span>{t.xp}</span></div>
            <div><Flame size={10} /><strong>5</strong><span>{t.streak}</span></div>
          </div>
          {!compact && (
            <div className="slide-mock-challenge">
              <div className="slide-mock-challenge-icon"><Zap size={12} /></div>
              <div>
                <p className="slide-mock-label">{t.todayChallenge}</p>
                <p className="slide-mock-challenge-title">{t.lessonTitle}</p>
              </div>
              <span className="slide-mock-challenge-go">→</span>
            </div>
          )}
        </div>
      </MockAppShell>
    </MockBrowser>
  );
}

export function MockLesson({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy(locale);
  return (
    <MockBrowser url="pefcmeem-euler-web.web.app/s/lesson/…" size="lg" compact={compact}>
      <div className="slide-mock-lesson">
        <div className="slide-mock-lesson-head">
          <div>
            <p className="slide-mock-label">{t.lessonUnit}</p>
            <p className="slide-mock-h sm">{t.lessonTitle}</p>
          </div>
          <div className="slide-mock-xp-badge">+10 XP</div>
        </div>
        <div className="slide-mock-steps">
          <span className="done">{t.theory}</span>
          <span className="active">{t.practice}</span>
          {!compact && <span>{t.results}</span>}
        </div>
        <div className="slide-mock-theory">{t.theoryText}</div>
        <p className="slide-mock-q">{t.question}</p>
        <div className="slide-mock-options">
          <span className="active">x = 3 ✓</span>
          {!compact && <span>x = 2</span>}
          {!compact && <span>x = 5</span>}
        </div>
        {!compact && (
          <div className="slide-mock-lesson-foot">
            <PiboMascot expression="thoughtful" size={36} />
            <span>{t.piboTip}</span>
          </div>
        )}
      </div>
    </MockBrowser>
  );
}

export function MockRanking({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy(locale);
  const rows = [
    { rank: 1, name: 'Ana M.', xp: 340, medal: true },
    { rank: 2, name: 'Carlos R.', xp: 285, medal: false },
    { rank: 3, name: 'Laura P.', xp: 210, medal: false },
    { rank: 4, name: 'Diego S.', xp: 185, medal: false },
  ];
  const visibleRows = compact ? rows.slice(0, 3) : rows;
  return (
    <MockBrowser url="pefcmeem-euler-web.web.app/s/groups/…" size="lg" compact={compact}>
      <MockAppShell locale={locale} active="groups" compact={compact}>
        <div className="slide-mock-ranking">
          <div className="slide-mock-ranking-head">
            <Trophy size={14} className="slide-mock-trophy" />
            <div>
              <p className="slide-mock-label">{t.ranking}</p>
              <p className="slide-mock-meta">{t.code}</p>
            </div>
          </div>
          {!compact && (
            <div className="slide-mock-podium">
              <div className="slide-mock-podium-item second">2</div>
              <div className="slide-mock-podium-item first">1</div>
              <div className="slide-mock-podium-item third">3</div>
            </div>
          )}
          {visibleRows.map((r) => (
            <div key={r.rank} className={`slide-mock-row ${r.rank === 1 ? 'top' : ''}`}>
              <span className="slide-mock-rank">
                {r.medal ? '🥇' : `#${r.rank}`}
              </span>
              <span className="slide-mock-avatar">{r.name.charAt(0)}</span>
              <span className="slide-mock-name">{r.name}</span>
              <span className="slide-mock-xp-val">{r.xp} XP</span>
            </div>
          ))}
        </div>
      </MockAppShell>
    </MockBrowser>
  );
}

export function MockGroups({ locale }: { locale: Locale }) {
  const t = copy(locale);
  return (
    <div className="slide-mock-devices">
      <div className="slide-mock-device teacher">
        <div className="slide-mock-device-notch" />
        <p className="slide-mock-label">{t.teacher}</p>
        <div className="slide-mock-code">AB12CD</div>
        <p className="slide-mock-code-hint">{t.shareCode}</p>
        <div className="slide-mock-mini-rank">
          <span>12 students</span>
          <span>Live ranking</span>
        </div>
      </div>
      <div className="slide-mock-device student">
        <div className="slide-mock-device-notch" />
        <p className="slide-mock-label">{t.student}</p>
        <div className="slide-mock-join">{t.joinGroup} →</div>
        <div className="slide-mock-chat">
          <span>{t.chat1}</span>
          <span className="reply">{t.chat2}</span>
        </div>
      </div>
    </div>
  );
}

export function MockTechStack() {
  const items = [
    { icon: Globe, label: 'React', sub: 'Vite' },
    { icon: Code2, label: 'TypeScript', sub: 'Tailwind' },
    { icon: Database, label: 'Firebase', sub: 'Auth' },
    { icon: Smartphone, label: 'Flutter', sub: 'Android' },
    { icon: Users, label: 'Firestore', sub: 'Realtime' },
  ];
  return (
    <div className="slide-mock-tech">
      {items.map(({ icon: Icon, label, sub }) => (
        <div key={label} className="slide-mock-tech-item">
          <div className="slide-mock-tech-icon">
            <Icon size={22} strokeWidth={1.75} />
          </div>
          <strong>{label}</strong>
          <span>{sub}</span>
        </div>
      ))}
    </div>
  );
}

export function MockCareerVisual({ locale }: { locale: Locale }) {
  const t = copy(locale);
  const items = [t.webApps, t.mobileApps, t.cloud, t.edTech];
  return (
    <div className="slide-mock-career">
      <div className="slide-mock-career-hub">
        <div className="slide-mock-career-ring">
          <Code2 size={32} strokeWidth={1.75} />
        </div>
        <span>Systems Eng.</span>
      </div>
      <div className="slide-mock-career-spokes">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function SlideVisual({ type, locale }: { type: string; locale: Locale }) {
  const compact = useIsMobileSlides();
  const mascotSize = compact ? 96 : 160;

  switch (type) {
    case 'landing':
      return <MockLanding locale={locale} compact={compact} />;
    case 'dashboard':
      return <MockDashboard locale={locale} compact={compact} />;
    case 'lesson':
      return <MockLesson locale={locale} compact={compact} />;
    case 'ranking':
      return <MockRanking locale={locale} compact={compact} />;
    case 'groups':
      return <MockGroups locale={locale} />;
    case 'tech':
      return <MockTechStack />;
    case 'career':
      return <MockCareerVisual locale={locale} />;
    case 'mascot':
      return (
        <div className="slide-mock-mascot-wrap">
          <div className="slide-mock-mascot-glow" />
          <PiboMascot expression="cheering" size={mascotSize} />
        </div>
      );
    default:
      return null;
  }
}
