import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SubItemCardProps {
  title: string;
  isDisabled?: boolean;
  handlePress?: () => void;
}

const SubItemCard: React.FC<SubItemCardProps> = ({
  title,
  isDisabled,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={handlePress}
      activeOpacity={isDisabled ? 1 : 0.7}
      className={`w-full mt-1 mb-1 px-[10px] py-3 flex flex-row items-center justify-between rounded-xl border border-[#E3E3E3] ${
        isDisabled ? "bg-[#E3E3E3]" : "bg-[#FFFFFF]"
      }`}
    >
      <View className="flex flex-row items-center flex-1 space-x-3">
        <View className="flex-1">
          <Text
            className="font-interSemiBold text-[#3CC1A9] text-base"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={25} color="#3CC1A9" />
    </TouchableOpacity>
  );
};

export default SubItemCard;
