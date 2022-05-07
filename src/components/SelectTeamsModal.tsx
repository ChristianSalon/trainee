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

const SelectTeamsModal = ({
  showModal,
  setShowModal,
  value,
  onValueChange,
}) => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      const results = await axios.get(
        `https://trainee.software/admin/payments/teams/${auth.currentUser.uid}`
      );
      setTeams(results.data);
      setIsLoading(false);
    };
    getTeams();
  }, []);

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Select Teams</Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <Box p="2">
                <Spinner size="lg" />
              </Box>
            ) : (
              <Checkbox.Group onChange={onValueChange} value={value}>
                <VStack p="2" space="2">
                  {teams.map((val, index) => {
                    return (
                      <Checkbox key={val.teamId} value={val.teamId}>
                        {val.name}
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

export default SelectTeamsModal;
