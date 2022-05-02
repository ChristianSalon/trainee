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
            uri: "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/aQtYSI4Xr16ypOGBzeYH%2Fvideos%2Ffile_example_MP4_480_1_5MG.mp4?alt=media&token=8f665c8d-34b1-4cef-9d77-eb3b49739125",
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
