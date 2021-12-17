import React, { useState, useLayoutEffect } from "react";
import {
  NativeBaseProvider,
  FlatList,
  Text,
  Box,
  Input,
  Center,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  useDisclose,
} from "native-base";
import { Feather, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { theme } from "../themes";
import { db, auth, storage } from "../firebase";
import { useTeam } from "../hooks";
import {
  SendedTextMessage,
  ReceivedTextMessage,
  SendedImageMessage,
  ReceivedImageMessage,
  ChatActionSheet,
  SendedVideoMessage,
  ReceivedVideoMessage,
} from "../components";
import firebase from "firebase";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { team } = useTeam();
  const { isOpen, onOpen, onClose } = useDisclose();

  const renderMessage = (item) => {
    switch (item.data.type) {
      case "TEXTMESSAGE":
        if (item.data.creatorId === auth.currentUser.uid) {
          return <SendedTextMessage message={item.data} />;
        } else {
          return <ReceivedTextMessage message={item.data} />;
        }
        break;
      case "IMAGEMESSAGE":
        if (item.data.creatorId === auth.currentUser.uid) {
          return <SendedImageMessage message={item.data} />;
        } else {
          return <ReceivedImageMessage message={item.data} />;
        }
        break;
      case "VIDEOMESSAGE":
        if (item.data.creatorId === auth.currentUser.uid) {
          return <SendedVideoMessage message={item.data} />;
        } else {
          return <ReceivedVideoMessage message={item.data} />;
        }
        break;
      default:
        return <Text>OOPS!</Text>;
        break;
    }
  };

  const sendTextMessage = () => {
    if (input.length === 0) {
      onOpen();
    } else {
      const signedInUser = auth.currentUser;
      const docRef = db
        .collection("teams")
        .doc(team.id)
        .collection("messages")
        .doc();
      docRef.set({
        id: docRef.id,
        content: input,
        creatorId: auth.currentUser.uid,
        name: signedInUser.displayName,
        photoURL: signedInUser.photoURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        type: "TEXTMESSAGE",
      });
      setInput("");
    }
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("teams")
      .doc(team.id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
    return unsubscribe;
  }, []);

  const config = {
    dependencies: {
      "linear-gradient": require("expo-linear-gradient").LinearGradient,
    },
  };

  return (
    <NativeBaseProvider theme={theme} config={config}>
      <StatusBar style={"dark"} />
      <KeyboardAvoidingView flex="1">
        <FlatList
          flex="1"
          inverted={true}
          data={messages}
          renderItem={({ item }) => renderMessage(item)}
          keyExtractor={(item) => item.data.id}
        />
        <Pressable onPress={sendTextMessage}>
          <Box w="100%" h="60px" px="15px" py="10px">
            <HStack>
              <Input
                value={input}
                onChangeText={(text) => setInput(text)}
                flex="1"
                mr="20px"
                variant="rounded"
                placeholder="Aa"
              />
              <Box bg="primary.500" w="40px" h="40px" borderRadius="40px">
                <Center flex="1">
                  {input.length > 0 ? (
                    <Ionicons color="white" name="send" size={18} />
                  ) : (
                    <Feather color="white" name="plus" size={20} />
                  )}
                </Center>
              </Box>
            </HStack>
          </Box>
        </Pressable>
      </KeyboardAvoidingView>
      <ChatActionSheet isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </NativeBaseProvider>
  );
};

export default ChatScreen;
