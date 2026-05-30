export type UserRole = 'student' | 'teacher';

export interface UserProfile {
  email: string;
  displayName: string;
  role: UserRole;
  onboardingComplete?: boolean;
  schoolName?: string;
}

export interface Exercise {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  estimatedMinutes: number;
  theoryPlain: string;
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  area: string;
  accentColorKey?: string;
  units: Unit[];
}

export interface CourseCatalog {
  courses: Course[];
}

export interface LessonRef {
  course: Course;
  unit: Unit;
  lesson: Lesson;
}

export interface UserProgress {
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDateIso: string | null;
  completedLessonIds: string[];
  totalQuestionsAnswered: number;
  totalQuestionsCorrect: number;
  studyMinutesApprox: number;
  displayName: string;
  gradeLabel: string;
  goalLabel: string;
  avatarColorIndex: number;
}

export interface GroupInfo {
  id: string;
  name: string;
  code: string;
  teacherUid: string;
  schoolName: string;
}

export interface GroupMember {
  uid: string;
  displayName: string;
  totalXp: number;
}

export interface GroupMessage {
  id: string;
  senderUid: string;
  senderName: string;
  text: string;
  createdAt: Date | null;
}
