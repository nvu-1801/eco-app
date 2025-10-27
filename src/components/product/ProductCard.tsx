import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import type { Product } from "@/types/product";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const router = useRouter();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { toggle, isFavorite } = useFavorites();

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

  const handleToggleFavorite = (e: any) => {
    e.stopPropagation();
    toggle(product.id);
  };

  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);
  const favorite = isFavorite(product.id);

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

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          style={styles.imageGradient}
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{Math.round(product.discountPercentage)}%
            </Text>
          </View>
        )}

        {/* Favorite Button */}
        <Pressable style={styles.favoriteButton} onPress={handleToggleFavorite}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={18}
            color={favorite ? "#DC2626" : "#FFFFFF"}
          />
        </Pressable>

        {/* In Cart Badge */}
        {inCart && (
          <View style={styles.inCartBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
            <Text style={styles.inCartText}>{quantity}</Text>
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

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FBBF24" />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.stock}>
            {product.stock > 0 ? `${product.stock} left` : "Out"}
          </Text>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.discountPercentage > 0 && (
            <Text style={styles.originalPrice}>
              $
              {(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </Text>
          )}
        </View>

        {/* Add to Cart Button */}
        {inCart ? (
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              styles.addButtonInCart,
              pressed && styles.addButtonPressed,
            ]}
            onPress={handleGoToCart}
          >
            <Ionicons name="cart" size={14} color="#FFFFFF" />
            <Text style={styles.addButtonText}>View Cart</Text>
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
            <Ionicons name="add-circle-outline" size={14} color="#FFFFFF" />
            <Text style={styles.addButtonText}>
              {product.stock === 0 ? "Out of Stock" : "Add"}
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
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 6,
  },
  pressed: {
    opacity: 0.9,
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
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "30%",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#DC2626",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  inCartBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#059669",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inCartText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  content: {
    padding: 12,
  },
  brand: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  rating: {
    fontSize: 11,
    fontWeight: "700",
    color: "#374151",
  },
  stock: {
    fontSize: 10,
    color: "#9CA3AF",
    marginLeft: "auto",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#065F46",
  },
  originalPrice: {
    fontSize: 12,
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#065F46",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  addButtonPressed: {
    opacity: 0.85,
  },
  addButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  addButtonInCart: {
    backgroundColor: "#059669",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
