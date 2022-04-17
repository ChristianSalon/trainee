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
} from "native-base";
import * as Yup from "yup";
import { DatePicker, SelectTeamsInput } from "../components";
import axios from "axios";
import { theme } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { Payment } from "../types";

interface formValues {
  name: string;
  details: string;
  teams: string[];
  amount: string;
}

interface Props {
  payment: Payment;
}

const EditPaymentScreen = ({ route }) => {
  const { payment }: Props = route.params;
  console.log(payment);
  const navigation = useNavigation();
  const [dueDate, setDueDate] = useState(new Date(payment.dueDate));

  /*useEffect(() => {
    const getTeams = async () => {
      const results = await axios.get(
        `http://192.168.49.48:3000/events/teams/${team.clubId}`
      );
      setTeams(results.data);
    };
    getTeams();
    return () => {
      getTeams;
    };
  }, []);*/

  const editPayment = async (values: formValues) => {
    console.log(values);
    axios
      .put(`http://192.168.49.48:3000/admin/payments/${payment.paymentId}`, {
        paymentId: payment.paymentId,
        teamId: values.teams,
        name: values.name,
        details: values.details,
        amount: Number(values.amount),
        createdAt: new Date().toISOString().replace("Z", ""),
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
        <ScrollView w="full">
          <Formik
            initialValues={{
              name: payment.name,
              details: payment.details,
              teams: payment.teams,
              amount: payment.amount.toString(),
              dueDate: payment.dueDate,
            }}
            validationSchema={schema}
            onSubmit={(values) => editPayment(values)}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <VStack space="3" flex="1" w="full">
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
                <Box flex="1" />
                <Button
                  variant="solid"
                  colorScheme="primary"
                  w="full"
                  onPress={handleSubmit}
                >
                  Edit Payment
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
};

export default EditPaymentScreen;
