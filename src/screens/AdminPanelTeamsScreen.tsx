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
import { auth } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { Team } from "../components/AdminPanel";

const AdminPanelTeamsScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const response = await axios.get(
        `http://192.168.0.105:3000/admin/teams/${auth.currentUser.uid}`
      );
      setTeams(response.data);
    };
    getTeams();
    return () => {
      getTeams;
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
        data={teams}
        renderItem={({ item }) => <Team team={item} />}
        keyExtractor={(item) => item.team_id}
      />
      <Fab
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => navigation.navigate("Create New Team")}
      />
    </NativeBaseProvider>
  );
};

export default AdminPanelTeamsScreen;
