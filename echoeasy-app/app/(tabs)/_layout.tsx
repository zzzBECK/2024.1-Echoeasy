import { Redirect, Tabs } from "expo-router";
import React from 'react';
import Loader from "../../components/Loader";
import TabBarIcon from "../../components/TabBarIcon";
import { useGlobalContext } from "../../src/context/GlobalProvider";


const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#3CC1A9",
          tabBarInactiveTintColor: "#333333",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#C4C4C4",
            height: 75,
          },
        }}
      >
        <Tabs.Screen
          name="algorithms"
          options={{
            title: "Algoritmos",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon="analytics-outline"
                color={color}
                focused={focused}
                label="Algoritmos"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="documents"
          options={{
            title: "Documentos",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon="document-text-outline"
                color={color}
                focused={focused}
                label="Documentos"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: "Mais",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                icon="add-outline"
                color={color}
                focused={focused}
                label="Mais"
              />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
    </>
  );
};

export default TabLayout;
