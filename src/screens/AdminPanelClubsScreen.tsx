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

  /*const getUsers = () => {
    axios
      .get("https://trainee.software/clubs")
      .then((response) => {
        // handle success
        console.log(response);
        setClubs(response.data);
        console.log(clubs);
      })
      .catch((error) => {
        // handle error
        console.log(error.message);
      });
  };*/

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
        onPress={() => navigation.navigate("Create New Club")}
        placement="bottom-right"
        renderInPortal={false}
      />
    </>
  );
};

export default AdminPanelClubsScreen;
