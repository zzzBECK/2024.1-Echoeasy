import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface SearchInputProps extends TextInputProps {
  placeholder: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, icon, onChangeText, ...rest }) => {
  return (
    <View
      className={`w-full h-12 px-3 bg-[#FFFFFF] rounded-2xl border border-[#E3E3E3] flex flex-row items-center focus:border-[#333333] my-2 mb-3`}
    >
      <TextInput
        className="flex-1 ml-2 text-[000000] font-interRegular text-base"
        placeholder={placeholder}
        onChangeText={onChangeText}
        {...rest}
      />
      {icon && <Ionicons name={icon} size={25} color="#C4C4C4" />}
    </View>
  );
};

export default SearchInput;
