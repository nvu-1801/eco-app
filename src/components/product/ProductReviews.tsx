import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import type { Review } from "../../types/product";

type Props = {
  reviews: Review[];
  averageRating: number;
};

export function ProductReviews({ reviews, averageRating }: Props) {
  const renderStars = (rating: number) => {
    return (
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={14}
            color="#FBBF24"
          />
        ))}
      </View>
    );
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{item.reviewerName}</Text>
          <Text style={styles.reviewDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        {renderStars(item.rating)}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Reviews</Text>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={16} color="#FBBF24" />
          <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
        </View>
      </View>

      {reviews.length > 0 ? (
        <FlatList
          data={reviews.slice(0, 3)}
          renderItem={renderReview}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noReviews}>No reviews yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  reviewCard: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: "#6B7280",
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  noReviews: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    paddingVertical: 20,
  },
});
