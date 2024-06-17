import { SafeAreaView } from "react-native-safe-area-context";
import { Image, FlatList, View, Text, TouchableOpacity } from "react-native";

import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

import { icons } from "../../constants";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logOut = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUser(null);

    router.replace("/sign-in");
  };

  const ProfileText = ({ number, type }) => (
    <View className="m-2">
      <Text className="font-pbold text-3xl text-white">{number}</Text>
      <Text className="font-psemibold text-xl text-white">{type}</Text>
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-8 w-full items-center justify-center px-4">
            <TouchableOpacity
              className="mr-8 w-full items-end"
              onPress={logOut}
            >
              <Image
                source={icons.logout}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="my-8 w-full flex-1 items-center justify-center">
              <Image
                source={{ uri: user?.avatar }}
                className="h-20 w-20 rounded-xl"
                resizeMode="contain"
              />
              <Text className="mt-4 text-3xl text-white">{user?.username}</Text>
            </View>

            <View className="h-20 flex-row items-center justify-center gap-5">
              <ProfileText number="10" type="Posting" />
              <ProfileText number="1.2K" type="Views" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
