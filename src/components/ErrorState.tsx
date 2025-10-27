import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  onRetry: () => void;
};

export function ErrorState({ onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Try Again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
});
