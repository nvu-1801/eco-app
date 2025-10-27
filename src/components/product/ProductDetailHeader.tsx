import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title?: string;
  onBackPress: () => void;
  onSharePress?: () => void;
  onFavoritePress?: () => void;
  isFavorite?: boolean;
  transparent?: boolean;
};

export function ProductDetailHeader({
  title = "Product Details",
  onBackPress,
  onSharePress,
  onFavoritePress,
  isFavorite = false,
  transparent = true,
}: Props) {
  return (
    <View style={[styles.container, transparent && styles.transparent]}>
      {!transparent && Platform.OS === "ios" ? (
        <BlurView intensity={80} style={styles.blur}>
          <HeaderContent
            title={title}
            onBackPress={onBackPress}
            onSharePress={onSharePress}
            onFavoritePress={onFavoritePress}
            isFavorite={isFavorite}
            transparent={transparent}
          />
        </BlurView>
      ) : (
        <HeaderContent
          title={title}
          onBackPress={onBackPress}
          onSharePress={onSharePress}
          onFavoritePress={onFavoritePress}
          isFavorite={isFavorite}
          transparent={transparent}
        />
      )}
    </View>
  );
}

function HeaderContent({
  title,
  onBackPress,
  onSharePress,
  onFavoritePress,
  isFavorite,
  transparent,
}: Props) {
  return (
    <View style={styles.content}>
      <Pressable
        style={[styles.iconButton, transparent && styles.iconButtonTransparent]}
        onPress={onBackPress}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={transparent ? "#FFFFFF" : "#111827"}
        />
      </Pressable>

      {!transparent && (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      )}

      <View style={styles.rightButtons}>
        {onFavoritePress && (
          <Pressable
            style={[
              styles.iconButton,
              transparent && styles.iconButtonTransparent,
            ]}
            onPress={onFavoritePress}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={
                isFavorite ? "#DC2626" : transparent ? "#FFFFFF" : "#111827"
              }
            />
          </Pressable>
        )}
        {onSharePress && (
          <Pressable
            style={[
              styles.iconButton,
              transparent && styles.iconButtonTransparent,
            ]}
            onPress={onSharePress}
          >
            <Ionicons
              name="share-social-outline"
              size={22}
              color={transparent ? "#FFFFFF" : "#111827"}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  transparent: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
  },
  blur: {
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
  },
  iconButtonTransparent: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginHorizontal: 12,
  },
  rightButtons: {
    flexDirection: "row",
    gap: 8,
  },
});
