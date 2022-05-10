import React from "react";
import { Box, HStack, VStack, Avatar, Text, Heading } from "native-base";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase";
import { useTeam } from "../hooks";

interface Props {
  attendance: {
    id: number;
    userId: string;
    eventId: string;
    isComing: boolean;
    excuseNote: string | null | undefined;
    date: string;
    name: string;
    photoURL: string;
  };
}

const Attendance: React.FC<Props> = ({ attendance }) => {
  const date = new Date(attendance.date);
  const timestamp = date.toLocaleString();
  const { roles } = useTeam();
  console.log(attendance);

  return (
    <Box w="100%" px="20px" py="10px">
      <VStack space="2">
        <HStack space="3" alignItems="center">
          <Avatar
            size="md"
            bg="transparent"
            source={{ uri: attendance.photoURL }}
          />
          <VStack justifyContent="center">
            <Text fontSize="md" noOfLines={2} isTruncated>
              {attendance.name}
            </Text>
            <Text fontSize="sm" color="gray.500" noOfLines={2} isTruncated>
              {timestamp}
            </Text>
          </VStack>
          <Box position="absolute" right="20px">
            {attendance.isComing ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <Feather name="x" size={24} color="red" />
            )}
          </Box>
        </HStack>
        {roles.isManager && attendance.excuseNote && (
          <Box p="2" rounded="md" bg="red.200">
            <Heading color="red.700" size="xs">
              Excuse Note
            </Heading>
            <Text color="red.700">{attendance.excuseNote}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Attendance;
