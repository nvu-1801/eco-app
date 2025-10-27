import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating";

type Props = {
  resultCount: number;
  sortBy: SortOption;
  onSortChange: () => void;
};

const SORT_LABELS: Record<SortOption, string> = {
  default: "Default",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
};

export function SortFilterBar({ resultCount, sortBy, onSortChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {resultCount} {resultCount === 1 ? "Product" : "Products"}
      </Text>

      <Pressable style={styles.sortButton} onPress={onSortChange}>
        <Ionicons name="swap-vertical" size={16} color="#065F46" />
        <Text style={styles.sortText}>{SORT_LABELS[sortBy]}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  resultText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sortText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#065F46",
  },
});
