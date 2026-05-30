import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadCatalog, findLessonRef } from '../../services/courseService';
import { useProgressStore } from '../../store/progressStore';
import { usePiboStore } from '../../store/piboStore';
import TheoryPanel from '../../components/lesson/TheoryPanel';
import ExerciseCard from '../../components/lesson/ExerciseCard';
import PiboMascot from '../../components/mascot/PiboMascot';
import type { LessonRef } from '../../types';

type Phase = 'theory' | 'practice' | 'results';

export default function StudentLesson() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { completeLesson } = useProgressStore();
  const [ref, setRef] = useState<LessonRef | null>(null);
  const [phase, setPhase] = useState<Phase>('theory');
  const [exIndex, setExIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpGain, setXpGain] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    loadCatalog().then((cat) => setRef(findLessonRef(cat, lessonId)));
    usePiboStore.getState().say('Lee la teoría con calma antes de practicar.');
  }, [lessonId]);

  if (!ref) {
    return <p className="text-[var(--euler-muted)]">Cargando lección…</p>;
  }

  const { lesson } = ref;
  const exercise = lesson.exercises[exIndex];

  async function finishLesson(finalCorrect: number) {
    const gain = await completeLesson(
      lesson.id,
      lesson.estimatedMinutes,
      finalCorrect,
      lesson.exercises.length,
    );
    setXpGain(gain);
    setDone(true);
    setPhase('results');
    usePiboStore.getState().say(
      finalCorrect === lesson.exercises.length
        ? '¡Lección perfecta! Sumaste XP extra.'
        : '¡Buen trabajo! Sigue practicando.',
    );
  }

  function handleCheck() {
    if (selected === null || !exercise) return;
    const ok = selected === exercise.correctIndex;
    const nextCorrect = correctCount + (ok ? 1 : 0);
    setShowResult(true);
    if (!ok) usePiboStore.getState().say('Revisa la explicación e intenta la siguiente.');
    setTimeout(() => {
      if (exIndex + 1 < lesson.exercises.length) {
        setExIndex(exIndex + 1);
        setSelected(null);
        setShowResult(false);
        setCorrectCount(nextCorrect);
      } else {
        finishLesson(nextCorrect);
      }
    }, 1800);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <nav className="text-sm text-[var(--euler-muted)]">
        <Link to="/s/path">{ref.course.title}</Link>
        <span> / {ref.unit.title}</span>
      </nav>

      {phase === 'theory' && (
        <>
          <TheoryPanel title={lesson.title} theoryPlain={lesson.theoryPlain} />
          <button type="button" className="btn-primary" onClick={() => setPhase('practice')}>
            Ir a ejercicios
          </button>
        </>
      )}

      {phase === 'practice' && exercise && (
        <>
          <p className="text-sm text-[var(--euler-muted)]">
            Ejercicio {exIndex + 1} de {lesson.exercises.length}
          </p>
          <ExerciseCard
            exercise={exercise}
            index={exIndex}
            selected={selected}
            showResult={showResult}
            onSelect={setSelected}
          />
          {!showResult && (
            <button
              type="button"
              className="btn-primary"
              disabled={selected === null}
              onClick={handleCheck}
            >
              Comprobar
            </button>
          )}
        </>
      )}

      {phase === 'results' && (
        <div className="euler-card-accent animate-celebrate p-8 text-center sm:p-10">
          <PiboMascot
            expression={xpGain > 0 ? 'cheering' : 'thoughtful'}
            size={120}
            className="mx-auto"
          />
          <h2 className="font-display mt-4 text-2xl font-bold sm:text-3xl">
            {done ? '¡Lección completada!' : 'Resultados'}
          </h2>
          <p className="mt-2 text-[var(--euler-muted)]">Sumaste a tu camino hacia el Saber 11</p>
          <p className="font-display mt-4 text-4xl font-bold euler-gradient-text">+{xpGain} XP</p>
          <Link to="/s/home" className="btn-primary mt-6 inline-flex">
            Volver al inicio
          </Link>
        </div>
      )}
    </div>
  );
}
