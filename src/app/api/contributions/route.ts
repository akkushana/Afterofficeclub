import { NextResponse } from "next/server";
import { getUser } from "@/lib/supabase/auth";
import { contributionSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const { supabase, user } = await getUser();
  if (!supabase) return NextResponse.json({ error: "Contributions are not configured yet." }, { status: 503 });
  if (!user) return NextResponse.json({ error: "Sign in before submitting a contribution." }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
  const parsed = contributionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Please check the form." }, { status: 400 });
  if (parsed.data.honeypot) return NextResponse.json({ error: "Unable to accept this submission." }, { status: 400 });
  const { error } = await supabase.from("contribution_submissions").insert({
    user_id: user.id,
    kind: parsed.data.kind,
    name: parsed.data.name,
    message: parsed.data.message,
    status: "pending",
  });
  if (error) return NextResponse.json({ error: "We could not save this submission. Please try again." }, { status: 500 });
  return NextResponse.json({ status: "pending" }, { status: 201 });
}
