import React, { useState } from "react";
import { Avatar, Button, VStack } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";

const PhotoChooser = ({ state, setState }) => {
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

    setState(result.uri);
  };

  return (
    <VStack space="2" alignItems="center" mb="3">
      <Avatar
        bg="transparent"
        size="xl"
        source={{
          uri: state,
        }}
        key={state}
      />
      <Button
        variant="subtle"
        colorScheme="coolGray"
        onPress={choosePhoto}
        rounded="xl"
        _text={{ color: "black" }}
      >
        Change photo
      </Button>
    </VStack>
  );
};

export default PhotoChooser;
