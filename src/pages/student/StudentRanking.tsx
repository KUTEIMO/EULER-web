import { useProgressStore } from '../../store/progressStore';
import { Gamification } from '../../services/gamification';

export default function StudentRanking() {
  const { progress } = useProgressStore();
  const level = Gamification.levelFromTotalXp(progress.totalXp);
  const xpIn = Gamification.xpIntoCurrentLevel(progress.totalXp);
  const xpNeed = Gamification.xpForNextLevel(progress.totalXp);
  const accuracy =
    progress.totalQuestionsAnswered === 0
      ? 0
      : Math.round((progress.totalQuestionsCorrect / progress.totalQuestionsAnswered) * 100);

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold">Mis estadísticas</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Nivel', level],
          ['XP total', progress.totalXp],
          ['Lecciones', progress.completedLessonIds.length],
          ['Precisión', `${accuracy}%`],
          ['Racha actual', `${progress.currentStreak} días`],
          ['Mejor racha', `${progress.longestStreak} días`],
          ['Minutos estudio', progress.studyMinutesApprox],
        ].map(([label, value]) => (
          <div key={String(label)} className="euler-glass p-5">
            <p className="text-sm text-[var(--euler-muted)]">{label}</p>
            <p className="font-display text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="euler-glass p-6">
        <p className="mb-2 text-sm">Progreso al siguiente nivel</p>
        <div className="h-3 overflow-hidden rounded-full bg-[var(--euler-border)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-euler-primary to-euler-primary-light"
            style={{ width: `${Math.min(100, (xpIn / (xpIn + xpNeed)) * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-[var(--euler-muted)]">
          {xpIn} / {xpIn + xpNeed} XP en este nivel
        </p>
      </div>
    </div>
  );
}
