import type { UserProgress } from '../types';

const STORAGE_KEY = 'pefcmeem_user_progress_v1';
const GROUP_KEY = 'euler_current_group_id';

export function initialProgress(): UserProgress {
  return {
    totalXp: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDateIso: null,
    completedLessonIds: [],
    totalQuestionsAnswered: 0,
    totalQuestionsCorrect: 0,
    studyMinutesApprox: 0,
    displayName: 'Estudiante',
    gradeLabel: '10',
    goalLabel: 'Saber 11',
    avatarColorIndex: 0,
  };
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProgress();
    const json = JSON.parse(raw) as UserProgress;
    return {
      ...initialProgress(),
      ...json,
      completedLessonIds: json.completedLessonIds ?? [],
    };
  } catch {
    return initialProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function isoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function updateStreak(progress: UserProgress): void {
  const now = new Date();
  const today = isoDate(now);
  const last = progress.lastActivityDateIso;
  if (!last) {
    progress.currentStreak = 1;
  } else if (last === today) {
    // same day
  } else {
    const lastDt = new Date(last + 'T12:00:00');
    const diff = Math.floor((now.getTime() - lastDt.getTime()) / 86400000);
    progress.currentStreak = diff === 1 ? progress.currentStreak + 1 : 1;
  }
  progress.lastActivityDateIso = today;
  if (progress.currentStreak > progress.longestStreak) {
    progress.longestStreak = progress.currentStreak;
  }
}

export function completeLessonSession(
  progress: UserProgress,
  lessonId: string,
  estimatedMinutes: number,
  correctCount: number,
  totalQuestions: number,
  xpPerCorrect: number,
  perfectBonus: number,
): { progress: UserProgress; xpGain: number } {
  if (progress.completedLessonIds.includes(lessonId)) {
    return { progress, xpGain: 0 };
  }
  let xpGain = 0;
  for (let i = 0; i < correctCount; i++) xpGain += xpPerCorrect;
  if (totalQuestions > 0 && correctCount === totalQuestions) xpGain += perfectBonus;

  const next = { ...progress, completedLessonIds: [...progress.completedLessonIds] };
  next.totalXp += xpGain;
  next.totalQuestionsAnswered += totalQuestions;
  next.totalQuestionsCorrect += correctCount;
  next.studyMinutesApprox += estimatedMinutes;
  next.completedLessonIds.push(lessonId);
  updateStreak(next);
  saveProgress(next);
  return { progress: next, xpGain };
}

export function getCurrentGroupId(): string | null {
  return localStorage.getItem(GROUP_KEY);
}

export function setCurrentGroupId(id: string | null): void {
  if (id) localStorage.setItem(GROUP_KEY, id);
  else localStorage.removeItem(GROUP_KEY);
}
