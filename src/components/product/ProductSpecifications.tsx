import { StyleSheet, Text, View } from "react-native";

type SpecItem = {
  label: string;
  value: string;
  highlight?: boolean;
};

type Props = {
  specifications: SpecItem[];
};

export function ProductSpecifications({ specifications }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Information</Text>
      {specifications.map((spec, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{spec.label}</Text>
          <Text
            style={[
              styles.value,
              spec.highlight === true && styles.valueHighlight,
              spec.highlight === false && styles.valueWarning,
            ]}
          >
            {spec.value}
          </Text>
        </View>
      ))}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  label: {
    fontSize: 15,
    color: "#6B7280",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  valueHighlight: {
    color: "#065F46",
  },
  valueWarning: {
    color: "#DC2626",
  },
});
