import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';


interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, error, icon, ...inputProps }) => {
  return (
    <View className='space-y-1'>
      <Text className="text-sm font-interRegular">{label}</Text>
      <View className="border border-[#E3E3E3] rounded-2xl bg-[#FFFFFF] focus:border-[#333333] ">
        {icon && <View className="p-2">{icon}</View>}
        <TextInput
          className="h-11 px-2"
          {...inputProps}
        />
      </View>
      {error ? <Text className="text-red-500 mt-1">{error}</Text> : null}
    </View>
  );
};

export default FormField;
