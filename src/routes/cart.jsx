import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/store/StoreProvider.jsx";
import { calcTotals, formatINR, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing.js";
import { Qty } from "@/components/ProductCard.jsx";
import { Page, Empty } from "@/components/Motion.jsx";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — NEXUS" }, { name: "description", content: "Review components in your cart." }, { property: "og:title", content: "Your Cart — NEXUS" }, { property: "og:description", content: "Review components in your cart." }] }),
  component: Cart,
});

export function Summary({ totals, children }) {
  return (
    <div className="glass h-fit rounded-3xl p-6 lg:sticky lg:top-28">
      <h3 className="font-semibold">Order summary</h3>
      <dl className="mt-5 space-y-3 text-sm">
        <Row k="Subtotal" v={formatINR(totals.subtotal)} />
        {totals.discount > 0 && <Row k="Discount" v={`− ${formatINR(totals.discount)}`} accent />}
        <Row k="Shipping" v={totals.shipping === 0 ? "Free" : formatINR(totals.shipping)} />
        <Row k="GST (18%)" v={formatINR(totals.gst)} />
        <div className="border-t border-border pt-3"><Row k="Total" v={formatINR(totals.total)} big /></div>
      </dl>
      {children}
    </div>
  );
}
function Row({ k, v, big, accent }) {
  return <div className={`flex justify-between ${big ? "font-display text-lg font-semibold" : ""}`}><dt className={big ? "" : "text-muted-foreground"}>{k}</dt><dd className={accent ? "text-primary" : ""}>{v}</dd></div>;
}

function Cart() {
  const { cart, updateQty, removeFromCart, ready } = useStore();
  const totals = calcTotals(cart);
  const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal;

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-semibold md:text-5xl">Cart</h1>
        {ready && cart.length === 0 ? (
          <div className="mt-12"><Empty icon={ShoppingBag} title="Your cart is empty" text="Add some silicon to get started."><Link to="/products" className="btn-primary">Browse components</Link></Empty></div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              {remaining > 0 && cart.length > 0 && (
                <div className="glass mb-5 rounded-2xl p-4 text-sm">Add <span className="text-primary">{formatINR(remaining)}</span> more for free shipping
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${(totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100}%` }} /></div>
                </div>
              )}
              <ul className="space-y-4">
                <AnimatePresence>
                  {cart.map((i) => (
                    <motion.li key={i.id} layout exit={{ opacity: 0, x: -40 }} className="glass flex items-center gap-4 rounded-2xl p-4">
                      <img src={i.image} alt={i.name} className="h-20 w-20 rounded-xl object-cover" />
                      <div className="flex-1">
                        <Link to="/products/$id" params={{ id: i.id }} className="font-semibold hover:text-primary">{i.name}</Link>
                        <div className="text-sm text-muted-foreground">{formatINR(i.price)} each</div>
                      </div>
                      <Qty value={i.qty} onChange={(q) => updateQty(i.id, q)} max={i.stock} />
                      <div className="w-24 text-right font-display font-semibold">{formatINR(i.price * i.qty)}</div>
                      <button aria-label="Remove" onClick={() => removeFromCart(i.id)} className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
            <Summary totals={totals}>
              <Link to="/checkout" className="btn-primary mt-6 w-full">Checkout <ArrowRight size={16} /></Link>
              <Link to="/products" className="mt-3 block text-center text-sm text-muted-foreground hover:text-primary">Continue shopping</Link>
            </Summary>
          </div>
        )}
      </div>
    </Page>
  );
}
