import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

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
        <Link href="/algorithms" className="text-blue-500">
          Main
        </Link>

        <Text>Futuramente, aqui pode ser uma tela de bem vindo</Text>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
