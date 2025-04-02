const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default Expo Metro config
const config = getDefaultConfig(__dirname);


// Use NativeWind with the config
module.exports = withNativeWind(config, { input: "./global.css" });
