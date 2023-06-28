import axios from "axios";
import {
  Box,
  Text,
  NativeBaseProvider,
  FlatList,
  KeyboardAvoidingView,
  Center,
  HStack,
  Input,
  IconButton,
  Pressable,
} from "native-base";
import React, { useEffect, useState } from "react";
import { UserRequest } from "../components";
import { theme } from "../themes";
import { Feather } from "@expo/vector-icons";
import { API_BASE_URL } from "@env";

const AddNewUsersScreen = ({ route }) => {
  const { team } = route.params;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async (text: string) => {
    setSearch(text);
    const results = await axios.get(
      `${API_BASE_URL}/users/team/${team.teamId}/${text}`
    );
    setUsers(results.data);
  };

  return (
    <KeyboardAvoidingView flex="1">
      <Box w="100%" h="60px" px="15px" py="10px">
        <Input
          value={search}
          onChangeText={(text) => getUsers(text)}
          flex="1"
          variant="rounded"
          placeholder="Search Users"
        />
      </Box>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserRequest user={item} teamId={team.teamId} />
        )}
        keyExtractor={(item) => item.userId}
      />
    </KeyboardAvoidingView>
  );
};

export default AddNewUsersScreen;
