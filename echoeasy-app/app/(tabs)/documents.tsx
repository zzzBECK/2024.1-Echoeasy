import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "../../components/ItemCard";
import SearchInput from "../../components/SearchInput";
import { DocumentService } from "../../src/service/DocumentService";

type Item = {
  _id: string;
  title: string;
  description: string;
  image: string;
};

const Documents: React.FC = () => {
  const [docs, setDocs] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDocuments();
    setRefreshing(false);
  };

  const fetchDocuments = async () => {
    try {
      const documentService = new DocumentService();
      const response = await documentService.getAllDocuments();
      setDocs(response.data as Item[]);
    } catch (error: any) {
      console.error("Error fetching documents:", error.message || error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshing]);

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full p-6 py-10">
      <Text className="font-interMedium text-2xl">Documentos</Text>
      <View className="w-full h-full flex items-center">
        <SearchInput
          placeholder="Pesquise por um documento"
          icon="search-outline"
        />
        <FlatList
          data={docs}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ItemCard
              title={item.title}
              description={item.description}
              image={item.image}
              handlePress={() => router.push(`(documents)/${item._id}`)}
            />
          )}
          ListEmptyComponent={() => (
            <View className="flex justify-center items-center px-4">
              <Text className="p-6 font-interLight text-base">
                Ainda não há documentos.
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

export default Documents;
