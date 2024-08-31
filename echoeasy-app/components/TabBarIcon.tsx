import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { boolean } from "yup";

interface TabBarIconProps {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
    focused: boolean;
    label: string;
  }

  const TabBarIcon: React.FC<TabBarIconProps> = ({ icon, color, focused, label }) => {
    return (
      <View className="flex justify-center items-center">
        <Ionicons
          name={icon}
          size={25}
          color={color}
          focused={focused}
        />
        <Text className={`${focused ? "font-interMedium text-[#3CC1A9]"  : "font-interRegular text-[#333333]"} text-xs`}>
          {label}
        </Text>
      </View>
    );
  };


export default TabBarIcon;