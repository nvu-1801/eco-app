// src/services/productsApi.ts
import type { Product, ProductListResponse } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://dummyjson.com";

export type ListArgs = {
  q?: string; // search query
  limit?: number; // default 12
  skip?: number; // offset
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "ProductList"],
  endpoints: (builder) => ({
    // List + Search + Pagination
    listProducts: builder.query<ProductListResponse, ListArgs | void>({
      query: (args) => {
        // Add default empty object if args is void
        const { q, limit = 12, skip = 0 } = args || {};
        return q && q.trim().length > 0
          ? { url: `/products/search`, params: { q, limit, skip } }
          : { url: `/products`, params: { limit, skip } };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Product" as const,
                id,
              })),
              { type: "ProductList" as const, id: "PARTIAL-LIST" },
            ]
          : [{ type: "ProductList" as const, id: "PARTIAL-LIST" }],
    }),

    // Detail
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useListProductsQuery, useGetProductByIdQuery } = productsApi;
