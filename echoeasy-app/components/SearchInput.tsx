import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface SearchInputProps extends TextInputProps {
  placeholder: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  modal?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, icon, onChangeText, modal, ...rest }) => {
  return (
    <View
      className={`w-full h-12 px-3 bg-[#FFFFFF] rounded-3xl border border-[#E3E3E3] flex flex-1 flex-row items-center focus:border-[#333333] my-2 mb-3`}
    >
      {icon && <Ionicons name={icon} size={modal ? 20 : 25} color="#C4C4C4" />}
      <TextInput
        className={`flex-1 ml-2 text-[000000] font-interRegular ${modal ? "text-sm" : "text-base"} `}
        placeholder={placeholder}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default SearchInput;
