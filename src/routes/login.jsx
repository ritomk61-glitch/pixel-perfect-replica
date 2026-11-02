import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/services/authService.js";
import { useStore } from "@/store/StoreProvider.jsx";
import { AuthShell } from "@/components/AuthShell.jsx";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — NEXUS" }, { name: "description", content: "Sign in to your NEXUS account." }, { property: "og:title", content: "Sign in — NEXUS" }, { property: "og:description", content: "Sign in to your NEXUS account." }] }),
  component: Login,
});

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const { user } = await login({ email, password });
      store.login(user); toast.success(`Welcome back, ${user.name}`); navigate({ to: "/profile" });
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to track orders and save builds.">
      <form onSubmit={submit} className="space-y-4">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="field" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 chars)" className="field" />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="btn-primary w-full">{busy ? <Loader2 size={16} className="animate-spin" /> : "Sign in"}</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">New here? <Link to="/register" className="text-primary">Create an account</Link></p>
    </AuthShell>
  );
}
