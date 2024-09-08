import { Stack } from "expo-router";

const AlgorithmLayout = () => {
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
