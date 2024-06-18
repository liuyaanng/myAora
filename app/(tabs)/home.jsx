import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { images } from "../../constants";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            video={item.video}
            prompt={item.prompt}
            thumbnail={item.thumbnail}
            creator={item?.creator?.username}
            avatar={item?.creator?.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        // ItemSeparatorComponent={<Text>i am a separator</Text>}
        ListHeaderComponent={
          <View className="my-6 flex space-y-6 px-4">
            <View className="mb-6 flex flex-row items-start justify-between">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
            <View className="w-full flex-1 pb-8 pt-5">
              <Text className="mx-4 mb-3 font-pregular text-lg text-gray-300">
                Trending videos
              </Text>
            </View>
            <Trending posts={latestPosts ?? []} />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Home;
