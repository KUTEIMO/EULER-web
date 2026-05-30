import type { Exercise } from '../../types';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  selected: number | null;
  showResult: boolean;
  onSelect: (index: number) => void;
}

export default function ExerciseCard({
  exercise,
  index,
  selected,
  showResult,
  onSelect,
}: ExerciseCardProps) {
  return (
    <div className="euler-glass p-6">
      <p className="mb-4 font-medium">
        <span className="text-euler-coral mr-2">#{index + 1}</span>
        {exercise.prompt}
      </p>
      <ul className="space-y-2">
        {exercise.options.map((opt, i) => {
          let cls =
            'w-full rounded-xl border px-4 py-3 text-left text-sm transition';
          if (showResult) {
            if (i === exercise.correctIndex) cls += ' border-green-500 bg-green-500/10';
            else if (i === selected) cls += ' border-red-500 bg-red-500/10';
            else cls += ' border-[var(--euler-border)] opacity-60';
          } else if (i === selected) {
            cls += ' border-euler-primary-light bg-euler-primary/20';
          } else {
            cls += ' border-[var(--euler-border)] hover:border-euler-primary-light';
          }
          return (
            <li key={i}>
              <button type="button" className={cls} onClick={() => !showResult && onSelect(i)} disabled={showResult}>
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
      {showResult && (
        <p className="mt-4 rounded-lg bg-[var(--euler-glass)] p-3 text-sm text-[var(--euler-muted)]">
          {exercise.explanation}
        </p>
      )}
    </div>
  );
}
