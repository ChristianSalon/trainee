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
  useColorModeValue,
} from "native-base";
import { theme } from "../themes";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import * as Linking from "expo-linking";
import { storage, db, auth } from "../firebase";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Club, MysqlBoolean } from "../types";

interface Props {
  club: Club;
}

const EditClubScreen = ({ route }) => {
  const { club }: Props = route.params;
  const navigation = useNavigation();
  const [selectedPhotoURI, setSelectedPhotoURI] = useState("");
  const [clubName, setClubName] = useState(club.name);
  const signedInUser = auth.currentUser;

  console.log(club);

  const save = async () => {
    const docRef = db.collection("clubs").doc(club.clubId);

    if (selectedPhotoURI !== "") {
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
      const ref = storage.ref().child("clubPhotos/" + club.clubId);

      await ref.put(blob);
      blob.close();

      ref.getDownloadURL().then((url) => {
        axios
          .put(`http://192.168.0.105:3000/admin/clubs/${club.clubId}`, {
            name: clubName,
            photoURL: url,
          })
          .then(() => {
            docRef.set(
              {
                name: clubName,
                photoURL: url,
              },
              { merge: true }
            );
            navigation.goBack();
          });
      });
    } else {
      axios
        .put(`http://192.168.0.105:3000/admin/clubs/${club.clubId}`, {
          name: clubName,
          photoURL: club.photoURL,
        })
        .then(() => {
          docRef.set(
            {
              name: clubName,
              photoURL: club.photoURL,
            },
            { merge: true }
          );
          navigation.goBack();
        });
    }
  };

  const setupPayments = async () => {
    const response = !club.accountId
      ? await axios.post(`http://192.168.0.105:3000/payments/accounts`, {
          email: auth.currentUser.email,
          clubId: club.clubId,
          businessName: clubName,
        })
      : await axios.get(
          `http://192.168.0.105:3000/payments/accountLinks/${club.accountId}`
        );
    Linking.openURL(response.data);
  };

  const goToDashboard = async () => {
    const response = await axios.post(
      `http://192.168.0.105:3000/payments/dashboard/${club.accountId}`
    );
    Linking.openURL(response.data);
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
    <Box
      w="full"
      flex="1"
      alignItems="center"
      p="20px"
      bg={useColorModeValue(undefined, "dark.50")}
    >
      <VStack space="2" alignItems="center" mb="7">
        {selectedPhotoURI.length > 0 ? (
          <Avatar
            bg="transparent"
            size="xl"
            source={{ uri: selectedPhotoURI }}
          />
        ) : (
          <Avatar bg="transparent" size="xl" source={{ uri: club.photoURL }} />
        )}
        <Button
          variant={useColorModeValue("subtle", "solid")}
          colorScheme="gray"
          onPress={choosePhoto}
          rounded="xl"
          _text={{ color: "black" }}
        >
          Choose photo
        </Button>
      </VStack>
      <Input
        variant="outline"
        w="full"
        placeholder="Club name"
        onChangeText={(text) => setClubName(text)}
        value={clubName}
      />
      <Box flex="1" />
      {club.isAccountSetUp === MysqlBoolean.False ? (
        <Button
          variant={useColorModeValue("subtle", "solid")}
          colorScheme="gray"
          w="full"
          onPress={setupPayments}
          mb="2"
        >
          Setup Payments
        </Button>
      ) : (
        <Button
          variant={useColorModeValue("subtle", "solid")}
          colorScheme="gray"
          w="full"
          onPress={goToDashboard}
          mb="2"
        >
          Go To Dashboard
        </Button>
      )}
      <Button variant="solid" colorScheme="primary" w="full" onPress={save}>
        Save
      </Button>
    </Box>
  );
};

export default EditClubScreen;
