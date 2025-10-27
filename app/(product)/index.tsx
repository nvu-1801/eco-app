// src/app/products/ProductListScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EmptyState } from "../../src/components/EmptyState";
import { ErrorState } from "../../src/components/ErrorState";
import { ProductCard } from "../../src/components/ProductCard";
import { SearchBar } from "../../src/components/SearchBar";
import { useCart } from "../../src/hooks/useCart";
import useDebouncedValue from "../../src/hooks/useDebouncedValue";
import { useListProductsQuery } from "../../src/services/productsApi";
import type { Product } from "../../src/types/product";

const LIMIT = 12;
const { width } = Dimensions.get("window");

// Categories data
const CATEGORIES = [
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

// Spotlight banners
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

  const [q, setQ] = useState("");
  const debouncedQ = useDebouncedValue(q, 400);
  const [skip, setSkip] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<
    "default" | "price-asc" | "price-desc" | "rating"
  >("default");

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

  // Filter and sort products
  const filteredItems = useMemo(() => {
    let filtered = [...items];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by search query (already handled by API, but filter locally too)
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

    // Sort
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

  const navigateToCart = () => {
    router.push("/cart");
  };

  if (error) return <ErrorState onRetry={onRefresh} />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header với Search */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello 👋</Text>
            <Text style={styles.headerTitle}>Find your product</Text>
          </View>
          <Pressable style={styles.cartButton} onPress={navigateToCart}>
            <Ionicons name="cart-outline" size={24} color="#111827" />
            {itemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {itemCount > 99 ? "99+" : itemCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
        <SearchBar
          value={q}
          onChangeText={setQ}
          placeholder="Search products, brands..."
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Spotlight Section */}
            <View style={styles.spotlightSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={width - 32}
                decelerationRate="fast"
              >
                {SPOTLIGHTS.map((spotlight) => (
                  <Pressable
                    key={spotlight.id}
                    style={[
                      styles.spotlightCard,
                      { backgroundColor: spotlight.color },
                    ]}
                  >
                    <View style={styles.spotlightContent}>
                      <Text style={styles.spotlightTitle}>
                        {spotlight.title}
                      </Text>
                      <Text style={styles.spotlightSubtitle}>
                        {spotlight.subtitle}
                      </Text>
                      <Pressable style={styles.spotlightButton}>
                        <Text style={styles.spotlightButtonText}>Shop Now</Text>
                        <Ionicons
                          name="arrow-forward"
                          size={16}
                          color="#065F46"
                        />
                      </Pressable>
                    </View>
                    <Image
                      source={{ uri: spotlight.image }}
                      style={styles.spotlightImage}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Categories Section */}
            <View style={styles.categoriesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <Pressable onPress={() => setSelectedCategory("all")}>
                  <Text style={styles.seeAll}>See All</Text>
                </Pressable>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesScroll}
              >
                {CATEGORIES.map((category) => (
                  <Pressable
                    key={category.id}
                    style={[
                      styles.categoryChip,
                      selectedCategory === category.id &&
                        styles.categoryChipActive,
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={20}
                      color={
                        selectedCategory === category.id ? "#FFFFFF" : "#6B7280"
                      }
                    />
                    <Text
                      style={[
                        styles.categoryChipText,
                        selectedCategory === category.id &&
                          styles.categoryChipTextActive,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            {/* Filter & Sort Bar */}
            <View style={styles.filterBar}>
              <View style={styles.filterLeft}>
                <Text style={styles.resultCount}>
                  {filteredItems.length} Products
                </Text>
              </View>
              <View style={styles.filterRight}>
                <Pressable
                  style={styles.sortButton}
                  onPress={() => {
                    const sorts: Array<typeof sortBy> = [
                      "default",
                      "price-asc",
                      "price-desc",
                      "rating",
                    ];
                    const currentIndex = sorts.indexOf(sortBy);
                    setSortBy(sorts[(currentIndex + 1) % sorts.length]);
                  }}
                >
                  <Ionicons name="swap-vertical" size={16} color="#6B7280" />
                  <Text style={styles.sortButtonText}>
                    {sortBy === "default"
                      ? "Sort"
                      : sortBy === "price-asc"
                      ? "Price ↑"
                      : sortBy === "price-desc"
                      ? "Price ↓"
                      : "Rating"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Products Header */}
            <View style={styles.productsHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === "all"
                  ? "Featured Products"
                  : `${
                      CATEGORIES.find((c) => c.id === selectedCategory)?.name ||
                      ""
                    } Products`}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.centerLoader}>
              <ActivityIndicator size="large" color="#065F46" />
            </View>
          ) : (
            <EmptyState text="No products found" />
          )
        }
        ListFooterComponent={
          isFetching && items.length > 0 ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#065F46" />
            </View>
          ) : hasMore ? null : items.length > 0 ? (
            <View style={styles.endText}>
              <Text style={styles.endTextLabel}>You've reached the end</Text>
            </View>
          ) : null
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

      {/* Floating Cart Summary */}
      {itemCount > 0 && (
        <Pressable style={styles.floatingCart} onPress={navigateToCart}>
          <View style={styles.floatingCartContent}>
            <View style={styles.floatingCartLeft}>
              <Ionicons name="cart" size={20} color="#FFFFFF" />
              <Text style={styles.floatingCartCount}>{itemCount} items</Text>
            </View>
            <View style={styles.floatingCartRight}>
              <Text style={styles.floatingCartPrice}>
                ${totalPrice.toFixed(2)}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  cartButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 22,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#DC2626",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  spotlightSection: {
    paddingVertical: 20,
    paddingLeft: 16,
  },
  spotlightCard: {
    width: width - 32,
    height: 160,
    borderRadius: 16,
    marginRight: 16,
    flexDirection: "row",
    overflow: "hidden",
    padding: 20,
  },
  spotlightContent: {
    flex: 1,
    justifyContent: "center",
  },
  spotlightTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  spotlightSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
  },
  spotlightButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 6,
  },
  spotlightButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#065F46",
  },
  spotlightImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  categoriesSection: {
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  seeAll: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "600",
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: "#065F46",
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  filterLeft: {
    flex: 1,
  },
  resultCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  filterRight: {
    flexDirection: "row",
    gap: 8,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    gap: 4,
  },
  sortButtonText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  productsHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#F9FAFB",
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  centerLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  footerLoader: {
    paddingVertical: 24,
    alignItems: "center",
  },
  endText: {
    paddingVertical: 20,
    alignItems: "center",
  },
  endTextLabel: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  floatingCart: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#065F46",
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingCartContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  floatingCartLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  floatingCartCount: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  floatingCartRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  floatingCartPrice: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
