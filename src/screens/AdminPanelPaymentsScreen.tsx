import axios from "axios";
import {
  Box,
  Fab,
  FlatList,
  Icon,
  NativeBaseProvider,
  Text,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { auth } from "../firebase";
import { theme } from "../themes";
import { AntDesign } from "@expo/vector-icons";
import { Payment, Team } from "../components/AdminPanel";
import { useClub } from "../hooks";
import { MysqlBoolean, Payment as PaymentProps } from "../types";

const AdminPanelPaymentsScreen = ({ navigation }) => {
  const { club } = useClub();
  const toast = useToast();
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

  const onPress = () => {
    club.isAccountSetUp === MysqlBoolean.True
      ? navigation.navigate("Create New Payment", { onCreate })
      : toast.show({ description: "You need to set up Stripe" });
  };

  const onDelete = (paymentId: number) => {
    const filteredData = payments.filter(
      (payment: PaymentProps) => payment.paymentId !== paymentId
    );
    setPayments(filteredData);
  };

  const onEdit = async () => {
    await getPayments();
  };

  const onCreate = async () => {
    await getPayments();
  };

  return (
    <>
      <FlatList
        data={payments}
        renderItem={({ item }) => (
          <Payment payment={item} onEdit={onEdit} onDelete={onDelete} />
        )}
        keyExtractor={(item: PaymentProps) => item.paymentId.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getPayments} />
        }
      />
      <Fab
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={onPress}
        placement="bottom-right"
        renderInPortal={false}
      />
    </>
  );
};

export default AdminPanelPaymentsScreen;
