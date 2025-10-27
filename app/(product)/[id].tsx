import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useGetProductByIdQuery } from "../../src/services/productsApi";
import { addItem } from "../../src/store/cartSlice";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const productId = Number(id);
  const enabled = Number.isFinite(productId) && productId > 0;

  const { data, isLoading, isError } = useGetProductByIdQuery(productId, {
    skip: !enabled,
  });

  if (!enabled) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#DC2626" />
        <Text style={styles.errorTitle}>Invalid Product</Text>
        <Text style={styles.errorText}>Product ID is missing or invalid.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#065F46" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="cloud-offline-outline" size={64} color="#DC2626" />
        <Text style={styles.errorTitle}>Failed to Load</Text>
        <Text style={styles.errorText}>Unable to load product details.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const discountedPrice = data.price;
  const originalPrice =
    data.discountPercentage > 0
      ? (data.price / (1 - data.discountPercentage / 100)).toFixed(2)
      : null;

  const handleAddToCart = () => {
    dispatch(addItem(data));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.headerButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Product Details</Text>
        <Pressable style={styles.headerButton}>
          <Ionicons name="share-outline" size={24} color="#111827" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: data.thumbnail }}
            style={styles.image}
            resizeMode="cover"
          />
          {data.discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                -{Math.round(data.discountPercentage)}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Brand */}
          <View style={styles.titleSection}>
            <Text style={styles.brand}>{data.brand || "Unknown Brand"}</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>

          {/* Rating & Stock */}
          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FBBF24" />
              <Text style={styles.ratingText}>{data.rating.toFixed(1)}</Text>
              <Text style={styles.ratingCount}>(50+ reviews)</Text>
            </View>
            <View
              style={[
                styles.stockBadge,
                data.stock > 10 ? styles.inStock : styles.lowStock,
              ]}
            >
              <Text style={styles.stockText}>
                {data.stock > 10 ? "In Stock" : `Only ${data.stock} left`}
              </Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>${discountedPrice}</Text>
              {originalPrice && (
                <Text style={styles.originalPrice}>${originalPrice}</Text>
              )}
            </View>
            {data.discountPercentage > 0 && (
              <Text style={styles.savings}>
                You save ${(Number(originalPrice) - discountedPrice).toFixed(2)}
              </Text>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{data.description}</Text>
          </View>

          {/* Product Info */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Product Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{data.category}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Brand</Text>
              <Text style={styles.infoValue}>{data.brand || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>SKU</Text>
              <Text style={styles.infoValue}>{data.sku || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Availability</Text>
              <Text
                style={[
                  styles.infoValue,
                  data.stock > 0 ? styles.available : styles.unavailable,
                ]}
              >
                {data.stock > 0 ? "Available" : "Out of Stock"}
              </Text>
            </View>
          </View>

          {/* Spacing for floating button */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Floating Add to Cart Button */}
      <View style={styles.floatingContainer}>
        <View style={styles.floatingContent}>
          <View>
            <Text style={styles.floatingLabel}>Total Price</Text>
            <Text style={styles.floatingPrice}>${discountedPrice}</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.addToCartButton,
              pressed && styles.addToCartButtonPressed,
              data.stock === 0 && styles.addToCartButtonDisabled,
            ]}
            onPress={handleAddToCart}
            disabled={data.stock === 0}
          >
            <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
            <Text style={styles.addToCartText}>
              {data.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: "#F9FAFB",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#DC2626",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  content: {
    padding: 16,
  },
  titleSection: {
    marginBottom: 12,
  },
  brand: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 30,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  ratingCount: {
    fontSize: 14,
    color: "#6B7280",
  },
  stockBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  inStock: {
    backgroundColor: "#D1FAE5",
  },
  lowStock: {
    backgroundColor: "#FEF3C7",
  },
  stockText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#065F46",
  },
  priceSection: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: "700",
    color: "#065F46",
  },
  originalPrice: {
    fontSize: 18,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  savings: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 24,
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoLabel: {
    fontSize: 15,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  available: {
    color: "#065F46",
  },
  unavailable: {
    color: "#DC2626",
  },
  floatingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  floatingContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  floatingLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  floatingPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#065F46",
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#065F46",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  addToCartButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  addToCartButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6B7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: "#065F46",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
