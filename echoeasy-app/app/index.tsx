import { Link } from "expo-router";
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Welcome: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      
      <View className="flex items-center justify-center space-y-4">
        <Link href="/sign-in" className="text-blue-500">
          SignIn
        </Link>
        <Link href="/sign-up" className="text-blue-500">
          SignUp
        </Link>
        <Link href="/documents" className="text-blue-500">
          Documents
        </Link>
        <Link href="/more" className="text-blue-500">
          More
        </Link>
        <Link href="/editProfile" className="text-blue-500">
          Editar Perfil
        </Link>

        <Text>Futuramente, aqui pode ser uma tela de bem vindo</Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
