import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthValue {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase env keys missing");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
  const signOut = async () => { await supabase?.auth.signOut(); };

  return <Ctx.Provider value={{ session, loading, signIn, signOut }}>{children}</Ctx.Provider>;
}

export function useAdminAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return v;
}