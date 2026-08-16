import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-project-id') &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== 'undefined',
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export interface SignInOptions {
  email: string;
  password: string;
}

/**
 * Sign in a user with email and password using Supabase Auth
 */
export async function signInWithPassword({ email, password }: SignInOptions) {
  if (!isSupabaseConfigured()) {
    console.warn('[Supabase Auth] Env vars missing or placeholder. Running in fallback mode.');
    return {
      data: null,
      error: {
        message: 'Supabase URL ve Anon Key henüz yapılandırılmadı. Lütfen .env dosyasını güncelleyin.',
        status: 400,
      },
    };
  }

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
}

/**
 * Sign up a new user with email and password using Supabase Auth
 */
export async function signUp({ email, password }: SignInOptions) {
  if (!isSupabaseConfigured()) {
    return {
      data: null,
      error: {
        message: 'Supabase URL ve Anon Key henüz yapılandırılmadı.',
        status: 400,
      },
    };
  }

  const response = await supabase.auth.signUp({
    email,
    password,
  });

  return response;
}

/**
 * Sign out current user
 */
export async function signOut() {
  if (!isSupabaseConfigured()) return { error: null };
  return await supabase.auth.signOut();
}

/**
 * Get current session
 */
export async function getSession() {
  if (!isSupabaseConfigured()) return { data: { session: null }, error: null };
  return await supabase.auth.getSession();
}
