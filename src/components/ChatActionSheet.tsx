import React, { useState } from "react";
import { Actionsheet, Center, Icon, Spinner } from "native-base";
import { ActionSheetProps } from "../types";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { storage, db, auth } from "../firebase";
import firebase from "firebase";
import useTeam from "../hooks/useTeam";
import { Audio } from "expo-av";

const ChatActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const [uploading, setUploading] = useState(false);
  const [recording, setRecording] = useState<{} | undefined>(undefined);
  const { team } = useTeam();
  const signedInUser = auth.currentUser;

  const pickImage = async () => {
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
    setUploading(true);

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

    const docRef = db
      .collection("teams")
      .doc(team.id)
      .collection("messages")
      .doc();

    const ref = storage.ref().child(team.id + "/images/" + docRef.id);
    await ref.put(blob);
    blob.close();

    ref.getDownloadURL().then((url) => {
      docRef.set({
        id: docRef.id,
        content: url,
        creatorId: auth.currentUser.uid,
        name: signedInUser.displayName,
        photoURL: signedInUser.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        type: "IMAGEMESSAGE",
        width: result.width,
        height: result.height,
      });
      setUploading(false);
      onClose();
    });
  };

  const pickVideo = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    console.log(result);
    if (result.cancelled) {
      return;
    }
    setUploading(true);

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

    const docRef = db
      .collection("teams")
      .doc(team.id)
      .collection("messages")
      .doc();

    const ref = storage.ref().child(team.id + "/videos/" + docRef.id);
    await ref.put(blob);
    blob.close();

    ref.getDownloadURL().then((url) => {
      docRef.set({
        id: docRef.id,
        content: url,
        creatorId: auth.currentUser.uid,
        name: signedInUser.displayName,
        photoURL: signedInUser.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        type: "VIDEOMESSAGE",
      });
      setUploading(false);
      onClose();
    });
  };

  const recordAudio = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);

    setUploading(true);

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
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const docRef = db
      .collection("teams")
      .doc(team.id)
      .collection("messages")
      .doc();

    const ref = storage.ref().child(team.id + "/audio/" + docRef.id);
    await ref.put(blob);
    blob.close();

    ref.getDownloadURL().then((url) => {
      docRef.set({
        id: docRef.id,
        content: url,
        creatorId: auth.currentUser.uid,
        name: signedInUser.displayName,
        photoURL: signedInUser.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        type: "AUDIOMESSAGE",
      });
      setUploading(false);
      onClose();
    });
  };

  return (
    <Actionsheet disableOverlay={false} isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        {uploading && <Spinner color="primary.500" size="lg" />}
        <Actionsheet.Item
          startIcon={
            <Icon as={Feather} color="gray.400" mr="2" size="5" name="camera" />
          }
          onPress={pickImage}
        >
          Image
        </Actionsheet.Item>
        <Actionsheet.Item
          startIcon={
            <Icon as={Feather} color="gray.400" mr="2" size="5" name="video" />
          }
          onPress={pickVideo}
        >
          Video
        </Actionsheet.Item>
        {recording === undefined ? (
          <Actionsheet.Item
            startIcon={
              <Icon as={Feather} color="gray.400" mr="2" size="5" name="mic" />
            }
            onPress={recordAudio}
          >
            Audio
          </Actionsheet.Item>
        ) : (
          <Actionsheet.Item
            startIcon={
              <Icon
                as={Feather}
                color="red.600"
                mr="2"
                size="5"
                name="stop-circle"
              />
            }
            onPress={stopRecording}
            _text={{ color: "red.600" }}
          >
            Stop Recording
          </Actionsheet.Item>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default ChatActionSheet;
