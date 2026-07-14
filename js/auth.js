import { supabase } from "./supabase-client.js";

export async function signUpWithEmail(email, password, creatorName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from("creator_profiles")
      .insert({
        creator_id: data.user.id,
        creator_name: creatorName,
      });

    if (profileError) {
      throw profileError;
    }
  }

  return data;
}

export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function getCurrentCreator() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return user;
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
