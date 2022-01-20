import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  HStack,
  VStack,
  NativeBaseProvider,
  IconButton,
  Image,
  ScrollView,
  Button,
  ZStack,
  Avatar,
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { theme } from "../themes";
import { StatusBar } from "expo-status-bar";
import { AttendanceProps, EventProps } from "../types";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const EventScreen = ({ route }) => {
  const { event }: EventProps = route.params;
  const navigation = useNavigation();
  const [isComing, setIsComing] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [myAttendance, setMyAttendance] = useState({});
  let profilePhotos: ReactElement[] = [];
  const [profilePhotosState, setProfilePhotosState] = useState<ReactElement[]>(
    []
  );
  let margin = 0;

  /*auth.currentUser.updateProfile({
    photoURL:
      "https://www.finreport.sk/userfiles/obrazok_clanok_article_detail4c607557740111d9a014322771140b9a.jpg",
  });*/

  useEffect(() => {
    const getAttendance = async () => {
      const results = await axios.get(
        `http://192.168.0.105:3000/attendance/${event.eventId}`
      );
      results.data.forEach((a) => {
        if (a.userId === auth.currentUser.uid) {
          setMyAttendance({
            id: a.id,
            userId: a.userId,
            eventId: a.eventId,
            isComing: a.isComing,
            date: a.date,
          });
          setAnswered(true);
          setIsComing(a.isComing === 1 ? true : false);
        }
        if (a.isComing && margin / 4 <= 10) {
          profilePhotos.push(
            <Avatar
              bg="transparent"
              size="xs"
              ml={margin}
              source={{
                uri: a.photoURL,
              }}
            />
          );
          margin += 4;
        }
      });
      setProfilePhotosState(profilePhotos);
    };
    getAttendance();
    return () => {
      getAttendance;
    };
  }, []);

  useEffect(() => {
    if (isComing && margin / 4 <= 10) {
      profilePhotos.push(
        <Avatar
          bg="transparent"
          size="xs"
          ml={margin}
          source={{
            uri: auth.currentUser.photoURL,
          }}
        />
      );
      margin += 4;
    }
    if (!isComing) {
      const index = profilePhotos.indexOf(
        <Avatar
          bg="transparent"
          size="xs"
          ml={margin}
          source={{
            uri: auth.currentUser.photoURL,
          }}
        />
      );
      if (index > -1) {
        profilePhotos.splice(index, 1);
      }
    }
    setProfilePhotosState(profilePhotos);
  }, [isComing]);

  const saveAttendance = async (isComingParameter: boolean) => {
    if (isComingParameter === isComing && answered === true) {
      return;
    }
    console.log(isComing + " " + answered);
    const signedInUser = auth.currentUser;
    const date = new Date();
    console.log(date);
    const dateString = date.toISOString().split(".")[0];

    if (answered) {
      await axios.put(
        `http://192.168.0.105:3000/attendance/${myAttendance.id}`,
        {
          isComing: isComingParameter,
          date: dateString,
        }
      );
    } else {
      await axios.post(`http://192.168.0.105:3000/attendance`, {
        userId: signedInUser.uid,
        eventId: event.eventId,
        isComing: isComingParameter,
        date: dateString,
      });
    }
    setIsComing(isComingParameter);
    setAnswered(true);
  };

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"light"} />
      <Box w="100%" h="40%" bg="primary.200" justifyContent="flex-end">
        <Image
          w="full"
          h="full"
          source={require("../assets/training_3.jpg")}
          alt="Training photo."
          resizeMode="cover"
        />
        <Heading
          size="lg"
          color="white"
          position="absolute"
          bottom="50px"
          px="20px"
          noOfLines={2}
          isTruncated
          style={{
            textShadowRadius: 10,
            textShadowColor: "gray",
          }}
        >
          {event.name}
        </Heading>
      </Box>
      <Box
        w="100%"
        h="15px"
        bg="white"
        borderTopLeftRadius="15px"
        borderTopRightRadius="15px"
        position="relative"
        top="-15px"
      />
      <ScrollView
        _contentContainerStyle={{
          w: "100%",
          bg: "white",
          px: "20px",
          pb: "20px",
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        fadingEdgeLength={0}
      >
        <VStack space="5">
          <VStack space="2">
            <Text fontSize="sm" color="coolGray.400" mb="1" letterSpacing="lg">
              Basic Information
            </Text>
            <HStack space="5" py="2">
              <MaterialCommunityIcons name="calendar" size={20} color="black" />
              <Text fontSize="sm">
                {event.startDate.split("T")[0].replace(/-/g, "/")} ∙{" "}
                {event.startTime} - {event.endTime}
              </Text>
            </HStack>
            <HStack space="5" py="2">
              <Ionicons name="location-sharp" size={20} color="black" />
              <Text fontSize="sm">{event.location}</Text>
            </HStack>
            <HStack space="5" py="2">
              <Ionicons name="person" size={20} color="black" />
              <Text fontSize="sm">{"Juniori U19"}</Text>
            </HStack>
          </VStack>
          {event.details && (
            <Box>
              <Text
                fontSize="sm"
                color="coolGray.400"
                mb="3"
                letterSpacing="lg"
              >
                Details
              </Text>
              <Text>{event.details}</Text>
            </Box>
          )}
          <Box>
            <Text fontSize="sm" color="coolGray.400" mb="3" letterSpacing="lg">
              Attendance
            </Text>
            <HStack space="3">
              <IconButton
                colorScheme="green"
                variant={isComing ? "solid" : "outline"}
                borderRadius="full"
                _icon={{
                  as: Feather,
                  name: "check",
                  color: isComing ? "white" : "green.500",
                }}
                onPress={() => saveAttendance(true)}
              />
              <IconButton
                colorScheme="red"
                variant={!isComing && answered ? "solid" : "outline"}
                borderRadius="full"
                _icon={{
                  as: Feather,
                  name: "x",
                  color: !isComing && answered ? "white" : "red.500",
                }}
                onPress={() => saveAttendance(false)}
              />
            </HStack>
            <Box flexDirection="row" justifyContent="space-between" mt="3">
              <ZStack reversed>
                {profilePhotosState}
                <Avatar bg="gray.300" size="xs">
                  0
                </Avatar>
              </ZStack>
              <Button
                size="sm"
                variant="link"
                colorScheme="secondary"
                onPress={() =>
                  navigation.navigate("Attendance", { eventId: event.eventId })
                }
              >
                See All
              </Button>
            </Box>
          </Box>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default EventScreen;
