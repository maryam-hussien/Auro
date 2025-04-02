import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { WebView } from "react-native-webview"; // Import WebView for Vimeo embedding

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item, onPress }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={400}
    >
      {play ? (
        <WebView
          source={{ uri: item.video }} // Video URL from your post item
          style={{
            width: 200,
            height: 100,
            borderRadius: 200,
            backgroundColor: "rgba(255 255 255 / 0.1)",
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={(e) => console.error("Error loading video", e.nativeEvent)}
        />
      ) : (
        <TouchableOpacity
          className="justify-center items-center relative"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(!play); // Toggle between play and pause
            onPress();
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg shadow-black/40 my-5"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
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
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem
          activeItem={activeItem}
          item={item}
          onPress={() => setActiveItem(item.$id)}
        />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;
