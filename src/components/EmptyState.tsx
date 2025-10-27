import { StyleSheet, Text, View } from "react-native";

type Props = {
  text: string;
};

export function EmptyState({ text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
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
    textAlign: "center",
  },
});
