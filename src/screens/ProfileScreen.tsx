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
} from "native-base";
import { theme } from "../themes";
import { Feather } from "@expo/vector-icons";
import { SettingsOption } from "../components";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import firebase from "firebase";

const ProfileScreen = ({ navigation }) => {
  const signedInUser = auth.currentUser;
  const [selectedPhotoURI, setSelectedPhotoURI] = useState(
    signedInUser.photoURL
  );

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
    <NativeBaseProvider theme={theme}>
      <Box p="20px">
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
              variant="subtle"
              colorScheme="coolGray"
              onPress={changePhoto}
              rounded="xl"
              _text={{ color: "black" }}
            >
              Change photo
            </Button>
          </VStack>
          <SettingsOption
            icon={<Feather name="user" size={24} color="black" />}
            placeholder="Your name"
            value={signedInUser.displayName}
            onPress={() => console.log("Click")}
          />
          <SettingsOption
            icon={<Feather name="mail" size={24} color="black" />}
            placeholder="Show join requests"
            value="Requests"
            onPress={() => navigation.navigate("Requests")}
          />
          <SettingsOption
            icon={<Feather name="credit-card" size={24} color="black" />}
            placeholder="Change credit cards"
            value="4401 **** ****"
            onPress={() => console.log("Click")}
          />
          <Divider />
          <SettingsOption
            icon={<Feather name="droplet" size={24} color="black" />}
            placeholder="Theme"
            value="Light"
            onPress={() => console.log("Click")}
          />
          <Divider />
          <SettingsOption
            icon={<Feather name="log-out" size={24} color="black" />}
            value="Logout"
            onPress={logout}
          />
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default ProfileScreen;
