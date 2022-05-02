import { useNavigation } from "@react-navigation/native";
import {
  AlertDialog,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Pressable,
  Text,
  useColorModeValue,
  VStack,
} from "native-base";
import React, { useRef, useState } from "react";
import { Payment as PaymentProps } from "../../types";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

interface Props {
  payment: PaymentProps;
}

const Payment: React.FC<Props> = ({ payment }) => {
  const navigation = useNavigation();
  const dueDate = new Date(payment.dueDate);
  const bgColor =
    dueDate.getTime() < Date.now() - 86400000 ? "red.200" : "green.200";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onClose = () => setIsDialogOpen(false);
  const cancelRef = useRef(null);

  const deletePayment = () => {
    axios
      .delete(`http://192.168.0.105:3000/admin/payments/${payment.paymentId}`)
      .then(() => onClose());
  };

  return (
    <Box justifyContent="center" px="20px" py="10px">
      <HStack space="3">
        <Box bg={bgColor} w="6px" />
        <Box p="1" flex="1">
          <Text fontSize="lg" mb="2" noOfLines={2} isTruncated>
            {payment.name}
          </Text>
          <VStack space="1">
            <Text color={useColorModeValue("gray.600", "gray.500")}>
              Due date: {dueDate.toLocaleDateString()}
            </Text>
            <Text color={useColorModeValue("gray.600", "gray.500")}>
              Amount: {payment.amount}€
            </Text>
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
            onPress={() => navigation.navigate("Edit Payment", { payment })}
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
            onPress={() => setIsDialogOpen(!isDialogOpen)}
          />
        </VStack>
      </HStack>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDialogOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Delete Payment</AlertDialog.Header>
          <AlertDialog.Body>
            This will delete the selected payment! Are you sure?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="link"
                colorScheme="gray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button onPress={deletePayment} colorScheme="red">
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default Payment;
