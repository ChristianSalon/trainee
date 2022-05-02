import React from "react";
import { Box, HStack, VStack, Avatar, Text } from "native-base";
import { Feather } from "@expo/vector-icons";

interface Props {
  paymentStatus: {
    id: number;
    name: string;
    photoURL: string;
    settledAt: string | null | undefined;
  };
}

const PaymentStatus: React.FC<Props> = ({ paymentStatus }) => {
  return (
    <Box w="100%" px="20px" py="10px">
      <VStack space="2">
        <HStack space="3" alignItems="center">
          <Avatar
            size="md"
            bg="transparent"
            source={{ uri: paymentStatus.photoURL }}
          />
          <VStack justifyContent="center">
            <Text fontSize="md" noOfLines={2} isTruncated>
              {paymentStatus.name}
            </Text>
            {paymentStatus.settledAt && (
              <Text fontSize="sm" color="gray.500" noOfLines={2} isTruncated>
                {new Date(paymentStatus.settledAt).toLocaleDateString()}
              </Text>
            )}
          </VStack>
          <Box position="absolute" right="20px">
            {paymentStatus.settledAt ? (
              <Feather name="check" size={24} color="green" />
            ) : (
              <Feather name="x" size={24} color="red" />
            )}
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default PaymentStatus;
