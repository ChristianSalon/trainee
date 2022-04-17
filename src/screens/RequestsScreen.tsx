import axios from "axios";
import { NativeBaseProvider, FlatList } from "native-base";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { auth } from "../firebase";
import { theme } from "../themes";
import { Request } from "../components";

const RequestsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    const response = await axios.get(
      `http://192.168.0.105:3000/requests/${auth.currentUser.uid}`
    );
    setRequests(response.data);
  };

  useEffect(() => {
    getRequests();
    return () => {
      getRequests;
    };
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <FlatList
        data={requests}
        renderItem={({ item }) => <Request request={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getRequests} />
        }
      />
    </NativeBaseProvider>
  );
};

export default RequestsScreen;
