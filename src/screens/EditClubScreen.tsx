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
import { Formik } from "formik";
import * as Yup from "yup";
import { API_BASE_URL } from "@env";

interface FormValues {
  clubName: string;
}

interface Props {
  club: Club;
}

const EditClubScreen = ({ route }) => {
  const { club }: Props = route.params;
  const navigation = useNavigation();
  const [selectedPhotoURI, setSelectedPhotoURI] = useState("");
  const signedInUser = auth.currentUser;

  const save = async (values: FormValues) => {
    const docRef = db.collection("clubs").doc(club.clubId);

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
      const ref = storage.ref().child("clubPhotos/" + club.clubId);

      await ref.put(blob);
      blob.close();

      ref.getDownloadURL().then((url) => {
        axios
          .put(`${API_BASE_URL}/admin/clubs/${club.clubId}`, {
            name: values.clubName,
            photoURL: url,
          })
          .then(() => {
            docRef.set(
              {
                name: values.clubName,
                photoURL: url,
              },
              { merge: true }
            );
            navigation.goBack();
          });
      });
    } else {
      axios
        .put(`${API_BASE_URL}/admin/clubs/${club.clubId}`, {
          name: values.clubName,
          photoURL: club.photoURL,
        })
        .then(() => {
          docRef.set(
            {
              name: values.clubName,
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
      ? await axios.post(`${API_BASE_URL}/payments/accounts`, {
          email: auth.currentUser.email,
          clubId: club.clubId,
          businessName: club.name,
        })
      : await axios.get(
          `${API_BASE_URL}/payments/accountLinks/${club.accountId}`
        );
    Linking.openURL(response.data);
  };

  const goToDashboard = async () => {
    const response = await axios.post(
      `${API_BASE_URL}/payments/dashboard/${club.accountId}`
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

    setSelectedPhotoURI(result.uri);
  };

  const schema = Yup.object().shape({
    clubName: Yup.string().required("Club name is required"),
  });

  return (
    <Formik
      initialValues={{
        clubName: club.name,
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
                source={{ uri: club.photoURL }}
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
              placeholder="Club name"
              onChangeText={handleChange("clubName")}
              value={values.clubName}
            />
            {errors.clubName && touched.clubName ? (
              <Text color="red.600" fontSize="xs">
                * {errors.clubName}
              </Text>
            ) : null}
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

export default EditClubScreen;
