import { HStack, Icon, Pressable, Text } from "native-base";
import React, { useState } from "react";
import SelectTeamsModal from "./SelectTeamsModal";
import { Feather } from "@expo/vector-icons";

const SelectTeamsInput = ({ value, onValueChange }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Pressable
      py="3"
      px="2"
      w="full"
      rounded="sm"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderColor="gray.200"
      borderWidth="1"
      fontSize="sm"
      onPress={() => setShowModal(true)}
    >
      <HStack flex="1" justifyContent="space-between" alignItems="center">
        <Text color="gray.400" fontSize="xs">
          Select Teams
        </Text>
        <Icon as={Feather} name="chevrons-down" color="gray.400" size={18} />
      </HStack>
      {showModal && (
        <SelectTeamsModal
          showModal={showModal}
          setShowModal={setShowModal}
          value={value}
          onValueChange={onValueChange}
        />
      )}
    </Pressable>
  );
};

export default SelectTeamsInput;
