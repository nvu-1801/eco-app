import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCart } from "../src/hooks/useCart";

export default function HomeScreen() {
  const router = useRouter();
  const { itemCount } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="storefront" size={80} color="#065F46" />
      </View>

      <Text style={styles.title}>🛍️ E-Commerce App</Text>
      <Text style={styles.subtitle}>
        Discover amazing products with great deals
      </Text>

      <View style={styles.buttonGroup}>
        {/* Products Button */}
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/(product)")}
        >
          <Ionicons name="grid-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Browse Products</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>

        {/* Cart Button */}
        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push("/cart")}
        >
          <View style={styles.cartButtonContent}>
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart-outline" size={20} color="#065F46" />
              {itemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {itemCount > 99 ? "99+" : itemCount}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.secondaryButtonText}>
              My Cart {itemCount > 0 && `(${itemCount})`}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#065F46" />
          </View>
        </Pressable>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#065F46" />
            <Text style={styles.featureText}>Free Shipping</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#065F46" />
            <Text style={styles.featureText}>Secure Payment</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#065F46" />
            <Text style={styles.featureText}>Easy Returns</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111827",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonGroup: {
    width: "100%",
    maxWidth: 400,
    gap: 16,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#065F46",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0FDF4",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#065F46",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#065F46",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  cartButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
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
  features: {
    marginTop: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
