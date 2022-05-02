import React, { useState } from "react";
import {
  NativeBaseProvider,
  Button,
  Text,
  VStack,
  Box,
  Avatar,
  Pressable,
  HStack,
  Divider,
  Heading,
  useColorMode,
  useColorModeValue,
  Center,
} from "native-base";
import { theme as customTheme } from "../themes";
import { Feather } from "@expo/vector-icons";
import {
  EditNameModal,
  SettingsOption,
  SelectOneModal,
  SelectModal,
  ThemeToggle,
} from "../components";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import { colorModeManager } from "../colorModeManager";
import { useTheme } from "../hooks";

const ProfileScreen = ({ navigation }) => {
  const signedInUser = auth.currentUser;
  const [selectedPhotoURI, setSelectedPhotoURI] = useState(
    signedInUser.photoURL
  );
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [showThemeModal, setShowThemeModal] = useState(false);
  const { setColorMode, toggleColorMode, colorMode } = useColorMode();
  const { setPersistedTheme } = useTheme();

  const logout = () => {
    auth.signOut().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    });
  };

  const changePhoto = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);
    if (result.cancelled) {
      return;
    }
    //setUploading(true);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", result.uri, true);
      xhr.send(null);
    });

    const ref = storage.ref().child("profilePhotos/" + auth.currentUser.uid);
    await ref.put(blob);
    blob.close();

    ref.getDownloadURL().then((url) => {
      auth.currentUser.updateProfile({
        photoURL: url,
      });
      setSelectedPhotoURI(url);
    });
  };

  return (
    <Box
      flex="1"
      p="20px"
      _light={{ bg: "white" }}
      _dark={{ bg: "dark.50" }}
      bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"}
    >
      <VStack space="5">
        <VStack space="2" alignItems="center" mb="3">
          <Avatar
            size="xl"
            source={{
              uri: selectedPhotoURI,
            }}
            key={selectedPhotoURI}
          />
          <Button
            variant={useColorModeValue("subtle", "solid")}
            colorScheme="gray"
            onPress={changePhoto}
            rounded="xl"
            _text={{ color: "black" }}
          >
            Change photo
          </Button>
        </VStack>
        <SettingsOption
          icon={
            <Feather
              name="user"
              size={24}
              color={useColorModeValue("black", "gray")}
            />
          }
          placeholder="Your name"
          value={signedInUser.displayName}
          onPress={() => setShowModal(true)}
        />
        <SettingsOption
          icon={
            <Feather
              name="mail"
              size={24}
              color={useColorModeValue("black", "gray")}
            />
          }
          placeholder="Show join requests"
          value="Requests"
          onPress={() => navigation.navigate("Requests")}
        />
        <Divider />
        <HStack space="6" alignItems="center">
          <Feather
            name="droplet"
            size={24}
            color={useColorModeValue("black", "gray")}
          />
          <ThemeToggle />
        </HStack>
        {/*<SettingsOption
          icon={
            <Feather
              name="droplet"
              size={24}
              color={useColorModeValue("black", "gray")}
            />
          }
          placeholder="Theme"
          value="Light"
          onPress={() => setShowThemeModal(true)}
        />*/}
        <Divider />
        <SettingsOption
          icon={
            <Feather
              name="log-out"
              size={24}
              color={useColorModeValue("black", "gray")}
            />
          }
          value="Logout"
          onPress={logout}
        />
      </VStack>
      {showModal && (
        <EditNameModal showModal={showModal} setShowModal={setShowModal} />
      )}
      {/*showThemeModal && (
        <SelectModal
          showModal={showThemeModal}
          setShowModal={setShowThemeModal}
          isLoading={false}
          headerText={"Select Theme"}
          value={[theme]}
          onValueChange={(value) => {
            const theme = value[value.length - 1];
            console.log("SET" + theme);
            setTheme(theme);
            setColorMode(theme);
            colorModeManager.set(theme === "dark" ? "dark" : "light");
            setPersistedTheme(theme);
          }}
          data={[
            {
              key: "light",
              value: "light",
              text: "Light",
            },
            {
              key: "dark",
              value: "dark",
              text: "Dark",
            },
          ]}
        />
        )*/}
    </Box>
  );
};

export default ProfileScreen;
