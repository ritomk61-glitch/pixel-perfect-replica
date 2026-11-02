import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Zap, Headphones } from "lucide-react";
import { toast } from "sonner";
import hero from "@/assets/hero-chip.jpg";
import { categories, products, brands } from "@/data/products.js";
import { ProductCard } from "@/components/ProductCard.jsx";
import { Reveal } from "@/components/Motion.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS — Premium Electronic Components in India" },
      { name: "description", content: "Shop genuine microcontrollers, sensors, ICs, semiconductors and power supplies with fast shipping across India." },
      { property: "og:title", content: "NEXUS — Premium Electronic Components" },
      { property: "og:description", content: "Genuine components for engineers and makers, shipped in 48 hours." },
    ],
  }),
  component: Home,
});

function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const featured = products.filter((p) => p.featured);

  return (
    <main>
      <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden">
        <motion.img src={hero} alt="Glowing NEXUS processor on a circuit board" width={1920} height={1088}
          style={{ y, scale }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-6xl px-6 pb-24">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> 12,000+ components in stock
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] md:text-7xl lg:text-8xl">
            <span className="text-gradient">Silicon for</span><br />the next build.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground">
            Genuine microcontrollers, sensors, ICs and power electronics — engineered for makers, labs and manufacturers.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }} className="mt-10 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">Shop components <ArrowRight size={16} /></Link>
            <Link to="/products" search={{ category: "dev-boards" }} className="btn-ghost">Explore dev boards</Link>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <Reveal>
          <span className="eyebrow">Categories</span>
          <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Every part of the stack.</h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <Link to="/products" search={{ category: c.id }} className="glass group relative block aspect-[4/5] overflow-hidden rounded-3xl">
                <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary">{c.blurb}</div>
                  <div className="mt-1 font-display font-semibold">{c.name}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative py-28">
        <div className="absolute inset-0 bg-glow" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Featured</span>
              <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Engineer favourites.</h2>
            </div>
            <Link to="/products" className="btn-ghost">View all <ArrowRight size={16} /></Link>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}><ProductCard product={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border py-14">
        <div className="mx-auto max-w-6xl overflow-hidden px-6">
          <p className="eyebrow mb-8 text-center">Authorised parts from</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brands.map((b) => (
              <span key={b} className="font-display text-xl font-semibold text-muted-foreground/60 transition hover:text-foreground">{b}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            [Truck, "48-hour dispatch", "Free shipping above ₹999 across India."],
            [ShieldCheck, "100% genuine", "Sourced from authorised distributors."],
            [Zap, "Tested parts", "Every board is QC-tested before shipping."],
            [Headphones, "Engineer support", "Real engineers answer your questions."],
          ].map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="glass h-full rounded-3xl p-7">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary"><Icon size={20} /></div>
                <h3 className="mt-5 font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Newsletter />
    </main>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] px-8 py-16 text-center md:px-16">
          <div className="absolute inset-0 bg-glow" />
          <div className="relative">
            <span className="eyebrow">Newsletter</span>
            <h2 className="mx-auto mt-3 max-w-xl text-3xl font-semibold md:text-4xl">New silicon, restocks and maker deals.</h2>
            <form onSubmit={(e) => { e.preventDefault(); if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Enter a valid email"); toast.success("You're subscribed!"); setEmail(""); }}
              className="mx-auto mt-8 flex max-w-md gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@lab.in" className="field !rounded-full" />
              <button className="btn-primary shrink-0">Subscribe</button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
