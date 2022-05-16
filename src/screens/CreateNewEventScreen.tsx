import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  NativeBaseProvider,
  ScrollView,
  VStack,
  Avatar,
  Button,
  Input,
  Select,
  CheckIcon,
  TextArea,
  HStack,
  Pressable,
} from "native-base";
import { theme } from "../themes";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import axios from "axios";
import { useTeam } from "../hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTimePicker, SelectModalInput } from "../components";
import { SelectModalInputProps } from "../types";

interface FormValues {
  name: string;
  details: undefined;
  teams: string[];
  location: string;
  startDate: Date;
  endDate: Date;
}

const CreateNewEventScreen = ({ navigation }) => {
  const [teams, setTeams] = useState<SelectModalInputProps[]>([]);
  const signedInUser = auth.currentUser;
  const { team } = useTeam();

  const timestamp = new Date();
  timestamp.setSeconds(0, 0);
  const [startDate, setStartDate] = useState(timestamp);
  const [endDate, setEndDate] = useState(timestamp);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      const results = await axios.get(
        `https://trainee.software/teams/club/${team.clubId}`
      );
      let data: SelectModalInputProps[] = [];
      results.data.forEach((team) => {
        data.push({
          key: team.teamId,
          value: team.teamId,
          text: team.name,
        });
      });
      setTeams(data);
    };
    getTeams();
  }, []);

  const createEvent = async (values: FormValues) => {
    const docRef = db.collection("events").doc();
    const startTime = startDate.toLocaleTimeString().slice(0, 5);
    const endTime = endDate.toLocaleTimeString().slice(0, 5);
    const response = await axios.post(`https://trainee.software/events`, {
      teams: values.teams,
      eventId: docRef.id,
      name: values.name,
      details: values.details,
      attendanceNumber: 0,
      location: values.location,
      startTime,
      endTime,
      startDate: startDate.toISOString().replace("Z", ""),
      endDate: endDate.toISOString().replace("Z", ""),
    });
    if (response.status === 200) {
      axios.post(`https://trainee.software/notifications/teams`, {
        teamIds: values.teams,
        userId: auth.currentUser.uid,
        title: team.name,
        body: "New event created.",
      });
    }
    navigation.goBack();
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Event name is required"),
    details: Yup.string().max(255, "Too Long!").optional(),
    teams: Yup.array()
      .of(Yup.string())
      .min(1, "Choose at least 1 team")
      .required("Choose at least 1 team"),
    location: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Location is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        details: undefined,
        teams: [],
        location: "",
        startDate: new Date(),
        endDate: new Date(),
      }}
      validationSchema={schema}
      onSubmit={(values) => createEvent(values)}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <Box w="full" flex="1" alignItems="center" p="20px">
          <ScrollView w="full" _contentContainerStyle={{ flex: 1 }}>
            <VStack space="3" flex="1" w="full">
              <Input
                variant="outline"
                w="full"
                placeholder="Event name"
                onChangeText={handleChange("name")}
                value={values.name}
              />
              {errors.name && touched.name ? (
                <Text color="red.600" fontSize="xs">
                  * {errors.name}
                </Text>
              ) : null}
              <TextArea
                h="100px"
                placeholder="Details *"
                onChangeText={handleChange("details")}
                value={values.details}
              />
              <SelectModalInput
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                value={values.teams}
                onValueChange={(newValue: string[]) =>
                  setFieldValue("teams", newValue)
                }
                placeholder="Select Teams"
                data={teams}
              />
              {errors.teams && touched.teams ? (
                <Text color="red.600" fontSize="xs">
                  * {errors.teams}
                </Text>
              ) : null}
              <Input
                variant="outline"
                w="full"
                placeholder="Location"
                onChangeText={handleChange("location")}
                value={values.location}
              />
              {errors.location && touched.location ? (
                <Text color="red.600" fontSize="xs">
                  * {errors.location}
                </Text>
              ) : null}
              <DateTimePicker
                title="Start Date"
                date={startDate}
                setDate={setStartDate}
              />
              <DateTimePicker
                title="End Date"
                date={endDate}
                setDate={setEndDate}
              />
              <Box flex="1" />
              <Button
                variant="solid"
                colorScheme="primary"
                w="full"
                onPress={() => handleSubmit()}
              >
                Create Event
              </Button>
            </VStack>
          </ScrollView>
        </Box>
      )}
    </Formik>
  );
};

export default CreateNewEventScreen;
