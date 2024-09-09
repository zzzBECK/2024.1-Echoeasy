import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../src/context/GlobalProvider";

const DocumentLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

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
