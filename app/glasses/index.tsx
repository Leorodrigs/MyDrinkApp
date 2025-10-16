import { GRADIENTS } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router"; // ← Adicione isso
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Glass = {
  strGlass: string;
};

export default function GlassesScreen() {
  const [allGlasses, setAllGlasses] = useState<Glass[]>([]);
  const [filteredGlasses, setFilteredGlasses] = useState<Glass[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadGlasses();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredGlasses(allGlasses);
    } else {
      const filtered = allGlasses.filter((glass) =>
        glass.strGlass.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGlasses(filtered);
    }
  }, [searchQuery, allGlasses]);

  const loadGlasses = async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list"
      );
      const data = await response.json();
      setAllGlasses(data.drinks || []);
      setFilteredGlasses(data.drinks || []);
    } catch (error) {
      console.error("Erro ao carregar copos:", error);
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
        {/* Header com busca */}
        <View className="pb-4">
          <Text className="text-4xl font-bold text-center py-4 text-slate-100">
            Copos ({filteredGlasses.length})
          </Text>

          <View className="mx-4">
            <TextInput
              className="bg-slate-100 rounded-lg px-4 py-3 text-base"
              placeholder="Buscar copo..."
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
              data={filteredGlasses}
              keyExtractor={(item) => item.strGlass}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/glasses/[name]",
                      params: { name: item.strGlass },
                    })
                  }
                  className="bg-slate-50 border border-slate-200 mx-4 mt-4 rounded-xl p-6 active:opacity-70"
                >
                  <Text className="text-xl font-semibold text-gray-800">
                    {item.strGlass}
                  </Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <View className="items-center justify-center p-8">
                  <Text className="text-gray-500 text-lg">
                    Nenhum copo encontrado
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
