import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserProfile, UserRole } from '../types';
import { auth, db } from '../config/firebase';

export async function fetchUserProfile(uid: string, fallbackEmail = ''): Promise<UserProfile | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const d = snap.data();
  return {
    email: (d.email as string) || fallbackEmail,
    displayName: (d.displayName as string) || 'Usuario',
    role: (d.role as UserRole) || 'student',
    onboardingComplete: Boolean(d.onboardingComplete),
    schoolName: d.schoolName as string | undefined,
  };
}

export async function registerUser(
  email: string,
  password: string,
  displayName: string,
  role: UserRole,
  schoolName?: string,
): Promise<User> {
  if (!auth || !db) throw new Error('Firebase no configurado');
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const payload: Record<string, unknown> = {
    email: email.trim(),
    displayName: displayName.trim() || 'Usuario',
    role,
    onboardingComplete: false,
  };
  if (role === 'teacher' && schoolName?.trim()) {
    payload.schoolName = schoolName.trim();
  }
  await setDoc(doc(db, 'users', cred.user.uid), payload);
  return cred.user;
}

export async function loginUser(email: string, password: string): Promise<User> {
  if (!auth) throw new Error('Firebase no configurado');
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  return cred.user;
}

export async function logoutUser(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

export async function setOnboardingComplete(uid: string): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, 'users', uid), { onboardingComplete: true }, { merge: true });
}

export async function updateProfileFields(
  uid: string,
  fields: Partial<Pick<UserProfile, 'displayName' | 'schoolName'>>,
): Promise<void> {
  if (!db) return;
  await setDoc(doc(db, 'users', uid), fields, { merge: true });
}
