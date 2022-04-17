import React, { useRef, useState } from "react";
import {
  Box,
  HStack,
  Avatar,
  Text,
  Pressable,
  AlertDialog,
  Button,
  VStack,
} from "native-base";
import axios from "axios";

interface Props {
  request: {
    id: string;
    teamId: string;
    userId: string;
    role: string;
    date: string;
    teamName: string;
    teamPhotoURL: string;
  };
}

const Request: React.FC<Props> = ({ request }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const onClose = () => setIsDialogOpen(false);
  const cancelRef = useRef(null);

  const acceptRequest = () => {
    axios
      .post(`http://192.168.0.105:3000/requests/acceptRequest`, {
        requestId: request.id,
        teamId: request.teamId,
        userId: request.userId,
        role: request.role,
      })
      .then(() => onClose());
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
          <Avatar
            bg="transparent"
            size="lg"
            source={{ uri: request.teamPhotoURL }}
          />
          <VStack flex="1">
            <Text fontSize="lg" noOfLines={2} isTruncated>
              {request.teamName}
            </Text>
            <Text fontSize="xs" color="gray.500" noOfLines={2} isTruncated>
              {request.role}
            </Text>
          </VStack>
        </HStack>
      </Pressable>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isDialogOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>Accept Request</AlertDialog.Header>
          <AlertDialog.Body>
            This will make you a member of the team! Are you sure?
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
              <Button onPress={acceptRequest}>Accept</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default Request;
