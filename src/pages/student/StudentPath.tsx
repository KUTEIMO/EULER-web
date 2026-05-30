import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Lock } from 'lucide-react';
import { loadCatalog, isLessonUnlocked } from '../../services/courseService';
import { useProgressStore } from '../../store/progressStore';
import type { Course } from '../../types';

export default function StudentPath() {
  const { progress } = useProgressStore();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadCatalog().then((c) => setCourses(c.courses));
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold">Mi ruta de aprendizaje</h1>
      {courses.map((course) => (
        <section key={course.id} className="euler-glass p-6">
          <h2 className="font-display mb-4 text-xl font-semibold">{course.title}</h2>
          <ul className="space-y-2">
            {course.units.flatMap((unit) =>
              unit.lessons.map((lesson) => {
                const done = progress.completedLessonIds.includes(lesson.id);
                const unlocked = isLessonUnlocked(
                  { courses: courses },
                  lesson.id,
                  progress.completedLessonIds,
                );
                return (
                  <li key={lesson.id}>
                    {unlocked ? (
                      <Link
                        to={`/s/lesson/${lesson.id}`}
                        className="flex items-center justify-between rounded-xl border border-[var(--euler-border)] px-4 py-3 transition hover:border-euler-primary-light"
                      >
                        <span>
                          <span className="text-sm text-[var(--euler-muted)]">{unit.title} · </span>
                          {lesson.title}
                        </span>
                        {done ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <span className="text-sm text-euler-coral">{lesson.estimatedMinutes} min</span>
                        )}
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between rounded-xl border border-dashed border-[var(--euler-border)] px-4 py-3 opacity-60">
                        <span>{lesson.title}</span>
                        <Lock className="h-4 w-4" />
                      </div>
                    )}
                  </li>
                );
              }),
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}
