import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

interface CategoryTagProps {
  category: string;
  onPress?: () => void;
  isDisabled: boolean;
}

const CategoryTag: React.FC<CategoryTagProps> = ({
  category,
  isDisabled,
  onPress,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    if (!isDisabled) {
      setIsSelected(!isSelected);
      if (onPress) onPress();
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
