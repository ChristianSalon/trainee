import React, { useRef, useState } from "react";
import {
  Box,
  HStack,
  Avatar,
  Text,
  Pressable,
  AlertDialog,
  Button,
} from "native-base";
import axios from "axios";
import { useClub } from "../hooks";

interface Props {
  user: {
    userId: string;
    name: string;
    photoURL: string;
    email: string;
  };
  teamId: string;
}

const UserRequest: React.FC<Props> = ({ user, teamId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { club } = useClub();
  const onClose = () => setIsDialogOpen(false);
  const cancelRef = useRef(null);

  const sendRequest = async () => {
    const date = new Date().toISOString().slice(0, -8);
    const response = await axios.post(`https://trainee.software/requests`, {
      teamId: teamId,
      userId: user.userId,
      date,
    });
    if (response.status === 200) {
      axios.post(`https://trainee.software/notifications/user`, {
        userId: user.userId,
        title: club.name,
        body: "You have a new join request.",
      });
    }
    onClose();
  };

  return (
    <>
      <Pressable
        justifyContent="center"
        px="20px"
        py="10px"
        onPress={() => setIsDialogOpen(!isDialogOpen)}
      >
        <HStack alignItems="center" space="3">
          <Avatar bg="transparent" size="md" source={{ uri: user.photoURL }} />
          <Text fontSize="md" noOfLines={2} isTruncated>
            {user.name}
          </Text>
        </HStack>
      </Pressable>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDialogOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Send Request</AlertDialog.Header>
          <AlertDialog.Body>
            This will send a request to join the team! Are you sure?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="link"
                colorScheme="gray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button onPress={sendRequest}>Send</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default UserRequest;
