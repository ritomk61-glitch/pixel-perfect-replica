import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

const StoreContext = createContext(null);
const KEY = "nexus-store-v1";

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      setCart(s.cart || []);
      setWishlist(s.wishlist || []);
      setUser(s.user || null);
      setOrders(s.orders || []);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, user, orders }));
  }, [cart, wishlist, user, orders, ready]);

  const addToCart = useCallback((p, qty = 1) => {
    if (p.stock === 0) return toast.error("Out of stock");
    setCart((c) => {
      const ex = c.find((i) => i.id === p.id);
      if (ex) return c.map((i) => (i.id === p.id ? { ...i, qty: Math.min(i.qty + qty, p.stock) } : i));
      return [...c, { id: p.id, name: p.name, price: p.price, image: p.image, stock: p.stock, qty }];
    });
    toast.success(`${p.name} added to cart`);
  }, []);

  const updateQty = (id, qty) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Math.min(qty, i.stock)) } : i)));
  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const toggleWishlist = (p) =>
    setWishlist((w) => {
      if (w.includes(p.id)) { toast("Removed from wishlist"); return w.filter((x) => x !== p.id); }
      toast.success("Saved to wishlist");
      return [...w, p.id];
    });

  const value = {
    ready, cart, wishlist, user, orders,
    cartCount: cart.reduce((s, i) => s + i.qty, 0),
    addToCart, updateQty, removeFromCart, clearCart, toggleWishlist,
    login: setUser, logout: () => setUser(null), updateUser: (u) => setUser((x) => ({ ...x, ...u })),
    addOrder: (o) => setOrders((x) => [o, ...x]),
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
