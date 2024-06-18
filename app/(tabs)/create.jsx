import {
  Alert,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { router } from "expo-router";

import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { createVideoPost, uploadFile } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [videoContent, setVideoContent] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const onPicker = async (fileType) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          fileType === "video"
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        if (fileType === "video") {
          setVideoContent({ ...videoContent, video: result?.assets[0] });
        } else {
          setVideoContent({ ...videoContent, thumbnail: result?.assets[0] });
        }
      } else {
        setTimeout(() => {
          Alert.alert("Document picked", JSON.stringify(result, null, 2));
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (
      !videoContent.title ||
      !videoContent.video ||
      !videoContent.thumbnail ||
      !videoContent.prompt
    ) {
      Alert.alert("Please fill all fields");
    }
    setUploading(true);
    try {
      await createVideoPost({
        ...videoContent,
        userId: user.$id,
      });

      router.push("/home");
    } catch (error) {
      throw new Error(error);
    } finally {
      setUploading(false);
      setVideoContent({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="mx-6 mt-10">
          <View>
            <Text className="font-pbold text-2xl text-white">Upload Vidoe</Text>
          </View>

          <FormField
            title="Video title"
            value={videoContent.title}
            placeholder="Give your vidoe a cachy title..."
            handleChangeText={(value) =>
              setVideoContent({ ...videoContent, title: value })
            }
            otherStyles="mt-7"
          />

          <View className="mt-7">
            <Text className="font-pmedium text-base text-gray-100">
              Upload Video
            </Text>

            <TouchableOpacity onPress={() => onPicker("video")}>
              <View className="mt-6 h-64 w-full items-center justify-center rounded-2xl bg-black-100">
                {videoContent.video ? (
                  <Video
                    source={{ uri: videoContent.video.uri }}
                    className="h-64 w-full rounded-2xl"
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    isLooping
                  />
                ) : (
                  <View className="flex h-14 w-14 items-center justify-center rounded-lg border border-dashed border-secondary-100">
                    <Image
                      source={icons.upload}
                      className="h-1/2 w-1/2"
                      resizeMode="contain"
                      alt
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-7">
            <Text className="font-pmedium text-base text-gray-100">
              Thumbnail image
            </Text>
            <TouchableOpacity onPress={() => onPicker("image")}>
              <View className="mt-6 h-40 w-full items-center justify-center rounded-2xl bg-black-100">
                {videoContent.thumbnail ? (
                  <Image
                    source={{ uri: videoContent.thumbnail.uri }}
                    className="h-full w-full rounded-2xl"
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={icons.upload}
                    className="h-7 w-7"
                    resizeMode="contain"
                    alt
                  />
                )}
              </View>
            </TouchableOpacity>

            <FormField
              title="AI prompt"
              value={videoContent.prompt}
              placeholder="The AI prompt for your video..."
              handleChangeText={(value) =>
                setVideoContent({ ...videoContent, prompt: value })
              }
              otherStyles="mt-7"
            />
          </View>

          <CustomButton
            title="Submit & Publish"
            handlePress={handleSubmit}
            containerStyle="w-full mt-7"
            textStyle="text-lg font-psemibold"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
