import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Text } from "react-native";

const TabLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 75,
          },
        }}
      >
        <Tabs.Screen
          name="algorithms"
          options={{
            title: "Algoritmos",
            headerShown: false,
            tabBarIcon: () => (
              <Text>Algoritmos</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="manuals"
          options={{
            title: "Manuais",
            headerShown: false,
            tabBarIcon: () => (
                <Text>Manuais</Text>
            ),
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: "Mais",
            headerShown: false,
            tabBarIcon: () => (
                <Text>Mais</Text>
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;