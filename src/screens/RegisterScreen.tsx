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

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const defaultPhotoURL =
    "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229";

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: defaultPhotoURL,
        });
        authUser.user.sendEmailVerification();
        axios.post(`https://trainee.software/users`, {
          userId: authUser.user.uid,
          name: name,
          photoURL: defaultPhotoURL,
          email: email,
        });
        axios.post(`https://trainee.software/payments/customers`, {
          userId: authUser.user.uid,
          name: name,
          email: email,
        });
      })
      .catch((error) => alert(error.message));
  };

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
              Create Account
            </Text>
            <Input
              variant="filled"
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              w="80%"
              mb="20px"
              borderWidth="0"
            />
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
            <Button mb="15px" size="md" w="80%" onPress={register}>
              Register
            </Button>
            <Button
              size="sm"
              variant="link"
              w="80%"
              _text={{ underline: true, color: "dark.500" }}
              onPress={() => navigation.goBack()}
            >
              I already have an account
            </Button>
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </>
  );
};

export default RegisterScreen;
