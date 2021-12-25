import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { theme } from "../themes";

const VideoDetailScreen = ({ route }) => {
  const { uri } = route.params;
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"dark"} />
      <Video
        style={{ width: "100%", height: "100%" }}
        source={{
          uri,
        }}
        shouldPlay
        useNativeControls
        resizeMode="contain"
      />
    </NativeBaseProvider>
  );
};

export default VideoDetailScreen;
