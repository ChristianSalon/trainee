import React from "react";
import { Box, Center, Heading, HStack, Pressable, Text } from "native-base";
import { EventProps } from "../types";

const Event: React.FC<EventProps> = ({ event }) => {
  console.log(event);
  return (
    <Pressable onPress={() => alert("CBYADICBLADBCL")}>
      <Box bg="white" m={2} p={6} rounded="4px">
        <Heading size="sm">{event.name}</Heading>
        <Text mb={4} color="gray.500">
          Attendance: {event.attendance.length}
        </Text>
        <HStack justifyContent={"space-between"}>
          <Text color="gray.500">{event.location}</Text>
          <Text color="gray.500">
            {event.startTime} - {event.endTime}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Event;
