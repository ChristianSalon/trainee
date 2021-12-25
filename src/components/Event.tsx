import React from "react";
import { Box, Center, Heading, HStack, Pressable, Text } from "native-base";
import { EventProps } from "../types";
import { useNavigation } from "@react-navigation/native";

const Event: React.FC<EventProps> = ({ event }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Event", { event })}>
      <Box bg="white" m={2} p={6} rounded="4px">
        <Heading size="sm">{event.name}</Heading>
        <Text mb={4} color="gray.500">
          Attendance: {event.attendanceNumber}
        </Text>
        <HStack justifyContent={"space-between"} alignItems={"flex-end"}>
          <Text color="gray.500" maxWidth="50%" noOfLines={2} isTruncated>
            {event.location}
          </Text>
          <Text color="gray.500">
            {event.startTime} - {event.endTime}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Event;
