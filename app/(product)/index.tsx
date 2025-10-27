// src/app/products/ProductListScreen.tsx
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EmptyState } from "../../src/components/common/EmptyState";
import { ErrorState } from "../../src/components/common/ErrorState";
import {
  CategoryFilter,
  type Category,
} from "../../src/components/product/CategoryFilter";
import { FloatingCartButton } from "../../src/components/product/FloatingCartButton";
import { ProductCard } from "../../src/components/product/ProductCard";
import { ProductListHeader } from "../../src/components/product/ProductListHeader";
import { SectionHeader } from "../../src/components/product/SectionHeader";
import {
  SortFilterBar,
  type SortOption,
} from "../../src/components/product/SortFilterBar";
import { SpotlightBanner } from "../../src/components/product/SpotlightBanner";
import { useCart } from "../../src/hooks/useCart";
import useDebouncedValue from "../../src/hooks/useDebouncedValue";
import { useListProductsQuery } from "../../src/services/productsApi";
import type { Product } from "../../src/types/product";

const LIMIT = 12;

const CATEGORIES: Category[] = [
  { id: "all", name: "All", icon: "grid-outline" },
  { id: "beauty", name: "Beauty", icon: "color-palette-outline" },
  { id: "furniture", name: "Furniture", icon: "bed-outline" },
  { id: "groceries", name: "Groceries", icon: "fast-food-outline" },
  { id: "home-decoration", name: "Home", icon: "home-outline" },
  { id: "kitchen-accessories", name: "Kitchen", icon: "restaurant-outline" },
  { id: "laptops", name: "Laptops", icon: "laptop-outline" },
  { id: "mens-shirts", name: "Men's", icon: "shirt-outline" },
  { id: "smartphones", name: "Phones", icon: "phone-portrait-outline" },
  { id: "sports-accessories", name: "Sports", icon: "football-outline" },
];

const SPOTLIGHTS = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% OFF",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
    color: "#FEF3C7",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Collection",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    color: "#DBEAFE",
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On orders over $50",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    color: "#D1FAE5",
  },
];

export default function ProductListScreen() {
  const router = useRouter();
  const { itemCount, totalPrice } = useCart();
  const scrollY = new Animated.Value(0);

  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, 400);
  const [skip, setSkip] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const { data, error, isFetching, isLoading, refetch } = useListProductsQuery({
    q: debouncedQ,
    limit: LIMIT,
    skip,
  });

  const [items, setItems] = useState<Product[]>([]);
  const total = data?.total ?? 0;

  useEffect(() => {
    setSkip(0);
    setItems([]);
  }, [debouncedQ]);

  useEffect(() => {
    if (data?.products) {
      setItems((prev) => {
        const map = new Map<number, Product>();
        [...prev, ...data.products].forEach((p) => map.set(p.id, p));
        return Array.from(map.values());
      });
    }
  }, [data?.products]);

  const filteredItems = useMemo(() => {
    let filtered = [...items];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (debouncedQ.trim()) {
      const searchLower = debouncedQ.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          item.brand?.toLowerCase().includes(searchLower)
      );
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [items, selectedCategory, sortBy, debouncedQ]);

  const hasMore = useMemo(() => items.length < total, [items.length, total]);

  const loadMore = useCallback(() => {
    if (isFetching || !hasMore) return;
    setSkip((s) => s + LIMIT);
  }, [isFetching, hasMore]);

  const onRefresh = useCallback(() => {
    setSkip(0);
    setItems([]);
    setSelectedCategory("all");
    setSortBy("default");
    setQ("");
    refetch();
  }, [refetch]);

  const handleSortChange = () => {
    const sorts: SortOption[] = [
      "default",
      "price-asc",
      "price-desc",
      "rating",
    ];
    const currentIndex = sorts.indexOf(sortBy);
    setSortBy(sorts[(currentIndex + 1) % sorts.length]);
  };

  const navigateToCart = () => {
    router.push("/cart");
  };

  const getSectionTitle = () => {
    if (selectedCategory === "all") return "Discover Products";
    const category = CATEGORIES.find((c) => c.id === selectedCategory);
    return `${category?.name || ""} Collection`;
  };

  if (error) return <ErrorState onRetry={onRefresh} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <ProductListHeader
        searchQuery={q}
        onSearchChange={setQ}
        cartItemCount={itemCount}
        onCartPress={navigateToCart}
      />

      {/* Product Grid */}
      <Animated.FlatList
        data={filteredItems}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        key="two-column-list" // Force re-render when numColumns changes
        renderItem={({ item, index }) => (
          <View style={styles.cardWrapper}>
            <ProductCard product={item} />
          </View>
        )}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={
          <>
            <SpotlightBanner spotlights={SPOTLIGHTS} />

            <View style={styles.filtersSection}>
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onSeeAllPress={() => setSelectedCategory("all")}
              />

              <SortFilterBar
                resultCount={filteredItems.length}
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
            </View>

            <SectionHeader title={getSectionTitle()} />
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.centerLoader}>
              <ActivityIndicator size="large" color="#065F46" />
              <Text style={styles.loadingText}>Loading products...</Text>
            </View>
          ) : (
            <EmptyState text="No products found" />
          )
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            {isFetching && items.length > 0 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#065F46" />
                <Text style={styles.loadingMoreText}>Loading more...</Text>
              </View>
            ) : hasMore ? null : items.length > 0 ? (
              <View style={styles.endText}>
                <View style={styles.endLine} />
                <Text style={styles.endTextLabel}>You've seen it all!</Text>
                <View style={styles.endLine} />
              </View>
            ) : null}
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={isFetching && skip === 0}
            onRefresh={onRefresh}
            colors={["#065F46"]}
            tintColor="#065F46"
          />
        }
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />

      {/* Floating Cart Button */}
      <FloatingCartButton
        itemCount={itemCount}
        totalPrice={totalPrice}
        onPress={navigateToCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  filtersSection: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 12,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  columnWrapper: {
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  cardWrapper: {
    flex: 1,
    maxWidth: "50%",
    padding: 6,
  },
  centerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  footerContainer: {
    width: "100%",
  },
  footerLoader: {
    paddingVertical: 32,
    alignItems: "center",
  },
  loadingMoreText: {
    marginTop: 8,
    fontSize: 13,
    color: "#9CA3AF",
  },
  endText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    gap: 12,
  },
  endLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  endTextLabel: {
    fontSize: 13,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
