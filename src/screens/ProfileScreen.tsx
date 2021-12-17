import React from "react";
import { NativeBaseProvider, Button, Text } from "native-base";
import { theme } from "../themes";
import { auth } from "../firebase";

const ProfileScreen = ({ navigation }) => {
  const logout = () => {
    auth.signOut().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    });
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Button size="lg" variant="outline" onPress={() => logout()}>
        LOGOUT
      </Button>
    </NativeBaseProvider>
  );
};

export default ProfileScreen;
