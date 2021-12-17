import React from "react";
import { Avatar, Box, HStack, Image } from "native-base";
import { ImageMessageProps } from "../types";

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
        <Image
          source={{
            uri: message.content,
          }}
          alt="Image Message"
          size="2xl"
          resizeMode="cover"
          rounded="xl"
        />
      </Box>
    </HStack>
  );
};

export default ReceivedImageMessage;
