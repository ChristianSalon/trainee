import React from "react";
import { Center, Text, Image, NativeBaseProvider } from "native-base";
import ImageZoom from "react-native-image-pan-zoom";
import { Dimensions, StatusBar } from "react-native";
import { theme } from "../themes";
import { useNavigation } from "@react-navigation/native";

const ImageDetailScreen = ({ route }) => {
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  return (
    <NativeBaseProvider theme={theme}>
      <Center>
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
