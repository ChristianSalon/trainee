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
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../themes";
import { auth } from "../firebase";
import { Platform } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const register = () => {
    navigation.navigate("Register");
  };

  const login = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      alert(error.message);
    });
  };

  const reset = () => {
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

  return (
    <>
      <StatusBar style={"light"} />
      <Box
        flex="1"
        justifyContent="center"
        _light={{ bg: "white" }}
        _dark={{ bg: "dark.50" }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <VStack justifyContent="center" alignItems="center">
            <Text mb="30px" fontSize={24}>
              Log Into My <Heading>trainee.</Heading>
            </Text>
            <Input
              variant="filled"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              w="80%"
              mb="20px"
              borderWidth="0"
            />
            <Input
              variant="filled"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              w="80%"
              mb="30px"
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
            <Button mb="15px" size="md" w="80%" onPress={login}>
              Log In
            </Button>
            <Button
              variant="outline"
              mb="10px"
              w="80%"
              colorScheme="gray"
              onPress={register}
            >
              Create Account
            </Button>
            <Button
              size="sm"
              variant="link"
              w="80%"
              _text={{ underline: true, color: "dark.500" }}
              onPress={() => reset()}
            >
              I’ve forgotten my password
            </Button>
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </>
  );
};

export default LoginScreen;
