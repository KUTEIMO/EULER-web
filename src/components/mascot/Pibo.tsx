import { usePiboStore } from '../../store/piboStore';
import PiboMascot, { type PiboExpression } from './PiboMascot';

interface PiboProps {
  expression?: PiboExpression;
}

export default function Pibo({ expression = 'normal' }: PiboProps) {
  const { message, visible } = usePiboStore();

  return (
    <div
      className="fixed bottom-5 right-4 z-40 flex max-w-[min(100%,20rem)] flex-col items-end gap-2 sm:right-6"
      aria-live="polite"
    >
      {visible && message && (
        <div className="mascot-speech animate-fade-in-up max-w-xs">{message}</div>
      )}
      <button
        type="button"
        className="group relative rounded-full p-1 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--euler-primary-light)]"
        style={{
          background: 'linear-gradient(135deg, var(--euler-primary), var(--euler-mint))',
          boxShadow: '0 8px 28px var(--euler-primary-glow)',
        }}
        aria-label="Pibo, tu compañero de matemáticas"
        onClick={() =>
          usePiboStore.getState().say(
            'Tip: en Saber 11, domina patrones y ecuaciones lineales primero. ¡Tú puedes!',
          )
        }
      >
        <div className="rounded-full bg-[var(--euler-bg)] p-1">
          <PiboMascot expression={expression} size={72} />
        </div>
      </button>
    </div>
  );
}
