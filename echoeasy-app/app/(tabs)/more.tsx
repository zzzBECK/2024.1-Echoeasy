import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../src/context/GlobalProvider";

const More: React.FC = () => {
  const { logout } = useGlobalContext();

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full p-6">
          <Text className="font-interMedium text-2xl">Conta</Text>
          <View className="ml-6 space-y-1">
              <TouchableOpacity onPress={() => router.navigate("/editProfile")}>
                <Text className="font-interMedium text-lg">Editar perfil</Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Text className="font-interMedium text-lg">Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default More;
