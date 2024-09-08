import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Algorithm: React.FC = () => {
  const { algorithmId } = useLocalSearchParams();

  return (
    <View className="bg-[#F6F6F6] w-full h-full flex p-6">
      <Text className="font-interMedium text-2xl text-center">Algoritmo</Text>
      <Text>{algorithmId}</Text>
    </View>
  );
};

export default Algorithm;
