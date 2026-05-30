import { create } from 'zustand';
import type { UserProgress } from '../types';
import {
  completeLessonSession,
  getCurrentGroupId,
  initialProgress,
  loadProgress,
  saveProgress,
  setCurrentGroupId,
} from '../services/progressService';
import { Gamification } from '../services/gamification';
import { addXpToMember } from '../services/groupService';

interface ProgressState {
  progress: UserProgress;
  currentGroupId: string | null;
  hydrated: boolean;
  hydrate: () => void;
  setProgress: (p: UserProgress) => void;
  updateProgress: (partial: Partial<UserProgress>) => void;
  completeLesson: (
    lessonId: string,
    estimatedMinutes: number,
    correctCount: number,
    totalQuestions: number,
  ) => Promise<number>;
  setGroup: (id: string | null) => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: initialProgress(),
  currentGroupId: null,
  hydrated: false,
  hydrate: () => {
    set({
      progress: loadProgress(),
      currentGroupId: getCurrentGroupId(),
      hydrated: true,
    });
  },
  setProgress: (progress) => {
    saveProgress(progress);
    set({ progress });
  },
  updateProgress: (partial) => {
    const next = { ...get().progress, ...partial };
    saveProgress(next);
    set({ progress: next });
  },
  completeLesson: async (lessonId, estimatedMinutes, correctCount, totalQuestions) => {
    const { progress, currentGroupId } = get();
    const { progress: next, xpGain } = completeLessonSession(
      progress,
      lessonId,
      estimatedMinutes,
      correctCount,
      totalQuestions,
      Gamification.xpPerCorrectAnswer(),
      Gamification.perfectLessonBonus(),
    );
    set({ progress: next });
    if (currentGroupId && xpGain > 0) {
      try {
        await addXpToMember(currentGroupId, xpGain);
      } catch {
        /* ignore */
      }
    }
    return xpGain;
  },
  setGroup: (id) => {
    setCurrentGroupId(id);
    set({ currentGroupId: id });
  },
}));
