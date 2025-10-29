import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { useAppInitialization } from "../src/hooks/useAppInitialization";
import PopupTabBar from "../src/components/common/PopupTabBar";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isReady } = useAppInitialization();

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <PopupTabBar {...props} />}
    >
      {/* 🏠 Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          href: "/",
        }}
      />

      {/* 🧡 Favorites */}
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
        }}
      />

      {/* 🛍 Products */}
      <Tabs.Screen
        name="(product)"
        options={{
          title: "Products",
        }}
      />

      {/* 🛒 Cart */}
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
