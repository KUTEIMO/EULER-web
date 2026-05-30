import { create } from 'zustand';

export type Locale = 'es' | 'en';

function getInitial(): Locale {
  if (typeof window === 'undefined') return 'es';
  const stored = localStorage.getItem('euler-locale') as Locale | null;
  if (stored === 'es' || stored === 'en') return stored;
  return 'es';
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
}

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

export const useLocaleStore = create<LocaleState>((set, get) => ({
  locale: getInitial(),
  setLocale: (locale) => {
    localStorage.setItem('euler-locale', locale);
    applyLocale(locale);
    set({ locale });
  },
  toggle: () => {
    const next = get().locale === 'es' ? 'en' : 'es';
    get().setLocale(next);
  },
}));

if (typeof document !== 'undefined') {
  applyLocale(getInitial());
}
