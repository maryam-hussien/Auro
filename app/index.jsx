import { View, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLogged } = useGlobalContext();
  console.log("isLoading:", isLoading);
  console.log("isLogged:", isLogged);
  if (isLoading) {
    return <Text>Loading...</Text>; // Show a loading indicator instead of returning null
  }
  if (isLogged) {
    console.log("User is logged in, redirecting...");
    return <Redirect href="/home" />;
  } else {
    console.log("User is NOT logged in, showing login screen...");
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full  items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold  text-center">
              Discover Endless Possibalites With{" "}
              <Text className="text-secondary-200">Auro</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration With Aora
          </Text>
          <CustomButton
            title="Continue With Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
