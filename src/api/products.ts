import type { Product } from "@/types/product";

const BASE = "https://dummyjson.com";

export type ProductPage = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchProducts({
  page,
  limit,
  q,
}: {
  page: number;
  limit: number;
  q?: string;
}) {
  const skip = (page - 1) * limit;
  const url =
    q && q.trim().length > 0
      ? `${BASE}/products/search?q=${encodeURIComponent(
          q
        )}&limit=${limit}&skip=${skip}`
      : `${BASE}/products?limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data = (await res.json()) as ProductPage;

  // Normalize image field for cards
  data.products = data.products.map((p) => ({
    ...p,
    thumbnail: p.thumbnail ?? p.images?.[0],
  }));

  return data;
}

export async function fetchProductById(id: number) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error(`Product ${id} not found`);
  const p = (await res.json()) as Product;
  return { ...p, thumbnail: p.thumbnail ?? p.images?.[0] } as Product;
}
