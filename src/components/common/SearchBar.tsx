import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  onFocus,
  onBlur,
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color="#9CA3AF"
        style={styles.searchIcon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={styles.input}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color="#9CA3AF" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
});
