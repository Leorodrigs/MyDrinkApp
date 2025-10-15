import { GRADIENTS } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
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
  strCategory: string;
};

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
      );
      const data = await response.json();
      setCategories(data.drinks || []);
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
            Enchendo os copos...
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
            Categorias
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
                <Pressable className="bg-slate-50 border border-slate-200 mx-4 mt-4 rounded-xl p-6">
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
