import { Image, View, Text, ScrollView } from "react-native";
import React from "react";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import images from "../constants/images";
import CustomButton from "../components/CustomButton";

const Welcome = () => {
  useEffect(() => {
    setStatusBarStyle("light");
  });

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "101%" }}>
        <View className="h-full w-full items-center justify-center px-3">
          <Image
            source={images.logo}
            className="h-[84px] w-[131px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="h-[300px] w-full min-w-[381px]"
            resizeMode="contain"
          />
          <View className="relative mt-4">
            <Text className="text-center text-2xl font-bold text-white">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-199">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="absolute -bottom-2 -right-8 h-[15px] w-[137px]"
              resizeMode="contain"
            />
          </View>

          <Text className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email ->"
            handlePress={() => router.push("/sign-in")}
            containerStyle={"w-full mt-6"}
            isLoading={false}
          />
        </View>
      </ScrollView>
      {/* <StatusBar style="light" /> */}
    </SafeAreaView>
  );
};

export default Welcome;
