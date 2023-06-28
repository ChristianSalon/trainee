import React, { useEffect, useState } from "react";
import { NativeBaseProvider, FlatList, Box } from "native-base";
import { AttendanceProps } from "../types";
import { theme } from "../themes";
import { Attendance, StatusBar } from "../components";
import axios from "axios";
import { RefreshControl } from "react-native";
import { useTeam } from "../hooks";
import { API_BASE_URL } from "@env";

const AttendanceScreen = ({ route }) => {
  const [attendance, setAttendance] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const eventId = route.params.eventId;

  const getAttendance = async () => {
    setRefreshing(true);
    const results = await axios.get(`${API_BASE_URL}/attendance/${eventId}`);
    setAttendance(results.data);
    setRefreshing(false);
  };

  useEffect(() => {
    const getAttendance = async () => {
      const results = await axios.get(`${API_BASE_URL}/attendance/${eventId}`);
      setAttendance(results.data);
    };
    getAttendance();
  }, []);

  return (
    <>
      <StatusBar />
      <FlatList
        data={attendance}
        renderItem={({ item }) => <Attendance attendance={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAttendance} />
        }
      />
    </>
  );
};

export default AttendanceScreen;
