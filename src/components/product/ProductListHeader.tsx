import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "../common/SearchBar";

type Props = {
  searchQuery: string;
  onSearchChange: (text: string) => void;
  cartItemCount: number;
  onCartPress: () => void;
};

export function ProductListHeader({
  searchQuery,
  onSearchChange,
  cartItemCount,
  onCartPress,
}: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#065F46", "#059669"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello! 👋</Text>
            <Text style={styles.title}>Let's go shopping</Text>
          </View>

          <Pressable style={styles.cartButton} onPress={onCartPress}>
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
              {cartItemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Search products, brands..."
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#065F46",
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  gradient: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  cartButton: {
    padding: 8,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#DC2626",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: "#065F46",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  searchContainer: {
    marginTop: 4,
  },
});
