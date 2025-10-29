import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartItem } from "../../src/components/cart/CartItem";
import { EmptyState } from "../../src/components/common/EmptyState";
import { PriceSummary } from "../../src/components/cart/PriceSummary";
import { useCart } from "../../src/hooks/useCart";

/** Design tokens (đơn giản) */
const palette = {
  bg: "#F6F7FB",
  surface: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
  border: "#E5E7EB",
  brand: "#5B5CE2",
  shadow: "#0F172A",
};

const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 16,
  xl: 20,
};

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

  const subtotal = useMemo(() => totalPrice + totalDiscount, [totalPrice, totalDiscount]);
  const isEmpty = items.length === 0;

  const handleIncrease = (id: string | number, qty: number) =>
    updateItemQuantity(Number(id), qty + 1);

  const handleDecrease = (id: string | number, qty: number) =>
    updateItemQuantity(Number(id), Math.max(1, qty - 1));

  const handleCheckout = () => {
    // TODO: Navigate to checkout
    alert("Checkout feature coming soon!");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor={palette.surface} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          android_ripple={{ color: "#E5E7EB", borderless: true }}
          style={styles.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={palette.text} />
        </Pressable>

        <Text style={styles.headerTitle} numberOfLines={1}>
          Shopping Cart
        </Text>

        <View style={styles.headerRight}>
          <Text style={styles.itemCount}>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.container}>
        {isEmpty ? (
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
              keyExtractor={(item) => String(item.id)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <CartItem
                  item={item}
                  onIncrease={() => handleIncrease(item.id, item.quantity)}
                  onDecrease={() => handleDecrease(item.id, item.quantity)}
                  onRemove={removeFromCart}
                />
              )}
              // chừa chỗ cho summary fixed ở dưới
              contentInset={{ bottom: 184 }}
              scrollIndicatorInsets={{ bottom: 184 }}
            />

            {/* Bottom Summary */}
            <View style={styles.summaryWrap} pointerEvents="box-none">
              <View style={styles.summaryCard}>
                <PriceSummary
                  subtotal={subtotal}
                  discount={totalDiscount}
                  total={totalPrice}
                  itemCount={itemCount}
                  onCheckout={handleCheckout}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.surface,
  },
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },

  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: palette.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.border,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: palette.text,
  },
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  itemCount: {
    fontSize: 12,
    fontWeight: "600",
    color: palette.subtext,
  },

  /** List */
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  separator: {
    height: 12,
  },

  /** Summary */
  summaryWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  summaryCard: {
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: palette.border,
    // bóng đổ dịu
    ...Platform.select({
      ios: {
        shadowColor: palette.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: -2 },
      },
      android: {
        elevation: 18,
      },
      default: {},
    }),
  },
});
