import React from "react";
import { Box, HStack, Avatar, Text, IconButton } from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

interface Props {
  club: {
    clubId: string;
    name: string;
    photoURL: string;
  };
}

const Club: React.FC<Props> = ({ club }) => {
  const navigation = useNavigation();
  const deleteClub = () => {
    axios
      .delete(`http://192.168.0.105:3000/admin/clubs/${club.clubId}`)
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

  return (
    <Box justifyContent="center" px="20px" py="10px">
      <HStack alignItems="center" space="3">
        <Avatar bg="transparent" size="lg" source={{ uri: club.photoURL }} />
        <Text fontSize="md" flex="1" noOfLines={2} isTruncated>
          {club.name}
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
