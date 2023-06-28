import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import {
  NativeBaseProvider,
  Box,
  VStack,
  Input,
  TextArea,
  Select,
  Text,
  Button,
  ScrollView,
  HStack,
  Pressable,
  Icon,
  useColorModeValue,
  useToast,
} from "native-base";
import * as Yup from "yup";
import {
  DatePicker,
  SelectModalInput,
  SelectTeamsInput,
  SelectTeamsModal,
} from "../components";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { theme } from "../themes";
import { SelectModalInputProps } from "../types";
import { useClub } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { API_BASE_URL } from "@env";

interface formValues {
  name: string;
  details: undefined;
  teams: string[];
  amount: string;
}

interface Props {
  route: {
    params: {
      onCreate: () => Promise<void>;
    };
  };
}

const CreateNewPaymentScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const toast = useToast();
  const { onCreate } = route.params;
  const timestamp = new Date();
  timestamp.setSeconds(0, 0);
  const { club } = useClub();
  const [dueDate, setDueDate] = useState(timestamp);
  const [teams, setTeams] = useState<SelectModalInputProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTeams = async () => {
      const results = await axios.get(
        `${API_BASE_URL}/teams/club/${club.clubId}`
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

  const createPayment = async (values: formValues) => {
    const response = await axios.post(`${API_BASE_URL}/admin/payments`, {
      teamIds: values.teams.join(","),
      name: values.name,
      details: values.details,
      amount: Number(values.amount),
      createdAt: timestamp.toISOString().split("T")[0],
      dueDate: dueDate.toISOString().split("T")[0],
    });
    if (response.status === 200) {
      axios.post(`${API_BASE_URL}/notifications/teams`, {
        teamIds: values.teams,
        userId: auth.currentUser.uid,
        title: club.name,
        body: "New payment created.",
      });
      toast.show({ description: "Payment created." });
      await onCreate();
      navigation.goBack();
    } else {
      toast.show({ description: "Failed to create payment." });
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Payment name is required"),
    details: Yup.string().max(255, "Too Long!").optional().nullable(),
    teams: Yup.array()
      .of(Yup.string())
      .min(1, "Choose at least 1 team")
      .required("Choose at least 1 team"),
    amount: Yup.string().min(1, "Too Low!").required("Amount is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        details: undefined,
        teams: [],
        amount: "",
        dueDate: new Date(),
      }}
      validationSchema={schema}
      onSubmit={(values) => createPayment(values)}
    >
      {({
        handleChange,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <Box
          w="full"
          flex="1"
          alignItems="center"
          p="20px"
          bg={useColorModeValue(undefined, "dark.50")}
        >
          <ScrollView
            w="full"
            _contentContainerStyle={{
              flex: 1,
            }}
          >
            <VStack justifyContent="space-between" flex="1" space="4">
              <VStack space="3" w="full">
                <Input
                  variant="outline"
                  w="full"
                  placeholder="Payment name"
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
                  value={values.teams}
                  onValueChange={(newValue: string[]) =>
                    setFieldValue("teams", newValue)
                  }
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  placeholder={"Select Teams"}
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
                  placeholder="Amount"
                  onChangeText={handleChange("amount")}
                  keyboardType="decimal-pad"
                  value={values.amount}
                />
                {errors.amount && touched.amount ? (
                  <Text color="red.600" fontSize="xs">
                    * {errors.amount}
                  </Text>
                ) : null}
                <DatePicker
                  title="Due Date"
                  date={dueDate}
                  setDate={setDueDate}
                />
              </VStack>
              <Button
                variant="solid"
                colorScheme="primary"
                w="full"
                onPress={() => handleSubmit()}
              >
                Create Payment
              </Button>
            </VStack>
          </ScrollView>
        </Box>
      )}
    </Formik>
  );
};

export default CreateNewPaymentScreen;
