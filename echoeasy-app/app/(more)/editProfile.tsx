import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { useGlobalContext } from "../../src/context/GlobalProvider";
import { UsuarioService } from "../../src/service/UsuarioService";
import { formatPhoneNumber } from "../../src/utils/formatPhoneNumber";

const EditProfile: React.FC = () => {
    const { user, setUser } = useGlobalContext();
    const usuarioService = new UsuarioService();
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        lastname: user.lastname || '',
        cellphone: user.cellphone || '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await usuarioService.editProfile(formData);
            if (response.status === 200) {
                setUser({ ...user, ...formData });
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao conectar-se ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = !formData.name || !formData.lastname || !formData.cellphone || isLoading;

    return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="w-full h-full flex items-center px-6">

                    <View className='w-full mb-4'>
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
                    </View>

                    <CustomButton
                        title="Salvar"
                        handlePress={handleSubmit}
                        isDisabled={isDisabled}
                        isLoading={isLoading}
                    />
                    
                </View>
            </ScrollView>
    );
};

export default EditProfile;
