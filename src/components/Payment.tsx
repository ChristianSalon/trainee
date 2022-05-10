import { useNavigation } from "@react-navigation/native";
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Pressable,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import { Payment as PaymentProps } from "../types";
import { auth } from "../firebase";

interface Props {
  payment: PaymentProps;
  onRefresh: () => Promise<void>;
}

const Payment: React.FC<Props> = ({ payment, onRefresh }) => {
  const navigation = useNavigation();
  const dueDate = new Date(payment.dueDate);
  const timestamp = new Date();
  let bgColor;
  let settledText;
  if (payment.settledAt === null && dueDate < timestamp) {
    const diff = Math.ceil(
      (timestamp.getTime() - dueDate.getTime()) / (1000 * 3600 * 24)
    );
    settledText = "Overdue " + diff + (diff === 1 ? " day" : " days");
    bgColor = "red.200";
  } else if (payment.settledAt === null && dueDate > timestamp) {
    const diff = Math.ceil(
      (dueDate.getTime() - timestamp.getTime()) / (1000 * 3600 * 24)
    );
    settledText = "Due in " + diff + (diff === 1 ? " day" : " days");
    bgColor = "warning.200";
  } else if (payment.settledAt !== null) {
    settledText = new Date(payment.settledAt).toLocaleDateString();
    bgColor = "primary.200";
  }

  const toast = useToast();
  const { colorMode } = useColorMode();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const user = await axios.get(
      `https://trainee.software/payments/customers/${auth.currentUser.uid}`
    );
    const response = await axios.post(`https://trainee.software/payments`, {
      customerId: user.data[0].customerId,
      accountId: payment.accountId,
      amount: payment.amount,
      paymentId: payment.paymentId,
    });
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await response.data;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: "Trainee",
      style: colorMode === "light" ? "alwaysLight" : "alwaysDark",
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      toast.show({
        description: error.message,
      });
    } else {
      toast.show({
        description: "Payment successful",
      });
      await onRefresh();
    }
  };

  return (
    <>
      <Pressable
        mt="4"
        mx="16px"
        onPress={payment.settledAt ? null : openPaymentSheet}
      >
        <Box
          justifyContent="center"
          p="4"
          rounded="md"
          bg={useColorModeValue("white", "dark.100")}
        >
          <VStack space="1">
            <HStack justifyContent="space-between" alignItems="center">
              <Heading size="lg">{payment.amount}€</Heading>
              <Box py="1" px="2" bg={bgColor} rounded="lg">
                <Text fontSize="sm" color="gray.600">
                  {settledText}
                </Text>
              </Box>
            </HStack>
            <Text
              color={useColorModeValue("gray.600", "gray.400")}
              fontSize="md"
            >
              {payment.name}
            </Text>
            {payment.details && (
              <Text color="gray.500" fontSize="sm">
                {payment.details}
              </Text>
            )}
          </VStack>
        </Box>
      </Pressable>

      {/*<Box
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        p="5"
        zIndex={10}
        bg="gray.300"
        rounded="md"
        position="absolute"
        top="0"
        bottom="0"
      >
        <VStack space="2">
          <Spinner size="lg" color="primary.500" />
          <Text fontSize="md" color="gray.600">
            Loading...
          </Text>
        </VStack>
      </Box>*/}
    </>
  );
};

export default Payment;
