import {
  Box,
  Text,
  NativeBaseProvider,
  FlatList,
  Fab,
  Icon,
} from "native-base";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { RefreshControl } from "react-native";
import { theme } from "../themes";
import { User } from "../components/AdminPanel";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const ManageUsersScreen = ({ route }) => {
  const navigation = useNavigation();
  const { team } = route.params;
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getUsers = async () => {
    if (users === []) {
      setRefreshing(true);
    }
    const results = await axios.get(
      `https://trainee.software/admin/users/${team.teamId}`
    );
    setUsers(results.data);
    setRefreshing(false);
  };

  const onDelete = (userId: string) => {
    const filteredData = users.filter((user) => user.userId !== userId);
    setUsers(filteredData);
  };

  const onEdit = (userId: string, role: string) => {
    setUsers(
      users.map((user) => {
        if (user.userId === userId) {
          user.role = role;
        }
        return user;
      })
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <User user={item} onDelete={onDelete} onEdit={onEdit} />
        )}
        keyExtractor={(item) => item.userId.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getUsers} />
        }
      />
      <Fab
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => navigation.navigate("Add New Users", { team })}
        placement="bottom-right"
        renderInPortal={false}
      />
    </>
  );
};

export default ManageUsersScreen;
