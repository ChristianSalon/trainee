import React from "react";
import { Box } from "native-base";
import { TextMessageProps } from "../types";

const SendedTextMessage: React.FC<TextMessageProps> = ({ message }) => {
  return (
    <Box
      bg={{
        linearGradient: {
          colors: ["primary.300", "primary.600"],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      p="3"
      mx="2"
      my="1"
      maxWidth="70%"
      rounded="xl"
      alignSelf="flex-end"
      _text={{
        color: "lightText",
      }}
    >
      {message.content}
    </Box>
  );
};

export default SendedTextMessage;
