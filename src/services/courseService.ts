import { doc, getDoc } from 'firebase/firestore';
import type { Course, CourseCatalog, LessonRef } from '../types';
import { db } from '../config/firebase';

let cached: CourseCatalog | null = null;

function parseCatalog(data: { courses: unknown }): CourseCatalog {
  return data as CourseCatalog;
}

export async function loadCatalog(force = false): Promise<CourseCatalog> {
  if (cached && !force) return cached;

  const localRes = await fetch('/courses.json');
  const local = parseCatalog(await localRes.json());
  cached = local;

  if (db) {
    try {
      const snap = await getDoc(doc(db, 'published', 'courses'));
      const list = snap.data()?.courses;
      if (snap.exists() && Array.isArray(list) && list.length > 0) {
        cached = { courses: list as Course[] };
      }
    } catch {
      /* keep local */
    }
  }
  return cached;
}

export function clearCatalogCache(): void {
  cached = null;
}

export function orderedLessonRefs(catalog: CourseCatalog): LessonRef[] {
  const refs: LessonRef[] = [];
  for (const course of catalog.courses) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        refs.push({ course, unit, lesson });
      }
    }
  }
  return refs;
}

export function findLessonRef(catalog: CourseCatalog, lessonId: string): LessonRef | null {
  return orderedLessonRefs(catalog).find((r) => r.lesson.id === lessonId) ?? null;
}

export function findNextLesson(
  catalog: CourseCatalog,
  completedIds: string[],
): LessonRef | null {
  for (const ref of orderedLessonRefs(catalog)) {
    if (!completedIds.includes(ref.lesson.id)) return ref;
  }
  return null;
}

export function isLessonUnlocked(
  catalog: CourseCatalog,
  lessonId: string,
  completedIds: string[],
): boolean {
  const refs = orderedLessonRefs(catalog);
  const idx = refs.findIndex((r) => r.lesson.id === lessonId);
  if (idx <= 0) return true;
  const prev = refs[idx - 1];
  return completedIds.includes(prev.lesson.id);
}
