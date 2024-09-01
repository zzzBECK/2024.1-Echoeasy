import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useGlobalContext } from "../../src/context/GlobalProvider";
import { formatPhoneNumber } from "../../src/utils/formatPhoneNumber";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  lastname: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  cellphone: yup
    .string()
    .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Número de telefone inválido")
    .required("Número de telefone é obrigatório"),
});

const EditProfile: React.FC = () => {
  const { user } = useGlobalContext();
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // Criar link para imagem e modificar no front

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!user) {
    return <Text>Carregando...</Text>;
  }
  

  return (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View className="bg-[#F6F6F6] w-full h-full p-6 items-center">
        <Formik
          initialValues={{
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            cellphone: user.cellphone,
            image: user.image // Checar isso aqui
          }}
          validationSchema={signUpSchema}
          validateOnMount={true}
          onSubmit={async (values, { setSubmitting }) => {}}
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
              <View>
                <Image
                  className="w-[125px] h-[125px] rounded-full"
                  source={{ uri: user?.image }}
                />
                <TouchableOpacity
                  onPress={pickImage}
                  className="absolute bottom-0 right-0 bg-[#FFFFFF] p-2 rounded-full border-2 border-[#E3E3E3]"
                >
                  <Ionicons name="pencil-outline" size={20} color="#333333" />
                </TouchableOpacity>
              </View>

              <View className="my-3 w-full">
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
              </View>
              <CustomButton
                title="Confirmar"
                isDisabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
                handlePress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
