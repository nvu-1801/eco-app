import { Ionicons } from "@expo/vector-icons";
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
        <Pressable onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.chip,
              selectedCategory === category.id && styles.chipActive,
            ]}
            onPress={() => onCategorySelect(category.id)}
          >
            <Ionicons
              name={category.icon}
              size={20}
              color={selectedCategory === category.id ? "#FFFFFF" : "#6B7280"}
            />
            <Text
              style={[
                styles.chipText,
                selectedCategory === category.id && styles.chipTextActive,
              ]}
            >
              {category.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  seeAll: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    gap: 6,
  },
  chipActive: {
    backgroundColor: "#065F46",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
});
