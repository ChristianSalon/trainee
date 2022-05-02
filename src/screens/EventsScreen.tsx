import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Fab,
  Icon,
  NativeBaseProvider,
  PresenceTransition,
  Skeleton,
  VStack,
  Text,
  Heading,
  useColorModeValue,
} from "native-base";
import { Agenda } from "react-native-calendars";
import { theme } from "../themes";
import { useTeam } from "../hooks";
import { Event } from "../types";
import { Event as EventComponent, StatusBar } from "../components";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EventsScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState<{ [key: string]: Event[] }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { team, roles } = useTeam();

  const getEvents = async (dateString: string) => {
    const results = await axios.get(
      `http://192.168.0.105:3000/events/${team.teamId}?date=${dateString}`
    );
    let events: { [key: string]: Event[] } = {};
    results.data.forEach((item: Event) => {
      const strTime = item.startDate.split("T")[0];
      if (!events[strTime]) {
        events[strTime] = [];
      }
      events[strTime].push(item);
    });

    setEvents(events);
    setIsLoaded(true);
  };

  useEffect(() => {
    getEvents(new Date().toISOString().split("T")[0]);
  }, []);

  const renderItem = (item: Event) => {
    return <EventComponent event={item} />;
  };

  return (
    <>
      <StatusBar />
      {isLoaded ? (
        <>
          <PresenceTransition
            visible={true}
            initial={{
              opacity: 0.7,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 750,
              },
            }}
          >
            <Box w="100%" h="100%">
              <Agenda
                items={events}
                loadItemsForMonth={(date) => getEvents(date.dateString)}
                selected={new Date()}
                renderItem={renderItem}
                theme={{
                  todayTextColor: theme.colors.darkText,
                  todayBackgroundColor: useColorModeValue(
                    theme.colors.gray[200],
                    theme.colors.gray[700]
                  ),
                  selectedDayBackgroundColor: theme.colors.primary[500],
                  dotColor: theme.colors.primary[500],
                  agendaTodayColor: theme.colors.primary[500],
                  backgroundColor: useColorModeValue(
                    theme.colors.gray[100],
                    theme.colors.dark[50]
                  ),
                  calendarBackground: useColorModeValue(
                    theme.colors.white,
                    theme.colors.dark[50]
                  ),
                }}
              />
              {(roles.isCoach || roles.isManager) && (
                <Fab
                  icon={
                    <Icon
                      color="white"
                      as={<AntDesign name="plus" />}
                      size="sm"
                    />
                  }
                  onPress={() => navigation.navigate("Create New Event")}
                  placement="bottom-right"
                  renderInPortal={false}
                />
              )}
            </Box>
          </PresenceTransition>
        </>
      ) : (
        <Center flex="1" bg={useColorModeValue("white", "dark.50")}>
          <VStack space={8} width="90%" justifyContent={"space-evenly"}>
            <Skeleton h="10%" rounded="lg" />
            <Skeleton h="10%" rounded="lg" />
            <Skeleton h="10%" rounded="lg" />
            <Skeleton h="10%" rounded="lg" />
            <Skeleton h="10%" rounded="lg" />
            <Skeleton h="10%" rounded="lg" />
          </VStack>
        </Center>
      )}
    </>
  );
};

export default EventsScreen;
