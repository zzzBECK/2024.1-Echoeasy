import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn: React.FC = () => {
  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full h-full flex justify-center items-center p-4">


          <View className="flex-row  justify-center items-center mb-8">
            <Text className="text-3xl font-interMedium">Echo</Text><Text className="text-[#3CC1A9] text-3xl font-interMedium ">easy</Text>
          </View>

          <FormField
            label="E-mail"
            icon="mail-outline"
            placeholder="Insira o seu e-mail"
          />
          <FormField
            label="Senha"
            icon="lock-closed-outline"
            placeholder="Insira sua senha"
            secureTextEntry
          />

          <View className="w-full flex items-end">
            <TouchableOpacity onPress={() => { }} className="my-3 mr-5">
              <Text className="text-base text-[#209B85] font-interRegular">Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <CustomButton title="Entrar" active={false} isLoading={false} />

          <View className="flex-row justify-center mt-4">
            <Text className='font-interRegular text-base'>Não possui uma conta? </Text>
            <Link href="/sign-up" className="font-interBold text-base text-[#209B85]">
              Cadastre-se
            </Link>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
