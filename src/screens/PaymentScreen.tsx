import React, { useEffect, useState } from "react";
import { Box, FlatList, useColorModeValue } from "native-base";
import axios from "axios";
import { auth } from "../firebase";
import { Payment, StatusBar } from "../components";
import { RefreshControl } from "react-native";
import { useTeam } from "../hooks";
import { useStripe } from "@stripe/stripe-react-native";

const PaymentScreen = () => {
  const [payments, setPayments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { team } = useTeam();

  const getPayments = async () => {
    const results = await axios.get(
      `https://trainee.software/payments/team/${team.teamId}/user/${auth.currentUser.uid}`
    );
    setPayments(results.data);
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <StatusBar />
      <Box flex="1">
        <FlatList
          data={payments}
          renderItem={({ item }) => (
            <Payment payment={item} onRefresh={getPayments} />
          )}
          keyExtractor={(item) => item.paymentId.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getPayments} />
          }
          bg={useColorModeValue("gray.100", "dark.50")}
        />
      </Box>
    </>
  );
};

export default PaymentScreen;
