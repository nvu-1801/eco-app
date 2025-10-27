import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.5;

type Props = {
  images: string[];
  thumbnail: string;
  discountPercentage?: number;
};

export function ProductImageGallery({
  images,
  thumbnail,
  discountPercentage,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images.length > 0 ? images : [thumbnail];

  return (
    <View style={styles.container}>
      {/* Main Image Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {displayImages.map((img, idx) => (
          <View key={idx} style={styles.imageContainer}>
            <Image
              source={{ uri: img }}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Gradient Overlay */}
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
              style={styles.gradient}
            />
          </View>
        ))}
      </ScrollView>

      {/* Discount Badge */}
      {discountPercentage && discountPercentage > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {Math.round(discountPercentage)}% OFF
          </Text>
        </View>
      )}

      {/* Pagination Indicator */}
      {displayImages.length > 1 && (
        <View style={styles.pagination}>
          {displayImages.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, activeIndex === idx && styles.dotActive]}
            />
          ))}
        </View>
      )}

      {/* Image Counter */}
      <View style={styles.counter}>
        <Text style={styles.counterText}>
          {activeIndex + 1} / {displayImages.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: IMAGE_HEIGHT,
    backgroundColor: "#000000",
    position: "relative",
  },
  imageContainer: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: width,
    height: IMAGE_HEIGHT,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  discountBadge: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "#DC2626",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  pagination: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  dotActive: {
    backgroundColor: "#FFFFFF",
    width: 28,
  },
  counter: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
});
