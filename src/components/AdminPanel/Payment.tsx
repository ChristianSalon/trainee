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
  useToast,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { Payment as PaymentProps } from "../../types";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { DeleteModal } from "..";
import { useClub } from "../../hooks";
import { auth } from "../../firebase";
import { API_BASE_URL } from "@env";

interface Props {
  payment: PaymentProps;
  onDelete: (paymentId: number) => void;
  onEdit: () => Promise<void>;
}

const Payment: React.FC<Props> = ({ payment, onEdit, onDelete }) => {
  const navigation = useNavigation();
  const { club } = useClub();
  const toast = useToast();
  const dueDate = new Date(payment.dueDate);
  const bgColor =
    dueDate.getTime() < Date.now() - 86400000
      ? useColorModeValue("red.200", "red.400")
      : useColorModeValue("green.200", "green.400");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deletePayment = async () => {
    const response = await axios.delete(
      `${API_BASE_URL}/admin/payments/${payment.paymentId}`
    );
    if (response.status === 200) {
      axios.post(`${API_BASE_URL}/notifications/clubs`, {
        clubId: club.clubId,
        userId: auth.currentUser.uid,
        title: club.name,
        body: `Payment ${payment.name} has been deleted.`,
      });
      toast.show({ description: "Payment deleted." });
      onDelete(payment.paymentId);
      setShowDeleteModal(false);
    } else {
      toast.show({ description: "Payment could not be deleted." });
    }
  };

  const showModal = () => {
    setShowDeleteModal(true);
  };

  const navigate = () => {
    navigation.navigate("Edit Payment", { payment, onEdit });
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
            onPress={navigate}
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
            onPress={showModal}
          />
        </VStack>
      </HStack>
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onDelete={deletePayment}
          headerText={"Delete Payment"}
        />
      )}
    </Box>
  );
};

export default Payment;
