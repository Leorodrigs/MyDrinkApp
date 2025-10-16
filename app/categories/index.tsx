import { GRADIENTS } from "@/constants/theme";
import { drinksService } from "@/services/drinksService";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Category = {
  strCategory: string; // Nome da categoria (já em português)
};

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    try {
      // Pega todas as categorias únicas do JSON local
      const uniqueCategories = drinksService.getCategories();

      // Mapeia para o formato esperado
      const categoriesArray = uniqueCategories.map((category) => ({
        strCategory: category,
      }));

      setCategories(categoriesArray);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
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
            Carregando categorias...
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
      <LinearGradient {...GRADIENTS.primary} style={{ flex: 1 }}>
        {/* Header */}
        <View className="pb-4">
          <Text className="text-4xl font-bold text-center py-4 text-slate-100">
            Categorias ({categories.length})
          </Text>
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
              data={categories}
              keyExtractor={(item) => item.strCategory}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/categories/[name]" as any,
                      params: { name: item.strCategory },
                    })
                  }
                  className="bg-slate-50 border border-slate-200 mx-4 mt-4 rounded-xl p-6 active:opacity-70"
                >
                  <Text className="text-xl font-semibold text-gray-800">
                    {item.strCategory}
                  </Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <View className="items-center justify-center p-8">
                  <Text className="text-gray-500 text-lg">
                    Nenhuma categoria encontrada
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
