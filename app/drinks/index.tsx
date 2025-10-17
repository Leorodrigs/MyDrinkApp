import { GRADIENTS } from "@/constants/theme";
import { drinksService } from "@/services/drinksService";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Drink = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
};

export default function DrinksScreen() {
  const [allDrinks, setAllDrinks] = useState<Drink[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAllDrinks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDrinks(allDrinks);
    } else {
      const filtered = allDrinks.filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDrinks(filtered);
    }
  }, [searchQuery, allDrinks]);

  const loadAllDrinks = () => {
    try {
      const drinks = drinksService.getAllDrinks();

      const mappedDrinks = drinks.map((drink) => ({
        idDrink: drink.idDrink,
        strDrink: drink.strDrink,
        strDrinkThumb: drink.strDrinkThumb,
        strCategory: drink.strCategory,
      }));

      setAllDrinks(mappedDrinks);
      setFilteredDrinks(mappedDrinks);
    } catch (error) {
      console.error("Erro ao carregar drinks:", error);
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
            Enchendo os copos...
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <LinearGradient {...GRADIENTS.primary} style={{ flex: 1 }}>
        <View className="pb-4">
          <Text className="text-4xl font-bold text-center py-4 text-slate-100">
            Drinks ({filteredDrinks.length})
          </Text>

          <View className="mx-4">
            <TextInput
              className="bg-slate-100 rounded-lg px-4 py-3 text-base"
              placeholder="Buscar drink..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
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
              data={filteredDrinks}
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
                  <View className="ml-4 flex-1">
                    <Text className="text-lg font-bold text-gray-800">
                      {item.strDrink}
                    </Text>
                    <Text className="text-gray-600">{item.strCategory}</Text>
                  </View>
                </Pressable>
              )}
              ListEmptyComponent={
                <View className="items-center justify-center p-8">
                  <Text className="text-gray-500 text-lg">
                    Nenhum drink encontrado
                  </Text>
                </View>
              }
            />
          </LinearGradient>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
