import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

interface FormFieldProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  value: string,
  secureTextEntry?: boolean;
  error?: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, placeholder, icon, value, secureTextEntry, error, onChangeText, onBlur, ...rest }) => {

  const [isSecure, setIsSecure] = useState(secureTextEntry || false);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View className='space-y-1 my-1'>
      <Text className="text-sm font-interRegular">{label}</Text>
      <View className={`w-80 h-12 px-3 bg-[#FFFFFF] rounded-2xl border border-[#E3E3E3] flex flex-row items-center focus:border-[#333333] ${error ? 'border-red-500' : 'border-[#E3E3E3]'}`}>
      {icon && <Ionicons name={icon} size={25} color="#C4C4C4"/>} 
        <TextInput
          className="flex-1 ml-2 text-[000000] font-interRegular text-base"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={isSecure}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Ionicons 
              name={isSecure ? 'eye-off-outline' : 'eye-outline'} 
              size={25} 
              color="#C4C4C4"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text className="text-red-500 mt-1">{error}</Text> : null}
    </View>
  );
};

export default FormField;
