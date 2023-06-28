import React, { useState } from "react";
import { Box, HStack, Avatar, Text, IconButton, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useClub } from "../../hooks";
import { Club as ClubProps } from "../../types";
import { DeleteModal } from "..";
import { API_BASE_URL } from "@env";

interface Props {
  club: ClubProps;
}

const Club: React.FC<Props> = ({ club }) => {
  const navigation = useNavigation();
  const { setClub } = useClub();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteClub = () => {
    axios
      .delete(`${API_BASE_URL}/admin/clubs/${club.clubId}`)
      .then((response) => {
        db.collection("clubs").doc(club.clubId).delete();
        /*db.collection("teams")
          .get()
          .where("clubId", "==", club.clubId)
          .then((querySnapshot) => {
            if (querySnapshot !== undefined) {
              querySnapshot.forEach((doc) => {
                doc.delete();
              });
            }
          });*/
        setShowDeleteModal(false);
      });
  };

  const editClub = () => {
    navigation.navigate("Edit Club", { club });
  };

  const navigateToAdminPanel = () => {
    setClub(club);
    navigation.navigate("Admin Panel", {
      screen: "Admin Panel Teams Screen",
      params: {
        screen: "Admin Panel Teams Screen",
        params: {
          clubId: club.clubId,
        },
      },
    });
  };

  const showModal = () => {
    setShowDeleteModal(true);
  };

  return (
    <Box justifyContent="center" px="20px" py="10px">
      <HStack alignItems="center" space="3">
        <Pressable onPress={navigateToAdminPanel} flex="1">
          <HStack alignItems="center" space="3" flex="1">
            <Avatar
              bg="transparent"
              size="lg"
              source={{ uri: club.photoURL }}
            />
            <Text fontSize="md" flex="1" noOfLines={2} isTruncated>
              {club.name}
            </Text>
          </HStack>
        </Pressable>
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
            onPress={editClub}
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
            onPress={showModal}
          />
        </HStack>
      </HStack>
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          onDelete={deleteClub}
          headerText={"Delete Club"}
        />
      )}
    </Box>
  );
};

export default Club;
