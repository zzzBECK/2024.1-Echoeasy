import { Redirect } from "expo-router";
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../src/context/GlobalProvider";

const Welcome: React.FC = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;
  if (!loading && isLogged) return <Redirect href="/documents" />;

  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      
      <View className="flex items-center justify-center space-y-4">
        {/* <Link href="/sign-in" className="text-blue-500">
          SignIn
        </Link>
        <Link href="/sign-up" className="text-blue-500">
          SignUp
        </Link>
        <Link href="/forgotPassword" className="text-blue-500">
          Esqueceu a senha
        </Link>
        <Link href="/documents" className="text-blue-500">
          Documents
        </Link>
        <Link href="/[documentId]" className="text-blue-500">
          Assuntos
        </Link>
        <Link href="/[subjectId]" className="text-blue-500">
          Conteúdos
        </Link>
        <Link href="/algorithms" className="text-blue-500">
          Algoritmos
        </Link>
        <Link href="/[algorithmId]" className="text-blue-500">
          Bot
        </Link>
        <Link href="/more" className="text-blue-500">
          More
        </Link>
        <Link href="/editProfile" className="text-blue-500">
          Editar Perfil
        </Link>

        <Text>Futuramente, aqui pode ser uma tela de bem vindo</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
