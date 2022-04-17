import React from "react";
import {
  Text,
  Box,
  VStack,
  HStack,
  Avatar,
  Divider,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useTeam } from "../hooks";
import { Roles, TeamProps } from "../types";
import axios from "axios";
import { auth } from "../firebase";

const Team: React.FC<TeamProps> = ({ team }) => {
  const navigation = useNavigation();
  const { setTeam, setRoles } = useTeam();

  const navigateToClub = async () => {
    setTeam({
      teamId: team.teamId,
      name: team.name,
      photoURL: team.photoURL,
      clubId: team.clubId,
    });
    const results = await axios.get(
      `http://192.168.0.105:3000/roles/team/${team.teamId}/user/${auth.currentUser.uid}`
    );
    setRoles(results.data);
    navigation.navigate("Team", { team });
  };

  return (
    <Pressable onPress={() => navigateToClub()}>
      {/*<Divider />*/}
      <Box justifyContent="center" py="3" px="20px">
        <HStack alignItems="center" space={4}>
          <Avatar bg="transparent" size="lg" source={{ uri: team.photoURL }} />
          <VStack flex="1">
            <Text fontSize="lg" noOfLines={1} isTruncated>
              {team.clubName}
            </Text>
            <Text noOfLines={2} isTruncated>
              {team.name}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Team;
