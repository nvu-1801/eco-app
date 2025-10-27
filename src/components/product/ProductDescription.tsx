import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  description: string;
  maxLines?: number;
};

export function ProductDescription({ description, maxLines = 5 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const shouldShowToggle = description.length > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description</Text>
      <Text
        style={styles.description}
        numberOfLines={expanded ? undefined : maxLines}
      >
        {description}
      </Text>
      {shouldShowToggle && (
        <Pressable onPress={() => setExpanded(!expanded)}>
          <Text style={styles.toggleText}>
            {expanded ? "Show Less" : "Read More"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 24,
  },
  toggleText: {
    fontSize: 14,
    color: "#065F46",
    fontWeight: "600",
    marginTop: 8,
  },
});
