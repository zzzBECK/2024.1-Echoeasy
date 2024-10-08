import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useGlobalContext } from "../../src/context/GlobalProvider";
import { UsuarioService } from "../../src/service/UsuarioService";
import { SignInPayload } from "../../src/types/User";

const signInSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

const SignIn: React.FC = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const usuarioService = new UsuarioService();
  const { setToken, setIsLogged, token } = useGlobalContext();

  const handleSignIn = async (
    values: SignInPayload,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const response = await usuarioService.login(values);
      const token = response.data?.stsTokenManager?.accessToken;

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      await AsyncStorage.setItem("authToken", token);
      setToken(token);
      setIsLogged(true);
      setMessage("Usuário logado com sucesso");
      router.replace("/documents");
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full flex justify-center items-center p-6">
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-3xl font-interMedium">Echo</Text>
            <Text className="text-[#3CC1A9] text-3xl font-interMedium ">
              easy
            </Text>
          </View>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signInSchema}
            onSubmit={async (values, { setSubmitting }) => {
              values.email = values.email.toLowerCase();
              await handleSignIn(values, setSubmitting);
            }}
            validateOnMount={true}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
              <>
                <FormField
                  label="E-mail"
                  icon="mail-outline"
                  placeholder="Insira o seu e-mail"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email ? errors.email : ""}
                  autoCapitalize="none"
                />
                <FormField
                  label="Senha"
                  icon="lock-closed-outline"
                  placeholder="Insira sua senha"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  className="self-end"
                  onPress={() => router.navigate("/forgotPassword")}
                >
                  <Text className="text-base text-[#209B85] font-interRegular my-2">
                    Esqueceu a senha?
                  </Text>
                </TouchableOpacity>

                <CustomButton
                  title="Entrar"
                  isDisabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                  handlePress={handleSubmit}
                />

                {error ? (
                  <Text className="font-interRegular px-4 text-red-500 text-center mt-4">
                    {error}
                  </Text>
                ) : null}
              </>
            )}
          </Formik>

          <View className="flex-row justify-center mt-4">
            <Text className="font-interRegular text-base">
              Não possui uma conta?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.navigate("/sign-up")}>
              <Text className="font-interBold text-base text-[#209B85]">
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
