import { HStack, Icon, Pressable, Text, useColorModeValue } from "native-base";
import React, { ProfilerProps, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { SelectModal } from ".";
import { SelectModalInputProps } from "../types";

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  value: string[];
  onValueChange: (newValue: string[]) => void;
  placeholder: string;
  data: SelectModalInputProps[];
}

const SelectModalInput: React.FC<Props> = ({
  value,
  onValueChange,
  isLoading,
  setIsLoading,
  placeholder,
  data,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    data.length === 0 ? setIsLoading(true) : setIsLoading(false);
  }, [data]);

  return (
    <Pressable
      py="3"
      px="2"
      w="full"
      rounded="sm"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderWidth="1"
      fontSize="sm"
      onPress={() => setShowModal(true)}
    >
      <HStack flex="1" justifyContent="space-between" alignItems="center">
        <Text
          color={
            value.length === 0
              ? "gray.400"
              : useColorModeValue("darkText", "gray.200")
          }
          fontSize="xs"
          noOfLines={1}
          isTruncated
          maxW="90%"
        >
          {value.length === 0
            ? placeholder
            : value
                .map((objectId) => {
                  const object = data.find(
                    (object) => object.value === objectId
                  );
                  return object ? object.text : null;
                })
                .join(", ")}
        </Text>
        <Icon as={Feather} name="chevrons-down" color="gray.400" size={18} />
      </HStack>
      {showModal && (
        <SelectModal
          showModal={showModal}
          setShowModal={setShowModal}
          value={value}
          onValueChange={onValueChange}
          isLoading={isLoading}
          headerText={placeholder}
          data={data}
        />
      )}
    </Pressable>
  );
};

export default SelectModalInput;
