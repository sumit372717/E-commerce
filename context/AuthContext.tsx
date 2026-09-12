"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { setStoredUser, clearStoredUser, setToken } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUserToStorage = (u: User | null, token?: string) => {
    if (u) {
      setStoredUser({
        id: u.id,
        email: u.email || "",
        name: u.user_metadata?.name || u.email || "",
        role: u.user_metadata?.role || "customer",
        createdAt: u.created_at || new Date().toISOString(),
      });
      if (token) setToken(token);
    } else {
      clearStoredUser();
    }
  };

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
    if (data.user) {
      const { data: sessionData } = await supabase.auth.getSession();
      syncUserToStorage(data.user, sessionData.session?.access_token);
    } else {
      clearStoredUser();
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      syncUserToStorage(session?.user || null, session?.access_token);
      setLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user) {
      syncUserToStorage(data.user, data.session?.access_token);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    clearStoredUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
