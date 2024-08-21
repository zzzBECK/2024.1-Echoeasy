import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPressProps?: () => void;
  active: boolean;
  isLoading: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, active, onPressProps, isLoading }) => {
  return (
    <TouchableOpacity onPress={onPressProps} activeOpacity={0.7} className={`w-80 h-12 flex flex-row  rounded-md justify-center items-center ${isLoading ? "opacity-50" : ""
      } ${active === true ? 'bg-[#3CC1A9]' : 'bg-[#99dcd0]'} `}>
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
