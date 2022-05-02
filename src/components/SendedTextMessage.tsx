import React, { useState } from "react";
import { Box, Pressable, Text } from "native-base";
import { TextMessageProps } from "../types";

const SendedTextMessage: React.FC<TextMessageProps> = ({ message }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Pressable onPress={() => setShowDetails(!showDetails)}>
      <Box
        bg="primary.500"
        p="3"
        mx="2"
        my="1"
        maxWidth="70%"
        rounded="2xl"
        alignItems="flex-end"
        alignSelf="flex-end"
        _text={{
          color: "lightText",
        }}
      >
        {message.content}
        {showDetails && (
          <Box pt="1">
            <Text fontSize="xs" color="gray.200">
              {new Date(message.createdAt.seconds * 1000).toLocaleString()}
            </Text>
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

export default SendedTextMessage;
