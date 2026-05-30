import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import {
  sendGroupMessage,
  subscribeLeaderboard,
  subscribeMessages,
} from '../../services/groupService';
import { db } from '../../config/firebase';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import type { GroupInfo, GroupMember, GroupMessage } from '../../types';

export default function StudentGroupDetail() {
  const { groupId } = useParams<{ groupId: string }>();
  const { userData, currentUser } = useAuthStore();
  const { setGroup } = useProgressStore();
  const [info, setInfo] = useState<GroupInfo | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [messages, setMessages] = useState<GroupMessage[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!groupId || !db) return;
    setGroup(groupId);
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
    const unsubLb = subscribeLeaderboard(groupId, setMembers);
    const unsubMsg = subscribeMessages(groupId, setMessages);
    return () => {
      unsubLb();
      unsubMsg();
    };
  }, [groupId, setGroup]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!groupId) return;
    await sendGroupMessage(groupId, text, userData?.displayName ?? 'Estudiante');
    setText('');
  }

  if (!info) return <p>Cargando grupo…</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold">{info.name}</h1>
        <p className="text-[var(--euler-muted)]">
          {info.schoolName} · Código: <strong className="tracking-widest">{info.code}</strong>
        </p>
      </div>

      <section className="euler-glass p-6">
        <h2 className="font-display mb-4 text-lg font-semibold">Ranking</h2>
        <ol className="space-y-2">
          {members.map((m, i) => (
            <li
              key={m.uid}
              className={`flex justify-between rounded-lg px-4 py-2 ${
                m.uid === currentUser?.uid ? 'bg-euler-primary/20' : ''
              }`}
            >
              <span>
                #{i + 1} {m.displayName}
              </span>
              <span className="font-semibold">{m.totalXp} XP</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="euler-glass flex flex-col p-6" style={{ minHeight: 320 }}>
        <h2 className="font-display mb-4 text-lg font-semibold">Chat del grupo</h2>
        <ul className="mb-4 flex-1 space-y-2 overflow-y-auto">
          {[...messages].reverse().map((msg) => (
            <li key={msg.id} className="rounded-lg bg-[var(--euler-glass)] px-3 py-2 text-sm">
              <strong>{msg.senderName}</strong>
              <p>{msg.text}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            className="flex-1 rounded-xl border border-[var(--euler-border)] bg-transparent px-4 py-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe un mensaje…"
            maxLength={2000}
          />
          <button type="submit" className="btn-primary">
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
}
