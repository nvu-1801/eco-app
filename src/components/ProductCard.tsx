import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const router = useRouter();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handlePress = () => {
    router.push(`/(product)/${product.id}`);
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleGoToCart = (e: any) => {
    e.stopPropagation();
    router.push("/cart");
  };

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={handlePress}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        )}
        {inCart && (
          <View style={styles.inCartBadge}>
            <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Brand */}
        {product.brand && (
          <Text style={styles.brand} numberOfLines={1}>
            {product.brand}
          </Text>
        )}

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.originalPrice}>
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                0
              )}
            </Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.stock}>
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </Text>
        </View>

        {/* Add to Cart / View Cart Button */}
        {inCart ? (
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              styles.addButtonInCart,
              pressed && styles.addButtonPressed,
            ]}
            onPress={handleGoToCart}
          >
            <Ionicons name="cart" size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>View Cart ({quantity})</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
              product.stock === 0 && styles.addButtonDisabled,
            ]}
            onPress={handleAddToCart}
            disabled={product.stock === 0}
          >
            <Ionicons name="add-circle-outline" size={16} color="#FFFFFF" />
            <Text style={styles.addButtonText}>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F9FAFB",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#DC2626",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  inCartBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#065F46",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 12,
  },
  brand: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
    lineHeight: 18,
  },
  description: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#065F46",
  },
  originalPrice: {
    fontSize: 13,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
  },
  stock: {
    fontSize: 11,
    color: "#6B7280",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#065F46",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  addButtonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  addButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  addButtonInCart: {
    backgroundColor: "#059669",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});
