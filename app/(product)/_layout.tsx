// app/(product)/_layout.tsx
import { Stack } from "expo-router";

export default function ProductStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* ví dụ: app/(product)/index.tsx là list */}
      <Stack.Screen name="index" />
      {/* ví dụ: app/(product)/[id].tsx là detail */}
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
