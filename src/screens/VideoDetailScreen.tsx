import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import { Box, Center, NativeBaseProvider } from "native-base";
import React from "react";
import { theme } from "../themes";

const VideoDetailScreen = ({ route }) => {
  const { uri } = route.params;
  return (
    <>
      <StatusBar style={"light"} />
      <Center justifyContent="center" safeArea pb="5" bg="black">
        <Video
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: uri,
          }}
          shouldPlay
          useNativeControls
          resizeMode="contain"
        />
      </Center>
    </>
  );
};

export default VideoDetailScreen;
