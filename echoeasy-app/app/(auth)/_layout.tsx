import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "",
          headerTransparent: true,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#F6F6F6",
          },
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          title: "",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#F6F6F6",
          },
        }}
      />
    </Stack>
    
  );
};

export default AuthLayout;
