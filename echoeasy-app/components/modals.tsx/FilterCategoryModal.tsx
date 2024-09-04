import React from "react";
import { Modal, Text, View } from "react-native";
import CategoryTag from "../CategoryTag";
import CustomButton from "../CustomButton";

interface FilterCategoryModalProps {
  isModalVisible: boolean;
  categories: { _id: string; title: string }[];
  onClose: () => void;
}

const FilterCategoryModal: React.FC<FilterCategoryModalProps> = ({ isModalVisible, categories, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[#000]/60">
        <View className="bg-white p-3 rounded-lg w-4/5">
          <Text className="font-interMedium text-lg">Categorias</Text>
          <View className="flex-row flex-wrap">
            {categories.map((category) => (
              <CategoryTag
                isDisabled={false}
                key={category._id}
                category={category.title}
              />
            ))}
          </View>
          <CustomButton
            title="Confirmar"
            handlePress={onClose}
            isDisabled={false}
            isLoading={false}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterCategoryModal;
