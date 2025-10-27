import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  price: number;
  onAddToCart: () => void;
  disabled?: boolean;
  inCart?: boolean;
  onGoToCart?: () => void;
};

export function AddToCartFooter({
  price,
  onAddToCart,
  disabled = false,
  inCart = false,
  onGoToCart,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text style={styles.label}>Total Price</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>

        {inCart && onGoToCart ? (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.buttonInCart,
              pressed && styles.buttonPressed,
            ]}
            onPress={onGoToCart}
          >
            <Ionicons name="cart" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Go to Cart</Text>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              disabled && styles.buttonDisabled,
            ]}
            onPress={onAddToCart}
            disabled={disabled}
          >
            <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>
              {disabled ? "Out of Stock" : "Add to Cart"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#065F46",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#065F46",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  buttonInCart: {
    backgroundColor: "#059669",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
