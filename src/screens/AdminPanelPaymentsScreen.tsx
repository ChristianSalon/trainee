import axios from "axios";
import {
  Box,
  Fab,
  FlatList,
  Icon,
  NativeBaseProvider,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { auth } from "../firebase";
import { theme } from "../themes";
import { AntDesign } from "@expo/vector-icons";
import { Payment, Team } from "../components/AdminPanel";
import { useClub } from "../hooks";

const AdminPanelPaymentsScreen = ({ navigation }) => {
  const { club } = useClub();
  const [refreshing, setRefreshing] = useState(false);
  const [payments, setPayments] = useState([]);

  const getPayments = async () => {
    const response = await axios.get(
      `https://trainee.software/admin/payments/club/${club.clubId}`
    );
    setPayments(response.data);
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <FlatList
        data={payments}
        renderItem={({ item }) => <Payment payment={item} />}
        keyExtractor={(item) => item.paymentId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getPayments} />
        }
      />
      <Fab
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => navigation.navigate("Create New Payment")}
        placement="bottom-right"
        renderInPortal={false}
      />
    </>
  );
};

export default AdminPanelPaymentsScreen;
