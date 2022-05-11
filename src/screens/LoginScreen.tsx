import React, { useState, useEffect } from "react";
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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../themes";
import { auth } from "../firebase";
import { Platform } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { StatusBar } from "../components";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const register = () => {
    navigation.navigate("Register");
  };

  const login = (values: FormValues) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .catch((error) => {
        alert(error.message);
      });
  };

  const reset = (email: string) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Check your email.");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const schema = Yup.object({
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
          email: "",
          password: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => login(values)}
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
                  Log Into My <Heading>trainee.</Heading>
                </Text>
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
                  mt="10px"
                  size="md"
                  w="full"
                  onPress={() => handleSubmit()}
                >
                  Log In
                </Button>
                <Button
                  variant="outline"
                  w="full"
                  colorScheme="gray"
                  onPress={register}
                >
                  Create Account
                </Button>
                <Button
                  size="sm"
                  variant="link"
                  _text={{ underline: true, color: "dark.500" }}
                  onPress={() => reset(values.email)}
                >
                  I’ve forgotten my password
                </Button>
              </VStack>
            </KeyboardAvoidingView>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default LoginScreen;
