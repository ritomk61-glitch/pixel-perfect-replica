import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, Plus, Star, X, Minus } from "lucide-react";
import { useStore } from "@/store/StoreProvider.jsx";
import { formatINR } from "@/lib/pricing.js";
import { categories } from "@/data/products.js";

const catName = (id) => categories.find((c) => c.id === id)?.name || id;

export function Stars({ value }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Star size={13} className="fill-warning text-warning" /> {value}
    </span>
  );
}

export function StockBadge({ stock }) {
  if (stock === 0) return <span className="text-xs font-medium text-destructive">Out of stock</span>;
  if (stock < 10) return <span className="text-xs font-medium text-warning">Only {stock} left</span>;
  return <span className="text-xs font-medium text-primary">In stock</span>;
}

export function ProductCard({ product: p, layout = "grid" }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quick, setQuick] = useState(false);
  const saved = wishlist.includes(p.id);
  const off = Math.round((1 - p.price / p.mrp) * 100);

  if (layout === "list") {
    return (
      <motion.div layout className="glass group flex gap-5 rounded-2xl p-4">
        <Link to="/products/$id" params={{ id: p.id }} className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-surface">
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        </Link>
        <div className="flex flex-1 flex-col">
          <span className="eyebrow">{catName(p.category)}</span>
          <Link to="/products/$id" params={{ id: p.id }} className="mt-1 font-display font-semibold hover:text-primary">{p.name}</Link>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
            <span className="font-display text-lg font-semibold">{formatINR(p.price)}</span>
            <Stars value={p.rating} /><StockBadge stock={p.stock} />
            <div className="ml-auto flex gap-2">
              <button aria-label="Wishlist" onClick={() => toggleWishlist(p)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary">
                <Heart size={16} className={saved ? "fill-primary text-primary" : ""} />
              </button>
              <button onClick={() => addToCart(p)} disabled={p.stock === 0} className="btn-primary !py-2">Add to cart</button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div layout whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="glass group relative flex flex-col overflow-hidden rounded-3xl">
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Link to="/products/$id" params={{ id: p.id }}>
            <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          </Link>
          {off > 0 && <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-bold text-primary-foreground">-{off}%</span>}
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <button aria-label="Wishlist" onClick={() => toggleWishlist(p)} className="glass grid h-9 w-9 place-items-center rounded-full">
              <Heart size={15} className={saved ? "fill-primary text-primary" : ""} />
            </button>
            <button aria-label="Quick view" onClick={() => setQuick(true)} className="glass grid h-9 w-9 place-items-center rounded-full opacity-0 transition group-hover:opacity-100">
              <Eye size={15} />
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="eyebrow">{catName(p.category)}</span>
            <Stars value={p.rating} />
          </div>
          <Link to="/products/$id" params={{ id: p.id }} className="mt-2 font-display text-[15px] font-semibold leading-snug hover:text-primary">{p.name}</Link>
          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              <div className="font-display text-lg font-semibold">{formatINR(p.price)}</div>
              <div className="text-xs text-muted-foreground line-through">{formatINR(p.mrp)}</div>
            </div>
            <button aria-label="Add to cart" onClick={() => addToCart(p)} disabled={p.stock === 0}
              className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground transition hover:glow disabled:opacity-30">
              <Plus size={18} />
            </button>
          </div>
        </div>
      </motion.div>
      <QuickView product={p} open={quick} onClose={() => setQuick(false)} />
    </>
  );
}

export function QuickView({ product: p, open, onClose }) {
  const { addToCart } = useStore();
  const [qty, setQty] = useState(1);
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
          className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }} onClick={(e) => e.stopPropagation()}
            className="glass relative grid w-full max-w-3xl overflow-hidden rounded-3xl md:grid-cols-2">
            <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-secondary"><X size={16} /></button>
            <img src={p.image} alt={p.name} className="aspect-square h-full w-full object-cover" />
            <div className="flex flex-col p-7">
              <span className="eyebrow">{p.brand}</span>
              <h3 className="mt-2 text-2xl font-semibold">{p.name}</h3>
              <div className="mt-2 flex gap-3"><Stars value={p.rating} /><StockBadge stock={p.stock} /></div>
              <p className="mt-4 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 font-display text-2xl font-semibold">{formatINR(p.price)}</div>
              <div className="mt-auto flex items-center gap-3 pt-6">
                <Qty value={qty} onChange={setQty} max={p.stock} />
                <button onClick={() => { addToCart(p, qty); onClose(); }} disabled={p.stock === 0} className="btn-primary flex-1">Add to cart</button>
              </div>
              <Link to="/products/$id" params={{ id: p.id }} className="mt-4 text-center text-sm text-muted-foreground hover:text-primary">View full details →</Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Qty({ value, onChange, max = 99 }) {
  return (
    <div className="flex items-center rounded-full border border-border">
      <button aria-label="Decrease" onClick={() => onChange(Math.max(1, value - 1))} className="grid h-10 w-10 place-items-center hover:text-primary"><Minus size={14} /></button>
      <span className="w-8 text-center font-mono text-sm">{value}</span>
      <button aria-label="Increase" onClick={() => onChange(Math.min(max || 1, value + 1))} className="grid h-10 w-10 place-items-center hover:text-primary"><Plus size={14} /></button>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="glass animate-pulse overflow-hidden rounded-3xl">
      <div className="aspect-square bg-muted" />
      <div className="space-y-3 p-5"><div className="h-3 w-1/3 rounded bg-muted" /><div className="h-4 w-3/4 rounded bg-muted" /><div className="h-5 w-1/4 rounded bg-muted" /></div>
    </div>
  );
}
