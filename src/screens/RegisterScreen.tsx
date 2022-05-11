import React, { useState } from "react";
import {
  NativeBaseProvider,
  Text,
  Box,
  KeyboardAvoidingView,
  Center,
  Heading,
  Input,
  Button,
  VStack,
  useToast,
  Icon,
  Alert,
  HStack,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { theme } from "../themes";
import { Platform } from "react-native";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const RegisterScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const defaultPhotoURL =
    "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229";

  const register = (values: FormValues) => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: values.name,
          photoURL: defaultPhotoURL,
        });
        authUser.user.sendEmailVerification();
        axios.post(`https://trainee.software/users`, {
          userId: authUser.user.uid,
          name: values.name,
          photoURL: defaultPhotoURL,
          email: values.email,
        });
        axios.post(`https://trainee.software/payments/customers`, {
          userId: authUser.user.uid,
          name: values.name,
          email: values.email,
        });
      })
      .catch((error) => alert(error.message));
  };

  const schema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Password is required"),
  });

  type FormValues = Yup.InferType<typeof schema>;

  return (
    <>
      <StatusBar style={"light"} />
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => register(values)}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Box
            flex="1"
            justifyContent="center"
            _light={{ bg: "white" }}
            _dark={{ bg: "dark.50" }}
            px="30px"
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <VStack justifyContent="center" alignItems="center" space="3">
                <Text mb="10px" fontSize={24}>
                  Create Account
                </Text>
                <Input
                  variant="filled"
                  placeholder="Name"
                  value={values.name}
                  onChangeText={handleChange("name")}
                  borderWidth="0"
                />
                {errors.name && touched.name ? (
                  <Text color="red.600" fontSize="xs" alignSelf="flex-start">
                    * {errors.name}
                  </Text>
                ) : null}
                <Input
                  variant="filled"
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  borderWidth="0"
                />
                {errors.email && touched.email ? (
                  <Text color="red.600" fontSize="xs" alignSelf="flex-start">
                    * {errors.email}
                  </Text>
                ) : null}
                <Input
                  variant="filled"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  borderWidth="0"
                  InputRightElement={
                    <Icon
                      size={5}
                      mr="2"
                      onPress={() => setShowPassword(!showPassword)}
                      as={
                        <MaterialIcons
                          name={showPassword ? "visibility" : "visibility-off"}
                        />
                      }
                    />
                  }
                />
                {errors.password && touched.password ? (
                  <Text color="red.600" fontSize="xs" alignSelf="flex-start">
                    * {errors.password}
                  </Text>
                ) : null}
                <Button
                  size="md"
                  w="full"
                  mt="2"
                  onPress={() => handleSubmit()}
                >
                  Register
                </Button>
                <Button
                  size="sm"
                  variant="link"
                  _text={{ underline: true, color: "dark.500" }}
                  onPress={() => navigation.goBack()}
                >
                  I already have an account
                </Button>
              </VStack>
            </KeyboardAvoidingView>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default RegisterScreen;
