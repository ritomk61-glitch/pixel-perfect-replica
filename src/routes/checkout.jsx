import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Smartphone, Banknote, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/StoreProvider.jsx";
import { calcTotals, COUPONS, formatINR } from "@/lib/pricing.js";
import { placeOrder } from "@/services/orderService.js";
import { Summary } from "./cart.jsx";
import { Page, Empty } from "@/components/Motion.jsx";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — NEXUS" }, { name: "description", content: "Secure checkout for your components." }, { property: "og:title", content: "Checkout — NEXUS" }, { property: "og:description", content: "Secure checkout for your components." }] }),
  component: Checkout,
});

const payments = [["upi", "UPI", Smartphone], ["card", "Credit / Debit card", CreditCard], ["cod", "Cash on delivery", Banknote]];

function Checkout() {
  const { cart, clearCart, addOrder, user, ready } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", phone: "", address: "", city: "", pincode: "" });
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [pay, setPay] = useState("upi");
  const [busy, setBusy] = useState(false);
  const totals = calcTotals(cart, coupon);

  const applyCoupon = () => {
    if (COUPONS[code.toUpperCase()]) { setCoupon(code.toUpperCase()); toast.success(`Coupon ${code.toUpperCase()} applied`); }
    else toast.error("Invalid coupon code");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phone)) return toast.error("Enter a valid 10-digit phone");
    if (!/^\d{6}$/.test(form.pincode)) return toast.error("Enter a valid 6-digit pincode");
    setBusy(true);
    try {
      const order = await placeOrder({ items: cart, shipping: form, payment: pay, ...totals });
      addOrder(order);
      clearCart();
      toast.success(`Order ${order.id} placed!`);
      navigate({ to: "/profile" });
    } catch (err) {
      toast.error(err.message);
    } finally { setBusy(false); }
  };

  if (ready && cart.length === 0) return <Page><Empty icon={ShoppingBag} title="Nothing to check out" text="Your cart is empty."><Link to="/products" className="btn-primary">Shop now</Link></Empty></Page>;

  const f = (k, label, props = {}) => (
    <label className="block"><span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input required value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="field" {...props} /></label>
  );

  return (
    <Page>
      <form onSubmit={submit} className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <h1 className="text-4xl font-semibold md:text-5xl">Checkout</h1>
          <section className="glass rounded-3xl p-6">
            <h2 className="mb-5 font-semibold">Shipping details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {f("name", "Full name")}{f("phone", "Phone", { inputMode: "numeric", placeholder: "9876543210" })}
              <div className="sm:col-span-2">{f("address", "Address")}</div>
              {f("city", "City")}{f("pincode", "Pincode", { inputMode: "numeric" })}
            </div>
          </section>
          <section className="glass rounded-3xl p-6">
            <h2 className="mb-5 font-semibold">Payment method</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {payments.map(([id, label, I]) => (
                <button type="button" key={id} onClick={() => setPay(id)}
                  className={`flex flex-col items-start gap-3 rounded-2xl border p-4 text-left text-sm transition ${pay === id ? "border-primary bg-accent" : "border-border hover:border-muted-foreground"}`}>
                  <I size={20} className={pay === id ? "text-primary" : "text-muted-foreground"} />{label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Payments are simulated in this preview.</p>
          </section>
        </div>
        <Summary totals={totals}>
          <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            {cart.map((i) => <li key={i.id} className="flex justify-between gap-2 text-muted-foreground"><span className="truncate">{i.qty} × {i.name}</span><span>{formatINR(i.qty * i.price)}</span></li>)}
          </ul>
          <div className="mt-5 flex gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon (try NEXUS10)" className="field !py-2.5" />
            <button type="button" onClick={applyCoupon} className="btn-ghost !px-4 !py-2.5">Apply</button>
          </div>
          <button disabled={busy} className="btn-primary mt-5 w-full">{busy ? <Loader2 size={16} className="animate-spin" /> : `Place order · ${formatINR(totals.total)}`}</button>
        </Summary>
      </form>
    </Page>
  );
}
