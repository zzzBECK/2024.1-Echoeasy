import { Stack } from "expo-router";

const SubjectLayout = () => {
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
