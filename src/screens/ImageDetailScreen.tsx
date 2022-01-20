import React from "react";
import { Center, Text, Image, NativeBaseProvider } from "native-base";
import ImageZoom from "react-native-image-pan-zoom";
import { Dimensions } from "react-native";
import { theme } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const ImageDetailScreen = ({ route }) => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"light"} />
      <Center justifyContent="center" safeArea pb="5" bg="black">
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={width}
          imageHeight={height}
        >
          <Image
            source={{
              uri: route.params.message.content,
            }}
            alt="Image Message"
            size="full"
            resizeMode="contain"
          />
        </ImageZoom>
      </Center>
    </NativeBaseProvider>
  );
};

export default ImageDetailScreen;
