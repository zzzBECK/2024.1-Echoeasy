import { Stack } from "expo-router";

const MoreLayout = () => {

    
  return (
    <Stack>
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Editar Perfil",
          headerTransparent: true,
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

export default MoreLayout;
