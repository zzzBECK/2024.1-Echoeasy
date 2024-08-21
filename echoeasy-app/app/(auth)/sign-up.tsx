import { Link, router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View } from "react-native";
import { UsuarioService } from "../service/UsuarioService";
import { UserPayload } from "../types/User";
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { formatPhoneNumber } from '../../src/utils/formatPhoneNumber';

const SignUp: React.FC = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const usuarioService = new UsuarioService();

  const signUpSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    lastName: yup.string().required('Sobrenome é obrigatório'),
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    phoneNumber: yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número de telefone inválido').required('Número de telefone é obrigatório'),
    password: yup.string()
      .required('Senha é obrigatória')
      .test(
        'password-requirements',
        function(value) {
          const errors = [];
  
          if (!value || value.length < 8) errors.push('A senha deve ter no mínimo 8 caracteres');
          if (value && value.length > 20) errors.push('A senha deve ter no máximo 20 caracteres');
          if (value && !/[A-Z]/.test(value)) errors.push('A senha deve conter pelo menos uma letra maiúscula');
          if (value && !/\d/.test(value)) errors.push('A senha deve conter pelo menos um número');
          if (value && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors.push('A senha deve conter pelo menos um símbolo');
  
          return errors.length > 0 ? this.createError({ message: errors.join('\n') }) : true;
        }
      ),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), ""], 'As senhas devem coincidir')
      .required('Confirmação de senha é obrigatória'),
  });

  const handleSignUp = async (values: UserPayload) => {
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
          <View className="absolute top-4 left-4">
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color="black"
              onPress={() => router.push('/(auth)/sign-in')}
            />
          </View>
          <Formik
            initialValues={{ name: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' }}
            validationSchema={signUpSchema}
            validateOnMount={true}
            onSubmit={(values) => {
              handleSignUp(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, isSubmitting }) => (
              <>
                <Text className="text-2xl font-interMedium text-center">Cadastre-se</Text>

                <View className="my-5">
                  <FormField
                    label="Nome"
                    icon="person-outline"
                    placeholder="Digite seu nome"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={touched.name && errors.name ? errors.name : ""}
                  />
                  <FormField
                    label="Sobrenome"
                    icon="person-outline"
                    placeholder="Digite seu sobrenome"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    error={touched.lastName && errors.lastName ? errors.lastName : ""}
                  />
                  <FormField
                    label="E-mail"
                    icon="mail-outline"
                    placeholder="Digite seu e-mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && errors.email ? errors.email : ""}
                  />
                  <FormField
                    label="Telefone"
                    icon="call-outline"
                    keyboardType="numeric"
                    placeholder="Digite seu número de telefone"
                    value={formatPhoneNumber(values.phoneNumber)}
                    onChangeText={(text) => {
                      const formattedText = formatPhoneNumber(text);
                      handleChange('phoneNumber')(formattedText);
                    }}
                    onBlur={handleBlur('phoneNumber')}
                    error={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ""}
                  />
                  <FormField
                    label="Senha"
                    icon="lock-closed-outline"
                    placeholder="Crie uma senha segura"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && errors.password ? errors.password : ""}
                    maxLength={20}
                  />
                  <FormField
                    label="Confirmação de Senha"
                    icon="checkmark-outline"
                    placeholder="Confirme sua senha"
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ""}
                  />
                </View>

                <Text className="text-center font-interRegular mb-4 mx-4">
                  <Text>Ao se cadastrar, você concorda com os nossos </Text>
                  <Link href="+not-found" className="text-[#209B85]">Termos</Link>
                  <Text> e </Text>
                  <Link href="+not-found" className="text-[#209B85]">Política de Privacidade</Link>
                  <Text>.</Text>
                </Text>

                <CustomButton title="Confirmar" isDisabled={!isValid || isSubmitting} isLoading={isSubmitting} onPressProps={handleSubmit} />

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
