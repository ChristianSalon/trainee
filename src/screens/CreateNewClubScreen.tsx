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
import { storage, db, auth } from "../firebase";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

interface FormValues {
  clubName: string;
}

const CreateNewClubScreen = ({ navigation }) => {
  const [selectedPhotoURI, setSelectedPhotoURI] = useState(
    "https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229"
  );
  const signedInUser = auth.currentUser;

  const createClub = async (values: FormValues) => {
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

    ref.getDownloadURL().then(async (url) => {
      await axios.post(
        `https://trainee.software/admin/clubs/${signedInUser.uid}`,
        {
          clubId: docRef.id,
          name: values.clubName,
          photoURL: url,
        }
      );
      docRef.set({
        id: docRef.id,
        name: values.clubName,
        photoURL: url,
        managers: [signedInUser.uid],
        coaches: [],
        members: [],
      });
      await axios.post(`https://trainee.software/payments/accounts`, {
        email: auth.currentUser.email,
        clubId: docRef.id,
        businessName: values.clubName,
      });
      navigation.goBack();
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
    clubName: Yup.string().required("Club name is required"),
  });

  return (
    <Formik
      initialValues={{
        clubName: "",
      }}
      validationSchema={schema}
      onSubmit={(values) => createClub(values)}
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
            <Button
              variant="solid"
              colorScheme="primary"
              w="full"
              onPress={() => handleSubmit()}
            >
              Create Club
            </Button>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default CreateNewClubScreen;
