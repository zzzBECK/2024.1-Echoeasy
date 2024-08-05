// SignupScreen.tsx
import React from 'react';
import { View, Button, Text } from 'react-native';
import { Link, router } from "expo-router";
import FormField from '../../components/FormField';

const SignUp: React.FC = () => {
  return (
    <View className="flex-1 justify-center p-4">
      <Text className="text-3xl font-bold text-center mb-6">Criar Conta</Text>
      <FormField
        label="Nome"
        placeholder="Digite seu nome e sobrenome"
      />
      <FormField
        label="E-mail"
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />
      <FormField
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <View className="mt-4">
        <Button title="Cadastrar" onPress={() => {}} />
      </View>
      <View className="flex-row justify-center mt-4">
        <Link href="/sign-in" className="text-blue-500">
          Já possuo uma conta
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
