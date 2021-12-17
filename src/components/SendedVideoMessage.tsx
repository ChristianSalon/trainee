import React, { useState } from "react";
import { Box, Button, Image, Pressable } from "native-base";
import { VideoMessageProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";

const SendedVideoMessage: React.FC<VideoMessageProps> = ({ message }) => {
  const navigation = useNavigation();
  const [status, setStatus] = useState({});
  const video = React.useRef(null);

  return (
    <Box
      mx="2"
      my="1"
      maxWidth="70%"
      rounded="xl"
      alignSelf="flex-end"
      bg={{
        linearGradient: {
          colors: ["primary.300", "primary.600"],
          start: [0, 0],
          end: [1, 0],
        },
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
  );
};

export default SendedVideoMessage;
