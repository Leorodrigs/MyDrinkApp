import { GRADIENTS } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DrinkDetail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strGlass: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
};

type Ingredient = {
  name: string;
  measure: string;
};

export default function DrinkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [drink, setDrink] = useState<DrinkDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrinkDetails();
  }, [id]);

  const loadDrinkDetails = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      if (data.drinks && data.drinks.length > 0) {
        setDrink(data.drinks[0]);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes do drink:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (): Ingredient[] => {
    if (!drink) return [];

    const ingredients: Ingredient[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}` as keyof DrinkDetail];
      const measure = drink[`strMeasure${i}` as keyof DrinkDetail];

      if (ingredient) {
        ingredients.push({
          name: ingredient as string,
          measure: (measure as string) || "",
        });
      }
    }
    return ingredients;
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
            Enchendo os copos...
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (!drink) {
    return (
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <LinearGradient
          {...GRADIENTS.primary}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text className="text-white text-xl">Drink não encontrado</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const ingredients = getIngredients();

  return (
    <>
      {/* Header com título dinâmico */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <LinearGradient {...GRADIENTS.primary} style={{ flex: 1 }}>
          {/* Header fixo com nome do drink */}
          <View className="pb-4">
            <Text className="text-4xl font-bold text-center py-4 text-slate-100">
              {drink.strDrink}
            </Text>
          </View>

          {/* Conteúdo scrollável */}
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
              <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
              >
                {/* Imagem do drink */}
                <View className="items-center pt-6 pb-4">
                  <Image
                    source={{ uri: drink.strDrinkThumb }}
                    className="w-80 h-80 rounded-2xl"
                    resizeMode="cover"
                  />
                  <View className="flex-row mt-4 gap-4">
                    <View className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
                      <Text className="text-gray-700 font-semibold">
                        {drink.strCategory}
                      </Text>
                    </View>
                    <View className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
                      <Text className="text-gray-700 font-semibold">
                        {drink.strGlass}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Ingredientes */}
                <View className="px-6 mt-4">
                  <Text className="text-2xl font-bold text-gray-800 mb-4">
                    Ingredientes
                  </Text>
                  <View className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    {ingredients.map((ingredient, index) => (
                      <View
                        key={index}
                        className="flex-row justify-between py-2 border-b border-gray-200"
                      >
                        <Text className="text-base text-gray-800 flex-1">
                          {ingredient.name}
                        </Text>
                        <Text className="text-base text-gray-600 font-semibold">
                          {ingredient.measure.trim() || "-"}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Instruções */}
                <View className="px-6 mt-6">
                  <Text className="text-2xl font-bold text-gray-800 mb-4">
                    Instruções
                  </Text>
                  <View className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <Text className="text-base text-gray-700 leading-6">
                      {drink.strInstructions}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}
