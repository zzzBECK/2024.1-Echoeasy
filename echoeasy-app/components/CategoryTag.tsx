import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CategoryTagProps {
  category: string;
  onPress?: () => void;
  isDisabled: boolean;
  isSelected?: boolean;
}

const CategoryTag: React.FC<CategoryTagProps> = ({
  category,
  isDisabled,
  onPress,
  isSelected,
}) => {
  const handlePress = () => {
    if (!isDisabled && onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={handlePress}
      className={`rounded-full px-3 py-1 mr-2 mb-2 ${
        isDisabled ? "bg-[#2A9D8F]" : isSelected ? "bg-[#2A9D8F]" : "bg-gray-300"
      }`}
    >
      <Text
        className={`text-xs ${
          isDisabled
            ? "text-white"
            : isSelected
            ? "text-white"
            : "text-gray-800"
        }`}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryTag;
