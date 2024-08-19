import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FormFieldProps extends TextInputProps {
  label: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, icon, error, ...inputProps }) => {
  return (
    <View className='space-y-1'>
      <Text className="text-sm font-interRegular">{label}</Text>
      <View className="flex-row items-center pl-3 border border-[#E3E3E3] rounded-2xl bg-[#FFFFFF] focus:border-[#333333] ">
      {icon && <Ionicons name={icon} size={25} color="#C4C4C4"/>} 
        <TextInput
          className="h-12 px-2"
          {...inputProps}
        />
      </View>
      {error ? <Text className="text-red-500 mt-1">{error}</Text> : null}
    </View>
  );
};

export default FormField;
