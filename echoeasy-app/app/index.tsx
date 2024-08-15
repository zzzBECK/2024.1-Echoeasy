// index.tsx
import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from '../components/FormField';

const Welcome: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 justify-center p-4">
      
      <View className="flex-row justify-center mt-4">
        <Link href="/sign-in" className="text-blue-500">
          Login
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
