import { AuthForm } from "@/components/auth-form";

const errors: Record<string, string> = {
  "auth-not-configured": "Authentication is not configured for this environment.",
  "sign-in-required": "Sign in to continue.",
  "not-authorized": "Your account is not authorized for moderation.",
  "invalid-confirmation": "That confirmation link is invalid or expired.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <section className="section"><div className="container" style={{ maxWidth: 620 }}><span className="eyebrow">Member access</span><h1>Keep useful conversations moving.</h1><p className="muted">Create an account to submit a topic or contribution. Moderation permissions are never self-service.</p><AuthForm initialError={error ? errors[error] ?? error : undefined} /></div></section>;
}
