import { Link } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { UsuarioService } from "../service/UsuarioService";
import { UserPayload } from "../types/User";
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const usuarioService = new UsuarioService();

  const handleSignUp = async () => {
    if (name === "" || password === "" || email === "") {
      setError("Todos os campos são obrigatórios");
      return;
    }

    const dadosUsuario: UserPayload = {
      name,
      email,
      password,
    };

    try {
      const usuario = await usuarioService.create(dadosUsuario);
      console.log(usuario);
      setMessage("Usuário criado com sucesso");
    } catch (error) {
      console.log(error);
      setError("Erro ao criar usuário");
    }
  };

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full h-full flex justify-center items-center p-4">

          <Text className="text-2xl font-interMedium text-center">Cadastre-se</Text>

          <View className="my-5">
            <FormField
              label="Nome"
              icon="person-outline"
              placeholder="Digite seu nome e sobrenome"
              value={name}
              onChangeText={setName}
            />
            <FormField
              label="E-mail"
              icon="mail-outline"
              placeholder="Digite seu e-mail"
              value={email}
              onChangeText={setEmail}
            />
            <FormField
              label="Telefone"
              icon="call-outline"
              placeholder="Digite seu número de telefone"
              value={email}
              onChangeText={setEmail}
            />
            <FormField
              label="Senha"
              icon="lock-closed-outline"
              placeholder="Crie uma senha segura"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <FormField
              label="Confirmação de Senha"
              icon="checkmark-outline"
              placeholder="Confirme sua senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Text className="text-center font-interRegular mb-4 mx-4">
            <Text>Ao se cadastrar, você concorda com os nossos </Text>
            <Link href="/#" className="text-[#209B85]">Termos</Link>
            <Text> e </Text>
            <Link href="/#" className="text-[#209B85]">Política de Privacidade</Link>
            <Text>.</Text>
          </Text>

          <CustomButton title="Confirmar" active={false} isLoading={false}/>


          {error ? (
            <Text className="text-red-500 text-center mt-4">{error}</Text>
          ) : null}

          <View className="flex-row justify-center mt-4">
            <Text className='font-interRegular text-base'>Já tem uma conta? </Text>
            <Link href="/sign-in" className="font-interBold text-base text-[#209B85]">
              Conecte-se
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
