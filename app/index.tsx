import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

type MenuOption = {
  title: string;
  route: Href;
  icon: string | number;
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
    icon: "🥃",
  },
  {
    title: "Copos",
    route: "/glasses",
    icon: "🥂",
  },
];

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-red-800 p-6">
      <Text className="text-4xl font-bold text-center mb-8 text-stone-100">
        Make My Drink
      </Text>

      <View className="flex-row flex-wrap justify-between">
        {menuOptions.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(option.route)}
            className="w-[48%] h-60 rounded-xl mb-4 overflow-hidden"
          >
            <LinearGradient
              colors={["#f1f5f9", "#e0f2fe"]}
              end={{ x: 1, y: 0 }}
              className="flex-1 items-center justify-center"
            >
              {typeof option.icon === "string" ? (
                <Text className="text-6xl mb-2">{option.icon}</Text>
              ) : (
                <Image
                  source={option.icon}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
              )}
              <Text className="text-red-800 text-2xl font-semibold">
                {option.title}
              </Text>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
