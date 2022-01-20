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
import { TeamProps } from "../types";

const Team: React.FC<TeamProps> = ({ team }) => {
  const navigation = useNavigation();
  const { setTeam } = useTeam();

  const navigateToClub = () => {
    setTeam({
      teamId: team.teamId,
      name: team.name,
      photoURL: team.photoURL,
      clubId: team.clubId,
    });
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
