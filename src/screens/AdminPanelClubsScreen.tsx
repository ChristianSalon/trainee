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

const AdminPanelClubsScreen = ({ navigation }) => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const getClubs = async () => {
      const response = await axios.get(
        `http://192.168.0.105:3000/admin/clubs/${auth.currentUser.uid}`
      );
      setClubs(response.data);
    };
    getClubs();
    return () => {
      getClubs;
    };
  }, []);

  /*const getUsers = () => {
    axios
      .get("http://192.168.0.105:3000/clubs")
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
    <NativeBaseProvider theme={theme}>
      <FlatList
        data={clubs}
        renderItem={({ item }) => <Club club={item} />}
        keyExtractor={(item) => item.club_id}
      />
      <Fab
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => navigation.navigate("Create New Club")}
      />
    </NativeBaseProvider>
  );
};

export default AdminPanelClubsScreen;
