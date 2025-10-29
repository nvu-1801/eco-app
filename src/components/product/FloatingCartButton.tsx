import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  itemCount: number;
  totalPrice: number;
  onPress: () => void;
};

export function FloatingCartButton({ itemCount, totalPrice, onPress }: Props) {
  if (itemCount === 0) return null;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.left}>
          <Ionicons name="cart" size={20} color="#FFFFFF" />
          <Text style={styles.count}>{itemCount} items</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  count: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
