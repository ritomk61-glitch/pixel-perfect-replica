import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, Search, SlidersHorizontal, PackageSearch, AlertTriangle } from "lucide-react";
import { getProducts } from "@/services/productService.js";
import { categories } from "@/data/products.js";
import { ProductCard, ProductSkeleton } from "@/components/ProductCard.jsx";
import { Page, Empty } from "@/components/Motion.jsx";

export const Route = createFileRoute("/products/")({
  validateSearch: (s) => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Components — NEXUS" },
      { name: "description", content: "Browse microcontrollers, sensors, ICs, passives and power supplies with live filters." },
      { property: "og:title", content: "Shop Components — NEXUS" },
      { property: "og:description", content: "Search and filter thousands of electronic components." },
    ],
  }),
  component: Products,
});

const MAX = 1500;

function Products() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [inStock, setInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const q = search.q || "";
  const cat = search.category || "";

  const set = (patch) => navigate({ search: (s) => ({ ...s, ...patch }), replace: true });

  const list = useMemo(() => {
    let r = (data || []).filter((p) =>
      (!cat || p.category === cat) &&
      p.price <= maxPrice &&
      (!inStock || p.stock > 0) &&
      (!q || `${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(q.toLowerCase())));
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "featured") r = [...r].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return r;
  }, [data, cat, maxPrice, inStock, q, sort]);

  const Filters = (
    <div className="space-y-8">
      <div>
        <h4 className="eyebrow mb-3">Category</h4>
        <div className="space-y-1">
          {[{ id: "", name: "All components" }, ...categories].map((c) => (
            <button key={c.id} onClick={() => set({ category: c.id || undefined })}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${cat === c.id ? "bg-accent text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="eyebrow mb-3">Max price · ₹{maxPrice}</h4>
        <input type="range" min={50} max={MAX} step={50} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-primary" />
      </div>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-primary" /> In stock only
      </label>
    </div>
  );

  return (
    <Page>
      <div className="mx-auto max-w-6xl px-6">
        <span className="eyebrow">Catalogue</span>
        <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{categories.find((c) => c.id === cat)?.name || "All components"}</h1>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="flex min-w-60 flex-1 items-center gap-2 rounded-full border border-border bg-secondary/40 px-4">
            <Search size={16} className="text-muted-foreground" />
            <input value={q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Search by name, brand or spec…" className="w-full bg-transparent py-3 text-sm outline-none" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="field !w-auto !rounded-full">
            <option value="featured">Featured</option>
            <option value="low">Price: Low to high</option>
            <option value="high">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
          <div className="flex rounded-full border border-border p-1">
            {[["grid", LayoutGrid], ["list", List]].map(([v, I]) => (
              <button key={v} aria-label={`${v} view`} onClick={() => setView(v)} className={`grid h-9 w-9 place-items-center rounded-full ${view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}><I size={16} /></button>
            ))}
          </div>
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-ghost !py-2.5 lg:hidden"><SlidersHorizontal size={15} /> Filters</button>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className={`${filtersOpen ? "block" : "hidden"} glass rounded-2xl p-5 lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none`}>{Filters}</aside>
          <div>
            {isError ? (
              <Empty icon={AlertTriangle} title="Couldn't load products" text="Check your connection and try again.">
                <button onClick={() => refetch()} className="btn-primary">Retry</button>
              </Empty>
            ) : isLoading ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}</div>
            ) : list.length === 0 ? (
              <Empty icon={PackageSearch} title="No components match" text="Try a different search or loosen your filters.">
                <button onClick={() => { set({ q: undefined, category: undefined }); setMaxPrice(MAX); setInStock(false); }} className="btn-primary">Reset filters</button>
              </Empty>
            ) : (
              <>
                <p className="mb-5 font-mono text-xs text-muted-foreground">{list.length} results</p>
                <div className={view === "grid" ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3" : "space-y-4"}>
                  {list.map((p) => <ProductCard key={p.id} product={p} layout={view} />)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
