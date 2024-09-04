import Ionicons from "@expo/vector-icons/Ionicons";
import { useDebounce } from "@uidotdev/usehooks";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemCard from "../../components/ItemCard";
import SearchInput from "../../components/SearchInput";
import FilterCategoryModal from "../../components/modals.tsx/FilterCategoryModal";
import { CategoryService } from "../../src/service/CategoryService";
import { DocService } from "../../src/service/DocService";

type Item = {
  _id: string;
  title: string;
  description: string;
  image: string;
  categorias: string[];
};

type Category = {
  _id: string;
  title: string;
};

const Documents: React.FC = () => {
  const [docs, setDocs] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedSearchTitle = useDebounce(searchTitle, 50);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDocuments();
    setRefreshing(false);
  };

  const fetchDocuments = async () => {
    try {
      const docService = new DocService();
      const response = await docService.getAllDocuments(
        debouncedSearchTitle,
        searchCategories
      );
      setDocs(response.data as Item[]);
    } catch (error: any) {
      console.error("Error fetching documents:", error.message || error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryService = new CategoryService();
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error: any) {
      console.error("Error fetching categories:", error.message || error);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, [refreshing, debouncedSearchTitle, searchCategories]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full p-6 py-10">
      <Text className="font-interMedium text-2xl">Documentos</Text>
      <View className="w-full h-full flex items-center">
        <View className="flex-row items-center">
          <SearchInput
            placeholder="Pesquise por um documento"
            icon="search-outline"
            onChangeText={(text) => setSearchTitle(text)}
          />
          <TouchableOpacity
            className="bg-[#FFFFFF]  rounded-3xl h-12 w-12 ml-1 border border-[#E3E3E3] justify-center items-center"
            onPress={toggleModal}
          >
            <Ionicons name="filter-outline" size={25} color="#C4C4C4" />
          </TouchableOpacity>
        </View>
        <View className="p-1">
          <FlatList
            data={docs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ItemCard
                title={item.title}
                description={item.description}
                image={item.image}
                categories={item.categorias}
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

        <FilterCategoryModal
          isModalVisible={modalVisible}
          categories={categories} // Passa a lista de categorias
          onClose={toggleModal} // Passa a função para fechar o modal
        />
      </View>
    </SafeAreaView>
  );
};

export default Documents;
