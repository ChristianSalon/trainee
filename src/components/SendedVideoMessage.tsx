import React, { useState, useEffect } from "react";
import { Box, IconButton, Image, Pressable } from "native-base";
import { VideoMessageProps } from "../types";
import { ThemeProvider, useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Entypo } from "@expo/vector-icons";
import { theme } from "../themes";

const SendedVideoMessage: React.FC<VideoMessageProps> = ({ message }) => {
  const navigation = useNavigation();
  //const [status, setStatus] = useState({});
  //const video = React.useRef(null);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          message.content
        );
        setThumbnail(uri);
      } catch (e) {}
    };
    generateThumbnail();
  }, []);

  return (
    <Box
      mx="2"
      my="1"
      maxWidth="70%"
      rounded="xl"
      alignSelf="flex-end"
      bg="primary.500"
    >
      {thumbnail && (
        <Box justifyContent="center" alignItems="center">
          <Image source={{ uri: thumbnail }} size="2xl" rounded="xl" />
          <Pressable
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            justifyContent="center"
            alignItems="center"
            onPress={() =>
              navigation.navigate("VideoDetail", { uri: message.content })
            }
            opacity={0.7}
          >
            <Entypo name="controller-play" size={70} color="gray" />
          </Pressable>
        </Box>
      )}
    </Box>
  );
};

export default SendedVideoMessage;
