import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../src/context/GlobalProvider";

const AlgorithmLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <Stack>
      <Stack.Screen
        name="[algorithmId]"
        options={{
          title: "Algoritmo",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#F6F6F6',  
        }
        }}
      />
    </Stack>
  );
};

export default AlgorithmLayout;
