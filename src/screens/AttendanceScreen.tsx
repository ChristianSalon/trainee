import React, { useEffect, useState } from "react";
import { NativeBaseProvider, FlatList } from "native-base";
import { AttendanceProps } from "../types";
import { StatusBar } from "expo-status-bar";
import { theme } from "../themes";
import { Attendance } from "../components";
import axios from "axios";
import { RefreshControl } from "react-native";

const AttendanceScreen = ({ route }) => {
  const [attendance, setAttendance] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const eventId = route.params.eventId;

  const getAttendance = async () => {
    setRefreshing(true);
    const results = await axios.get(
      `http://192.168.0.105:3000/attendance/${eventId}`
    );
    setAttendance(results.data);
    setRefreshing(false);
    console.log(attendance);
  };

  useEffect(() => {
    const getAttendance = async () => {
      const results = await axios.get(
        `http://192.168.0.105:3000/attendance/${eventId}`
      );
      setAttendance(results.data);
    };
    getAttendance();
    return () => {
      getAttendance;
    };
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"dark"} />
      <FlatList
        data={attendance}
        renderItem={({ item }) => <Attendance attendance={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAttendance} />
        }
      />
    </NativeBaseProvider>
  );
};

export default AttendanceScreen;
