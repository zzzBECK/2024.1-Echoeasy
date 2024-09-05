import React, { useState, useEffect } from 'react';
import { ScrollView, View, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { UsuarioService } from "../../src/service/UsuarioService";
import {useGlobalContext} from "../../src/context/GlobalProvider";
import {formatPhoneNumber} from "../../src/utils/formatPhoneNumber";


const EditProfile: React.FC = () => {
    const {user,setUser } = useGlobalContext();
    const usuarioService = new UsuarioService();
    const [formData, setFormData] = useState({
        name:  user.name || '',
        email:  user.email || '',
        lastname: user.lastname || '',
        cellphone:  user.cellphone || '',
    });

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {

            const response = await usuarioService.editProfile(formData);
            setUser({ ...user, ...formData });
            if (response.status === 200) {
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao conectar-se ao servidor.');
        }
    };

    return (
        <SafeAreaView className="bg-[#F6F6F6] h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="w-full h-full flex justify-center items-center p-7">
                    <FormField
                        label="Nome"
                        icon="person-outline"
                        value={formData.name}
                        onChangeText={(value) => handleChange('name', value)}
                    />

                    <FormField
                        label="Sobrenome"
                        icon="person-outline"
                        value={formData.lastname}
                        onChangeText={(value) => handleChange('lastname', value)}
                    />
                    <FormField
                        label="E-mail"
                        icon="mail-outline"
                        value={formData.email}
                        onChangeText={(value) => handleChange('email', value)}
                        editable={false}
                    />
                    <FormField
                        label="Telefone"
                        icon="call-outline"
                        keyboardType="numeric"

                        value={formatPhoneNumber(formData.cellphone)}
                        onChangeText={(value) => handleChange('cellphone', value)}
                    />

                    <CustomButton
                        title="Salvar"
                        handlePress={handleSubmit}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfile;
