import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type Props = {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  onSeeAllPress?: () => void;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
  onSeeAllPress,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Pressable onPress={onSeeAllPress} style={styles.seeAllButton}>
          <Text style={styles.seeAll}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color="#065F46" />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => onCategorySelect(category.id)}
            >
              {isSelected ? (
                <LinearGradient
                  colors={["#065F46", "#059669"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.chip}
                >
                  <Ionicons name={category.icon} size={20} color="#FFFFFF" />
                  <Text style={styles.chipTextActive}>{category.name}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.chipInactive}>
                  <Ionicons name={category.icon} size={20} color="#6B7280" />
                  <Text style={styles.chipText}>{category.name}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAll: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
    elevation: 4,
    shadowColor: "#065F46",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  chipInactive: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  chipTextActive: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
