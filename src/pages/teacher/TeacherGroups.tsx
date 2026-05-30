import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTeacherGroups } from '../../services/groupService';
import type { GroupInfo } from '../../types';

export default function TeacherGroups() {
  const [groups, setGroups] = useState<GroupInfo[]>([]);

  useEffect(() => {
    listTeacherGroups().then(setGroups);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-bold">Mis grupos</h1>
        <Link to="/t/groups/new" className="btn-primary">
          Crear grupo
        </Link>
      </div>
      {groups.length === 0 ? (
        <p className="text-[var(--euler-muted)]">Aún no tienes grupos. Crea el primero.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {groups.map((g) => (
            <li key={g.id}>
              <Link to={`/t/groups/${g.id}`} className="euler-glass block p-6 transition hover:border-euler-primary-light">
                <h2 className="font-display font-semibold">{g.name}</h2>
                <p className="text-sm text-[var(--euler-muted)]">{g.schoolName}</p>
                <p className="mt-2 font-mono text-lg tracking-widest text-euler-coral">{g.code}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
