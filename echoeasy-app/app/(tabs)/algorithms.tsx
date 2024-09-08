import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "../../components/ItemCard";
import SearchInput from "../../components/SearchInput";
import { AlgorithmService } from "../../src/service/AlgorithmService";

type Item = {
  _id: string;
  title: string;
  description: string;
};

const Algorithms: React.FC = () => {
  const [algorithms, setAlgorithms] = useState<Item[]>([]);

  const fetchAlgorithms = async () => {
    try {
      const algorithmService = new AlgorithmService();
      const response = await algorithmService.getAllAlgorithms();
      setAlgorithms(response.data as Item[]);
    } catch (error: any) {
      console.error("Error fetching algorithms:", error.message || error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    fetchAlgorithms();
    setRefreshing(false);
  };

  const filteredData = algorithms.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchAlgorithms();
  }, []);

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full p-6 py-10">
      <Text className="font-interMedium text-2xl">Algoritmos</Text>
      <View className="w-full h-full flex items-center">
        <View className="flex-row">
          <SearchInput
            placeholder="Pesquise por um algoritmo"
            icon="search-outline"
            onChangeText={setSearchQuery}
          />
        </View>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ItemCard
              title={item.title}
              description={item.description}
              handlePress={() => router.push(`(algorithms)/${item._id}`)}
            />
          )}
          ListEmptyComponent={() => (
            <View className="flex justify-center items-center px-4">
              <Text className="p-6 font-interLight text-base">
                Ainda não há algoritmos.
              </Text>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Algorithms;
