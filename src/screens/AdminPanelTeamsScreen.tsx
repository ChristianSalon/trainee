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
import { RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "@env";

interface Props {
  route: {
    params: {
      clubId: string;
    };
  };
}

const AdminPanelTeamsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { clubId } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/admin/teams/club/${clubId}/user/${auth.currentUser.uid}`
    );
    setTeams(response.data);
  };

  useEffect(() => {
    getTeams();
  }, []);

  const navigate = () => {
    navigation.navigate("Create New Team");
  };

  return (
    <>
      <FlatList
        data={teams}
        renderItem={({ item }) => <Team team={item} />}
        keyExtractor={(item) => item.teamId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getTeams} />
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

export default AdminPanelTeamsScreen;
