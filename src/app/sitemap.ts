import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const baseUrl = "https://stickerfizz.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/products",
    "/cart",
    "/checkout",
    ...products.map((product) => `/products/${product.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
