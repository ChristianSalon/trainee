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

const AdminPanelPaymentsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [payments, setPayments] = useState([]);

  const getPayments = async () => {
    const response = await axios.get(
      `http://192.168.0.105:3000/admin/payments/team/TWsAkjtqo9GqGtudyL5M`
    );
    setPayments(response.data);
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <FlatList
        data={payments}
        renderItem={({ item }) => <Payment payment={item} />}
        keyExtractor={(item) => item.team_id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getPayments} />
        }
      />
      <Fab
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => navigation.navigate("Create New Payment")}
      />
    </NativeBaseProvider>
  );
};

export default AdminPanelPaymentsScreen;
