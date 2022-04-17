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

const AddNewUsersScreen = ({ route }) => {
  const { team } = route.params;
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const getUsers = async (text: string) => {
    setSearch(text);
    const results = await axios.get(`http://192.168.0.105:3000/users/${text}`);
    setUsers(results.data);
  };

  return (
    <NativeBaseProvider theme={theme}>
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
          keyExtractor={(item) => item.user_id}
        />
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default AddNewUsersScreen;
