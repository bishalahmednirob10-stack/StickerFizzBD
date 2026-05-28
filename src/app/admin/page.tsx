import { Boxes, ClipboardList, ImagePlus, PackageCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { formatTaka, products } from "@/lib/products";

const stats: { label: string; value: number; Icon: LucideIcon }[] = [
  { label: "Products", value: products.length, Icon: Boxes },
  { label: "Orders", value: 24, Icon: ClipboardList },
  {
    label: "Inventory",
    value: products.reduce((sum, product) => sum + product.stock, 0),
    Icon: PackageCheck,
  },
  { label: "Uploads", value: 13, Icon: ImagePlus },
];

export default function AdminPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#e63b2e]">
              Protected dashboard
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Admin</h1>
          </div>
          <button className="h-11 rounded-lg bg-[#161412] px-5 text-sm font-black text-white">
            Upload product
          </button>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ label, value, Icon }) => (
            <div key={label} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <Icon size={22} className="text-[#e63b2e]" />
              <p className="mt-4 text-sm font-bold text-black/55">{label}</p>
              <p className="text-3xl font-black">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
            <div className="border-b border-black/10 p-5">
              <h2 className="text-xl font-black">Product inventory</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#f1ede7]">
                  <tr>
                    {["Product", "Category", "Price", "Stock", "Status"].map((head) => (
                      <th key={head} className="px-5 py-3 font-black">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-t border-black/10">
                      <td className="px-5 py-4 font-black">{product.title}</td>
                      <td className="px-5 py-4 text-black/60">{product.category}</td>
                      <td className="px-5 py-4 font-bold">{formatTaka(product.price)}</td>
                      <td className="px-5 py-4">{product.stock}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-[#dff6dd] px-3 py-1 text-xs font-black text-[#1c6b2a]">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">Recent orders</h2>
            <div className="mt-4 grid gap-3">
              {[
                ["SF-1024", "Processing", 1280],
                ["SF-1023", "Paid", 680],
                ["SF-1022", "Delivered", 117],
              ].map(([id, status, amount]) => (
                <div key={id} className="rounded-lg border border-black/10 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-black">{id}</p>
                    <p className="text-sm font-black text-[#e63b2e]">{formatTaka(Number(amount))}</p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-black/55">{status}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
