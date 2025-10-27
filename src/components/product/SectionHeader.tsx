import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
};

export function SectionHeader({ title }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#E5E7EB",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
