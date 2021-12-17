import React from "react";
import { Box, Image, Pressable } from "native-base";
import { ImageMessageProps } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const SendedImageMessage: React.FC<ImageMessageProps> = ({ message }) => {
  const navigation = useNavigation();
  const imageAspectRatio = message.width / message.height;

  return (
    <Pressable
      onPress={() => navigation.navigate("ImageDetail", { message: message })}
    >
      <Box mx="2" my="1" maxWidth="70%" alignSelf="flex-end">
        <Image
          source={{
            uri: message.content,
          }}
          alt="Image Message"
          size="2xl"
          rounded="xl"
          resizeMode="cover"
          style={{
            width: message.width > message.height ? "100%" : undefined,
            height: message.width > message.height ? undefined : 300,
            aspectRatio: imageAspectRatio,
          }}
        />
      </Box>
    </Pressable>
  );
};

export default SendedImageMessage;
