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

type Ingredient = {
  name: string; // Nome do ingrediente (já em português)
};

export default function IngredientsScreen() {
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadIngredients();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredIngredients(allIngredients);
    } else {
      const filtered = allIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredIngredients(filtered);
    }
  }, [searchQuery, allIngredients]);

  const loadIngredients = () => {
    try {
      // Usa o método do serviço que já retorna ingredientes únicos
      const uniqueIngredients = drinksService.getIngredients();

      // Mapeia para o formato esperado
      const ingredientsArray = uniqueIngredients.map((ingredient) => ({
        name: ingredient,
      }));

      setAllIngredients(ingredientsArray);
      setFilteredIngredients(ingredientsArray);
    } catch (error) {
      console.error("Erro ao carregar ingredientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIngredientImageUrl = (ingredientName: string) => {
    // Como os ingredientes estão em português, podemos usar direto
    // A API pode não ter todas as imagens, mas vale tentar
    return `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
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
            Carregando ingredientes...
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
            Ingredientes ({filteredIngredients.length})
          </Text>

          <View className="mx-4">
            <TextInput
              className="bg-slate-100 rounded-lg px-4 py-3 text-base"
              placeholder="Buscar ingrediente..."
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
              data={filteredIngredients}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/ingredients/[name]" as any,
                      params: { name: item.name },
                    })
                  }
                  className="bg-slate-50 border border-slate-200 mx-4 mt-4 rounded-xl p-4 flex-row items-center active:opacity-70"
                >
                  <Image
                    source={{ uri: getIngredientImageUrl(item.name) }}
                    className="w-16 h-16 rounded-lg bg-white"
                    resizeMode="contain"
                  />
                  <View className="ml-4 flex-1">
                    <Text className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </Text>
                  </View>
                </Pressable>
              )}
              ListEmptyComponent={
                <View className="items-center justify-center p-8">
                  <Text className="text-gray-500 text-lg">
                    Nenhum ingrediente encontrado
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
