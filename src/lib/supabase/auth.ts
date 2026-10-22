import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  if (!supabase) return { supabase: null, user: null };
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) return { supabase, user: null };
  return { supabase, user };
}

export async function requireUser() {
  const result = await getUser();
  if (!result.supabase) redirect("/login?error=auth-not-configured");
  if (!result.user) redirect("/login?error=sign-in-required");
  return { supabase: result.supabase, user: result.user };
}

export async function requireModerator() {
  const { supabase, user } = await requireUser();
  const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (error || !profile || !["admin", "moderator"].includes(profile.role)) redirect("/login?error=not-authorized");
  return { supabase, user, profile };
}
