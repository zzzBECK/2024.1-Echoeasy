// index.tsx
import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from '../../components/FormField';

const SignIn: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold">Echoeasy</Text>
      </View>
    
      <FormField
        label="E-mail"
        placeholder="Digite seu e-mail"

      />
      <FormField
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry

      />
    
      <TouchableOpacity onPress={() => { }} className="mt-2">
        <Text className="text-blue-500 text-right">Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <View className="mt-4">
        <Button title="Login" onPress={() => { }} />
      </View>
      <View className="flex-row justify-center mt-4">
        <Text>Não tem uma conta? </Text>
        <Link href="/sign-up" className="text-blue-500">
          Cadastre-se
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
