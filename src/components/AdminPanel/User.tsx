import React, { useState } from "react";
import {
  Box,
  HStack,
  Avatar,
  Text,
  IconButton,
  VStack,
  useToast,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useTeam } from "../../hooks";
import SelectModal from "../SelectModal";
import { API_BASE_URL } from "@env";

interface Props {
  user: {
    userId: string;
    name: string;
    photoURL: string;
    email: string;
    teamId: string;
    role: string;
  };
  onDelete: (userId: string) => void;
  onEdit: (userId: string, role: string) => void;
}

const User: React.FC<Props> = ({ user, onDelete, onEdit }) => {
  const navigation = useNavigation();
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState(user.role);

  const removeUser = async () => {
    const response = await axios.delete(
      `${API_BASE_URL}/admin/users/${user.teamId}/${user.userId}`
    );
    if (response.status === 200) {
      toast.show({ description: "User removed from team." });
    }
    onDelete(user.userId);
  };

  const editUser = async () => {
    if (!role) {
      setRole(user.role);
      toast.show({ description: "Select at least one role." });
      return;
    }
    const response = await axios.put(
      `${API_BASE_URL}/admin/users/editRole/${user.userId}`,
      {
        role,
      }
    );
    if (response.status === 200) {
      toast.show({ description: "User updated." });
      onEdit(user.userId, role);
    }
  };

  return (
    <>
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
                name: "edit",
                size: "xs",
              }}
              colorScheme="gray"
              onPress={() => setShowModal(true)}
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
              onPress={removeUser}
            />
          </HStack>
        </HStack>
      </Box>
      {showModal && (
        <SelectModal
          showModal={showModal}
          setShowModal={setShowModal}
          isLoading={false}
          value={[role]}
          onValueChange={(value) => {
            setRole(value[value.length - 1]);
          }}
          headerText={"Select Role"}
          data={[
            {
              key: "MANAGER",
              value: "MANAGER",
              text: "MANAGER",
            },
            {
              key: "MEMBER",
              value: "MEMBER",
              text: "MEMBER",
            },
          ]}
          saveButton={true}
          onSave={editUser}
        />
      )}
    </>
  );
};

export default User;
