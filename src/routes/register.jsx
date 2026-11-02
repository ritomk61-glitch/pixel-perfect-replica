import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { register } from "@/services/authService.js";
import { useStore } from "@/store/StoreProvider.jsx";
import { AuthShell } from "@/components/AuthShell.jsx";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — NEXUS" }, { name: "description", content: "Create your NEXUS account." }, { property: "og:title", content: "Create account — NEXUS" }, { property: "og:description", content: "Create your NEXUS account." }] }),
  component: Register,
});

function Register() {
  const store = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const { user } = await register(f);
      store.login(user); toast.success("Account created"); navigate({ to: "/profile" });
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  };

  return (
    <AuthShell title="Create account" subtitle="Join 40,000+ engineers building with NEXUS.">
      <form onSubmit={submit} className="space-y-4">
        <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" className="field" />
        <input type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Email" className="field" />
        <input type="password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} placeholder="Password (min 6 chars)" className="field" />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="btn-primary w-full">{busy ? <Loader2 size={16} className="animate-spin" /> : "Create account"}</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary">Sign in</Link></p>
    </AuthShell>
  );
}
