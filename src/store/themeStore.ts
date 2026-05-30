import { create } from 'zustand';

type Theme = 'light' | 'dark';

function getInitial(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('euler-theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

interface ThemeState {
  theme: Theme;
  toggle: () => void;
  apply: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitial(),
  toggle: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('euler-theme', next);
    set({ theme: next });
    get().apply();
  },
  apply: () => {
    const root = document.documentElement;
    if (get().theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  },
}));
