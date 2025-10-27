import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type Props = {
  message?: string;
  size?: "small" | "large";
  fullScreen?: boolean;
};

export function Loader({ message, size = "large", fullScreen = true }: Props) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color="#065F46" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },
});
