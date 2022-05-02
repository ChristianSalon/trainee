import {
  Center,
  Modal,
  VStack,
  Checkbox,
  Spinner,
  Box,
  Button,
  useToast,
} from "native-base";
import React from "react";
import { SelectModalInputProps } from "../types";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  value: string[];
  onValueChange: (newValue: string[]) => void;
  headerText: string;
  data: SelectModalInputProps[];
  saveButton?: boolean;
  onSave?: () => void;
}

const SelectModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  isLoading,
  value,
  onValueChange,
  headerText,
  data,
  saveButton,
  onSave,
}: Props) => {
  const toast = useToast();

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{headerText}</Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <Box p="2">
                <Spinner size="lg" />
              </Box>
            ) : (
              <Checkbox.Group onChange={onValueChange} value={value}>
                <VStack p="2" space="2">
                  {data.map((val) => {
                    return (
                      <Checkbox key={val.key} value={val.value}>
                        {val.text}
                      </Checkbox>
                    );
                  })}
                </VStack>
              </Checkbox.Group>
            )}
          </Modal.Body>
          {saveButton && (
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
          )}
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default SelectModal;
