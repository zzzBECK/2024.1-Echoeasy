import React from 'react';
import { Text, Pressable } from 'react-native';

interface CustomButtonProps {
  title: string;
  active: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, active }) => {
  return (
      <Pressable className={`justify-center items-center h-12 rounded-md ${active === true ? 'bg-[#3CC1A9]' : 'bg-[#99dcd0]'}`}>
        <Text className="font-interBold text-[#FFFFFF] text-base">{title}</Text>
      </Pressable>
  );
};

export default CustomButton;
