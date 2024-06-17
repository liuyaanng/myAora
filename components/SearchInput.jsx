import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import { router, usePathname } from "expo-router";

import { icons } from "../constants";
const SearchInput = ({ initialQuery }) => {
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname();

  return (
    <View className="h-16 w-full flex-row items-center justify-center space-x-4 rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
      <TextInput
        className="mt-0.5 flex-1 font-pregular text-base text-white"
        placeholder="search a video topic"
        value={query}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            Alert.alert("Can't search", "Please enter a search query");

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
