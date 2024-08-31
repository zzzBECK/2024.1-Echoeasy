import React from 'react';
import { View, ActivityIndicator, Dimensions, Platform } from "react-native";

interface LoaderProps {
    isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    const osName = Platform.OS;
    const screenHeight = Dimensions.get("screen").height;

    if (!isLoading) return null;

    return (
        <View
            className="absolute flex justify-center items-center w-full h-full bg-[#1B2523]/60 z-10"
            style={{
                height: screenHeight,
            }}
        >
            <ActivityIndicator
                animating={isLoading}
                color="#fff"
                size={osName === "ios" ? "large" : 50}
            />
        </View>
    );
};

export default Loader;
