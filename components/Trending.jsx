import { useState } from "react";
import * as Animatable from "react-native-animatable";

import { ResizeMode, Video } from "expo-av";
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { icons } from "../constants";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  0.1: {
    scale: 0.91,
  },
  0.2: {
    scale: 0.92,
  },
  0.3: {
    scale: 0.93,
  },
  0.4: {
    scale: 0.94,
  },
  0.5: {
    scale: 0.95,
  },
  0.6: {
    scale: 0.96,
  },
  0.7: {
    scale: 0.97,
  },
  0.8: {
    scale: 0.98,
  },
  0.9: {
    scale: 0.99,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  0.1: {
    scale: 0.99,
  },
  0.2: {
    scale: 0.98,
  },
  0.3: {
    scale: 0.97,
  },
  0.4: {
    scale: 0.96,
  },
  0.5: {
    scale: 0.95,
  },
  0.6: {
    scale: 0.94,
  },
  0.7: {
    scale: 0.93,
  },
  0.8: {
    scale: 0.92,
  },
  0.9: {
    scale: 0.91,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          className="mt-3 h-72 w-52 rounded-[33px] bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="my-5 h-72 w-52 overflow-hidden rounded-[33px] shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 700,
      }}
      contentOffset={{ x: 200 }}
    />
  );
};

export default Trending;
