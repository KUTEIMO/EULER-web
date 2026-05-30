import type { Locale } from '../store/localeStore';

export const landingEs = {
  navAbout: 'Sobre el proyecto',
  navLogin: 'Acceder',
  pill: 'ICFES · Saber 11 · Colombia',
  heroHeadline: 'Matemáticas que te preparan para el Saber 11',
  heroSub:
    'Practica sin miedo, gana XP y sube de nivel. Diseñado para grados 9, 10 y 11 en Colombia.',
  icfesPitch:
    'Menos estrés, más práctica real: objetivos claros por sesión para que llegues más seguro a la prueba.',
  ctaStart: 'Empezar gratis',
  ctaLogin: 'Ya tengo cuenta',
  statLesson: 'min por lección',
  statXp: 'XP por acierto',
  statGrades: 'grados',
  piboHello: '¡Hola! Soy',
  piboName: 'Pibo',
  piboDesc: 'Te acompaño lección a lección. Sin juicios, solo práctica.',
  streak: 'Mantén tu racha diaria y sube en el ranking',
  whyTitle: 'Por qué funciona con estudiantes',
  whyDesc:
    'Combinamos psicología de aprendizaje (metas pequeñas, refuerzo positivo) con ingeniería educativa (datos, ranking, rutas claras).',
  features: [
    {
      title: 'Enfoque Saber 11',
      desc: 'Lecciones alineadas a lo que más aparece en pruebas: patrones, álgebra y razonamiento.',
    },
    {
      title: 'Rutas de 5–10 min',
      desc: 'Un objetivo por sesión. Ideal para estudiar después del colegio sin agotarte.',
    },
    {
      title: 'XP y niveles',
      desc: 'Cada acierto suma. Ves tu progreso y mantienes la motivación día a día.',
    },
    {
      title: 'Grupos de clase',
      desc: 'Tu docente comparte un código; compites sanamente en el ranking del curso.',
    },
  ],
  missionTitle: 'Atraer · Ayudar · Mejorar resultados',
  missionDesc:
    'Micro-lecciones con práctica guiada, feedback inmediato y herramientas para docentes en clase. Misma cuenta en web y app móvil; tu docente ve el avance del grupo en tiempo real.',
  tags: ['Ranking', 'Feedback inmediato', 'Teoría + práctica'],
};

export const landingEn = {
  navAbout: 'About',
  navLogin: 'Sign in',
  pill: 'ICFES · Saber 11 · Colombia',
  heroHeadline: 'Math that prepares you for Saber 11',
  heroSub:
    'Practice without fear, earn XP, and level up. Built for grades 9, 10, and 11 in Colombia.',
  icfesPitch:
    'Less stress, more real practice: clear goals each session so you feel ready for the test.',
  ctaStart: 'Start free',
  ctaLogin: 'I have an account',
  statLesson: 'min per lesson',
  statXp: 'XP per correct answer',
  statGrades: 'grades',
  piboHello: 'Hi! I am',
  piboName: 'Pibo',
  piboDesc: 'I guide you lesson by lesson. No judgment, just practice.',
  streak: 'Keep your daily streak and climb the ranking',
  whyTitle: 'Why it works for students',
  whyDesc:
    'We combine learning psychology (small goals, positive feedback) with educational engineering (data, ranking, clear paths).',
  features: [
    {
      title: 'Saber 11 focus',
      desc: 'Lessons aligned with what appears most on tests: patterns, algebra, and reasoning.',
    },
    {
      title: '5–10 min paths',
      desc: 'One goal per session. Perfect for studying after school without burning out.',
    },
    {
      title: 'XP and levels',
      desc: 'Every correct answer counts. Track progress and stay motivated every day.',
    },
    {
      title: 'Class groups',
      desc: 'Your teacher shares a code; compete fairly on the course ranking.',
    },
  ],
  missionTitle: 'Attract · Help · Improve results',
  missionDesc:
    'Micro-lessons with guided practice, instant feedback, and tools for teachers in class. Same account on web and mobile; your teacher sees group progress in real time.',
  tags: ['Ranking', 'Instant feedback', 'Theory + practice'],
};

export function getLandingLocale(locale: Locale) {
  return locale === 'en' ? landingEn : landingEs;
}
