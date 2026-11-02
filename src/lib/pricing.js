export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_FEE = 99;
export const GST_RATE = 0.18;
export const COUPONS = { NEXUS10: 0.1, MAKER20: 0.2 };

export const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function calcTotals(items, couponCode) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const rate = COUPONS[(couponCode || "").toUpperCase()] || 0;
  const discount = Math.round(subtotal * rate);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const gst = Math.round((subtotal - discount) * GST_RATE);
  return { subtotal, discount, shipping, gst, total: subtotal - discount + shipping + gst };
}
