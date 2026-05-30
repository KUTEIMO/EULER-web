import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { subscribeLeaderboard } from '../../services/groupService';
import { db } from '../../config/firebase';
import type { GroupInfo, GroupMember } from '../../types';

export default function TeacherGroupDetail() {
  const { groupId } = useParams<{ groupId: string }>();
  const [info, setInfo] = useState<GroupInfo | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);

  useEffect(() => {
    if (!groupId || !db) return;
    getDoc(doc(db, 'groups', groupId)).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setInfo({
          id: snap.id,
          name: (d.name as string) || 'Grupo',
          code: (d.code as string) || '',
          teacherUid: (d.teacherUid as string) || '',
          schoolName: (d.schoolName as string) || '',
        });
      }
    });
    return subscribeLeaderboard(groupId, setMembers);
  }, [groupId]);

  if (!info) return <p>Cargando…</p>;

  return (
    <div className="space-y-8">
      <div className="euler-glass p-8 text-center">
        <h1 className="font-display text-3xl font-bold">{info.name}</h1>
        <p className="text-[var(--euler-muted)]">{info.schoolName}</p>
        <p className="mt-4 text-sm uppercase tracking-wide text-[var(--euler-muted)]">
          Código para estudiantes
        </p>
        <p className="font-mono text-4xl font-bold tracking-[0.3em] text-euler-coral">{info.code}</p>
        <p className="mt-4 text-sm text-[var(--euler-muted)]">
          Comparte este código en clase. Los estudiantes lo ingresan en Grupos.
        </p>
      </div>
      <section className="euler-glass p-6">
        <h2 className="font-display mb-4 text-lg font-semibold">Ranking de la clase</h2>
        <ol className="space-y-2">
          {members.length === 0 ? (
            <p className="text-[var(--euler-muted)]">Aún no hay estudiantes en el grupo.</p>
          ) : (
            members.map((m, i) => (
              <li key={m.uid} className="flex justify-between rounded-lg px-4 py-2">
                <span>
                  #{i + 1} {m.displayName}
                </span>
                <span className="font-semibold">{m.totalXp} XP</span>
              </li>
            ))
          )}
        </ol>
      </section>
    </div>
  );
}
