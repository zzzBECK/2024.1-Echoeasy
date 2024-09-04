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
      className={`w-full mt-1 mb-1 flex flex-row h-40 items-center justify-between rounded-xl pr-1 ${
        isDisabled ? "bg-[#99dcd0]" : "bg-[#3CC1A9]"}
      }`}
    >
      <View className="flex flex-row items-center flex-1 space-x-3">
        {image && (
          <View className="h-full w-[85px]">
          <Image
            className="w-full h-full rounded-md rounded-r-none"
            source={{ uri: image }}
            resizeMode="cover"
          />
          </View>
        )}
        <View className={`flex-1  pr-1 ${image ? "pl-0 py-0" : "pl-2"}`}>
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
