import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ItemCardProps {
  title: string;
  description?: string;
  image?: string;
  isDisabled?: boolean;
  handlePress?: () => void;
  categories?: string[];
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  description,
  image,
  isDisabled,
  handlePress,
  categories = [],
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={handlePress}
      activeOpacity={isDisabled ? 1 : 0.7}
      className={`w-full mt-1 mb-1 px-[10px] py-3 flex flex-row items-center justify-between rounded-xl ${
        isDisabled ? "bg-[#99dcd0]" : "bg-[#3CC1A9]"
      }`}
    >
      <View className="flex flex-row items-center flex-1 space-x-3">
        {image && (
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{ uri: image }}
            resizeMode="cover"
          />
        )}
        <View className="flex-1">
          <Text
            className="font-interSemiBold text-[#FFFFFF] text-base"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          {description && (
            <Text
              className="font-interMedium text-[#FFFFFF] text-sm"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          )}
          <View className="flex flex-row flex-wrap mt-1">
            {categories.map((category, index) => (
              <Text
                key={index}
                className="font-interLight text-xs text-[#FFFFFF] bg-[#2A9D8F] rounded-full px-2 py-1 mr-1 mb-1"
              >
                {category}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={25} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

export default ItemCard;
