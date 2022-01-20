import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  Box,
  Text,
  NativeBaseProvider,
  Heading,
  HStack,
  VStack,
  ScrollView,
  Divider,
} from "native-base";
import { useTeam } from "../hooks";
import { theme } from "../themes";
import { StatusBar } from "expo-status-bar";

const TeamScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { team } = useTeam();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: team.name,
    });
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"dark"} />
      <Box w="full" h="1px" bg="gray.100" />
      <ScrollView>
        <VStack p="20px" space="30px">
          <Box>
            <Heading size="md" mb="3">
              Upcomig Events
            </Heading>
            <HStack space="3">
              <Box w="100px" h="200px" bg="amber.500" />
              <Box w="100px" h="200px" bg="blue.500" />
              <Box w="100px" h="200px" bg="red.500" />
            </HStack>
            {/* Events na 3 dni */}
          </Box>

          <Box>
            <Heading size="md" mb="3">
              Payments
            </Heading>
            <HStack space="3">
              <Box w="100px" h="200px" bg="amber.500" />
              <Box w="100px" h="200px" bg="blue.500" />
              <Box w="100px" h="200px" bg="red.500" />
            </HStack>
            {/* Events na 3 dni */}
          </Box>

          <Box>
            <Heading size="md" mb="3">
              Messages
            </Heading>
            <VStack space="3">
              <Box w="100%" h="50px" bg="amber.500" />
              <Box w="100%" h="50px" bg="blue.500" />
              <Box w="100%" h="50px" bg="red.500" />
            </VStack>
            {/* Events na 3 dni */}
          </Box>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default TeamScreen;
