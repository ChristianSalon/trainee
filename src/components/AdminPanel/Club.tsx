import React from "react";
import { Box, HStack, Avatar, Text, IconButton, Pressable } from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useClub } from "../../hooks";
import { Club as ClubProps } from "../../types";

interface Props {
  club: ClubProps;
}

const Club: React.FC<Props> = ({ club }) => {
  const navigation = useNavigation();
  const { setClub } = useClub();

  const deleteClub = () => {
    axios
      .delete(`https://trainee.software/admin/clubs/${club.clubId}`)
      .then((response) => {
        console.log(response);
        db.collection("clubs").doc(club.clubId).delete();
        db.collection("teams")
          .get()
          .where("clubId", "==", club.clubId)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.delete();
            });
          });
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
            onPress={deleteClub}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default Club;
