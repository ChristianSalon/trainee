import axios from "axios";
import {
  Center,
  FormControl,
  Input,
  Button,
  Modal,
  VStack,
  Checkbox,
  Spinner,
  Text,
  Box,
} from "native-base";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { API_BASE_URL } from "@env";

const EditNameModal = ({ showModal, setShowModal }) => {
  const [name, setName] = useState(auth.currentUser.displayName);

  const saveName = async () => {
    const response = await axios.put(
      `${API_BASE_URL}/users/editName/${auth.currentUser.uid}`,
      { name: name }
    );
    auth.currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        setShowModal(false);
      });
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Edit Name</Modal.Header>
          <Modal.Body>
            <Input
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Name"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="gray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={saveName}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default EditNameModal;
