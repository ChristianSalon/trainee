import React from "react";
import { Avatar, Box, HStack } from "native-base";
import { TextMessageProps } from "../types";

const ReceivedTextMessage: React.FC<TextMessageProps> = ({ message }) => {
  return (
    <HStack space="xs" mx="2" my="1" alignItems="flex-end">
      <Avatar bg="transparent" size="sm" source={{ uri: message.photoURL }} />
      <Box
        bg="gray.200"
        p="3"
        maxWidth="70%"
        rounded="2xl"
        _text={{
          color: "darkText",
        }}
      >
        {message.content}
      </Box>
    </HStack>
  );
};

export default ReceivedTextMessage;
