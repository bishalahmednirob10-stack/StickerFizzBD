import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { brand } from "@/lib/brand";

export default function CheckoutSuccessPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 py-10 text-center">
        <div className="rounded-lg border border-black/10 bg-white p-8 shadow-sm">
          <CheckCircle2 className="mx-auto text-[#1c6b2a]" size={52} />
          <h1 className="mt-5 text-4xl font-black tracking-tight">Order confirmed</h1>
          <p className="mt-3 text-black/65">
            Your {brand.displayName} order has been received. We will contact you
            shortly for confirmation and delivery details.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#161412] px-5 text-sm font-black text-white"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    </>
  );
}
