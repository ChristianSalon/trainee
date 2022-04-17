import React from "react";
import { Box, HStack, Avatar, Text, IconButton, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useTeam } from "../../hooks";

interface Props {
  user: {
    userId: string;
    name: string;
    photoURL: string;
    email: string;
    teamId: string;
    role: string;
  };
}

const User: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();

  const removeUser = () => {
    console.log(user);
    axios.delete(
      `http://192.168.0.105:3000/admin/users/${user.teamId}/${user.userId}`
    );
  };

  return (
    <Box justifyContent="center" px="20px" py="10px">
      <HStack alignItems="center" space="3">
        <Avatar bg="transparent" size="md" source={{ uri: user.photoURL }} />
        <VStack flex="1">
          <Text fontSize="md" noOfLines={2} isTruncated>
            {user.name}
          </Text>
          <Text fontSize="xs" color="gray.500" noOfLines={2} isTruncated>
            {user.role}
          </Text>
        </VStack>
        <HStack space="2">
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
            onPress={removeUser}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default User;
