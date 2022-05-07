import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";
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
  ManageUsersScreen,
  AddNewUsersScreen,
  RequestsScreen,
  AdminPanelPaymentsScreen,
  CreateNewPaymentScreen,
  EditPaymentScreen,
  PaymentStatusScreen,
} from "../screens";
import { theme } from "../themes";
import { colorModeManager } from "../colorModeManager";
import useTeam, { TeamProvider } from "../hooks/useTeam";
import {
  Image,
  SafeAreaView,
  Text,
  useColorScheme,
  View,
  Appearance,
} from "react-native";
import { auth } from "../firebase";
import { StripeProvider } from "@stripe/stripe-react-native";
import { ClubProvider } from "../hooks/useClub";
import {
  NativeBaseProvider,
  useColorMode,
  useColorModeValue,
} from "native-base";
import axios from "axios";
import { ThemeProvider } from "../hooks/useTheme";
import { useTheme } from "../hooks";

const greenTopbar = {
  headerStyle: { backgroundColor: "#139874" },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "#fff",
};

const blackTopbar = {
  headerStyle: {
    backgroundColor: "#18181b",
  },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "#fff",
  headerShadowVisible: false,
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
        tabBarActiveBackgroundColor: useColorModeValue(
          undefined,
          theme.colors.dark[50]
        ),
        tabBarInactiveBackgroundColor: useColorModeValue(
          undefined,
          theme.colors.dark[50]
        ),
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
    <HomeStack.Navigator
      screenOptions={useColorModeValue(whiteTopbar, blackTopbar)}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#18181b",
          },
          headerTitleStyle: { color: "#fff" },
          headerTintColor: "#fff",
        }}
      />
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen name="Requests" component={RequestsScreen} />
      <HomeStack.Screen
        name="Admin Panel Clubs Screen"
        component={AdminPanelClubsStackScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const AdminDrawer = createDrawerNavigator();

function AdminDrawerScreen() {
  const { colorMode } = useColorMode();
  return (
    <AdminDrawer.Navigator
      screenOptions={{
        ...useColorModeValue(whiteTopbar, blackTopbar),
        /*headerStyle: {
          backgroundColor: useColorModeValue(undefined, theme.colors.dark[50]),
        },
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff",
        headerShadowVisible: false,*/
        drawerActiveTintColor: theme.colors.primary[500],
        drawerInactiveTintColor: useColorModeValue(
          undefined,
          theme.colors.gray[600]
        ),
        drawerInactiveBackgroundColor: useColorModeValue(
          undefined,
          theme.colors.gray[800]
        ),
      }}
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop: 70,
              backgroundColor: colorMode === "light" ? "white" : "#18181b",
            }}
          >
            <Text
              style={{
                paddingBottom: 40,
                paddingHorizontal: 16,
                fontSize: 28,
                fontWeight: "bold",
                color:
                  colorMode === "light"
                    ? theme.colors.gray[700]
                    : theme.colors.gray[400],
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
        name="Admin Panel Teams Screen"
        component={AdminPanelTeamsStackScreen}
        options={{ title: "Teams" }}
      />
      <AdminDrawer.Screen
        name="Admin Panel Payments Screen"
        component={AdminPanelPaymentsStackScreen}
        options={{ title: "Payments" }}
      />
    </AdminDrawer.Navigator>
  );
}

const AdminPanelClubsStack = createNativeStackNavigator();

function AdminPanelClubsStackScreen() {
  return (
    <ClubProvider>
      <AdminPanelClubsStack.Navigator
        screenOptions={useColorModeValue(whiteTopbar, blackTopbar)}
      >
        <AdminPanelClubsStack.Screen
          name="Admin Panel Clubs Screen"
          component={AdminPanelClubsScreen}
          options={{ title: "Your Clubs" }}
        />
        <AdminPanelClubsStack.Screen
          name="Create New Club"
          component={CreateNewClubScreen}
        />
        <AdminPanelClubsStack.Screen
          name="Edit Club"
          component={EditClubScreen}
        />
        <AdminPanelClubsStack.Screen
          name="Admin Panel"
          component={AdminDrawerScreen}
          options={{ headerShown: false }}
        />
      </AdminPanelClubsStack.Navigator>
    </ClubProvider>
  );
}

const EditTeamStack = createNativeStackNavigator();

function EditTeamStackScreen() {
  return (
    <EditTeamStack.Navigator screenOptions={{ headerShown: false }}>
      <EditTeamStack.Screen name="Edit Team" component={EditTeamScreen} />
      <EditTeamStack.Screen name="Manage Users" component={ManageUsersScreen} />
    </EditTeamStack.Navigator>
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
      <AdminPanelTeamsStack.Screen
        name="Manage Users"
        component={ManageUsersScreen}
      />
      <AdminPanelTeamsStack.Screen
        name="Add New Users"
        component={AddNewUsersScreen}
      />
    </AdminPanelTeamsStack.Navigator>
  );
}

const AdminPanelPaymentsStack = createNativeStackNavigator();

function AdminPanelPaymentsStackScreen() {
  return (
    <AdminPanelPaymentsStack.Navigator screenOptions={{ headerShown: false }}>
      <AdminPanelPaymentsStack.Screen
        name="Admin Panel Payments Screen"
        component={AdminPanelPaymentsScreen}
        options={{ title: "Payments" }}
      />
      <AdminPanelPaymentsStack.Screen
        name="Create New Payment"
        component={CreateNewPaymentScreen}
      />
      <AdminPanelPaymentsStack.Screen
        name="Edit Payment"
        component={EditPaymentScreen}
      />
      <AdminPanelPaymentsStack.Screen
        name="Payment Status"
        component={PaymentStatusScreen}
      />
    </AdminPanelPaymentsStack.Navigator>
  );
}

const PaymentStack = createNativeStackNavigator();

function PaymentStackScreen() {
  return (
    <PaymentStack.Navigator
      screenOptions={useColorModeValue(whiteTopbar, blackTopbar)}
    >
      <PaymentStack.Screen name="Payments" component={PaymentScreen} />
    </PaymentStack.Navigator>
  );
}

const EventsStack = createNativeStackNavigator();

function EventsStackScreen() {
  return (
    <EventsStack.Navigator
      screenOptions={useColorModeValue(whiteTopbar, blackTopbar)}
    >
      <EventsStack.Screen name="Events" component={EventsScreen} />
      <EventsStack.Screen
        name="Event"
        component={EventScreen}
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          title: "",
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
    <ChatStack.Navigator
      screenOptions={useColorModeValue(whiteTopbar, blackTopbar)}
    >
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <ChatStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTransparent: true,
          title: "",
          headerTintColor: "#fff",
        }}
        name="ImageDetail"
        component={ImageDetailScreen}
      />
      <ChatStack.Screen
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
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

export default function Navigation() {
  const linking = {
    prefixes: [Linking.createURL("/"), "trainee://", "http://localhost:19002"],
  };

  /*const { colorMode } = useColorMode();
  const colorScheme = useColorScheme();
  console.log(`${colorMode} - ${colorScheme} - ${Appearance.getColorScheme()}`);*/
  const { persistedTheme } = useTheme();
  const [navigationContainerTheme, setNavigationContainerTheme] = useState<{
    dark: boolean;
    colors: {
      background: string;
      primary: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  }>({ ...DefaultTheme });

  useEffect(() => {
    console.log("Persisted Theme - " + persistedTheme);
    setNavigationContainerTheme(
      persistedTheme === "light"
        ? {
            ...DefaultTheme,
            dark: false,
            colors: {
              ...DefaultTheme.colors,
              background: theme.colors.white,
            },
          }
        : {
            ...DarkTheme,
            dark: true,
            colors: {
              ...DarkTheme.colors,
              background: theme.colors.dark[50],
            },
          }
    );
  }, [persistedTheme]);

  /*const navigationContainerThemee = {
    ...DarkTheme,
    dark: true,
    colors: {
      ...DarkTheme.colors,
      background: theme.colors.dark[50],
    },
  };*/

  return (
    <StripeProvider
      publishableKey="pk_test_51KqHnWBPMHj98s1MrdNH42HuT1IVh2Sx9SYOuEN4C3nmJvVPXxjxl5YZ2wsTMjP1p43MK7Q5FL66ePov4RF5XvR600SV0CmyiN"
      urlScheme="https://trainee.software"
    >
      <NavigationContainer linking={linking} theme={navigationContainerTheme}>
        <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
          <RootStackScreen />
        </NativeBaseProvider>
      </NavigationContainer>
    </StripeProvider>
  );
}
