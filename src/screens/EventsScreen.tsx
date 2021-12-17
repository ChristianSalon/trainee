import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  NativeBaseProvider,
  PresenceTransition,
  Pressable,
  Skeleton,
  Stack,
  VStack,
} from "native-base";
import { Text } from "react-native";
import { Agenda } from "react-native-calendars";
import { theme } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";
import { useTeam } from "../hooks";
import { EventProps } from "../types";
import { Event } from "../components";

const EventsScreen = () => {
  const [events, setEvents] = useState<{ [key: string]: EventProps[] }>({});
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { team } = useTeam();

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItems = (item) => {
    return (
      <Pressable
        style={{
          backgroundColor: "white",
          flex: 1,
          borderRadius: 5,
          padding: 10,
          marginRight: 10,
          marginTop: 17,
          width: "100%",
          height: item.height,
        }}
        onPress={() => alert(item.name)}
      >
        <Text>{item.name}</Text>
      </Pressable>
    );
  };

  const dateToString = (time) => {
    const date = time.toDate();
    return date.toISOString().split("T")[0];
  };

  const loadEvents = (day) => {
    console.log(day);
    setEvents({});
    db.collection("events")
      .where("teams", "array-contains", team.id)
      .orderBy("date", "asc")
      .get()
      .then((snapshot) => {
        const mappedData = snapshot.docs.map((doc) => ({
          event: doc.data(),
        }));

        mappedData.forEach((item) => {
          console.log(item);
          //const time = day.timestamp * 24 * 60 * 60 * 1000;
          const strTime = dateToString(item.event.date);
          if (!events[strTime]) {
            events[strTime] = [];
          }
          events[strTime].push(item);
        });

        const newItems = {};
        Object.keys(events).forEach((key) => {
          newItems[key] = events[key];
        });
        setEvents(newItems);
        console.log(events);

        /*const reducedData = mappedData.reduce(
          (acc: { [key: string]: EventProps[] }, currentItem) => {
            const date = dateToString(currentItem.event.date);
            acc[date] = currentItem.event;
            return acc;
          },
          {}
        );
        setEvents(reducedData);*/
      });
  };

  useEffect(() => {
    setEvents({});
    db.collection("events")
      .where("teams", "array-contains", team.id)
      .orderBy("date", "asc")
      .get()
      .then((snapshot) => {
        const mappedData = snapshot.docs.map((doc) => ({
          event: doc.data(),
        }));

        mappedData.forEach((item) => {
          console.log(item);
          //const time = day.timestamp * 24 * 60 * 60 * 1000;
          const strTime = dateToString(item.event.date);
          if (!events[strTime]) {
            events[strTime] = [];
          }
          events[strTime].push(item);
        });

        const newItems = {};
        Object.keys(events).forEach((key) => {
          newItems[key] = events[key];
        });
        setEvents(newItems);
        setIsLoaded(true);

        /*const reducedData = mappedData.reduce(
          (acc: { [key: string]: EventProps[] }, currentItem) => {
            const date = dateToString(currentItem.event.date);
            acc[date] = currentItem.event;
            return acc;
          },
          {}
        );
        setEvents(reducedData);*/
      });
  }, []);

  const renderItem = (item) => {
    return <Event event={item.event} />;
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
                //loadItemsForMonth={loadEvents}
                selected={"2021-12-15"}
                renderItem={renderItem}
                theme={{
                  todayTextColor: theme.colors.darkText,
                  todayBackgroundColor: theme.colors.gray[200],
                  selectedDayBackgroundColor: theme.colors.primary[500], // calendar sel date
                  dotColor: theme.colors.primary[500], // dots
                }}
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
