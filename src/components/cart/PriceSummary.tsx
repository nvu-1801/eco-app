import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  subtotal: number;
  discount: number;
  shipping?: number;
  total: number;
  onCheckout: () => void;
  itemCount: number;
};

export function PriceSummary({
  subtotal,
  discount,
  shipping = 0,
  total,
  onCheckout,
  itemCount,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Subtotal */}
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal ({itemCount} items)</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>

      {/* Discount */}
      {discount > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
        </View>
      )}

      {/* Shipping */}
      {shipping > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Shipping</Text>
          <Text style={styles.value}>${shipping.toFixed(2)}</Text>
        </View>
      )}

      {/* Free Shipping Notice */}
      {shipping === 0 && total > 0 && (
        <View style={styles.freeShippingBadge}>
          <Ionicons name="checkmark-circle" size={16} color="#059669" />
          <Text style={styles.freeShippingText}>Free Shipping</Text>
        </View>
      )}

      <View style={styles.divider} />

      {/* Total */}
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      {/* Checkout Button */}
      <Pressable
        style={({ pressed }) => [
          styles.checkoutButton,
          pressed && styles.checkoutButtonPressed,
        ]}
        onPress={onCheckout}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  discountValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#DC2626",
  },
  freeShippingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  freeShippingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#059669",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#065F46",
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#065F46",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  checkoutButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
