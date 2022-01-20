import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { db, auth } from "../firebase";
import {
  NativeBaseProvider,
  FlatList,
  Fab,
  Icon,
  Heading,
  Box,
  Image,
  HStack,
  Pressable,
  Avatar,
} from "native-base";
import { theme } from "../themes";
import { Team } from "../components";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);

  /*useEffect(() => {
    db.collection("teams")
      .where("members", "array-contains", auth.currentUser.uid)
      .orderBy("name", "asc")
      .get()
      .then((snapshot) => {
        setTeams(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
  }, []);*/

  useEffect(() => {
    const getTeams = async () => {
      const results = await axios.get(
        `http://192.168.0.105:3000/teams/${auth.currentUser.uid}`
      );
      setTeams(results.data);
    };
    getTeams();
    return () => {
      getTeams;
    };
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"dark"} />
      <Box flex="1" safeAreaTop>
        <HStack
          px="20px"
          pt="20px"
          pb="10px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading>Your Teams</Heading>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Avatar
              size="sm"
              source={{
                uri: auth.currentUser.photoURL,
              }}
            />
          </Pressable>
        </HStack>
        <FlatList
          data={teams}
          renderItem={({ item }) => <Team team={item} />}
          keyExtractor={(item) => item.teamId}
        />
        <Fab
          icon={<Icon color="white" as={<Feather name="edit-3" />} size="sm" />}
          onPress={() => navigation.navigate("Admin Panel")}
        />
      </Box>
    </NativeBaseProvider>
  );
};

export default HomeScreen;
