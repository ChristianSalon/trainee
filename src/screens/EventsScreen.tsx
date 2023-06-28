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
import { API_BASE_URL } from "@env";

const EventsScreen = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState<{ [key: string]: Event[] }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { team, roles } = useTeam();

  const getEvents = async (dateString: string) => {
    const results = await axios.get(
      `${API_BASE_URL}/events/${team.teamId}?date=${dateString}`
    );
    let events: { [key: string]: Event[] } = {};
    let prevDate = dateString;
    results.data.forEach((item: Event) => {
      const strTime = item.startDate.split("T")[0];
      const diffDays = Math.ceil(
        (new Date(strTime).getTime() - new Date(prevDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (!events[strTime]) {
        events[strTime] = [];
      }
      console.log(diffDays);
      // empty dates
      /*for (let i = 0; i < diffDays; i++) {
        console.log(prevDate);
        if (!events[prevDate]) {
          events[prevDate] = [];
        }
        // prevDate++;
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 1);
        prevDate = newDate.toISOString().split("T")[0];
      }*/
      events[strTime].push(item);
      //prevDate = strTime;
    });
    console.log(events);

    setEvents(events);
    setIsLoaded(true);
  };

  useEffect(() => {
    getEvents(new Date().toISOString().split("T")[0]);
  }, []);

  const renderItem = (item: Event) => {
    return <EventComponent event={item} />;
  };

  const navigate = () => {
    navigation.navigate("Create New Event");
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
                renderEmptyData={() => {
                  return (
                    <Box flex="1" justifyContent="center" alignItems="center">
                      <Text>No events for this day</Text>
                    </Box>
                  );
                }}
                onRefresh={() =>
                  getEvents(new Date().toISOString().split("T")[0])
                }
                // Set this true while waiting for new data from a refresh
                refreshing={isRefreshing}
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
                  onPress={navigate}
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
