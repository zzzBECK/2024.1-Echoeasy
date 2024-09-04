import Ionicons from "@expo/vector-icons/Ionicons";
import { useDebounce } from "@uidotdev/usehooks";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
  categoriesTitles: string[];
};

type Category = {
  _id: string;
  title: string;
};

const Documents: React.FC = () => {
  const [docs, setDocs] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [searchByCategories, setSearchByCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const debouncedSearchTitle = useDebounce(searchByTitle, 50);
  const [localSelectedCategories, setLocalSelectedCategories] =
    useState<Category[]>(searchByCategories);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDocuments();
    await fetchCategories();
    setRefreshing(false);
  };

  const fetchDocuments = async () => {
    try {
      const docService = new DocService();
      const response = await docService.getAllDocuments(
        debouncedSearchTitle,
        searchByCategories.map((cat) => cat._id) // IDs das categorias
      );
      const docsWithCategories = await Promise.all(
        response.data.map(async (doc: Item) => {
          const categoriesTitles = await Promise.all(
            doc.categorias.map((categoryId) =>
              findCategoryTitleById(categoryId)
            )
          );
          return { ...doc, categoriesTitles };
        })
      );
      setDocs(docsWithCategories);
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

  const findCategoryTitleById = async (id: string) => {
    try {
      const categoryService = new CategoryService();
      const category = await categoryService.findCategoryById(id);
      return category.data.title;
    } catch (error: any) {
      console.error("Error fetching title category:", error.message || error);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, [refreshing, debouncedSearchTitle, searchByCategories]);

  useEffect(() => {
    if (modalVisible) {
      setLocalSelectedCategories(searchByCategories);
    }
  }, [modalVisible, searchByCategories]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setLocalSelectedCategories((prevSelected) =>
      prevSelected.some((cat) => cat._id === categoryId)
        ? prevSelected.filter((cat) => cat._id !== categoryId)
        : [...prevSelected, categories.find((cat) => cat._id === categoryId)!]
    );
  };

  const handleConfirm = () => {
    setSearchByCategories(localSelectedCategories);
    toggleModal();
  };

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

        {localSelectedCategories.length > 0 && (
        <View className="self-start">
          <Text className="font-interLight text-xs ml-2 mb-1">Filtrado por:</Text>
          <View className="flex-row self-start">
            {searchByCategories.map((category) => (
              <CategoryTag
                key={category._id}
                isDisabled={true}
                category={category.title}
                isSelected={true}
                onPress={() => handleCategoryToggle(category._id)}
              />
            ))}
          </View>
        </View>
        )}

        <View className="p-1">
          <FlatList
            data={docs}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ItemCard
                title={item.title}
                description={item.description}
                image={item.image}
                categories={item.categoriesTitles}
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
            <View className="bg-white p-4 py-3 rounded-lg w-4/5">
              <View className="flex-row justify-between items-center">
                <Text className="font-interMedium text-lg">Categorias</Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Ionicons name="close-outline" size={25} />
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap justify-center p-2 pt-3">
                {categories.map((category) => (
                  <CategoryTag
                    key={category._id}
                    isDisabled={false}
                    category={category.title}
                    isSelected={localSelectedCategories.some(
                      (cat) => cat._id === category._id
                    )}
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
