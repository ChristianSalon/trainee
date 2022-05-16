import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  NativeBaseProvider,
  FlatList,
  Fab,
  Icon,
} from "native-base";
import { theme } from "../themes";
import { Club } from "../components/AdminPanel";
import { auth } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { RefreshControl } from "react-native";

const AdminPanelClubsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [clubs, setClubs] = useState([]);

  const getClubs = async () => {
    const response = await axios.get(
      `https://trainee.software/admin/clubs/${auth.currentUser.uid}`
    );
    setClubs(response.data);
  };

  useEffect(() => {
    getClubs();
  }, []);

  const navigate = () => {
    navigation.navigate("Create New Club");
  };

  return (
    <>
      <FlatList
        data={clubs}
        renderItem={({ item }) => <Club club={item} />}
        keyExtractor={(item) => item.clubId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getClubs} />
        }
      />
      <Fab
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={navigate}
        placement="bottom-right"
        renderInPortal={false}
      />
    </>
  );
};

export default AdminPanelClubsScreen;
