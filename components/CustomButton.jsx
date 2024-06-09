import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`min-h-[62px] items-center justify-center rounded-xl bg-secondary ${containerStyle} ${isLoading ? "opacity-50" : ""}`}
      disabled={isLoading}
    >
      <Text className={`font-psemibold text-lg text-primary ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
