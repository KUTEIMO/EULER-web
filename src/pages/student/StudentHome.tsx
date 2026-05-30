import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Flame, Sparkles, Star, Trophy, Zap } from 'lucide-react';
import { loadCatalog, findNextLesson } from '../../services/courseService';
import { useProgressStore } from '../../store/progressStore';
import { Gamification } from '../../services/gamification';
import { usePiboStore } from '../../store/piboStore';
import StatCard from '../../components/gamification/StatCard';
import IcFesBanner from '../../components/gamification/IcFesBanner';
import XpBar from '../../components/gamification/XpBar';
import PiboMascot from '../../components/mascot/PiboMascot';
import type { LessonRef } from '../../types';

export default function StudentHome() {
  const { progress } = useProgressStore();
  const [next, setNext] = useState<LessonRef | null>(null);
  const level = Gamification.levelFromTotalXp(progress.totalXp);
  const xpIn = Gamification.xpIntoCurrentLevel(progress.totalXp);
  const xpNeed = Gamification.xpForNextLevel(progress.totalXp);
  const accuracy =
    progress.totalQuestionsAnswered === 0
      ? 0
      : Math.round((progress.totalQuestionsCorrect / progress.totalQuestionsAnswered) * 100);

  useEffect(() => {
    loadCatalog().then((cat) => {
      setNext(findNextLesson(cat, progress.completedLessonIds));
    });
    usePiboStore.getState().say(
      `¡Hola ${progress.displayName || 'campeón'}! Hoy suma XP hacia tu meta ${progress.goalLabel}.`,
    );
  }, [progress.completedLessonIds, progress.displayName, progress.goalLabel]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="icfes-pill mb-2">Tu misión diaria</span>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Hola, <span className="euler-gradient-text">{progress.displayName || 'Estudiante'}</span>
          </h1>
          <p className="mt-2 text-[var(--euler-muted)]">
            Grado {progress.gradeLabel} · Meta: <strong>{progress.goalLabel}</strong>
            {accuracy > 0 && (
              <span className="ml-2 text-[var(--euler-success)]">· {accuracy}% precisión</span>
            )}
          </p>
        </div>
        <div className="hidden shrink-0 sm:block">
          <PiboMascot expression="happy" size={100} />
        </div>
      </div>

      <IcFesBanner goalLabel={progress.goalLabel} />

      <div className="euler-glass p-5 md:hidden">
        <XpBar current={xpIn} max={xpIn + xpNeed} label={`Nivel ${level}`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Sparkles} label="Nivel" value={level} accent="level" />
        <StatCard icon={Star} label="XP total" value={progress.totalXp} accent="xp" />
        <StatCard icon={Flame} label="Racha" value={`${progress.currentStreak} días`} accent="streak" />
      </div>

      {next ? (
        <div className="euler-card-accent overflow-hidden p-0">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, var(--euler-coral), var(--euler-gold))',
                }}
              >
                <Zap className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--euler-coral)]">
                  Reto de hoy
                </p>
                <h2 className="font-display text-xl font-bold">Continúa tu ruta</h2>
                <p className="text-[var(--euler-muted)]">
                  {next.course.title} · {next.lesson.title}
                </p>
                <p className="mt-1 text-sm text-[var(--euler-muted)]">
                  ~{next.lesson.estimatedMinutes} min · +10 XP por acierto
                </p>
              </div>
            </div>
            <Link
              to={`/s/lesson/${next.lesson.id}`}
              className="btn-primary shrink-0 self-start sm:self-center"
            >
              Empezar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="euler-glass p-8 text-center">
          <Trophy className="mx-auto mb-3 h-12 w-12 text-[var(--euler-gold)]" />
          <p className="font-display text-lg font-semibold">¡Catálogo completado!</p>
          <Link to="/s/path" className="btn-secondary mt-4 inline-flex">
            Repasar ruta
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/s/path" className="euler-glass-hover flex items-center gap-4 p-5">
          <BookOpen className="h-8 w-8 text-[var(--euler-primary-light)]" />
          <div>
            <p className="font-display font-semibold">Mi ruta completa</p>
            <p className="text-sm text-[var(--euler-muted)]">
              {progress.completedLessonIds.length} lecciones completadas
            </p>
          </div>
        </Link>
        <Link to="/s/groups" className="euler-glass-hover flex items-center gap-4 p-5">
          <Flame className="h-8 w-8 text-orange-500" />
          <div>
            <p className="font-display font-semibold">Grupo de clase</p>
            <p className="text-sm text-[var(--euler-muted)]">Ranking y chat con compañeros</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
