import { create } from 'zustand';
import type { User } from 'firebase/auth';
import type { UserProfile } from '../types';

interface AuthState {
  currentUser: User | null;
  userData: UserProfile | null;
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  setUserData: (data: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  userData: null,
  loading: true,
  setCurrentUser: (currentUser) => set({ currentUser }),
  setUserData: (userData) => set({ userData }),
  setLoading: (loading) => set({ loading }),
}));
