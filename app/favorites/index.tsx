// app/favorites.tsx
import { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, shallowEqual } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "@/hooks/useFavorites";
import { ProductCard } from "@/components/product/ProductCard";
import type { RootState } from "@/store";
import type { Product } from "@/types/product";

const COLORS = {
  primary: "#059669",      // xanh lá chủ đạo
  primaryDark: "#047857",
  primaryLight: "#10B981",
  bgSoft: "#F1F8F5",       // nền dịu xanh
  text: "#0F172A",
  subtext: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

export default function FavoritesScreen() {
  const { favorites, hydrated } = useFavorites();

  const list = useSelector(
    (state: RootState) => {
      const entities = (state as any).products?.entities ?? {};
      const favById  = (state as any).favorites?.byId ?? {};
      return favorites
        .map((id) => (entities[id] as Product | undefined) ?? (favById[id] as Product | undefined))
        .filter(Boolean) as Product[];
    },
    shallowEqual
  );

  const onRefresh = useCallback(() => {
    // Nếu cần: refetch products ở đây (RTK Query) hoặc làm rỗng để UI “flash” nhẹ
    // dispatch(productsApi.util.invalidateTags([...]));
  }, []);

  if (!hydrated) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bgSoft} />
        <Text style={styles.title}>❤️ Danh sách yêu thích</Text>
        <Text style={styles.subtitle}>Đang tải danh sách...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Header gradient */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerTitleWrap}>
            <Ionicons name="heart" size={18} color={COLORS.white} />
            <Text style={styles.headerTitle}>Favorites</Text>
          </View>

          <View style={styles.countPill}>
            <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
            <Text style={styles.countText}>{list.length}</Text>
          </View>
        </View>

        <Text style={styles.headerSub}>Sản phẩm bạn đã yêu thích</Text>
      </LinearGradient>

      {/* Empty state */}
      {list.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="heart-outline" size={26} color={COLORS.primary} />
          </View>
          <Text style={styles.emptyTitle}>Chưa có sản phẩm yêu thích</Text>
          <Text style={styles.emptySubtitle}>
            Hãy nhấn vào biểu tượng ❤️ trên sản phẩm để lưu lại và xem tại đây.
          </Text>
        </View>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          }
          renderItem={({ item }) => (
            <View style={styles.cardWrap}>
              <ProductCard product={item} />
            </View>
          )}
          ListFooterComponent={<View style={{ height: 24 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgSoft,
  },

  /* Header */
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  countPill: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
  headerSub: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
    fontSize: 12.5,
  },

  /* Empty */
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  emptyIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E7F6EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    textAlign: "center",
    color: COLORS.subtext,
    fontSize: 14,
    lineHeight: 20,
  },

  /* List */
  listContent: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  column: {
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  cardWrap: {
    flex: 1,
    maxWidth: "50%",
    padding: 6,
  },

  /* Legacy titles (khi chưa hydrate) */
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.subtext,
    textAlign: "center",
  },
});
