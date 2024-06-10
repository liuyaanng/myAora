import { Image, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Alert } from "react-native";

import images from "../../constants/images";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) Alert.alert("All fields are required");

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

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
        <View className="min-h-[85vh] w-full justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          ></Image>
          <Text className="mt-10 font-psemibold text-2xl font-semibold text-white">
            Sign In
          </Text>
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
          <View className="mt-7 flex-row items-center justify-end">
            <Link
              href={"/forgetpassword"}
              className="font-psemibold text-white"
            >
              Forget password
            </Link>
          </View>
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="font-pregular text-lg text-gray-100">
              Don't have account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-semibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
