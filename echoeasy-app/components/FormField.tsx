// FormField.tsx
import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { styled } from 'nativewind';


interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, icon, ...inputProps }) => {
  return (
    <View className='space-y-2'>
      <Text className="text-lg font-bold ">{label}</Text>
      <View className="border border-gray-400 rounded">
        {icon && <View className="p-2">{icon}</View>}
        <TextInput
          className="h-10 px-2"
          {...inputProps}
        />
      </View>
      {error ? <Text className="text-red-500 mt-1">{error}</Text> : null}
    </View>
  );
};

export default FormField;
