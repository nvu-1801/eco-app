// src/app/_layout.tsx
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { useAppInitialization } from "../src/hooks/useAppInitialization";
import { store } from "../src/store";

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isReady } = useAppInitialization();

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(product)" />
      <Stack.Screen name="cart" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
