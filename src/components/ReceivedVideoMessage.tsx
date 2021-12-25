import React from "react";
import { Avatar, Box, HStack, Image } from "native-base";
import { ImageMessageProps } from "../types";
import { Video } from "expo-av";

const ReceivedImageMessage: React.FC<ImageMessageProps> = ({ message }) => {
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
        <Video
          style={{ width: "100%", aspectRatio: 16 / 9, borderRadius: 12 }}
          source={{
            uri: message.content,
          }}
          shouldPlay
          useNativeControls
          resizeMode="contain"
        />
      </Box>
    </HStack>
  );
};

export default ReceivedImageMessage;
