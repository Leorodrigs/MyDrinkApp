import { GRADIENTS } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
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
  strIngredient1: string;
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
        ingredient.strIngredient1
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredIngredients(filtered);
    }
  }, [searchQuery, allIngredients]);

  const loadIngredients = async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"
      );
      const data = await response.json();
      setAllIngredients(data.drinks || []);
      setFilteredIngredients(data.drinks || []);
    } catch (error) {
      console.error("Erro ao carregar ingredientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para gerar URL da imagem do ingrediente
  const getIngredientImageUrl = (ingredientName: string) => {
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
        {/* Header com busca */}
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

        {/* Container com margem */}
        <View className="flex-1 px-4">
          {/* Lista com gradiente suave */}
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
              keyExtractor={(item, index) => `${item.strIngredient1}-${index}`}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <Pressable className="bg-slate-50 border border-slate-200 mx-4 mt-4 rounded-xl p-4 flex-row items-center">
                  <Image
                    source={{ uri: getIngredientImageUrl(item.strIngredient1) }}
                    className="w-16 h-16 rounded-lg bg-white"
                    resizeMode="contain"
                  />
                  <View className="ml-4 flex-1">
                    <Text className="text-xl font-semibold text-gray-800">
                      {item.strIngredient1}
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
