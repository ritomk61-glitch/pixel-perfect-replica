import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Heart, ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { useStore } from "@/store/StoreProvider.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/wishlist", label: "Wishlist" },
];

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground glow"><Cpu size={18} /></span>
      NEXUS<span className="text-primary">.</span>
    </Link>
  );
}

export function Navbar() {
  const { cartCount, wishlist, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q } });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-5 py-3 transition-all duration-500 ${scrolled ? "glass shadow-2xl" : "border border-transparent"}`}>
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <form onSubmit={submit} className="hidden flex-1 max-w-xs items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 lg:flex">
          <Search size={15} className="text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ESP32, sensors…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </form>
        <div className="flex items-center gap-1">
          <IconLink to="/wishlist" label="Wishlist" count={wishlist.length}><Heart size={18} /></IconLink>
          <IconLink to="/cart" label="Cart" count={cartCount}><ShoppingBag size={18} /></IconLink>
          <IconLink to={user ? "/profile" : "/login"} label="Account"><User size={18} /></IconLink>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="ml-1 grid h-10 w-10 place-items-center rounded-full hover:bg-secondary md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass mx-auto mt-2 max-w-6xl rounded-3xl p-4 md:hidden">
            <form onSubmit={submit} className="mb-3 flex items-center gap-2 rounded-full border border-border px-4 py-2">
              <Search size={15} className="text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search components…" className="w-full bg-transparent text-sm outline-none" />
            </form>
            {[...links, { to: "/cart", label: "Cart" }, { to: user ? "/profile" : "/login", label: user ? "Profile" : "Sign in" }].map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-secondary">{l.label}</Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconLink({ to, label, count, children }) {
  return (
    <Link to={to} aria-label={label} className="relative grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground">
      {children}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{count}</span>
      )}
    </Link>
  );
}
