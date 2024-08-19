import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 justify-center p-4 bg-[#F6F6F6]">

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

      <TouchableOpacity onPress={() => { }} className="m-2">
        <Text className="text-sm text-[#209B85] font-interRegular text-right">Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* <View className="mt-4">
        <Button color="#3CC1A9" title="Entrar" onPress={() => { }} />
      </View> */}

      <CustomButton title="Entrar" active={false}/>

      <View className="flex-row justify-center mt-4">
        <Text className='font-interRegular p-'>Não tem uma conta? </Text>
        <Link href="/sign-up" className="font-interBold text-[#209B85]">
          Cadastre-se
        </Link>
      </View>

    </SafeAreaView>
  );
};

export default SignIn;
