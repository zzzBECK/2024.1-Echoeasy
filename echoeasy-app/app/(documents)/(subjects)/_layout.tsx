import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../../src/context/GlobalProvider";

const SubjectLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <Stack>
      <Stack.Screen
        name="[subjectId]"
        options={{
          title: "Conteúdo",
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

export default SubjectLayout;
