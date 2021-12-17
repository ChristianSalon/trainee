import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { useTeam } from "../hooks";

const TeamScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { team } = useTeam();

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

  return (
    <View>
      <Text>Team Screen</Text>
      <Text>
        {team.clubName} - {team.name}
      </Text>
      <Button
        title={"Payment"}
        onPress={() => {
          navigation.navigate("Payment");
        }}
      />
    </View>
  );
};

export default TeamScreen;
