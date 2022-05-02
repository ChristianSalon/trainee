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

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
  headerText: string;
  placeholder: string;
  onSave: () => void;
}

const TextInputModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  value,
  onValueChange,
  headerText,
  placeholder,
  onSave,
}) => {
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{headerText}</Modal.Header>
          <Modal.Body>
            <Input
              value={value}
              onChangeText={(text) => onValueChange(text)}
              placeholder={placeholder}
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
              <Button
                onPress={() => {
                  onSave();
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default TextInputModal;
