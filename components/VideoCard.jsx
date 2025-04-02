import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { WebView } from "react-native-webview"; // Import WebView for Vimeo embedding

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{
                uri: avatar || "https://example.com/default-avatar.png",
              }}
              className="rounded-lg w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <WebView
          source={{ uri: video }} // Video URL from your post item
          style={{
            width: 330,
            height: 200,
            borderRadius: 700,
            marginTop: "1rem",
            backgroundColor: "rgba(255 255 255 / 0.1)",
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={(e) => console.error("Error loading video", e.nativeEvent)}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 first-line:rounded-xl mt-3 justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3 "
            resizeMode="contain"
          />
          <Image
            source={icons.play}
            className="w-14 h-14 absolute"
            resizeMode="conatin"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
