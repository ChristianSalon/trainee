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
import { DateTimePicker } from "../components";

interface formValues {
  name: string;
  details: undefined;
  teams: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

const CreateNewEventScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const signedInUser = auth.currentUser;
  const { team } = useTeam();

  const timestamp = new Date();
  timestamp.setSeconds(0, 0);
  const [startDate, setStartDate] = useState(timestamp);
  const [endDate, setEndDate] = useState(timestamp);

  useEffect(() => {
    const getTeams = async () => {
      const results = await axios.get(
        `http://192.168.0.105:3000/events/teams/${team.clubId}`
      );
      setTeams(results.data);
    };
    getTeams();
    return () => {
      getTeams;
    };
  }, []);

  const createEvent = async (values: formValues) => {
    const docRef = db.collection("events").doc();
    console.log(values);
    const startTime = startDate.toLocaleTimeString().slice(0, 5);
    const endTime = endDate.toLocaleTimeString().slice(0, 5);
    console.log(startTime + " - " + endTime);
    axios
      .post(`http://192.168.0.105:3000/events/${team.teamId}`, {
        teamId: team.teamId,
        eventId: docRef.id,
        name: values.name,
        details: values.details,
        attendanceNumber: 0,
        location: values.location,
        startTime,
        endTime,
        startDate: startDate.toISOString().replace("Z", ""),
        endDate: endDate.toISOString().replace("Z", ""),
      })
      .then(() => {
        navigation.goBack();
      });
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Event name is required"),
    details: Yup.string().max(255, "Too Long!").optional(),
    teams: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Choose at least 1 team"),
    location: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Location is required"),
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Box w="full" flex="1" alignItems="center" p="20px">
        <ScrollView w="full">
          <Formik
            initialValues={{
              name: "",
              details: undefined,
              teams: "",
              location: "",
              startDate: new Date(),
              endDate: new Date(),
            }}
            validationSchema={schema}
            onSubmit={(values) => createEvent(values)}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
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
                <Select
                  w="full"
                  placeholder="Teams"
                  _selectedItem={{
                    p: "3",
                    bg: "coolGray.200",
                    rounded: "lg",
                  }}
                  onValueChange={handleChange("teams")}
                >
                  {teams.map((val) => {
                    return <Select.Item label={val.name} value={val.teamId} />;
                  })}
                </Select>
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
                  onPress={handleSubmit}
                >
                  Create Event
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default CreateNewEventScreen;
