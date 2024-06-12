import { Image, View, Text } from "react-native";

import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="mt-2 flex w-full items-center justify-center space-y-2">
      <Image
        source={images.empty}
        className="h-[216px] w-[270px]"
        resizeMode="contain"
      />
      <Text className="font-pregular text-sm text-gray-100">{title}</Text>
      <Text className="font-psemibold text-xl text-white">{subtitle}</Text>

      <CustomButton
        title="back to explore"
        containerStyle={"w-[85%] my-5"}
        handlePress={() => router.replace("/home")}
      />
    </View>
  );
};

export default EmptyState;
