import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
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
  CreateNewClubScreen,
  CreateNewTeamScreen,
  AddNewTeamScreen,
  AdminPanelClubsScreen,
  AdminPanelTeamsScreen,
  EditClubScreen,
  EditTeamScreen,
  CreateNewEventScreen,
} from "../screens";
import { theme } from "../themes";
import useTeam, { TeamProvider } from "../hooks/useTeam";
import { Image, SafeAreaView, Text, View } from "react-native";
import { auth } from "../firebase";

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
      <TeamTabs.Screen
        name="Payments"
        component={PaymentStackScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather
              containerStyle={{ marginTop: 6 }}
              name="dollar-sign"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <TeamTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Image
              style={{
                width: 28,
                height: 28,
                borderRadius: 28,
                borderColor: color,
                borderWidth: 1,
              }}
              source={{
                uri: auth.currentUser.photoURL,
              }}
            />
          ),
        }}
      />
    </TeamTabs.Navigator>
  );
}

const MainStack = createNativeStackNavigator();

/*const HeaderTitle = () => {
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
};*/

function MainStackScreen() {
  return (
    <TeamProvider>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Home" component={HomeStackScreen} />
        <MainStack.Screen
          name="Team"
          component={TeamTabsScreen}
          //options={{ headerTitle: (props) => <HeaderTitle /> }}
        />
      </MainStack.Navigator>
    </TeamProvider>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={whiteTopbar}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen
        name="Admin Panel"
        component={AdminDrawerScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const AdminDrawer = createDrawerNavigator();

function AdminDrawerScreen() {
  return (
    <AdminDrawer.Navigator
      screenOptions={{
        headerShadowVisible: false,
        drawerActiveTintColor: theme.colors.primary[500],
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView style={{ flex: 1, paddingTop: 70 }}>
            <Text
              style={{
                paddingBottom: 40,
                paddingHorizontal: 16,
                fontSize: 28,
                fontWeight: "bold",
                color: theme.colors.gray[700],
              }}
            >
              Admin Panel
            </Text>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
    >
      <AdminDrawer.Screen
        name="Admin Panel Clubs Screen"
        component={AdminPanelClubsStackScreen}
        options={{ title: "My Clubs" }}
      />
      <AdminDrawer.Screen
        name="Admin Panel Teams Screen"
        component={AdminPanelTeamsStackScreen}
        options={{ title: "My Teams" }}
      />
    </AdminDrawer.Navigator>
  );
}

const AdminPanelClubsStack = createNativeStackNavigator();

function AdminPanelClubsStackScreen() {
  return (
    <AdminPanelClubsStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminPanelClubsStack.Screen
        name="Admin Panel Clubs Screen"
        component={AdminPanelClubsScreen}
        options={{ title: "Clubs" }}
      />
      <AdminPanelClubsStack.Screen
        name="Create New Club"
        component={CreateNewClubScreen}
      />
      <AdminPanelClubsStack.Screen
        name="Edit Club"
        component={EditClubScreen}
      />
    </AdminPanelClubsStack.Navigator>
  );
}

const AdminPanelTeamsStack = createNativeStackNavigator();

function AdminPanelTeamsStackScreen() {
  return (
    <AdminPanelTeamsStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminPanelTeamsStack.Screen
        name="Admin Panel Teams Screen"
        component={AdminPanelTeamsScreen}
        options={{ title: "Teams" }}
      />
      <AdminPanelTeamsStack.Screen
        name="Create New Team"
        component={CreateNewTeamScreen}
      />
      <AdminPanelTeamsStack.Screen
        name="Edit Team"
        component={EditTeamScreen}
      />
    </AdminPanelTeamsStack.Navigator>
  );
}

const PaymentStack = createNativeStackNavigator();

function PaymentStackScreen() {
  return (
    <PaymentStack.Navigator screenOptions={whiteTopbar}>
      <PaymentStack.Screen name="Payment" component={PaymentScreen} />
    </PaymentStack.Navigator>
  );
}

const EventsStack = createNativeStackNavigator();

function EventsStackScreen() {
  return (
    <EventsStack.Navigator screenOptions={whiteTopbar}>
      <EventsStack.Screen name="Events" component={EventsScreen} />
      <EventsStack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerTransparent: true,
          title: "",
          headerTintColor: "#fff",
        }}
      />
      <EventsStack.Screen name="Attendance" component={AttendanceScreen} />
      <EventsStack.Screen
        name="Create New Event"
        component={CreateNewEventScreen}
      />
    </EventsStack.Navigator>
  );
}

const ChatStack = createNativeStackNavigator();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator screenOptions={whiteTopbar}>
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <ChatStack.Screen
        options={{
          headerTransparent: true,
          title: "",
          headerTintColor: "#fff",
        }}
        name="ImageDetail"
        component={ImageDetailScreen}
      />
      <ChatStack.Screen
        options={{
          headerTransparent: true,
          title: "",
          headerTintColor: "#fff",
        }}
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
      <RootStack.Screen name="Home" component={MainStackScreen} />
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
