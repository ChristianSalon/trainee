import React from "react";
import { Pressable, HStack, VStack, Text } from "native-base";
import { Feather } from "@expo/vector-icons";

interface Props {
  icon: React.ReactElement;
  value: string;
  placeholder?: string;
  onPress: () => void;
}

const SettingsOption: React.FC<Props> = ({
  icon,
  value,
  placeholder,
  onPress,
}) => {
  return (
    <Pressable onPress={() => onPress()}>
      <HStack space="6" alignItems="center">
        {icon}
        <VStack>
          <Text fontSize="md">{value}</Text>
          {placeholder && <Text color="gray.500">{placeholder}</Text>}
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default SettingsOption;
