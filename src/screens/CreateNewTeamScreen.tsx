import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  NativeBaseProvider,
  Center,
  VStack,
  Avatar,
  Button,
  Input,
  Select,
  Image,
} from "native-base";
import { theme } from "../themes";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import axios from "axios";

const CreateNewTeamScreen = ({ navigation }) => {
  const [clubs, setClubs] = useState([]);
  const [selectedPhotoURI, setSelectedPhotoURI] = useState(
    "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229"
  );
  const [teamName, setTeamName] = useState("");
  const [clubId, setClubId] = useState("");
  const signedInUser = auth.currentUser;

  useEffect(() => {
    const getClubs = async () => {
      const results = await axios.get(
        `http://192.168.0.105:3000/admin/clubs/${signedInUser.uid}`
      );
      setClubs(results.data);
    };
    getClubs();
    return () => {
      getClubs;
    };
  }, []);

  const createTeam = async () => {
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

    const docRef = db.collection("teams").doc();
    const ref = storage.ref().child("teamPhotos/" + docRef.id);
    await ref.put(blob);
    blob.close();

    ref.getDownloadURL().then((url) => {
      axios
        .post(`http://192.168.0.105:3000/admin/teams/${signedInUser.uid}`, {
          teamId: docRef.id,
          clubId: clubId,
          name: teamName,
          photoURL: url,
        })
        .then(() => {
          docRef.set({
            teamId: docRef.id,
            clubId: clubId,
            name: teamName,
            photoURL: url,
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

    console.log(result.uri);
    setSelectedPhotoURI(result.uri);
  };

  useEffect(() => {
    console.log(selectedPhotoURI.length);
  }, [selectedPhotoURI]);

  return (
    <NativeBaseProvider theme={theme}>
      <Box w="full" flex="1" alignItems="center" p="20px">
        <VStack space="2" alignItems="center" mb="7">
          <Avatar
            bg="transparent"
            size="xl"
            source={{ uri: selectedPhotoURI }}
            key={selectedPhotoURI}
          />
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
            placeholder="Team name"
            onChangeText={(text) => setTeamName(text)}
            value={teamName}
          />
          <Select
            w="full"
            placeholder="Club"
            _selectedItem={{
              p: "3",
              bg: "coolGray.200",
              rounded: "lg",
            }}
            onValueChange={(itemValue) => setClubId(itemValue)}
          >
            {clubs.map((val, index) => {
              return <Select.Item label={val.name} value={val.clubId} />;
            })}
          </Select>
          <Box flex="1" />
          <Button
            variant="solid"
            colorScheme="primary"
            w="full"
            onPress={createTeam}
          >
            Create Team
          </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
};

export default CreateNewTeamScreen;
