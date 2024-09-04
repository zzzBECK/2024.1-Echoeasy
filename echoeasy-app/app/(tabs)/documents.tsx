import Ionicons from "@expo/vector-icons/Ionicons";
import { useDebounce } from "@uidotdev/usehooks";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryTag from "../../components/CategoryTag";
import CustomButton from "../../components/CustomButton";
import ItemCard from "../../components/ItemCard";
import SearchInput from "../../components/SearchInput";
import { CategoryService } from "../../src/service/CategoryService";
import { DocService } from "../../src/service/DocService";

type Item = {
  _id: string;
  title: string;
  description: string;
  image: string;
  categorias: string[];
  categoriesTitles: string[]
};

type Category = {
  _id: string;
  title: string;
};

const Documents: React.FC = () => {
  const [docs, setDocs] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByCategories, setSearchByCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedSearchTitle = useDebounce(searchByTitle, 50);
  const [localSelectedCategories, setLocalSelectedCategories] =
    useState<string[]>(searchByCategories);

  const docService = useMemo(() => new DocService(), []);
  const categoryService = useMemo(() => new CategoryService(), []);

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await docService.getAllDocuments(
        debouncedSearchTitle,
        searchByCategories
      );
      const docsWithCategories = await Promise.all(
        response.data.map(async (doc: Item) => {
          const categoriesTitles = await Promise.all(
            doc.categorias.map(findCategoryTitleById)
          );
          return { ...doc, categoriesTitles };
        })
      );
      setDocs(docsWithCategories);
    } catch (error: any) {
      console.error("Error fetching documents:", error.message || error);
    }
  }, [debouncedSearchTitle, searchByCategories, docService]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response.data);
    } catch (error: any) {
      console.error("Error fetching categories:", error.message || error);
    }
  }, [categoryService]);

  const findCategoryTitleById = useCallback(
    async (id: string) => {
      try {
        const category = await categoryService.findCategoryById(id);
        return category.data.title;
      } catch (error: any) {
        console.error("Error fetching title category:", error.message || error);
      }
    },
    [categoryService]
  );

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, [fetchDocuments, fetchCategories]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchDocuments();
    await fetchCategories();
    setRefreshing(false);
  }, [fetchDocuments, fetchCategories]);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const handleCategoryToggle = useCallback((categoryId: string) => {
    setLocalSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  }, []);

  const handleConfirm = useCallback(() => {
    setSearchByCategories(localSelectedCategories);
    toggleModal();
  }, [localSelectedCategories, toggleModal]);

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full p-6 py-10">
      <Text className="font-interMedium text-2xl">Documentos</Text>
      <View className="w-full h-full flex items-center">
        <View className="flex-row items-center">
          <SearchInput
            placeholder="Pesquise por um documento"
            icon="search-outline"
            onChangeText={setSearchByTitle}
          />
          <TouchableOpacity
            className="bg-[#FFFFFF] rounded-3xl h-12 w-12 ml-1 border border-[#E3E3E3] justify-center items-center"
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
                categories={item.categoriesTitles} // categorias agora são títulos já resolvidos
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

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={toggleModal}
        >
          <View className="flex-1 justify-center items-center bg-[#000]/60">
            <View className="bg-white p-3 rounded-lg w-4/5">
              <Text className="font-interMedium text-lg">Categorias</Text>
              <View className="flex-row flex-wrap">
                {categories.map((category) => (
                  <CategoryTag
                    key={category._id}
                    isDisabled={false}
                    category={category.title}
                    isSelected={localSelectedCategories.includes(category._id)}
                    onPress={() => handleCategoryToggle(category._id)}
                  />
                ))}
              </View>
              <CustomButton
                title="Confirmar"
                handlePress={handleConfirm}
                isDisabled={false}
                isLoading={false}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Documents;
