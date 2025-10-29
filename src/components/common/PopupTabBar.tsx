// src/components/PopupTabBar.tsx
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { useMemo } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// ✅ dùng default import để chắc chắn glyphMap có đủ
// import { Ionicons } from "@expo/vector-icons"; // ⛔️ bỏ dòng này

// 1) Map icon (để string thường, không cần keyof)
const ICONS: Record<string, string> = {
  index: "home-outline",
  favorites: "heart-outline",
  "(product)": "grid-outline",
  products: "grid-outline", // phòng khi bạn dùng name="products"
  cart: "cart-outline",
};

const ICONS_ACTIVE: Record<string, string> = {
  index: "home",
  favorites: "heart",
  "(product)": "grid",
  products: "grid",
  cart: "cart",
};

// 2) Helper: chuẩn hoá tên route về key ngắn gọn
function normalizeRouteName(name: string) {
  // bỏ hậu tố '/index' nếu có
  let n = name.replace(/\/index$/i, "");
  // chỉ lấy phần sau cùng (nếu có slash hoặc group)
  n = n.split("/").pop() || n;

  // bỏ group dạng '(tabs)' nếu có
  if (/^\(.*\)$/.test(n)) return n; // giữ nguyên group như "(product)"
  // các trường hợp phổ biến
  if (n.toLowerCase().includes("favorite")) return "favorites";
  if (n.toLowerCase().includes("product")) return "(product)";
  if (n.toLowerCase().includes("cart")) return "cart";
  if (n === "" || n === "index") return "index";
  return n;
}

export default function PopupTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const items = useMemo(
    () =>
      state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel ?? options.title ?? (route.name as string);

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        const rawName = route.name;
        const key = normalizeRouteName(rawName);
        const iconName = isFocused
          ? ICONS_ACTIVE[key] ?? "ellipse"
          : ICONS[key] ?? "ellipse-outline";

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.item}
            android_ripple={{ color: "rgba(0,0,0,0.06)", radius: 28 }}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={22}
                color={isFocused ? "#111827" : "#6B7280"}
              />
              {/* Indicator chấm nhỏ */}
              <View style={[styles.dot, { opacity: isFocused ? 1 : 0 }]} />
            </View>
            <View style={{ height: 2 }} />
            <View style={[styles.labelPill, { opacity: isFocused ? 1 : 0 }]}>
              {/* Bạn có thể thêm Text nếu muốn show nhãn:
                 <Text style={styles.label}>{label}</Text> */}
            </View>
          </Pressable>
        );
      }),
    [state, descriptors, navigation]
  );

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom - 6, 8),
          },
        ]}
        pointerEvents="box-none"
      >
        <BlurView
          intensity={Platform.OS === "ios" ? 40 : 20}
          tint="light"
          style={styles.blurredCard}
        >
          <View style={styles.row}>{items}</View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 12,
    alignItems: "center",
  },
  blurredCard: {
    width: "92%",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 10,
    overflow: "hidden",
    // Bóng đổ mềm
    ...Platform.select({
      ios: {
        backgroundColor: "rgba(255, 255, 255, 0.26)", // nhẹ hơn cho iOS 16–17+
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        backdropFilter: "blur(16px)", // iOS 15+ hỗ trợ (trong expo-blur cũng tương đương)
      },
      android: {
        elevation: 8,
        backgroundColor: "rgba(199, 178, 178, 0.84)", // bạn tùy chỉnh tone này
      },
      default: {
        backgroundColor: "rgba(199, 178, 178, 0.84)",
      },
    }),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 4,
  },
  item: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#111827",
    marginTop: 4,
  },
  labelPill: {
    minHeight: 0,
  },
  // label: { fontSize: 12, color: "#111827", fontWeight: "600" },
});
