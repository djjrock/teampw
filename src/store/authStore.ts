import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signIn: async (email: string) => {
    // For demo purposes, immediately set the user
    set({
      user: {
        id: '1',
        email,
        role: 'admin'
      }
    });
  },
  signOut: async () => {
    set({ user: null });
  },
}));