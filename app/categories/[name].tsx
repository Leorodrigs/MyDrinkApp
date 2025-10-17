import { GRADIENTS } from "@/constants/theme";
import { drinksService } from "@/services/drinksService";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export default function CategoryDrinksScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrinksByCategory();
  }, [name]);

  const loadDrinksByCategory = () => {
    try {
      const allDrinks = drinksService.getAllDrinks();

      const filteredDrinks = allDrinks.filter((drink) => {
        const categories = drink.strCategory
          .split(",")
          .map((cat) => cat.trim());
        return categories.includes(name || "");
      });

      const mappedDrinks = filteredDrinks.map((drink) => ({
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strDrinkThumb: drink.strDrinkThumb,
      }));

      setDrinks(mappedDrinks);
    } catch (error) {
      console.error("Erro ao carregar drinks da categoria:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <LinearGradient
          {...GRADIENTS.primary}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4 font-bold text-lg">
            Carregando drinks...
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <LinearGradient {...GRADIENTS.primary} style={{ flex: 1 }}>
          <View className="pb-4">
            <Text className="text-4xl font-bold text-center py-4 text-slate-100">
              {name}
            </Text>
            <Text className="text-center text-slate-200 text-lg">
              {drinks.length} drinks
            </Text>
          </View>

          <View className="flex-1 px-4">
            <LinearGradient
              {...GRADIENTS.card}
              style={{
                flex: 1,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                overflow: "hidden",
              }}
            >
              <FlatList
                data={drinks}
                keyExtractor={(item) => item.idDrink}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      router.push({
                        pathname: "/drinks/[id]" as any,
                        params: { id: item.idDrink },
                      })
                    }
                    className="bg-slate-50 border border-slate-200 mx-4 mt-4 rounded-xl p-4 flex-row active:opacity-70"
                  >
                    <Image
                      source={{ uri: item.strDrinkThumb }}
                      className="w-20 h-20 rounded-lg"
                    />
                    <View className="ml-4 flex-1 justify-center">
                      <Text className="text-lg font-bold text-gray-800">
                        {item.strDrink}
                      </Text>
                    </View>
                  </Pressable>
                )}
                ListEmptyComponent={
                  <View className="items-center justify-center p-8">
                    <Text className="text-gray-500 text-lg">
                      Nenhum drink encontrado nesta categoria
                    </Text>
                  </View>
                }
              />
            </LinearGradient>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}
