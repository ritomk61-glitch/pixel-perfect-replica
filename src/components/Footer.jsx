import { Link } from "@tanstack/react-router";
import { Logo } from "./Navbar.jsx";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">Precision electronic components for engineers, makers and manufacturers across India. Genuine parts, shipped in 48 hours.</p>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">All products</Link></li>
            <li><Link to="/products" search={{ category: "microcontrollers" }} className="hover:text-foreground">Microcontrollers</Link></li>
            <li><Link to="/products" search={{ category: "sensors" }} className="hover:text-foreground">Sensors</Link></li>
            <li><Link to="/products" search={{ category: "power" }} className="hover:text-foreground">Power</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-4">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/profile" className="hover:text-foreground">Profile & orders</Link></li>
            <li><Link to="/wishlist" className="hover:text-foreground">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center font-mono text-xs text-muted-foreground">© 2026 NEXUS Components · Bengaluru, India</div>
    </footer>
  );
}
