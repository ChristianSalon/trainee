import React, { useState } from "react";
import { Box, HStack, Avatar, Text, IconButton } from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { DeleteModal } from "..";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteTeam = () => {
    console.log(team);
    axios
      .delete(`https://trainee.software/admin/teams/${team.teamId}`)
      .then((response) => {
        console.log(response);
        db.collection("teams").doc(team.teamId).delete();
        setShowDeleteModal(false);
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
            onPress={() => setShowDeleteModal(true)}
          />
        </HStack>
      </HStack>
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onDelete={deleteTeam}
          headerText={"Delete Team"}
        />
      )}
    </Box>
  );
};

export default Team;
