import React, { useState } from "react";
import {
  Avatar,
  Box,
  HStack,
  VStack,
  Text,
  Pressable,
  useColorModeValue,
} from "native-base";
import { TextMessageProps } from "../types";
const ReceivedTextMessage: React.FC<TextMessageProps> = ({ message }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <VStack space="2" mx="2" my="1">
      <HStack space="xs" alignItems="flex-end">
        <Avatar bg="transparent" size="sm" source={{ uri: message.photoURL }} />

        <Pressable maxWidth="70%" onPress={() => setShowDetails(!showDetails)}>
          <Box
            bg={useColorModeValue("gray.200", "gray.500")}
            p="3"
            rounded="2xl"
            _text={{
              color: "darkText",
            }}
          >
            {message.content}
            {showDetails && (
              <Box pt="1">
                <Text
                  fontSize="xs"
                  color={useColorModeValue("gray.400", "gray.800")}
                >
                  {message.name}
                </Text>
                <Text
                  fontSize="xs"
                  color={useColorModeValue("gray.400", "gray.800")}
                >
                  {new Date(message.createdAt.seconds * 1000).toLocaleString()}
                </Text>
              </Box>
            )}
          </Box>
        </Pressable>
      </HStack>
    </VStack>
  );
};

export default ReceivedTextMessage;
