import { GRADIENTS } from "@/constants/theme";
import { DrinkSimplified, drinksService } from "@/services/drinksService";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DrinkDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [drink, setDrink] = useState<DrinkSimplified | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrinkDetails();
  }, [id]);

  const loadDrinkDetails = () => {
    try {
      // Busca o drink no JSON local pelo ID (versão simplificada)
      const foundDrink = drinksService.getDrinkByIdSimplified(id || "");
      setDrink(foundDrink || null);
    } catch (error) {
      console.error("Erro ao carregar detalhes do drink:", error);
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
            Carregando drink...
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

  return (
    <>
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
                    {drink.ingredients.map((ingredient, index) => (
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
