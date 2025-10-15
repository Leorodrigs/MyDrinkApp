import { cocktailApi } from "@/services/cocktailApi";
import { Drink } from "@/types/cocktail";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function DrinksScreen() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDrinks();
  }, []);

  const loadDrinks = async () => {
    try {
      const data = await cocktailApi.searchDrinks("margarita");
      setDrinks(data.drinks || []);
    } catch (error) {
      console.error("Erro ao carregar drinks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={drinks}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View className="bg-white m-4 rounded-lg p-4 flex-row">
            <Image
              source={{ uri: item.strDrinkThumb }}
              className="w-20 h-20 rounded-lg"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-gray-800">
                {item.strDrink}
              </Text>
              <Text className="text-gray-600">{item.strCategory}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
