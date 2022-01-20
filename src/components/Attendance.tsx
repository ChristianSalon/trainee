import React from "react";
import { Box, HStack, VStack, Avatar, Text } from "native-base";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase";

interface Props {
  attendance: {
    id: number;
    userId: string;
    eventId: string;
    isComing: boolean;
    date: string;
    name: string;
    photoURL: string;
  };
}

const Attendance: React.FC<Props> = ({ attendance }) => {
  const date = new Date(attendance.date);
  const timestamp = date.toLocaleString();

  return (
    <Box w="100%">
      <HStack px="20px" py="10px" space="3" alignItems="center">
        <Avatar
          size="md"
          bg="transparent"
          source={{ uri: attendance.photoURL }}
        />
        <VStack space="1" justifyContent="center">
          <Text bold fontSize="md">
            {attendance.name}
          </Text>
          <Text>{timestamp}</Text>
        </VStack>
        <Box position="absolute" right="20px">
          {attendance.isComing ? (
            <Feather name="check" size={24} color="green" />
          ) : (
            <Feather name="x" size={24} color="red" />
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default Attendance;
