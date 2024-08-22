import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const More: React.FC = () => {
  
  return (
    <SafeAreaView className="bg-[#F6F6F6] h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full h-full flex justify-center items-center p-4">


          <Text>Mais</Text>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default More;
