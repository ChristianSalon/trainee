import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { db, auth } from "../firebase";
import { NativeBaseProvider, FlatList, Fab, Icon } from "native-base";
import { theme } from "../themes";
import { Team } from "../components";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            style={{ width: 35, height: 35, borderRadius: 35 }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/chatee-48122.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=e807cc6f-3d8b-461e-a935-90672c08361f",
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    db.collection("teams")
      .where("members", "array-contains", auth.currentUser.uid)
      .orderBy("name", "asc")
      .get()
      .then((snapshot) => {
        setTeams(
          snapshot.docs.map((doc) => ({
            data: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"dark"} />
      <FlatList
        data={teams}
        renderItem={({ item }) => <Team team={item.data} />}
        keyExtractor={(item) => item.data.id}
      />
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
      />
    </NativeBaseProvider>
  );
};

export default HomeScreen;
