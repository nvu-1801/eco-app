import { StyleSheet, Text, View } from "react-native";

type Props = {
  currentPrice: number;
  discountPercentage?: number;
};

export function ProductPriceSection({
  currentPrice,
  discountPercentage,
}: Props) {
  const originalPrice =
    discountPercentage && discountPercentage > 0
      ? currentPrice / (1 - discountPercentage / 100)
      : null;

  const savings = originalPrice ? originalPrice - currentPrice : 0;

  return (
    <View style={styles.container}>
      <View style={styles.priceRow}>
        <Text style={styles.currentPrice}>${currentPrice.toFixed(2)}</Text>
        {originalPrice && (
          <Text style={styles.originalPrice}>${originalPrice.toFixed(2)}</Text>
        )}
      </View>

      {savings > 0 && (
        <Text style={styles.savings}>You save ${savings.toFixed(2)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
