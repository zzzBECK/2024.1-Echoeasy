import { Stack } from "expo-router";

const DocumentLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[documentId]"
        options={{
          title: "Assuntos",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#F6F6F6',  
        }
        }}
      />
      <Stack.Screen name="(subjects)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default DocumentLayout;
