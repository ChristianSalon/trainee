import React from "react";
import { Box, HStack, Avatar, Text, IconButton } from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

interface Props {
  team: {
    teamId: string;
    clubId: string;
    name: string;
    photoURL: string;
  };
}

const Team: React.FC<Props> = ({ team }) => {
  const navigation = useNavigation();

  const deleteTeam = () => {
    console.log(team);
    axios
      .delete(`http://192.168.0.105:3000/admin/teams/${team.teamId}`)
      .then((response) => {
        console.log(response);
        db.collection("teams").doc(team.teamId).delete();
      });
  };

  const editTeam = () => {
    navigation.navigate("Edit Team", { team });
  };

  return (
    <Box justifyContent="center" px="20px" py="10px">
      <HStack alignItems="center" space="3">
        <Avatar bg="transparent" size="lg" source={{ uri: team.photoURL }} />
        <Text fontSize="md" flex="1" noOfLines={2} isTruncated>
          {team.name}
        </Text>
        <HStack space="2">
          <IconButton
            size="lg"
            borderRadius="xl"
            variant="solid"
            _icon={{
              as: Feather,
              name: "edit",
              size: "xs",
            }}
            colorScheme="gray"
            onPress={editTeam}
          />
          <IconButton
            size="lg"
            borderRadius="xl"
            variant="solid"
            _icon={{
              as: Feather,
              name: "trash-2",
              size: "xs",
            }}
            colorScheme="red"
            onPress={deleteTeam}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default Team;
