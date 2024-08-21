import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPressProps?: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, isDisabled, onPressProps, isLoading }) => {
  return (
    <TouchableOpacity disabled={isDisabled || isLoading} onPress={onPressProps} activeOpacity={isDisabled || isLoading ? 1 : 0.7} className={`w-80 h-12 flex flex-row  rounded-md justify-center items-center ${isLoading ? "opacity-50" : ""
      } ${isDisabled === true ? 'bg-[#99dcd0]': 'bg-[#3CC1A9]'} `}>
      <Text className="font-interBold text-[#FFFFFF] text-base">{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
