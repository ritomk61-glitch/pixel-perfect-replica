import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Package } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/StoreProvider.jsx";
import { formatINR } from "@/lib/pricing.js";
import { Page, Empty } from "@/components/Motion.jsx";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Account — NEXUS" }, { name: "description", content: "Account details and order history." }, { property: "og:title", content: "My Account — NEXUS" }, { property: "og:description", content: "Account details and order history." }] }),
  component: Profile,
});

function Profile() {
  const { user, orders, logout, updateUser, ready } = useStore();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", phone: "" });

  useEffect(() => { if (ready && !user) navigate({ to: "/login" }); }, [ready, user, navigate]);
  useEffect(() => { if (user) setF({ name: user.name || "", phone: user.phone || "" }); }, [user]);
  if (!user) return <Page><div className="mx-auto h-40 max-w-6xl animate-pulse rounded-3xl bg-muted px-6" /></Page>;

  return (
    <Page>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[320px_1fr]">
        <aside className="glass h-fit rounded-3xl p-6">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary font-display text-2xl font-bold text-primary-foreground">{user.name[0]?.toUpperCase()}</div>
          <h1 className="mt-4 text-2xl font-semibold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <form onSubmit={(e) => { e.preventDefault(); updateUser(f); toast.success("Profile updated"); }} className="mt-6 space-y-3">
            <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Name" className="field" />
            <input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="Phone" className="field" />
            <button className="btn-primary w-full">Save changes</button>
          </form>
          <button onClick={() => { logout(); navigate({ to: "/" }); }} className="btn-ghost mt-3 w-full"><LogOut size={15} /> Sign out</button>
        </aside>
        <section>
          <h2 className="text-3xl font-semibold">Order history</h2>
          <div className="mt-6 space-y-4">
            {orders.length === 0 ? (
              <Empty icon={Package} title="No orders yet" text="Your orders will appear here."><Link to="/products" className="btn-primary">Start shopping</Link></Empty>
            ) : orders.map((o) => (
              <div key={o.id} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div><div className="font-mono text-sm">#{o.id}</div><div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString("en-IN")}</div></div>
                  <span className="rounded-full bg-accent px-3 py-1 text-xs text-primary">{o.status}</span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {o.items.slice(0, 5).map((i) => <img key={i.id} src={i.image} alt={i.name} className="h-12 w-12 rounded-lg object-cover" />)}
                  <span className="ml-auto font-display font-semibold">{formatINR(o.total)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
