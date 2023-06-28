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
  useColorModeValue,
  useToast,
} from "native-base";
import * as Yup from "yup";
import { DatePicker, SelectModalInput, SelectTeamsInput } from "../components";
import axios from "axios";
import { theme } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { Payment, SelectModalInputProps } from "../types";
import { useClub } from "../hooks";
import { auth } from "../firebase";
import { API_BASE_URL } from "@env";

interface formValues {
  name: string;
  details: string | null | undefined;
  teams: string[];
  amount: string;
}

interface Props {
  payment: Payment;
  onEdit: () => Promise<void>;
}

const EditPaymentScreen = ({ route }) => {
  const { payment, onEdit }: Props = route.params;
  const navigation = useNavigation();
  const toast = useToast();
  const { club } = useClub();
  const [dueDate, setDueDate] = useState(new Date(payment.dueDate));
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

  const viewStatus = () => {
    navigation.navigate("Payment Status", { payment });
  };

  const editPayment = async (values: formValues) => {
    const response = await axios.put(
      `${API_BASE_URL}/admin/payments/${payment.paymentId}`,
      {
        paymentId: payment.paymentId,
        teamIds: values.teams.join(","),
        name: values.name,
        details: values.details,
        amount: Number(values.amount),
        createdAt: new Date().toISOString().split("T")[0],
        dueDate: dueDate.toISOString().split("T")[0],
      }
    );
    if (response.status === 200) {
      axios.post(`${API_BASE_URL}/notifications/clubs`, {
        clubId: club.clubId,
        userId: auth.currentUser.uid,
        title: club.name,
        body: `Payment ${payment.name} has been edited.`,
      });
      toast.show({ description: "Payment updated." });
      await onEdit();
      navigation.goBack();
    } else {
      toast.show({ description: "Payment update failed." });
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
        name: payment.name,
        details: payment.details,
        teams: payment.teamIds ? payment.teamIds.split(", ") : [],
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
              <Box flex="1" />
              <Button
                variant={useColorModeValue("subtle", "solid")}
                colorScheme="gray"
                w="full"
                onPress={viewStatus}
              >
                View Status
              </Button>
              <Button
                variant="solid"
                colorScheme="primary"
                w="full"
                onPress={handleSubmit}
              >
                Edit Payment
              </Button>
            </VStack>
          </ScrollView>
        </Box>
      )}
    </Formik>
  );
};

export default EditPaymentScreen;
