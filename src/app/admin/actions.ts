"use server";

import { revalidatePath } from "next/cache";
import { requireModerator } from "@/lib/supabase/auth";
import { z } from "zod";

const moderationSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["in_review", "approved", "rejected"]),
});

export async function updateSubmission(formData: FormData) {
  const parsed = moderationSchema.safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) throw new Error("Invalid moderation request.");
  const { supabase } = await requireModerator();
  const { error } = await supabase.from("contribution_submissions").update({ status: parsed.data.status, updated_at: new Date().toISOString() }).eq("id", parsed.data.id);
  if (error) throw new Error("Unable to update submission.");
  revalidatePath("/admin");
}
