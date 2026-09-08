```tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

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

  // Diagnostic: show whenever the AuthContext user changes
  useEffect(() => {
    console.log("🔐 AuthContext user changed:", user);
    console.log("🔐 AuthContext loading:", loading);
  }, [user, loading]);

  const refreshUser = async () => {
    console.log("🔵 refreshUser() started");

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      console.log("🔵 getUser() result:", {
        user,
        error,
      });

      if (error) {
        console.error("🔴 getUser() error:", error);
      }

      setUser(user);
      setLoading(false);

      console.log("🟢 refreshUser() finished");
    } catch (error) {
      console.error("🔴 refreshUser() exception:", error);
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🟣 AuthProvider mounted");

    // Check existing Supabase session/user
    refreshUser();

    // Listen for Supabase authentication changes
    const {
      data: listener,
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🟠 Supabase auth event:", event);
      console.log("🟠 Supabase session:", session);
      console.log("🟠 Supabase session user:", session?.user);

      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      console.log("⚪ AuthProvider unmounted");

      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log("🔵 AuthContext login() called");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    console.log("🟡 AuthContext login result:", {
      data,
      error,
    });

    if (error) {
      console.error("🔴 AuthContext login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    console.log("🔵 Logout started");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("🔴 Logout error:", error);
    }

    setUser(null);

    console.log("🟢 Logout finished");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
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
```
