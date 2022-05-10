import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import {
  Box,
  HStack,
  Pressable,
  Text,
  useColorModeValue,
  VStack,
} from "native-base";

const DTPicker = ({ title, date, setDate }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  return (
    <VStack space="1">
      <HStack justifyContent="space-between">
        <Text color={useColorModeValue("dark.300", "gray.500")} fontSize="12">
          {title}
        </Text>
      </HStack>
      <Box
        py="3"
        px="2"
        w="full"
        rounded="sm"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        borderColor={useColorModeValue("gray.300", "gray.700")}
        borderWidth="1"
      >
        <Pressable fontSize="sm" onPress={showDatePicker}>
          <Text>{date.toDateString()}</Text>
        </Pressable>
        <Pressable fontSize="sm" onPress={showTimePicker}>
          <Text>{date.toLocaleTimeString().slice(0, 5)}</Text>
        </Pressable>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Box>
    </VStack>
  );
};

export default DTPicker;
