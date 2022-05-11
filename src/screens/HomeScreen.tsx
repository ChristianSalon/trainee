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
  Center,
  HStack,
  Pressable,
  Avatar,
  Alert,
  VStack,
  Text,
  CloseIcon,
  IconButton,
  Button,
  useColorModeValue,
} from "native-base";
import { theme } from "../themes";
import { Team } from "../components";
import { RefreshControl, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [teams, setTeams] = useState([]);
  const isEmailVerified = auth.currentUser.emailVerified ? true : false;

  const getTeams = async () => {
    const results = await axios.get(
      `https://trainee.software/teams/${auth.currentUser.uid}`
    );
    setTeams(results.data);
  };

  const getTeamsOnRefresh = async () => {
    setRefreshing(true);
    await getTeams();
    setRefreshing(false);
  };

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    });
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <>
      <StatusBar style={useColorModeValue("dark", "light")} />
      {isEmailVerified ? (
        <Box flex="1" bg={useColorModeValue("white", "dark.50")} safeAreaTop>
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getTeamsOnRefresh}
              />
            }
          />
          <Fab
            icon={
              <Icon color="white" as={<Feather name="edit-3" />} size="sm" />
            }
            onPress={() => navigation.navigate("Admin Panel Clubs Screen")}
            placement="bottom-right"
            renderInPortal={false}
          />
        </Box>
      ) : (
        <Center flex="1" w="full">
          <Alert w="90%" maxW="400" status="info" colorScheme="info" mb="2">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                    Verify your account!
                  </Text>
                </HStack>
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: "coolGray.600",
                }}
              >
                If you want to use Trainee, you need to verify your email. If
                you already verified your email, click the button below and sign
                in again.
              </Box>
            </VStack>
          </Alert>
          <Button
            size="md"
            variant="link"
            _text={{ underline: true, color: "dark.500" }}
            onPress={signOut}
          >
            I already verified my account
          </Button>
        </Center>
      )}
    </>
  );
};

export default HomeScreen;
