import { Image, ScrollView, View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";

import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password)
      Alert.alert("All fields are required");

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      console.log(result);

      router.replace("/home");
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="min-h-[90vh] w-full justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          ></Image>
          <Text className="mt-10 font-psemibold text-2xl font-semibold text-white">
            Sign Up
          </Text>
          <FormField
            title="Username"
            placeholder="Your unique username"
            value={form.username}
            handleChangeText={(value) => setForm({ ...form, username: value })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            placeholder="Enter your email address"
            value={form.email}
            handleChangeText={(value) => setForm({ ...form, email: value })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Already have an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg font-semibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
