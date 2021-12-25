import React from "react";
import { NativeBaseProvider, FlatList } from "native-base";
import { AttendanceProps } from "../types";
import { StatusBar } from "expo-status-bar";
import { theme } from "../themes";
import { Attendance } from "../components";

const AttendanceScreen = ({ route }) => {
  const attendance: AttendanceProps = route.params.attendance;
  console.log(attendance);
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style={"dark"} />
      <FlatList
        data={attendance}
        renderItem={({ item }) => <Attendance attendance={item} />}
        keyExtractor={(item) => item.id}
      />
    </NativeBaseProvider>
  );
};

export default AttendanceScreen;
