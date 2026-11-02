import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShieldCheck, Truck, AlertTriangle, ChevronLeft } from "lucide-react";
import { getProduct } from "@/services/productService.js";
import { products } from "@/data/products.js";
import { useStore } from "@/store/StoreProvider.jsx";
import { formatINR } from "@/lib/pricing.js";
import { ProductCard, Stars, StockBadge, Qty } from "@/components/ProductCard.jsx";
import { Page, Empty } from "@/components/Motion.jsx";

export const Route = createFileRoute("/products/$id")({
  head: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    const title = p ? `${p.name} — NEXUS` : "Component — NEXUS";
    const desc = p ? p.description : "Electronic component details.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }] };
  },
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const { data: p, isLoading, isError } = useQuery({ queryKey: ["product", id], queryFn: () => getProduct(id), retry: false });
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("specs");

  if (isLoading) return <Page><div className="mx-auto grid max-w-6xl animate-pulse gap-10 px-6 md:grid-cols-2"><div className="aspect-square rounded-3xl bg-muted" /><div className="space-y-4"><div className="h-8 w-2/3 rounded bg-muted" /><div className="h-6 w-1/3 rounded bg-muted" /></div></div></Page>;
  if (isError || !p) return <Page><Empty icon={AlertTriangle} title="Component not found" text="It may have been discontinued."><Link to="/products" className="btn-primary">Back to catalogue</Link></Empty></Page>;

  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const saved = wishlist.includes(p.id);

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-6">
        <Link to="/products" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ChevronLeft size={16} /> Catalogue</Link>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <div className="glass relative aspect-square overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.img key={img} src={p.images[img]} alt={p.name} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                  className="h-full w-full object-cover" />
              </AnimatePresence>
            </div>
            <div className="mt-4 flex gap-3">
              {p.images.map((src, i) => (
                <button key={i} onClick={() => setImg(i)} className={`h-20 w-20 overflow-hidden rounded-xl border-2 transition ${img === i ? "border-primary" : "border-transparent opacity-60"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">{p.brand}</span>
            <h1 className="mt-3 text-4xl font-semibold leading-tight">{p.name}</h1>
            <div className="mt-4 flex items-center gap-4"><Stars value={p.rating} /><span className="text-xs text-muted-foreground">{p.reviews.toLocaleString("en-IN")} reviews</span><StockBadge stock={p.stock} /></div>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-semibold">{formatINR(p.price)}</span>
              <span className="text-muted-foreground line-through">{formatINR(p.mrp)}</span>
              <span className="text-sm font-semibold text-primary">Save {formatINR(p.mrp - p.price)}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes calculated at checkout</p>
            <p className="mt-6 text-muted-foreground">{p.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Qty value={qty} onChange={setQty} max={p.stock} />
              <button onClick={() => addToCart(p, qty)} disabled={p.stock === 0} className="btn-primary flex-1">{p.stock === 0 ? "Out of stock" : "Add to cart"}</button>
              <button aria-label="Wishlist" onClick={() => toggleWishlist(p)} className="grid h-12 w-12 place-items-center rounded-full border border-border hover:border-primary">
                <Heart size={18} className={saved ? "fill-primary text-primary" : ""} />
              </button>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="glass flex items-center gap-3 rounded-2xl p-4"><Truck size={18} className="text-primary" /> Ships in 48 hrs</div>
              <div className="glass flex items-center gap-3 rounded-2xl p-4"><ShieldCheck size={18} className="text-primary" /> Genuine part</div>
            </div>
            <div className="mt-10">
              <div className="flex gap-6 border-b border-border">
                {["specs", "shipping"].map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`relative pb-3 text-sm capitalize ${tab === t ? "text-foreground" : "text-muted-foreground"}`}>
                    {t === "specs" ? "Specifications" : "Shipping"}
                    {tab === t && <motion.span layoutId="tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>
              {tab === "specs" ? (
                <dl className="divide-y divide-border">
                  {Object.entries(p.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="font-mono">{v}</dd></div>
                  ))}
                </dl>
              ) : (
                <p className="py-4 text-sm text-muted-foreground">Free shipping on orders above ₹999. Orders placed before 3 PM ship the same day. 7-day replacement on DOA parts.</p>
              )}
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section className="mt-28">
            <h2 className="text-3xl font-semibold">Related components</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
          </section>
        )}
      </div>
    </Page>
  );
}
