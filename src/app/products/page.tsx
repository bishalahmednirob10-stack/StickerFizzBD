import { Suspense } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { categories, products } from "@/lib/products";

function ProductsContent({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const selectedCategory = searchParams.category;
  const query = searchParams.q?.toLowerCase() ?? "";
  const filtered = products.filter((product) => {
    const categoryMatch = selectedCategory
      ? product.category === selectedCategory
      : true;
    const queryMatch = query
      ? [product.title, product.category, product.description, ...product.tags]
          .join(" ")
          .toLowerCase()
          .includes(query)
      : true;

    return categoryMatch && queryMatch;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-lg border border-black/10 bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#e63b2e]">
            Filters
          </p>
          <form className="mb-5">
            <input
              name="q"
              defaultValue={searchParams.q}
              placeholder="Search products"
              className="h-11 w-full rounded-lg border border-black/10 px-3 text-sm outline-none focus:border-[#e63b2e]"
            />
          </form>
          <div className="grid gap-2">
            <Link
              href="/products"
              className="rounded-lg px-3 py-2 text-sm font-bold hover:bg-[#fff1cb]"
            >
              All products
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className={`rounded-lg px-3 py-2 text-sm font-bold hover:bg-[#fff1cb] ${
                  selectedCategory === category ? "bg-[#ffce6b]" : ""
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#e63b2e]">
                Catalog
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">
                {selectedCategory ?? "All products"}
              </h1>
            </div>
            <p className="font-bold text-black/60">{filtered.length} items</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  return (
    <>
      <SiteHeader />
      <Suspense>
        <ProductsContent searchParams={await searchParams} />
      </Suspense>
    </>
  );
}
