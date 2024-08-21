import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Ops!' }} />
            <SafeAreaView className="bg-[#F6F6F6] h-full">
                <View className="w-full h-full flex justify-center items-center p-4">
                    <Text>Tela ainda não criada</Text>
                </View>
            </SafeAreaView>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});