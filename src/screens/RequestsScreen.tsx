import axios from "axios";
import { NativeBaseProvider, FlatList } from "native-base";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { auth } from "../firebase";
import { theme } from "../themes";
import { Request } from "../components";
import { API_BASE_URL } from "@env";

const RequestsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [requests, setRequests] = useState([]);

  const getRequests = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/requests/${auth.currentUser.uid}`
    );
    setRequests(response.data);
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <FlatList
      data={requests}
      renderItem={({ item }) => <Request request={item} />}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getRequests} />
      }
    />
  );
};

export default RequestsScreen;
