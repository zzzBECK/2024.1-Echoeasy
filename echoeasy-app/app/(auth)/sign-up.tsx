import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { formatPhoneNumber } from "../../src/utils/formatPhoneNumber";
import { UsuarioService } from "../../src/service/UsuarioService";
import { SignUpPayload } from "../../src/types/User";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  lastname: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  cellphone: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Número de telefone inválido")
    .required("Número de telefone é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .test("password-requirements", function (value) {
      const errors = [];

      if (!value || value.length < 8)
        errors.push("A senha deve ter no mínimo 8 caracteres");
      if (value && value.length > 20)
        errors.push("A senha deve ter no máximo 20 caracteres");
      if (value && !/[A-Z]/.test(value))
        errors.push("A senha deve conter pelo menos uma letra maiúscula");
      if (value && !/\d/.test(value))
        errors.push("A senha deve conter pelo menos um número");
      if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value))
        errors.push("A senha deve conter pelo menos um símbolo");

      return errors.length > 0
        ? this.createError({ message: errors.join("\n") })
        : true;
    }),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password"), ""], "As senhas devem coincidir"),
});

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const usuarioService = new UsuarioService();

  const handleSignUp = async (
    values: SignUpPayload,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const payload: SignUpPayload = {
        name: values.name,
        lastname: values.lastname,
        email: values.email,
        cellphone: values.cellphone,
        password: values.password,
      };

      const response = await usuarioService.create(payload);

      console.log(response.data);

      setMessage("Usuário criado com sucesso");
      router.replace("/sign-in");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full h-full flex justify-center items-center p-4">
          <View className="absolute top-4 left-4">
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color="black"
              onPress={() => router.push("/sign-in")}
            />
          </View>
          <Formik
            initialValues={{
              name: "",
              lastname: "",
              email: "",
              cellphone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signUpSchema}
            validateOnMount={true}
            onSubmit={async (values, { setSubmitting }) => {
              await handleSignUp(values, setSubmitting);
            }}
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
                <Text className="text-2xl font-interMedium text-center">
                  Cadastre-se
                </Text>

                <View className="my-5">
                  <FormField
                    label="Nome"
                    icon="person-outline"
                    placeholder="Digite seu nome"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    error={touched.name && errors.name ? errors.name : ""}
                  />
                  <FormField
                    label="Sobrenome"
                    icon="person-outline"
                    placeholder="Digite seu sobrenome"
                    value={values.lastname}
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    error={
                      touched.lastname && errors.lastname ? errors.lastname : ""
                    }
                  />
                  <FormField
                    label="E-mail"
                    icon="mail-outline"
                    placeholder="Digite seu e-mail"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={touched.email && errors.email ? errors.email : ""}
                  />
                  <FormField
                    label="Telefone"
                    icon="call-outline"
                    keyboardType="numeric"
                    placeholder="Digite seu número de telefone"
                    value={formatPhoneNumber(values.cellphone)}
                    onChangeText={(text) => {
                      const formattedText = formatPhoneNumber(text);
                      handleChange("cellphone")(formattedText);
                    }}
                    onBlur={handleBlur("cellphone")}
                    error={
                      touched.cellphone && errors.cellphone
                        ? errors.cellphone
                        : ""
                    }
                  />
                  <FormField
                    label="Senha"
                    icon="lock-closed-outline"
                    placeholder="Crie uma senha segura"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    error={
                      touched.password && errors.password ? errors.password : ""
                    }
                    maxLength={20}
                  />
                  <FormField
                    label="Confirmação de Senha"
                    icon="checkmark-outline"
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ""
                    }
                  />
                </View>

                <Text className="text-center font-interRegular mb-4 mx-4">
                  <Text>Ao se cadastrar, você concorda com os nossos </Text>
                  <Link href="+not-found" className="text-[#209B85]">
                    Termos
                  </Link>
                  <Text> e </Text>
                  <Link href="+not-found" className="text-[#209B85]">
                    Política de Privacidade
                  </Link>
                  <Text>.</Text>
                </Text>

                <CustomButton
                  title="Confirmar"
                  isDisabled={!isValid || isSubmitting}
                  isLoading={isSubmitting}
                  onPressProps={handleSubmit}
                />

                {error ? (
                  <Text className="font-interRegular px-4 text-red-500 text-center mt-4">{error}</Text>
                ) : null}

                <View className="flex-row justify-center mt-4">
                  <Text className="font-interRegular text-base">
                    Já tem uma conta?{" "}
                  </Text>
                  <Link
                    href="/sign-in"
                    className="font-interBold text-base text-[#209B85]"
                  >
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
