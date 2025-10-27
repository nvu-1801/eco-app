import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

type Spotlight = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  color: string;
};

type Props = {
  spotlights: Spotlight[];
  onSpotlightPress?: (id: number) => void;
};

export function SpotlightBanner({ spotlights, onSpotlightPress }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {spotlights.map((spotlight) => (
          <Pressable
            key={spotlight.id}
            style={styles.card}
            onPress={() => onSpotlightPress?.(spotlight.id)}
          >
            <LinearGradient
              colors={[spotlight.color, spotlight.color + "DD"]}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.textContent}>
                  <Text style={styles.title}>{spotlight.title}</Text>
                  <Text style={styles.subtitle}>{spotlight.subtitle}</Text>
                  <View style={styles.shopButton}>
                    <Text style={styles.shopButtonText}>Shop Now</Text>
                    <Ionicons name="arrow-forward" size={16} color="#065F46" />
                  </View>
                </View>
                <Image source={{ uri: spotlight.image }} style={styles.image} />
              </View>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  cardGradient: {
    flex: 1,
    padding: 20,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 16,
    fontWeight: "600",
  },
  shopButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  shopButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#065F46",
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginLeft: 12,
  },
});
