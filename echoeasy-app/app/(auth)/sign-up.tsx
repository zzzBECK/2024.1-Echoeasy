import { Link, router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { UsuarioService } from "../service/UsuarioService";
import { UserPayload } from "../types/User";
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';
import { Formik } from 'formik';

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const usuarioService = new UsuarioService();

  const handleSignUp = async (values: UserPayload) => {
    if (values.name === "" || values.email === "" || values.phoneNumber === "" || values.password === "") {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      const usuario = await usuarioService.create(values);
      console.log(usuario);
      setMessage("Usuário criado com sucesso");
      router.replace('/sign-up');
    } catch (error) {
      console.log(error);
      setError("Erro ao criar usuário");
    }
  };

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
     
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full flex justify-center items-center p-4">
            <Formik
              initialValues={{ name: '', email: '', phoneNumber: '', password: '', confirmPassword: '' }}
              onSubmit={(values) => {
                handleSignUp(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <Text className="text-2xl font-interMedium text-center">Cadastre-se</Text>

                  <View className="my-5">
                    <FormField
                      label="Nome"
                      icon="person-outline"
                      placeholder="Digite seu nome e sobrenome"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                    />
                    <FormField
                      label="E-mail"
                      icon="mail-outline"
                      placeholder="Digite seu e-mail"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    <FormField
                      label="Telefone"
                      icon="call-outline"
                      placeholder="Digite seu número de telefone"
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                    />
                    <FormField
                      label="Senha"
                      icon="lock-closed-outline"
                      placeholder="Crie uma senha segura"
                      secureTextEntry
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                    />
                    <FormField
                      label="Confirmação de Senha"
                      icon="checkmark-outline"
                      placeholder="Confirme sua senha"
                      secureTextEntry
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                    />
                  </View>

                  <Text className="text-center font-interRegular mb-4 mx-4">
                    <Text>Ao se cadastrar, você concorda com os nossos </Text>
                    <Link href="/#" className="text-[#209B85]">Termos</Link>
                    <Text> e </Text>
                    <Link href="/#" className="text-[#209B85]">Política de Privacidade</Link>
                    <Text>.</Text>
                  </Text>

                  <CustomButton title="Confirmar" active={true} isLoading={false} onPressProps={handleSubmit} />

                  {error ? (
                    <Text className="text-red-500 text-center mt-4">{error}</Text>
                  ) : null}

                  <View className="flex-row justify-center mt-4">
                    <Text className='font-interRegular text-base'>Já tem uma conta? </Text>
                    <Link href="/sign-in" className="font-interBold text-base text-[#209B85]">
                      Conecte-se
                    </Link>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
     
    </SafeAreaView>
  );
};

export default SignUp;
