import { create } from 'zustand';

interface PiboState {
  message: string;
  visible: boolean;
  say: (message: string, durationMs?: number) => void;
  hide: () => void;
}

let timer: ReturnType<typeof setTimeout> | null = null;

export const usePiboStore = create<PiboState>((set) => ({
  message: '¡Hola! Soy Pibo, tu compañero en EULER.',
  visible: true,
  say: (message, durationMs = 5000) => {
    if (timer) clearTimeout(timer);
    set({ message, visible: true });
    timer = setTimeout(() => set({ visible: false }), durationMs);
  },
  hide: () => set({ visible: false }),
}));
