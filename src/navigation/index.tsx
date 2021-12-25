import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ProfileScreen,
  EventsScreen,
  ChatScreen,
  TeamScreen,
  EventScreen,
  PaymentScreen,
  ImageDetailScreen,
  AttendanceScreen,
  VideoDetailScreen,
} from "../screens";
import { theme } from "../themes";
import useTeam, { TeamProvider } from "../hooks/useTeam";
import { Image, Text, View } from "react-native";

const greenTopbar = {
  headerStyle: { backgroundColor: "#139874" },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "#fff",
};

const greyTopbar = {
  headerStyle: {
    backgroundColor: "#f1f1f1",
  },
  headerTitleStyle: { color: "#000" },
  headerTintColor: "#000",
};

const whiteTopbar = {
  backgroundColor: "#fff",
  headerShadowVisible: false,
};

const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={greenTopbar} initialRouteName={"Login"}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

const TeamTabs = createBottomTabNavigator();

function TeamTabsScreen() {
  return (
    <TeamTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.trueGray[300],
        tabBarLabelStyle: { paddingBottom: 5, fontSize: 10 },
      }}
    >
      <TeamTabs.Screen
        name="Team"
        component={TeamStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather
              containerStyle={{ marginTop: 6 }}
              name="home"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <TeamTabs.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={22} color={color} />
          ),
        }}
      />
      <TeamTabs.Screen
        name="Chat"
        component={ChatStackScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" size={22} color={color} />
          ),
        }}
      />
    </TeamTabs.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

const getOptions = () => {
  const { team } = useTeam();
  return {
    headerTitle: team.name,
    headerLeft: () => (
      <Image
        style={{
          width: 35,
          height: 35,
          borderRadius: 35,
          marginHorizontal: 10,
        }}
        source={{
          uri: team.photoURL,
        }}
      />
    ),
  };
};

const HeaderTitle = (allowFontScaling, style, children) => {
  const { team } = useTeam();
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={{
          width: 35,
          height: 35,
          borderRadius: 35,
          marginRight: 10,
        }}
        source={{
          uri: team.photoURL,
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "500" }}>{team.name}</Text>
    </View>
  );
};

function HomeStackScreen() {
  return (
    <TeamProvider>
      <HomeStack.Navigator screenOptions={whiteTopbar}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen
          name="Team"
          component={TeamTabsScreen}
          options={{ headerTitle: (props) => <HeaderTitle {...props} /> }}
        />
        <HomeStack.Screen name="Profile" component={ProfileScreen} />
      </HomeStack.Navigator>
    </TeamProvider>
  );
}

const TeamStack = createNativeStackNavigator();

function TeamStackScreen() {
  return (
    <TeamStack.Navigator screenOptions={{ headerShown: false }}>
      <TeamStack.Screen name="Team" component={TeamScreen} />
      <TeamStack.Screen name="Payment" component={PaymentScreen} />
      <TeamStack.Screen name="Profile" component={ProfileScreen} />
    </TeamStack.Navigator>
  );
}

const EventsStack = createNativeStackNavigator();

function EventsStackScreen() {
  return (
    <EventsStack.Navigator screenOptions={{ headerShown: false }}>
      <EventsStack.Screen name="Events" component={EventsScreen} />
      <EventsStack.Screen name="Event" component={EventScreen} />
      <EventsStack.Screen name="Attendance" component={AttendanceScreen} />
      <EventsStack.Screen name="Profile" component={ProfileScreen} />
    </EventsStack.Navigator>
  );
}

const ChatStack = createNativeStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen
        options={{ headerShown: false }}
        name="ImageDetail"
        component={ImageDetailScreen}
      />
      <ChatStack.Screen
        options={{ headerShown: false }}
        name="VideoDetail"
        component={VideoDetailScreen}
      />
    </ChatStack.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

function RootStackScreen() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
      <RootStack.Screen name="Home" component={HomeStackScreen} />
    </RootStack.Navigator>
  );
}

const navigationContainerTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={navigationContainerTheme}>
      <RootStackScreen />
    </NavigationContainer>
  );
}
