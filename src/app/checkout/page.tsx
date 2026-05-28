"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Truck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { formatTaka } from "@/lib/products";
import { useCart } from "@/lib/store";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "sslcommerz">("cod");
  const [status, setStatus] = useState("");
  const delivery = subtotal > 0 ? 80 : 0;
  const total = subtotal + delivery;

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Placing order...");
    const formData = new FormData(event.currentTarget);
    const orderPayload = {
      customer: {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? ""),
        city: String(formData.get("city") ?? ""),
        address: String(formData.get("address") ?? ""),
      },
      items,
      subtotal,
      delivery,
      total,
      paymentMethod,
    };

    const orderResponse = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      setStatus(orderData.message ?? "Order could not be saved.");
      return;
    }

    if (paymentMethod === "cod") {
      clearCart();
      setStatus(`${orderData.orderId} saved. COD order placed.`);
      return;
    }

    const response = await fetch("/api/sslcommerz/init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total, items, orderId: orderData.orderId }),
    });
    const data = await response.json();
    setStatus(`${orderData.orderId} saved. ${data.message ?? "SSLCommerz session prepared."}`);
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Checkout</h1>
        {items.length === 0 ? (
          <div className="mt-8 rounded-lg border border-black/10 bg-white p-8 text-center">
            <p className="text-xl font-black">No cart items to checkout.</p>
            <Link
              href="/products"
              className="mt-5 inline-flex h-11 items-center rounded-lg bg-[#161412] px-5 text-sm font-black text-white"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <form onSubmit={submitOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Delivery details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["name", "Full name"],
                  ["phone", "Phone number"],
                  ["email", "Email"],
                  ["city", "City"],
                ].map(([name, label]) => (
                  <label key={name} className="text-sm font-bold">
                    {label}
                    <input
                      required
                      name={name}
                      className="mt-2 h-11 w-full rounded-lg border border-black/10 px-3 outline-none focus:border-[#e63b2e]"
                    />
                  </label>
                ))}
                <label className="text-sm font-bold sm:col-span-2">
                  Address
                  <textarea
                    required
                    name="address"
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-black/10 p-3 outline-none focus:border-[#e63b2e]"
                  />
                </label>
              </div>

              <h2 className="mt-8 text-xl font-black">Payment method</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 p-4 font-bold">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <Truck size={20} />
                  Cash on delivery
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/10 p-4 font-bold">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "sslcommerz"}
                    onChange={() => setPaymentMethod("sslcommerz")}
                  />
                  <CreditCard size={20} />
                  SSLCommerz
                </label>
              </div>
              {status ? (
                <p className="mt-5 rounded-lg bg-[#fff1cb] p-4 text-sm font-bold">
                  {status}
                </p>
              ) : null}
            </section>

            <aside className="h-fit rounded-lg border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black">Summary</h2>
              <div className="mt-4 grid gap-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 text-sm font-bold">
                    <span>{item.title} x {item.quantity}</span>
                    <span>{formatTaka(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 border-t border-black/10 pt-4 font-bold">
                <div className="flex justify-between">
                  <span className="text-black/60">Subtotal</span>
                  <span>{formatTaka(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/60">Delivery</span>
                  <span>{formatTaka(delivery)}</span>
                </div>
                <div className="flex justify-between text-xl font-black">
                  <span>Total</span>
                  <span>{formatTaka(total)}</span>
                </div>
              </div>
              <button className="mt-5 h-12 w-full rounded-lg bg-[#161412] text-sm font-black text-white hover:bg-[#e63b2e]">
                Place order
              </button>
            </aside>
          </form>
        )}
      </main>
    </>
  );
}
