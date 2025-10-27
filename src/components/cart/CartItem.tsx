import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { CartItem as CartItemType } from "../../store/cartSlice";

type Props = {
  item: CartItemType;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};

export function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        {item.brand && <Text style={styles.brand}>{item.brand}</Text>}

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          {item.discountPercentage > 0 && (
            <Text style={styles.originalPrice}>
              ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
            </Text>
          )}
        </View>

        {/* Quantity Controls */}
        <View style={styles.quantityContainer}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => onDecrease(item.id)}
          >
            <Ionicons name="remove" size={18} color="#065F46" />
          </Pressable>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <Pressable
            style={[
              styles.quantityButton,
              item.quantity >= item.stock && styles.quantityButtonDisabled,
            ]}
            onPress={() => onIncrease(item.id)}
            disabled={item.quantity >= item.stock}
          >
            <Ionicons
              name="add"
              size={18}
              color={item.quantity >= item.stock ? "#9CA3AF" : "#065F46"}
            />
          </Pressable>

          <Text style={styles.subtotal}>
            ${(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>

        {item.quantity >= item.stock && (
          <Text style={styles.stockWarning}>Max stock reached</Text>
        )}
      </View>

      {/* Remove Button */}
      <Pressable style={styles.removeButton} onPress={() => onRemove(item.id)}>
        <Ionicons name="trash-outline" size={20} color="#DC2626" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#065F46",
  },
  quantityButtonDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#9CA3AF",
  },
  quantityText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    minWidth: 30,
    textAlign: "center",
  },
  subtotal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#065F46",
    marginLeft: "auto",
  },
  stockWarning: {
    fontSize: 11,
    color: "#DC2626",
    marginTop: 4,
  },
  removeButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
