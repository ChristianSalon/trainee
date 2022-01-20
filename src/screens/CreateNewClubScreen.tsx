import React, { useState } from "react";
import {
  Box,
  Text,
  NativeBaseProvider,
  Center,
  VStack,
  Avatar,
  Button,
  Input,
} from "native-base";
import { theme } from "../themes";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import axios from "axios";

const CreateNewClubScreen = ({ navigation }) => {
  const [selectedPhotoURI, setSelectedPhotoURI] = useState("");
  const [clubName, setClubName] = useState("");
  const signedInUser = auth.currentUser;

  const createClub = async () => {
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
      xhr.open("GET", selectedPhotoURI, true);
      xhr.send(null);
    });

    const docRef = db.collection("clubs").doc();
    const ref = storage.ref().child("clubPhotos/" + docRef.id);
    await ref.put(blob);
    blob.close();

    ref.getDownloadURL().then((url) => {
      axios
        .post(`http://192.168.0.105:3000/admin/clubs/${signedInUser.uid}`, {
          clubId: docRef.id,
          name: clubName,
          photoURL: url,
        })
        .then(() => {
          docRef.set({
            id: docRef.id,
            name: clubName,
            photoURL: url,
            managers: [signedInUser.uid],
            coaches: [],
            members: [],
          });
          navigation.goBack();
        });
    });
  };

  const choosePhoto = async () => {
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

    if (result.cancelled) {
      return;
    }

    console.log(result);
    setSelectedPhotoURI(result.uri);
    console.log(selectedPhotoURI);
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Box w="full" flex="1" alignItems="center" p="20px">
        <VStack space="2" alignItems="center" mb="7">
          {selectedPhotoURI.length > 0 ? (
            <Avatar
              bg="transparent"
              size="xl"
              source={{ uri: selectedPhotoURI }}
            />
          ) : (
            <Avatar
              bg="transparent"
              size="xl"
              source={require("../assets/default_photo.png")}
            />
          )}
          <Button
            variant="subtle"
            colorScheme="coolGray"
            onPress={choosePhoto}
            rounded="xl"
            _text={{ color: "black" }}
          >
            Choose photo
          </Button>
        </VStack>
        <VStack space="3" flex="1" w="full">
          <Input
            variant="outline"
            w="full"
            placeholder="Club name"
            onChangeText={(text) => setClubName(text)}
            value={clubName}
          />
          <Box flex="1" />
          <Button
            variant="solid"
            colorScheme="primary"
            w="full"
            onPress={createClub}
          >
            Create Club
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default CreateNewClubScreen;
