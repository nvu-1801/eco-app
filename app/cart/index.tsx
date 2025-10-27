import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CartItem } from "../../src/components/cart/CartItem";
import { EmptyState } from "../../src/components/common/EmptyState";
import { PriceSummary } from "../../src/components/cart/PriceSummary";
import { useCart } from "../../src/hooks/useCart";

export default function CartScreen() {
  const router = useRouter();
  const {
    items,
    itemCount,
    totalPrice,
    totalDiscount,
    removeFromCart,
    updateItemQuantity,
  } = useCart();

  const handleCheckout = () => {
    // TODO: Navigate to checkout
    alert("Checkout feature coming soon!");
  };

  const subtotal = totalPrice + totalDiscount;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </Pressable>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <View style={styles.headerRight}>
          <Text style={styles.itemCount}>{itemCount} items</Text>
        </View>
      </View>

      {/* Cart Items */}
      {items.length === 0 ? (
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          text="Add some products to get started"
          actionLabel="Browse Products"
          onAction={() => router.push("/(product)")}
        />
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onIncrease={(id) => updateItemQuantity(id, item.quantity + 1)}
                onDecrease={(id) => updateItemQuantity(id, item.quantity - 1)}
                onRemove={removeFromCart}
              />
            )}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Summary - Fixed at bottom */}
          <View style={styles.summaryContainer}>
            <PriceSummary
              subtotal={subtotal}
              discount={totalDiscount}
              total={totalPrice}
              itemCount={itemCount}
              onCheckout={handleCheckout}
            />
          </View>
        </>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
    textAlign: "center",
  },
  headerRight: {
    width: 40,
  },
  itemCount: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
  },
  listContent: {
    padding: 16,
    paddingBottom: 240,
  },
  summaryContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
