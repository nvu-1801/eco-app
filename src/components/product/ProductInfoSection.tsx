import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  brand?: string;
  title: string;
  rating: number;
  reviewCount?: number;
  stock: number;
};

export function ProductInfoSection({
  brand,
  title,
  rating,
  reviewCount = 50,
  stock,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Brand Badge */}
      {brand && (
        <View style={styles.brandBadge}>
          <Text style={styles.brandText}>{brand}</Text>
        </View>
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Meta Info */}
      <View style={styles.metaContainer}>
        {/* Rating */}
        <View style={styles.ratingCard}>
          <Ionicons name="star" size={20} color="#FBBF24" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({reviewCount}+)</Text>
        </View>

        {/* Stock Status */}
        <View
          style={[
            styles.stockBadge,
            stock > 10
              ? styles.stockHigh
              : stock > 0
              ? styles.stockLow
              : styles.stockOut,
          ]}
        >
          <View
            style={[
              styles.stockDot,
              stock > 10
                ? styles.dotGreen
                : stock > 0
                ? styles.dotYellow
                : styles.dotRed,
            ]}
          />
          <Text
            style={[
              styles.stockText,
              stock > 10
                ? styles.textGreen
                : stock > 0
                ? styles.textYellow
                : styles.textRed,
            ]}
          >
            {stock > 10
              ? "In Stock"
              : stock > 0
              ? `Only ${stock} left`
              : "Out of Stock"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  brandBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: 12,
  },
  brandText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 34,
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ratingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  ratingCount: {
    fontSize: 13,
    color: "#6B7280",
  },
  stockBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  stockHigh: {
    backgroundColor: "#D1FAE5",
  },
  stockLow: {
    backgroundColor: "#FEF3C7",
  },
  stockOut: {
    backgroundColor: "#FEE2E2",
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotGreen: {
    backgroundColor: "#059669",
  },
  dotYellow: {
    backgroundColor: "#F59E0B",
  },
  dotRed: {
    backgroundColor: "#DC2626",
  },
  stockText: {
    fontSize: 13,
    fontWeight: "600",
  },
  textGreen: {
    color: "#059669",
  },
  textYellow: {
    color: "#D97706",
  },
  textRed: {
    color: "#DC2626",
  },
});
