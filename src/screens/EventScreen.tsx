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
import { EventProps } from "../types";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const EventScreen = ({ route }) => {
  const { event }: EventProps = route.params;
  const navigation = useNavigation();

  const dateToString = (time) => {
    const date = time.toDate();
    return date.toISOString().split("T")[0].replace(/-/g, "/");
  };

  const [isComing, setIsComing] = useState(false);
  const [answered, setAnswered] = useState(false);
  let profilePhotos: ReactElement[] = [];
  const [profilePhotosState, setProfilePhotosState] = useState<ReactElement[]>(
    []
  );

  useEffect(() => {
    let margin = 0;
    event.attendance.forEach((a) => {
      if (a.id === auth.currentUser.uid) {
        setAnswered(true);
        setIsComing(a.isComing);
      }
      if (a.isComing && margin / 4 <= 10) {
        profilePhotos.push(
          <Avatar
            bg="amber.500"
            size="xs"
            ml={margin}
            source={{
              uri: "https://www.finreport.sk/userfiles/obrazok_clanok_article_detail4c607557740111d9a014322771140b9a.jpg",
            }}
          />
        );
        margin += 4;
      }
    });
    setProfilePhotosState(profilePhotos);
  }, []);

  const saveAttendance = (isComingParameter: boolean) => {
    if (isComingParameter === isComing && answered) {
      return;
    }
    const signedInUser = auth.currentUser;
    if (answered) {
      event.attendance.forEach((e) => {
        if (e.id === signedInUser.uid) {
          e.date = firebase.firestore.Timestamp.now();
          e.isComing = isComingParameter;
        }
      });
      isComingParameter ? event.attendanceNumber++ : event.attendanceNumber--;
    } else {
      event.attendance.push({
        date: firebase.firestore.Timestamp.now(),
        id: signedInUser.uid,
        isComing: isComingParameter,
        name: signedInUser.displayName,
        photoURL: signedInUser.photoURL,
      });
      if (isComingParameter) {
        event.attendanceNumber++;
      }
    }
    console.log(event);
    db.collection("events").doc(event.id).set(event);
    setIsComing(isComingParameter);
    setAnswered(true);
  };

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"dark"} />
      <Box w="100%" h="40%" p="5" bg="primary.200" justifyContent="flex-end">
        <Image
          w="full"
          h="full"
          source={require("../assets/training_5.png")}
          alt="Training photo."
          resizeMode="contain"
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
                {dateToString(event.date)} ∙ {event.startTime} - {event.endTime}
              </Text>
            </HStack>
            <HStack space="5" py="2">
              <Ionicons name="location-sharp" size={20} color="black" />
              <Text fontSize="sm">{event.location}</Text>
            </HStack>
            <HStack space="5" py="2">
              <Ionicons name="person" size={20} color="black" />
              <Text fontSize="sm">{event.teamNames}</Text>
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
                  navigation.navigate("Attendance", {
                    attendance: event.attendance,
                  })
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
