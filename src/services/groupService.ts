import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import type { GroupInfo, GroupMember, GroupMessage } from '../types';
import { auth, db } from '../config/firebase';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomCode(): string {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

async function uniqueCode(): Promise<string> {
  if (!db) throw new Error('Firebase no configurado');
  for (let i = 0; i < 12; i++) {
    const code = randomCode();
    const snap = await getDocs(query(collection(db, 'groups'), where('code', '==', code), limit(1)));
    if (snap.empty) return code;
  }
  throw new Error('No se pudo generar código único');
}

function mapGroup(id: string, data: Record<string, unknown>): GroupInfo {
  return {
    id,
    name: (data.name as string) || 'Grupo',
    code: (data.code as string) || '',
    teacherUid: (data.teacherUid as string) || '',
    schoolName: (data.schoolName as string) || '',
  };
}

export async function createGroup(name: string, schoolName: string): Promise<GroupInfo> {
  if (!db || !auth?.currentUser) throw new Error('Sin sesión');
  const uid = auth.currentUser.uid;
  const code = await uniqueCode();
  const ref = doc(collection(db, 'groups'));
  const cleanName = name.trim() || 'Grupo';
  const cleanSchool = schoolName.trim() || 'Colegio';
  await setDoc(ref, {
    name: cleanName,
    code,
    teacherUid: uid,
    schoolName: cleanSchool,
    createdAt: serverTimestamp(),
  });
  return { id: ref.id, name: cleanName, code, teacherUid: uid, schoolName: cleanSchool };
}

export async function joinGroupByCode(
  rawCode: string,
  memberDisplayName: string,
): Promise<GroupInfo> {
  if (!db || !auth?.currentUser) throw new Error('Sin sesión');
  const code = rawCode.trim().toUpperCase();
  if (code.length < 4) throw new Error('Código demasiado corto');
  const snap = await getDocs(query(collection(db, 'groups'), where('code', '==', code), limit(1)));
  if (snap.empty) throw new Error('No existe un grupo con ese código');
  const docSnap = snap.docs[0];
  const data = docSnap.data();
  const uid = auth.currentUser.uid;
  const teacherUid = (data.teacherUid as string) || '';
  const group = mapGroup(docSnap.id, data);
  if (uid !== teacherUid) {
    const displayName = memberDisplayName.trim() || 'Estudiante';
    await setDoc(doc(db, 'groups', docSnap.id, 'members', uid), {
      displayName,
      totalXp: 0,
      joinedAt: serverTimestamp(),
      lastActiveAt: serverTimestamp(),
    }, { merge: true });
  }
  return group;
}

export async function addXpToMember(groupId: string, delta: number): Promise<void> {
  if (!db || !auth?.currentUser || delta === 0) return;
  const uid = auth.currentUser.uid;
  await setDoc(
    doc(db, 'groups', groupId, 'members', uid),
    { totalXp: increment(delta), lastActiveAt: serverTimestamp() },
    { merge: true },
  );
}

export function subscribeLeaderboard(
  groupId: string,
  onData: (members: GroupMember[]) => void,
): Unsubscribe {
  if (!db) return () => undefined;
  const q = query(
    collection(db, 'groups', groupId, 'members'),
    orderBy('totalXp', 'desc'),
    limit(50),
  );
  return onSnapshot(q, (snap) => {
    onData(
      snap.docs.map((d) => ({
        uid: d.id,
        displayName: (d.data().displayName as string) || '—',
        totalXp: (d.data().totalXp as number) ?? 0,
      })),
    );
  });
}

export async function listTeacherGroups(): Promise<GroupInfo[]> {
  if (!db || !auth?.currentUser) return [];
  const uid = auth.currentUser.uid;
  const snap = await getDocs(query(collection(db, 'groups'), where('teacherUid', '==', uid)));
  return snap.docs.map((d) => mapGroup(d.id, d.data()));
}

export function subscribeMessages(
  groupId: string,
  onData: (messages: GroupMessage[]) => void,
): Unsubscribe {
  if (!db) return () => undefined;
  const q = query(
    collection(db, 'groups', groupId, 'messages'),
    orderBy('createdAt', 'desc'),
    limit(100),
  );
  return onSnapshot(q, (snap) => {
    onData(
      snap.docs.map((d) => {
        const m = d.data();
        const ts = m.createdAt;
        return {
          id: d.id,
          senderUid: (m.senderUid as string) || '',
          senderName: (m.senderName as string) || '—',
          text: (m.text as string) || '',
          createdAt: ts?.toDate?.() ?? null,
        };
      }),
    );
  });
}

export async function sendGroupMessage(
  groupId: string,
  text: string,
  senderName: string,
): Promise<void> {
  if (!db || !auth?.currentUser) throw new Error('Sin sesión');
  const t = text.trim();
  if (!t) return;
  await addDoc(collection(db, 'groups', groupId, 'messages'), {
    senderUid: auth.currentUser.uid,
    senderName: senderName.trim() || 'Usuario',
    text: t,
    createdAt: serverTimestamp(),
  });
}
