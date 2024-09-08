import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Text, View } from "react-native";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { UsuarioService } from "../../src/service/UsuarioService";

const signUpSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
});

const ForgotPassword: React.FC = () => {
  const handleRequestPasswordReset = async (
    values: { email: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const usuarioService = new UsuarioService();
      await usuarioService.passwordReset(values);
      console.log("E-mail enviado para:", values.email);
      
      router.replace("/sign-in");
    } catch (error: any) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View className="bg-[#F6F6F6] w-full h-full flex items-center px-6">
      <Text className="text-2xl font-interMedium text-center">
        Esqueceu a sua senha?
      </Text>
      <Text className="text-base font-interRegular text-center">
        Para recuperar seu acesso, informe seu e-mail cadastrado no campo a
        seguir:
      </Text>

      <View className="w-full">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={signUpSchema}
          validateOnMount={true}
          onSubmit={async (values, { setSubmitting }) => {
            await handleRequestPasswordReset(values, setSubmitting);
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
              <View className="py-2">
                <FormField
                  label="E-mail"
                  placeholder="Digite seu e-mail"
                  icon="mail-outline"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={touched.email && errors.email ? errors.email : ""}
                />
              </View>
              <CustomButton
                title="Confirmar"
                isLoading={isSubmitting}
                isDisabled={!isValid || isSubmitting}
                handlePress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ForgotPassword;
