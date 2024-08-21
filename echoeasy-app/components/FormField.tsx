import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FormFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, placeholder, icon, error }) => {
  return (
    <View className='space-y-1 my-1'>
      <Text className="text-base font-interRegular">{label}</Text>
      <View className="w-80 h-14 px-3 bg-[#FFFFFF] rounded-2xl border border-[#E3E3E3] flex flex-row items-center focus:border-[#333333] ">
      {icon && <Ionicons name={icon} size={25} color="#C4C4C4"/>} 
        <TextInput
          className="flex-1 ml-2 text-[#A4A4A4] font-interRegular text-base"
          placeholder={placeholder}
          
        />
      </View>
      {error ? <Text className="text-red-500 mt-1">{error}</Text> : null}
    </View>
  );
};

export default FormField;
