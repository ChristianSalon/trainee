import React, { useEffect, useState } from "react";
import { NativeBaseProvider, FlatList, Box } from "native-base";
import { Event, Payment } from "../types";
import { StatusBar } from "expo-status-bar";
import { theme } from "../themes";
import { PaymentStatus } from "../components/AdminPanel";
import axios from "axios";
import { RefreshControl } from "react-native";
import { useTeam } from "../hooks";
import { API_BASE_URL } from "@env";

const PaymentStatusScreen = ({ route }) => {
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const payment: Payment = route.params.payment;

  const getPaymentStatus = async () => {
    setRefreshing(true);
    const results = await axios.get(
      `${API_BASE_URL}/admin/payments/${payment.paymentId}`
    );
    setPaymentStatus(results.data);
    setRefreshing(false);
  };

  useEffect(() => {
    const getPaymentStatus = async () => {
      const results = await axios.get(
        `${API_BASE_URL}/admin/payments/${payment.paymentId}`
      );
      setPaymentStatus(results.data);
    };
    getPaymentStatus();
  }, []);

  return (
    <>
      <FlatList
        data={paymentStatus}
        renderItem={({ item }) => <PaymentStatus paymentStatus={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getPaymentStatus}
          />
        }
      />
    </>
  );
};

export default PaymentStatusScreen;
