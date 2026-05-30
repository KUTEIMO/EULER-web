export type SlideSpeaker = 'eduardo' | 'jhorman' | 'both';

export interface ScriptLine {
  who: 'eduardo' | 'jhorman';
  line: string;
}

export type SlideVisual =
  | 'career'
  | 'mascot'
  | 'landing'
  | 'dashboard'
  | 'lesson'
  | 'ranking'
  | 'groups'
  | 'tech';

export interface SlideContent {
  id: string;
  layout: 'title' | 'visual' | 'split' | 'closing';
  title: string;
  subtitle?: string;
  bullets?: string[];
  visual?: SlideVisual;
  speaker: SlideSpeaker;
  script: ScriptLine[];
}

export interface SlidesLocale {
  meta: {
    title: string;
    exportPdf: string;
    prev: string;
    next: string;
    slideOf: string;
    home: string;
    script: string;
    guionTitle: string;
    guionBack: string;
    guionPrint: string;
    guionDuration: string;
  };
  slides: SlideContent[];
}

const slidesContentEs: SlideContent[] = [
  {
    id: 'career',
    layout: 'visual',
    title: 'Ingeniería de Sistemas',
    subtitle: 'Construimos software que resuelve problemas reales',
    bullets: [
      'Aplicaciones web y móviles',
      'Bases de datos y servicios en la nube',
      'Proyectos académicos con impacto social',
    ],
    visual: 'career',
    speaker: 'both',
    script: [
      { who: 'eduardo', line: 'We study Systems Engineering.' },
      { who: 'jhorman', line: 'We design and build software — websites, mobile apps, and cloud systems.' },
      { who: 'eduardo', line: 'We also work on academic projects with social impact.' },
      { who: 'jhorman', line: 'Today we want to show you one of those projects.' },
    ],
  },
  {
    id: 'title',
    layout: 'title',
    title: 'EULER',
    subtitle: 'Plataforma de matemáticas para Educación Media',
    visual: 'mascot',
    speaker: 'both',
    script: [
      { who: 'eduardo', line: 'Good morning / Good afternoon, teacher and classmates.' },
      { who: 'jhorman', line: 'We are Eduardo and Jhorman.' },
      { who: 'eduardo', line: 'This is EULER — our math learning platform for secondary school.' },
    ],
  },
  {
    id: 'problem',
    layout: 'visual',
    title: 'El problema',
    bullets: [
      'Estrés con las matemáticas',
      'Preparación para Saber 11 / ICFES',
      'Falta de práctica corta y constante',
    ],
    visual: 'lesson',
    speaker: 'eduardo',
    script: [
      { who: 'eduardo', line: 'Many students feel stress with math.' },
      { who: 'eduardo', line: 'In Colombia, the Saber 11 test is very important for students.' },
      { who: 'eduardo', line: 'They need short daily practice — not long and boring study sessions.' },
      { who: 'eduardo', line: 'Teachers also need a simple way to see class progress.' },
    ],
  },
  {
    id: 'solution',
    layout: 'visual',
    title: 'EULER',
    subtitle: 'Aprender matemáticas con lecciones cortas y gamificación',
    bullets: ['5–10 min por lección', 'Teoría + ejercicios', 'XP, niveles y ranking'],
    visual: 'landing',
    speaker: 'jhorman',
    script: [
      { who: 'jhorman', line: 'Our solution is EULER.' },
      { who: 'jhorman', line: 'It is a web app for students in grades 9, 10, and 11.' },
      { who: 'jhorman', line: 'Each lesson takes five to ten minutes.' },
      { who: 'jhorman', line: 'Students read short theory, answer exercises, and earn XP when they are correct.' },
    ],
  },
  {
    id: 'student-flow',
    layout: 'visual',
    title: 'Ruta del estudiante',
    bullets: ['Registro y ruta de lecciones', 'Dashboard con progreso diario', 'Retos y estadísticas'],
    visual: 'dashboard',
    speaker: 'jhorman',
    script: [
      { who: 'jhorman', line: 'First, the student creates an account and chooses their grade.' },
      { who: 'jhorman', line: 'On the home screen, they see their level, XP, streak, and daily challenge.' },
      { who: 'jhorman', line: 'They follow a clear lesson path — algebra, geometry, statistics, and more.' },
      { who: 'jhorman', line: 'Everything is organized so they always know what to study next.' },
    ],
  },
  {
    id: 'gamification',
    layout: 'split',
    title: 'Gamificación',
    subtitle: 'Motivación con Pibo',
    bullets: ['+10 XP por acierto', 'Rachas y niveles', 'Feedback inmediato'],
    visual: 'mascot',
    speaker: 'eduardo',
    script: [
      { who: 'eduardo', line: 'We use gamification to keep students motivated.' },
      { who: 'eduardo', line: 'Each correct answer gives plus ten XP.' },
      { who: 'eduardo', line: 'Pibo is our mascot — he gives friendly tips during the lessons.' },
      { who: 'eduardo', line: 'Students see their streaks, levels, and stats every day.' },
    ],
  },
  {
    id: 'groups',
    layout: 'visual',
    title: 'Grupos de clase',
    bullets: ['Código de acceso', 'Ranking en vivo', 'Chat grupal'],
    visual: 'groups',
    speaker: 'jhorman',
    script: [
      { who: 'jhorman', line: 'Teachers can create a class group in one minute.' },
      { who: 'jhorman', line: 'They get a six-character code and share it with students.' },
      { who: 'jhorman', line: 'Students join and see a live XP ranking — positive competition.' },
      { who: 'jhorman', line: 'There is also a group chat for questions between classmates.' },
    ],
  },
  {
    id: 'tech',
    layout: 'visual',
    title: 'Stack tecnológico',
    bullets: ['React · TypeScript · Firebase', 'Web + app Android', 'Misma base de datos'],
    visual: 'tech',
    speaker: 'eduardo',
    script: [
      { who: 'eduardo', line: 'We built the website with React, TypeScript, and Vite.' },
      { who: 'eduardo', line: 'Firebase handles authentication and cloud data with Firestore.' },
      { who: 'eduardo', line: 'The web app and the Android app share the same database.' },
      { who: 'eduardo', line: 'Everything is deployed on Firebase Hosting.' },
    ],
  },
  {
    id: 'demo',
    layout: 'visual',
    title: 'Demo',
    subtitle: 'pefcmeem-euler-web.web.app',
    visual: 'ranking',
    speaker: 'both',
    script: [
      { who: 'eduardo', line: 'Our website is pefcmeem-euler-web.web.app.' },
      { who: 'jhorman', line: 'Now we can show you a quick demo of the platform.' },
      { who: 'eduardo', line: 'I will navigate the app and Jhorman will explain each step.' },
      { who: 'jhorman', line: 'Would you like to see a lesson or the class ranking?' },
    ],
  },
  {
    id: 'closing',
    layout: 'closing',
    title: 'Thank you!',
    subtitle: 'Any questions?',
    bullets: ['pefcmeem-euler-web.web.app'],
    visual: 'mascot',
    speaker: 'both',
    script: [
      { who: 'jhorman', line: 'Thank you for listening to our presentation.' },
      { who: 'eduardo', line: 'Do you have any questions?' },
    ],
  },
];

const slidesContentEn: SlideContent[] = [
  {
    id: 'career',
    layout: 'visual',
    title: 'Systems Engineering',
    subtitle: 'We build software that solves real problems',
    bullets: [
      'Web and mobile applications',
      'Databases and cloud services',
      'Academic projects with social impact',
    ],
    visual: 'career',
    speaker: 'both',
    script: [
      { who: 'eduardo', line: 'We study Systems Engineering.' },
      { who: 'jhorman', line: 'We design and build software — websites, mobile apps, and cloud systems.' },
      { who: 'eduardo', line: 'We also work on academic projects with social impact.' },
      { who: 'jhorman', line: 'Today we want to show you one of those projects.' },
    ],
  },
  {
    id: 'title',
    layout: 'title',
    title: 'EULER',
    subtitle: 'Math platform for secondary school',
    visual: 'mascot',
    speaker: 'both',
    script: [
      { who: 'eduardo', line: 'Good morning / Good afternoon, teacher and classmates.' },
      { who: 'jhorman', line: 'We are Eduardo and Jhorman.' },
      { who: 'eduardo', line: 'This is EULER — our math learning platform for secondary school.' },
    ],
  },
  {
    id: 'problem',
    layout: 'visual',
    title: 'The problem',
    bullets: [
      'Stress with math',
      'Preparation for Saber 11 / ICFES',
      'Need for short, daily practice',
    ],
    visual: 'lesson',
    speaker: 'eduardo',
    script: [
      { who: 'eduardo', line: 'Many students feel stress with math.' },
      { who: 'eduardo', line: 'In Colombia, the Saber 11 test is very important for students.' },
      { who: 'eduardo', line: 'They need short daily practice — not long and boring study sessions.' },
      { who: 'eduardo', line: 'Teachers also need a simple way to see class progress.' },
    ],
  },
  {
    id: 'solution',
    layout: 'visual',
    title: 'EULER',
    subtitle: 'Learn math with short lessons and gamification',
    bullets: ['5–10 min per lesson', 'Theory + exercises', 'XP, levels, and ranking'],
    visual: 'landing',
    speaker: 'jhorman',
    script: [
      { who: 'jhorman', line: 'Our solution is EULER.' },
      { who: 'jhorman', line: 'It is a web app for students in grades 9, 10, and 11.' },
      { who: 'jhorman', line: 'Each lesson takes five to ten minutes.' },
      { who: 'jhorman', line: 'Students read short theory, answer exercises, and earn XP when they are correct.' },
    ],
  },
  {
    id: 'student-flow',
    layout: 'visual',
    title: 'Student journey',
    bullets: ['Sign up and lesson path', 'Dashboard with daily progress', 'Challenges and stats'],
    visual: 'dashboard',
    speaker: 'jhorman',
    script: [
      { who: 'jhorman', line: 'First, the student creates an account and chooses their grade.' },
      { who: 'jhorman', line: 'On the home screen, they see their level, XP, streak, and daily challenge.' },
      { who: 'jhorman', line: 'They follow a clear lesson path — algebra, geometry, statistics, and more.' },
      { who: 'jhorman', line: 'Everything is organized so they always know what to study next.' },
    ],
  },
  {
    id: 'gamification',
    layout: 'split',
    title: 'Gamification',
    subtitle: 'Motivation with Pibo',
    bullets: ['+10 XP per correct answer', 'Streaks and levels', 'Instant feedback'],
    visual: 'mascot',
    speaker: 'eduardo',
    script: [
      { who: 'eduardo', line: 'We use gamification to keep students motivated.' },
      { who: 'eduardo', line: 'Each correct answer gives plus ten XP.' },
      { who: 'eduardo', line: 'Pibo is our mascot — he gives friendly tips during the lessons.' },
      { who: 'eduardo', line: 'Students see their streaks, levels, and stats every day.' },
    ],
  },
  {
    id: 'groups',
    layout: 'visual',
    title: 'Class groups',
    bullets: ['Join code', 'Live ranking', 'Group chat'],
    visual: 'groups',
    speaker: 'jhorman',
    script: [
      { who: 'jhorman', line: 'Teachers can create a class group in one minute.' },
      { who: 'jhorman', line: 'They get a six-character code and share it with students.' },
      { who: 'jhorman', line: 'Students join and see a live XP ranking — positive competition.' },
      { who: 'jhorman', line: 'There is also a group chat for questions between classmates.' },
    ],
  },
  {
    id: 'tech',
    layout: 'visual',
    title: 'Technology stack',
    bullets: ['React · TypeScript · Firebase', 'Web + Android app', 'Shared database'],
    visual: 'tech',
    speaker: 'eduardo',
    script: [
      { who: 'eduardo', line: 'We built the website with React, TypeScript, and Vite.' },
      { who: 'eduardo', line: 'Firebase handles authentication and cloud data with Firestore.' },
      { who: 'eduardo', line: 'The web app and the Android app share the same database.' },
      { who: 'eduardo', line: 'Everything is deployed on Firebase Hosting.' },
    ],
  },
  {
    id: 'demo',
    layout: 'visual',
    title: 'Demo',
    subtitle: 'pefcmeem-euler-web.web.app',
    visual: 'ranking',
    speaker: 'both',
    script: [
      { who: 'eduardo', line: 'Our website is pefcmeem-euler-web.web.app.' },
      { who: 'jhorman', line: 'Now we can show you a quick demo of the platform.' },
      { who: 'eduardo', line: 'I will navigate the app and Jhorman will explain each step.' },
      { who: 'jhorman', line: 'Would you like to see a lesson or the class ranking?' },
    ],
  },
  {
    id: 'closing',
    layout: 'closing',
    title: 'Thank you!',
    subtitle: 'Any questions?',
    bullets: ['pefcmeem-euler-web.web.app'],
    visual: 'mascot',
    speaker: 'both',
    script: [
      { who: 'jhorman', line: 'Thank you for listening to our presentation.' },
      { who: 'eduardo', line: 'Do you have any questions?' },
    ],
  },
];

export const slidesEs: SlidesLocale = {
  meta: {
    title: 'Presentación EULER',
    exportPdf: 'Exportar PDF',
    prev: 'Anterior',
    next: 'Siguiente',
    slideOf: 'de',
    home: 'Inicio',
    script: 'Guion',
    guionTitle: 'Guion de exposición',
    guionBack: 'Volver a diapositivas',
    guionPrint: 'Imprimir guion',
    guionDuration: '~10 min · Eduardo & Jhorman',
  },
  slides: slidesContentEs,
};

export const slidesEn: SlidesLocale = {
  meta: {
    title: 'EULER Presentation',
    exportPdf: 'Export PDF',
    prev: 'Previous',
    next: 'Next',
    slideOf: 'of',
    home: 'Home',
    script: 'Script',
    guionTitle: 'Presentation script',
    guionBack: 'Back to slides',
    guionPrint: 'Print script',
    guionDuration: '~10 min · Eduardo & Jhorman',
  },
  slides: slidesContentEn,
};

export function getSlidesLocale(locale: 'es' | 'en'): SlidesLocale {
  return locale === 'en' ? slidesEn : slidesEs;
}
