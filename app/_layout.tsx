import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#6366f1" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Cocktail App" }} />
        <Stack.Screen name="drinks/index" options={{ title: "Drinks" }} />
        <Stack.Screen
          name="categories/index"
          options={{ title: "Categorias" }}
        />
        <Stack.Screen
          name="ingredients/index"
          options={{ title: "Ingredientes" }}
        />
        <Stack.Screen name="glasses/index" options={{ title: "Copos" }} />
      </Stack>
    </GluestackUIProvider>
  );
}
