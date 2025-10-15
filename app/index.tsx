import { GRADIENTS } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuOption = {
  title: string;
  route: Href;
  icon: number;
};

const menuOptions: MenuOption[] = [
  {
    title: "Drinks",
    route: "/drinks",
    icon: require("@/assets/drinkIcon.png"),
  },
  {
    title: "Categorias",
    route: "/categories",
    icon: require("@/assets/categoryIcon.png"),
  },
  {
    title: "Ingredientes",
    route: "/ingredients",
    icon: require("@/assets/ingredientIcon.png"),
  },
  {
    title: "Copos",
    route: "/glasses",
    icon: require("@/assets/glassIcon.png"),
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <LinearGradient {...GRADIENTS.primary} style={{ flex: 1, padding: 24 }}>
        <Text className="text-4xl font-bold text-center py-4 text-slate-100">
          Make My Drink
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {menuOptions.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => router.push(option.route)}
              className="w-[48%] border border-slate-200 h-80 rounded-xl mb-8 overflow-hidden"
            >
              <LinearGradient
                {...GRADIENTS.card}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={option.icon}
                  className="w-40 h-40 mb-4"
                  resizeMode="contain"
                />
                <Text className="text-red-800 text-2xl font-semibold">
                  {option.title}
                </Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
