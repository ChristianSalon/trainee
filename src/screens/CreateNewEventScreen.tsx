import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  NativeBaseProvider,
  Center,
  VStack,
  Avatar,
  Button,
  Input,
  Select,
  CheckIcon,
  TextArea,
  HStack,
} from "native-base";
import { theme } from "../themes";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import axios from "axios";
import { useTeam } from "../hooks";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";

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
  const [date, setDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [startDatePickerMode, setStartDatePickerMode] = useState("date");
  const [showEndDate, setShowEndDate] = useState(false);
  const signedInUser = auth.currentUser;
  const { team } = useTeam();

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (startDatePickerMode === "time") {
      setShowStartDatePicker(false);
      setStartDatePickerMode("date");
    } else {
      setStartDatePickerMode("time");
    }
    await setDate(currentDate);
    console.log(currentDate);
    console.log(date);
  };

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
    const startTime = values.startDate.toLocaleTimeString().slice(0, -3);
    const endTime = values.endDate.toLocaleTimeString().slice(0, -3);
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
        startDate: values.startDate.toISOString().replace("Z", ""),
        endDate: values.endDate.toISOString().replace("Z", ""),
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
    startDate: Yup.date().required("Pick a date"),
    endDate: Yup.date().required("Pick a date"),
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Box w="full" flex="1" alignItems="center" p="20px">
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
              <VStack space="1">
                <HStack justifyContent="space-between">
                  <Text color="dark.300" fontSize="12">
                    Start Date
                  </Text>
                  <Button
                    variant="link"
                    size="sm"
                    p="0"
                    colorScheme="gray"
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    Pick date
                  </Button>
                </HStack>
                <Box
                  py="5"
                  px="2"
                  h="5"
                  w="full"
                  rounded="sm"
                  justifyContent="center"
                  borderColor="gray.200"
                  borderWidth="1"
                >
                  <Text fontSize="xs">{values.startDate.toLocaleString()}</Text>
                </Box>
              </VStack>
              {showStartDatePicker && (
                <DateTimePicker
                  mode={startDatePickerMode}
                  value={date}
                  onChange={onChange}
                />
              )}
              <Button
                variant="subtle"
                colorScheme="gray"
                w="full"
                onPress={() => console.log(date)}
              >
                Select Start Date
              </Button>
              {showEndDate && (
                <DateTimePicker
                  value={values.endDate}
                  onChange={handleChange("endDate")}
                />
              )}
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
      </Box>
    </NativeBaseProvider>
  );
};

export default CreateNewEventScreen;
