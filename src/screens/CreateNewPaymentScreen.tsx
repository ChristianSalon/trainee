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
} from "native-base";
import * as Yup from "yup";
import { DatePicker, SelectTeamsInput, SelectTeamsModal } from "../components";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { theme } from "../themes";

interface formValues {
  name: string;
  details: undefined;
  teams: string[];
  amount: string;
}

const CreateNewPaymentScreen = ({ navigation }) => {
  const timestamp = new Date();
  timestamp.setSeconds(0, 0);
  const [dueDate, setDueDate] = useState(timestamp);

  /*useEffect(() => {
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
  }, []);*/

  const createPayment = async (values: formValues) => {
    console.log(values);
    axios
      .post(`http://192.168.0.105:3000/admin/payments`, {
        teams: values.teams,
        name: values.name,
        details: values.details,
        amount: Number(values.amount),
        createdAt: timestamp.toISOString().replace("Z", ""),
        dueDate: dueDate.toISOString().replace("Z", ""),
      })
      .then(() => {
        navigation.goBack();
      });
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Payment name is required"),
    details: Yup.string().max(255, "Too Long!").optional(),
    teams: Yup.array()
      .of(Yup.string())
      .min(1, "Choose at least 1 team")
      .required("Choose at least 1 team"),
    amount: Yup.string().min(1, "Too Low!").required("Amount is required"),
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Box w="full" flex="1" alignItems="center" p="20px">
        <ScrollView w="full" flex="1">
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
                  <SelectTeamsInput
                    value={values.teams}
                    onValueChange={(newValue: string[]) =>
                      setFieldValue("teams", newValue)
                    }
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
                  onPress={handleSubmit}
                >
                  Create Payment
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default CreateNewPaymentScreen;
