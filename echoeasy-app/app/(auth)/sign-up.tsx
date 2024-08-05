import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Link } from "expo-router";
import FormField from '../../components/FormField';
import axios from 'axios';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        if (name === '' || password === ''|| email === '') {
            setError('Todos os campos são obrigatórios');
            return;
        }
                const response = await axios.post('http://localhost:3000/usuarios', {
                    name,
                    email,
                    password,
                });

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
            {error ? <Text className="text-red-500 text-center mt-4">{error}</Text> : null}
            <View className="flex-row justify-center mt-4">
                <Link href="/sign-in" className="text-blue-500">
                    Já possuo uma conta
                </Link>
            </View>
        </View>
    );
};

export default SignUp;