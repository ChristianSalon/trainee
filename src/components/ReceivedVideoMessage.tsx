import React, { useEffect, useState } from "react";
import { Avatar, Box, HStack, Image, Pressable } from "native-base";
import { ImageMessageProps } from "../types";
import { Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ReceivedImageMessage: React.FC<ImageMessageProps> = ({ message }) => {
  const navigation = useNavigation();
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const generateThumbnail = async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          //message.content
          "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/aQtYSI4Xr16ypOGBzeYH%2Fvideos%2Ffile_example_MP4_480_1_5MG.mp4?alt=media&token=8f665c8d-34b1-4cef-9d77-eb3b49739125"
        );
        setThumbnail(uri);
      } catch (e) {
        console.log(e);
      }
    };
    generateThumbnail();
  }, []);

  return (
    <HStack space="xs" mx="2" my="1" alignItems="flex-end">
      <Avatar bg="transparent" size="sm" source={{ uri: message.photoURL }} />
      <Box
        bg="gray.200"
        maxWidth="70%"
        rounded="xl"
        _text={{
          color: "darkText",
        }}
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
    </HStack>
  );
};

export default ReceivedImageMessage;
