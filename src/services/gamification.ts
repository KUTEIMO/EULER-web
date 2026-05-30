export const Gamification = {
  xpPerCorrectAnswer: () => 10,
  perfectLessonBonus: () => 15,
  levelFromTotalXp(totalXp: number) {
    if (totalXp <= 0) return 1;
    return Math.floor(totalXp / 100) + 1;
  },
  xpIntoCurrentLevel(totalXp: number) {
    const level = this.levelFromTotalXp(totalXp);
    const start = (level - 1) * 100;
    return totalXp - start;
  },
  xpForNextLevel(totalXp: number) {
    const level = this.levelFromTotalXp(totalXp);
    return level * 100 - totalXp;
  },
};
