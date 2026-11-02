import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useStore } from "@/store/StoreProvider.jsx";
import { products } from "@/data/products.js";
import { ProductCard } from "@/components/ProductCard.jsx";
import { Page, Empty } from "@/components/Motion.jsx";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — NEXUS" }, { name: "description", content: "Your saved components." }, { property: "og:title", content: "Wishlist — NEXUS" }, { property: "og:description", content: "Your saved components." }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, ready } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <Page>
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-semibold md:text-5xl">Wishlist</h1>
        <div className="mt-10">
          {ready && items.length === 0 ? (
            <Empty icon={Heart} title="Nothing saved yet" text="Tap the heart on any component to save it here."><Link to="/products" className="btn-primary">Discover components</Link></Empty>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          )}
        </div>
      </div>
    </Page>
  );
}
