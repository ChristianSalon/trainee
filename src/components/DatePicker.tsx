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

const DatePicker = ({ title, date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
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
        {show && (
          <DateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Box>
    </VStack>
  );
};

export default DatePicker;
