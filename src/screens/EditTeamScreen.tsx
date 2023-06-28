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
  useColorModeValue,
  Select,
} from "native-base";
import { theme } from "../themes";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "@env";

interface FormValues {
  teamName: string;
}

const EditTeamScreen = ({ route }) => {
  const { team } = route.params;
  const navigation = useNavigation();
  const [selectedPhotoURI, setSelectedPhotoURI] = useState("");
  const [clubs, setClubs] = useState([]);
  const signedInUser = auth.currentUser;

  useEffect(() => {
    const getClubs = async () => {
      const results = await axios.get(
        `${API_BASE_URL}/admin/clubs/${signedInUser.uid}`
      );
      setClubs(results.data);
    };
    getClubs();
  }, []);

  const save = async (values: FormValues) => {
    const docRef = db.collection("teams").doc(team.teamId);

    if (selectedPhotoURI !== "") {
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
      const ref = storage.ref().child("teamPhotos/" + team.teamId);

      await ref.put(blob);
      blob.close();

      ref.getDownloadURL().then((url) => {
        axios
          .put(`${API_BASE_URL}/admin/teams/${team.teamId}`, {
            name: values.teamName,
            photoURL: url,
          })
          .then(() => {
            docRef.set(
              {
                name: values.teamName,
                photoURL: url,
              },
              { merge: true }
            );
            navigation.goBack();
          });
      });
    } else {
      axios
        .put(`${API_BASE_URL}/admin/teams/${team.teamId}`, {
          name: values.teamName,
          photoURL: team.photoURL,
        })
        .then(() => {
          docRef.set(
            {
              name: values.teamName,
              photoURL: team.photoURL,
            },
            { merge: true }
          );
          navigation.goBack();
        });
    }
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
        teamName: team.name,
      }}
      validationSchema={schema}
      onSubmit={(values) => save(values)}
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
                source={{ uri: team.photoURL }}
              />
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
              variant={useColorModeValue("subtle", "solid")}
              colorScheme="gray"
              w="full"
              onPress={() => navigation.navigate("Manage Users", { team })}
            >
              Manage Users
            </Button>
            <Button
              variant="solid"
              colorScheme="primary"
              w="full"
              onPress={() => handleSubmit()}
            >
              Save
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default EditTeamScreen;
