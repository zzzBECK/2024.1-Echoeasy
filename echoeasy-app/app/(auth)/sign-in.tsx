import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { SignInPayload } from '../types/User';
import { UsuarioService } from '../service/UsuarioService';

const signInSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
});

const SignIn: React.FC = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const usuarioService = new UsuarioService();

  const handleSignIn = async (values: SignInPayload) => {
    try {
      const usuario = await usuarioService.login(values);
      setMessage("Usuário logado com sucesso");
      router.replace('+not-found');
    } catch (error) {
      console.log(error);
      setError("Credenciais inválidas");
    }
  };

  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full h-full flex justify-center items-center p-4">


          <View className="flex-row  justify-center items-center mb-8">
            <Text className="text-3xl font-interMedium">Echo</Text><Text className="text-[#3CC1A9] text-3xl font-interMedium ">easy</Text>
          </View>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signInSchema}
            onSubmit={(values) => {
              handleSignIn(values);
            }}
            validateOnMount={true}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
              <>
                <FormField
                  label="E-mail"
                  icon="mail-outline"
                  placeholder="Insira o seu e-mail"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : ""}
                />
                <FormField
                  label="Senha"
                  icon="lock-closed-outline"
                  placeholder="Insira sua senha"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password ? errors.password : ""}
                />

                <Link href="+not-found" className="self-end text-base text-[#209B85] font-interRegular my-2 mr-6">Esqueceu a senha?</Link>

                <CustomButton title="Entrar" isDisabled={!isValid || isSubmitting} isLoading={isSubmitting} onPressProps={handleSubmit} />

                {error ? (
                  <Text className="text-red-500 text-center mt-4">{error}</Text>
                ) : null}
              </>
            )}
          </Formik>

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
