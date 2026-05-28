import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  AtSign,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteHeader } from "@/components/site-header";
import { StickerCalculator } from "@/components/sticker-calculator";
import { brand } from "@/lib/brand";
import { categories, products } from "@/lib/products";

const featured = products.filter((product) => product.featured);

const trustItems: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: brand.orderPrompt,
    text: "WhatsApp and Messenger orders",
    Icon: MessageCircle,
  },
  {
    title: brand.quality,
    text: "Premium custom stickers and decals",
    Icon: ShieldCheck,
  },
  {
    title: brand.service,
    text: "Custom print support in Bangladesh",
    Icon: Truck,
  },
];

const contactItems: { Icon: LucideIcon; label: string; value: string }[] = [
  { Icon: AtSign, label: "Instagram", value: brand.instagram },
  { Icon: Mail, label: "Email", value: brand.email },
  { Icon: Phone, label: "WhatsApp", value: brand.phone },
  { Icon: MessageCircle, label: "Messenger", value: brand.facebook },
  { Icon: Sparkles, label: "Service", value: brand.service },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative min-h-[640px] overflow-hidden bg-[#161412] text-white">
          <Image
            src="https://images.unsplash.com/photo-1606041011872-596597976b25?auto=format&fit=crop&w=1800&q=80"
            alt="Custom phone cases and stickers"
            fill
            priority
            className="object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />
          <div className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black backdrop-blur">
                {brand.followers} | {brand.priceSignal}
              </p>
              <div className="mb-6 flex items-center gap-4">
                <Image
                  src={brand.logo}
                  alt={`${brand.displayName} logo`}
                  width={92}
                  height={92}
                  className="rounded-full border-2 border-white/35 bg-black shadow-2xl"
                />
                <div>
                  <h1 className="text-5xl font-black tracking-tight sm:text-7xl">
                    {brand.displayName}
                  </h1>
                  <p className="mt-2 text-lg font-bold text-[#ffce6b]">
                    {brand.sparkleTagline}
                  </p>
                </div>
              </div>
              <h2 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
                {brand.description}
              </h2>
              <p className="mt-4 text-lg font-black text-white">
                {brand.quality}
              </p>
              <p className="mt-2 text-lg font-black text-white">
                {brand.orderPrompt}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                Anime, football, cars, F1, gaming, Kuromi, and custom prints
                produced for daily use with sharp artwork and fast local delivery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#ffce6b] px-6 text-sm font-black text-black transition hover:bg-white"
                >
                  Shop cases
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-6 text-sm font-black text-white transition hover:bg-white hover:text-black"
                >
                  WhatsApp order
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <StickerCalculator />
            </div>
          </div>
        </section>

        <section className="border-b border-black/10 bg-white py-5">
          <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {trustItems.map(({ title, text, Icon }) => (
              <div key={title} className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#ffe8a8]">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-black">{title}</p>
                  <p className="text-sm text-black/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#e63b2e]">
                Collections
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Shop by obsession
              </h2>
            </div>
            <Link href="/products" className="hidden text-sm font-black sm:block">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="rounded-lg border border-black/10 bg-white p-5 font-black shadow-sm transition hover:-translate-y-1 hover:border-[#e63b2e]"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-[#f1ede7] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#e63b2e]">
                  Trending
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  New drops for your phone and desk
                </h2>
              </div>
              <Link href="/products" className="hidden text-sm font-black sm:block">
                Browse catalog
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
          <div className="rounded-lg bg-[#161412] p-8 text-white sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ffce6b]">
              Custom Print CTA
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
              Upload artwork, pick a size, and print exactly what you want.
            </h2>
            <p className="mt-5 max-w-2xl text-white/70">
              Sticker pricing follows the blueprint formula: width x height x
              Tk 13. Phone cases stay fixed at Tk 600.
            </p>
            <Link
              href={`https://wa.me/${brand.phone.replace(/\D/g, "")}`}
              target="_blank"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-lg bg-[#ffce6b] px-6 text-sm font-black text-black"
            >
              Start a custom order
            </Link>
          </div>
          <StickerCalculator />
        </section>

        <section id="contact" className="bg-white py-14">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#e63b2e]">
                Contact Info
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Message {brand.displayName} to order
              </h2>
              <p className="mt-4 max-w-xl text-black/65">
                Use the same contact channels shown on the Facebook page for
                custom sticker, decal, and printing service orders.
              </p>
            </div>
            <div className="grid gap-3">
              {contactItems.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-lg border border-black/10 bg-[#fffaf6] p-4"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-[#161412] text-[#ffce6b]">
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-black/50">{label}</p>
                    <p className="font-black">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight">Customer reviews</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {[
                ["Fast delivery to Dhaka and the print quality was sharp.", "Rafi"],
                ["My anime case looks premium and the edges feel strong.", "Nusrat"],
                ["The custom sticker calculator made pricing very clear.", "Ayon"],
              ].map(([quote, name]) => (
                <figure key={name} className="rounded-lg border border-black/10 p-5">
                  <blockquote className="text-lg font-bold leading-7">
                    {quote}
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-black text-[#e63b2e]">
                    {name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
