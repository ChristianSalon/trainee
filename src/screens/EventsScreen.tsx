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
} from "native-base";
import { Agenda } from "react-native-calendars";
import { theme } from "../themes";
import { useTeam } from "../hooks";
import { Event } from "../types";
import { Event as EventComponent } from "../components";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const EventsScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState<{ [key: string]: Event[] }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { team } = useTeam();

  const getEvents = async () => {
    const results = await axios.get(
      `http://192.168.0.105:3000/events/${team.teamId}`
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
    getEvents();
    return () => {
      getEvents;
    };
  }, []);

  const renderItem = (item: Event) => {
    return <EventComponent event={item} />;
  };

  return (
    <NativeBaseProvider theme={theme}>
      {isLoaded ? (
        <>
          <PresenceTransition
            visible={true}
            initial={{
              opacity: 0,
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
                loadItemsForMonth={getEvents}
                selected={new Date()}
                renderItem={renderItem}
                theme={{
                  todayTextColor: theme.colors.darkText,
                  todayBackgroundColor: theme.colors.gray[200],
                  selectedDayBackgroundColor: theme.colors.primary[500], // calendar sel date
                  dotColor: theme.colors.primary[500], // dots
                  agendaTodayColor: theme.colors.primary[500],
                }}
              />
              <Fab
                icon={
                  <Icon
                    color="white"
                    as={<AntDesign name="plus" />}
                    size="sm"
                  />
                }
                onPress={() => navigation.navigate("Create New Event")}
              />
            </Box>
          </PresenceTransition>
        </>
      ) : (
        <Center flex="1">
          <VStack space={8} width="90%" justifyContent={"space-evenly"}>
            <Skeleton variant="text" height="10%" />
            <Skeleton variant="text" height="10%" />
            <Skeleton variant="text" height="10%" />
            <Skeleton variant="text" height="10%" />
            <Skeleton variant="text" height="10%" />
            <Skeleton variant="text" height="10%" />
          </VStack>
        </Center>
      )}
    </NativeBaseProvider>
  );
};

export default EventsScreen;
