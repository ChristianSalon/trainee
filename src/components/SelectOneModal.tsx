import { Center, Modal, VStack, Checkbox, Spinner, Box } from "native-base";
import React from "react";

interface DataProps {
  key: string;
  value: string;
  text: string;
}

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  value: string;
  onValueChange: (newValue: string) => void;
  headerText: string;
  data: DataProps[];
}

const SelectOneModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  isLoading,
  value,
  onValueChange,
  headerText,
  data,
}: Props) => {
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
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default SelectOneModal;
