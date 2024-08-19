
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from 'expo-font'
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Inter-Light": require("../assets/fonts/Inter-Light.otf"),
        "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
        "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
        "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
        "Inter-Bold": require("../assets/fonts/Inter-Bold.otf")
      })

    useEffect(() => {
        if(error) throw error;
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error])

    if(!fontsLoaded && !error) return null;

    return (
        <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
};

export default RootLayout;