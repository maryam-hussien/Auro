import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MediaType } from "expo-image-picker"; // Import MediaType separately
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import CustomButton from "./../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video"; // Import the video player components
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const submit = async () => {
    if (!form.prompt || !form.video || !form.thumbnail || !form.title) {
      return Alert.alert("please fill in all fields");
    }
    setUploading(true);
    try {
      console.log("Selected Video:", form.video);
      console.log("Selected Thumbnail:", form.thumbnail);

      await createVideo({ ...form, userId: user.$id });
      Alert.alert("success", "post uplouded successfully");
    } catch (error) {
      Alert.alert("ERROR", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
      router.push("/home");
    }
  };
  const openPicker = async (selectType) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "You need to grant access to your media library."
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images // Use MediaType.Images instead of ImagePicker.MediaType.images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3], // Use MediaType.Videos instead of ImagePicker.MediaType.videos
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2));
      }, 1000);
    }
  };
  const player = useVideoPlayer(
    form.video ? form.video.uri : null,
    (player) => {
      if (player) {
        player.loop = true;
        player.play();
      }
    }
  );
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold mb-1">
          Upload Video
        </Text>
        <FormField
          title="Video title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangetext={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 mb-1">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <VideoView
                style={{ width: 350, height: 275, borderRadius: 10 }}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
              />
            ) : (
              <View className="w-full h-40 px-4  bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium mb-1">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View
                className="w-full space-x-2 h-16 px-4 bg-black-100 rounded-2xl justify-center 
              items-center border-2 border-black-100 flex-row"
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium ml-1">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="the prompt you use to create this video"
          handleChangetext={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          containerStyles="mt-7"
          handlePress={submit}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
