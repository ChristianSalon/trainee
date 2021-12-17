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

interface Props {
  team: {
    coaches: string[];
    id: string;
    lastMessage: string;
    members: string[];
    name: string;
    clubName: string;
    photoURL: string;
    updatedAt: {
      nanoseconds: number;
      seconds: number;
    };
  };
}

const Team: React.FC<Props> = ({ team }) => {
  const navigation = useNavigation();
  const { setTeam } = useTeam();

  const navigateToClub = () => {
    setTeam(team);
    navigation.navigate("Team", { team });
  };

  return (
    <Pressable onPress={() => navigateToClub()}>
      {/*<Divider />*/}
      <Box justifyContent="center" px={4} height="100px">
        <HStack alignItems="center" space={4}>
          <Avatar bg="transparent" size="lg" source={{ uri: team.photoURL }} />
          <VStack>
            <Text fontSize="lg">{team.clubName}</Text>
            <Text>{team.name}</Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default Team;
