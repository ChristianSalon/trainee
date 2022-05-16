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
  useColorModeValue,
} from "native-base";
import { theme } from "../themes";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import axios from "axios";
import { useClub } from "../hooks";
import { Formik } from "formik";
import * as Yup from "yup";

interface FormValues {
  teamName: string;
}

const CreateNewTeamScreen = ({ navigation }) => {
  const { club } = useClub();
  const [selectedPhotoURI, setSelectedPhotoURI] = useState(
    "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229"
  );
  const signedInUser = auth.currentUser;

  const createTeam = async (values: FormValues) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
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
        .post(`https://trainee.software/admin/teams/${signedInUser.uid}`, {
          teamId: docRef.id,
          clubId: club.clubId,
          name: values.teamName,
          photoURL: url,
        })
        .then(() => {
          docRef.set({
            teamId: docRef.id,
            clubId: club.clubId,
            name: values.teamName,
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

    setSelectedPhotoURI(result.uri);
  };

  const schema = Yup.object().shape({
    teamName: Yup.string().required("Team name is required"),
  });

  return (
    <Formik
      initialValues={{
        teamName: "",
      }}
      validationSchema={schema}
      onSubmit={(values) => createTeam(values)}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Box
          w="full"
          flex="1"
          alignItems="center"
          p="20px"
          bg={useColorModeValue(undefined, "dark.50")}
        >
          <VStack space="2" alignItems="center" mb="7">
            <Avatar
              bg="transparent"
              size="xl"
              source={{ uri: selectedPhotoURI }}
              key={selectedPhotoURI}
            />
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
          <VStack space="3" flex="1" w="full">
            <Input
              variant="outline"
              w="full"
              placeholder="Team name"
              onChangeText={handleChange("teamName")}
              value={values.teamName}
            />
            {errors.teamName && touched.teamName ? (
              <Text color="red.600" fontSize="xs">
                * {errors.teamName}
              </Text>
            ) : null}
            <Box flex="1" />
            <Button
              variant="solid"
              colorScheme="primary"
              w="full"
              onPress={() => handleSubmit()}
            >
              Create Team
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default CreateNewTeamScreen;
