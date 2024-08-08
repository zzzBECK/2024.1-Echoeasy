import { Link } from "expo-router";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import FormField from "../../components/FormField";
import { UsuarioService } from "../service/UsuarioService";
import { UserPayload } from "../types/User";

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
    <View className="flex-1 justify-center p-4">
      <Text className="text-3xl font-bold text-center mb-6">Criar Conta</Text>
      <FormField
        label="Nome"
        placeholder="Digite seu nome e sobrenome"
        value={name}
        onChangeText={setName}
      />
      <FormField
        label="E-mail"
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <FormField
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View className="mt-4">
        <Button title="Cadastrar" onPress={handleSignUp} />
      </View>
      {error ? (
        <Text className="text-red-500 text-center mt-4">{error}</Text>
      ) : null}
      <View className="flex-row justify-center mt-4">
        <Link href="/sign-in" className="text-blue-500">
          Já possuo uma conta
        </Link>
      </View>
    </View>
  );
};

export default SignUp;
