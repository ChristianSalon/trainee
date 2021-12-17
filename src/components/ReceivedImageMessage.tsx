import React from "react";
import { Avatar, Box, HStack, Image, Pressable } from "native-base";
import { ImageMessageProps } from "../types";
import { useNavigation } from "@react-navigation/native";

const ReceivedImageMessage: React.FC<ImageMessageProps> = ({ message }) => {
  const navigation = useNavigation();
  const imageAspectRatio = message.width / message.height;

  return (
    <HStack space="xs" mx="2" my="1" alignItems="flex-end">
      <Avatar bg="transparent" size="sm" source={{ uri: message.photoURL }} />
      <Pressable
        onPress={() => navigation.navigate("ImageDetail", { message: message })}
      >
        <Box bg="gray.200" maxWidth="80%" rounded="xl">
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
    </HStack>
  );
};

export default ReceivedImageMessage;
