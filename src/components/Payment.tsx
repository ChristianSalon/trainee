import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Payment as PaymentProps } from "../../types";
import { Feather } from "@expo/vector-icons";

interface Props {
  payment: PaymentProps;
}

const Payment: React.FC<Props> = ({ payment }) => {
  const navigation = useNavigation();
  const dueDate = new Date(payment.dueDate);
  const bgColor = dueDate.getTime() < Date.now() ? "red.200" : "green.200";

  return (
    <Pressable mx="2" my="4" onPress={() => {}}>
      <Box mx={2} rounded="4px">
        <HStack space="4">
          <Box bg={bgColor} w="6px" />
          <Box p={2} flex="1">
            <Heading size="md" mb="2">
              {payment.name}
            </Heading>
            <VStack space="1">
              <Text color="gray.600">
                Due date: {dueDate.toLocaleDateString()}
              </Text>
              <Text color="gray.600">Amount: {payment.amount}</Text>
            </VStack>
          </Box>
          <VStack space="2" justifyContent="center">
            <IconButton
              size="lg"
              borderRadius="xl"
              variant="solid"
              _icon={{
                as: Feather,
                name: "edit",
                size: "xs",
              }}
              colorScheme="gray"
              onPress={() => console.log("edit")}
            />
            <IconButton
              size="lg"
              borderRadius="xl"
              variant="solid"
              _icon={{
                as: Feather,
                name: "trash-2",
                size: "xs",
              }}
              colorScheme="red"
              onPress={() => console.log("delete")}
            />
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Payment;
