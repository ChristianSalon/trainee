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
  useColorModeValue,
  Spinner,
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { theme } from "../themes";
import { AttendanceProps, EventProps, MysqlBoolean } from "../types";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar, TextInputModal } from "../components";

const EventScreen = ({ route }) => {
  const { event }: EventProps = route.params;
  const navigation = useNavigation();
  const [isComing, setIsComing] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [myAttendance, setMyAttendance] = useState({});
  const [excuseNote, setExcuseNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let profilePhotos: string[] = [];
  const [profilePhotosState, setProfilePhotosState] = useState<string[]>([]);
  let margin = 0;
  console.log("RENDER" + profilePhotos);

  useEffect(() => {
    console.log("ME");
    if (isComing && margin / 4 <= 10) {
      console.log("ME PUSH");
      console.log(profilePhotos);
      //setProfilePhotosState([...profilePhotosState, auth.currentUser.photoURL]);
      setProfilePhotosState((prev) => [...prev, auth.currentUser.photoURL]);
      //profilePhotosState.push(auth.currentUser.photoURL);
      margin += 4;
    }
    if (!isComing) {
      setProfilePhotosState(
        profilePhotosState.filter((photoURL) => {
          return photoURL !== auth.currentUser.photoURL;
        })
      );
    }

    console.log("ME END");
  }, [isComing]);

  useEffect(() => {
    const getAttendance = async () => {
      console.log("ALL");
      const results = await axios.get(
        `https://trainee.software/attendance/${event.eventId}`
      );
      results.data.forEach((a) => {
        if (a.userId === auth.currentUser.uid) {
          setMyAttendance({
            id: a.id,
            userId: a.userId,
            eventId: a.eventId,
            isComing: a.isComing,
            date: a.date,
            excuseNote: a.excuseNote,
          });
          setAnswered(true);
          setIsComing(a.isComing === MysqlBoolean.True ? true : false);
        }
        if (
          a.isComing === MysqlBoolean.True &&
          margin / 4 <= 10 &&
          a.userId !== auth.currentUser.uid
        ) {
          profilePhotos.push(a.photoURL);
          margin += 4;
        }
      });
      console.log("ALL END");
      console.log(profilePhotos);
      setProfilePhotosState(profilePhotos);
    };
    getAttendance();
    setIsLoading(false);
  }, []);

  const saveAttendance = async (isComingParameter: boolean) => {
    if (isComingParameter === isComing && answered === true) {
      return;
    }
    const signedInUser = auth.currentUser;
    const dateString = new Date().toISOString().split(".")[0];

    if (answered && isComingParameter) {
      await axios.put(
        `https://trainee.software/attendance/${myAttendance.id}`,
        {
          isComing: isComingParameter,
          date: dateString,
          excuseNote: null,
        }
      );
      setIsComing(isComingParameter);
      setAnswered(true);
    } else if (answered && !isComingParameter) {
      setShowModal(true);
    } else if (isComingParameter) {
      const resopnse = await axios.post(`https://trainee.software/attendance`, {
        userId: signedInUser.uid,
        eventId: event.eventId,
        isComing: isComingParameter,
        date: dateString,
        excuseNote: undefined,
      });
      setIsComing(isComingParameter);
      setAnswered(true);
    } else {
      setShowModal(true);
    }
  };

  const saveIsNotComingAttendance = async () => {
    const signedInUser = auth.currentUser;
    const dateString = new Date().toISOString().split(".")[0];

    if (answered) {
      await axios.put(
        `https://trainee.software/attendance/${myAttendance.id}`,
        {
          isComing: false,
          date: dateString,
          excuseNote: excuseNote,
        }
      );
    } else {
      await axios.post(`https://trainee.software/attendance`, {
        userId: signedInUser.uid,
        eventId: event.eventId,
        isComing: false,
        date: dateString,
        excuseNote: excuseNote,
      });
    }
    setIsComing(false);
    setAnswered(true);
  };

  const getEventInfoDates = () => {
    if (
      new Date(event.endDate.split("T")[0]).getTime() >
      new Date(event.startDate.split("T")[0]).getTime()
    ) {
      return `${event.startDate.split("T")[0].replace(/-/g, "/")} ∙ ${
        event.startTime
      } - ${event.endDate.split("T")[0].replace(/-/g, "/")} ∙ ${event.endTime}`;
    } else {
      return `${event.startDate.split("T")[0].replace(/-/g, "/")} ∙ ${
        event.startTime
      } - ${event.endTime}`;
    }
  };

  const navigate = () => {
    navigation.navigate("Attendance", {
      eventId: event.eventId,
    });
  };

  return (
    <>
      <StatusBar style="light" />
      {isLoading ? (
        <Box justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <>
          <Box w="100%" h="40%" bg="primary.200" justifyContent="flex-end">
            <Image
              w="full"
              h="full"
              source={require("../assets/training_4.jpg")}
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
          {/*<Box
        w="100%"
        h="15px"
        bg="white"
        /*borderTopLeftRadius="15px"
        borderTopRightRadius="15px"
      />*/}
          <ScrollView
            _contentContainerStyle={{
              w: "100%",
              bg: "white",
              px: "20px",
              py: "30px",
              bgColor: useColorModeValue(undefined, "dark.50"),
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            fadingEdgeLength={0}
            bg={useColorModeValue(undefined, "dark.50")}
          >
            <VStack space="5">
              <VStack space="2">
                <Text
                  fontSize="xs"
                  color="coolGray.400"
                  mb="1"
                  letterSpacing="lg"
                >
                  BASIC INFORMATION
                </Text>
                <HStack space="5" py="2">
                  <MaterialCommunityIcons
                    name="calendar"
                    size={22}
                    color="gray"
                  />
                  <Text fontSize="sm">{getEventInfoDates()}</Text>
                </HStack>
                <HStack space="5" py="2">
                  <Ionicons name="location-sharp" size={22} color="gray" />
                  <Text fontSize="sm">{event.location}</Text>
                </HStack>
                <HStack space="5" py="2">
                  <Ionicons name="person" size={22} color="gray" />
                  <Text fontSize="sm">{event.teamsString}</Text>
                </HStack>
              </VStack>
              {event.details && (
                <Box>
                  <Text
                    fontSize="xs"
                    color="coolGray.400"
                    mb="3"
                    letterSpacing="lg"
                  >
                    DETAILS
                  </Text>
                  <Text>{event.details}</Text>
                </Box>
              )}
              <Box>
                <Text
                  fontSize="xs"
                  color="coolGray.400"
                  letterSpacing="lg"
                  mb="3"
                >
                  ATTENDANCE
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
                {showModal && (
                  <TextInputModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    value={excuseNote}
                    onValueChange={setExcuseNote}
                    headerText={"Excuse Note"}
                    placeholder={"Your excuse"}
                    onSave={saveIsNotComingAttendance}
                  />
                )}
                <Box flexDirection="row" justifyContent="space-between" mt="5">
                  <ZStack reversed>
                    {profilePhotosState.map((profilePhoto, index) => (
                      <Avatar
                        bg="transparent"
                        size="xs"
                        ml={`${index * 16}px`}
                        source={{
                          uri: profilePhoto,
                        }}
                      />
                    ))}
                    <Avatar bg="gray.300" size="xs">
                      0
                    </Avatar>
                  </ZStack>
                  <Button
                    size="sm"
                    variant="link"
                    colorScheme="secondary"
                    onPress={navigate}
                  >
                    See All
                  </Button>
                </Box>
              </Box>
              <Heading
                size="sm"
                pt="2"
                textAlign="center"
                color={useColorModeValue("gray.300", "gray.700")}
              >
                Powered by Trainee.
              </Heading>
            </VStack>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default EventScreen;
