import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Text } from "react-native";
import Contacts from "../screens/contacts";
import Chats from "../screens/chats";
import Search from "../screens/search";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colours } from "../styles/colours";
import User from "../screens/user";
import styles from "../styles/globalStyle";

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
      <Image
        style={{
          width: 55,
          height: 55,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
        source={require("../assets/favicon.png")}
      />
      <Text style={styles.miniTitle}>WHATSTHAT?</Text>
    </View>
  );
}

function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colours.offWhite,
          height: 60,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: colours.offWhite,
          height: 85,
          borderBottomWidth: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Search":
              iconName = focused ? "search" : "search-outline";
              break;
            case "Contacts":
              iconName = focused ? "people" : "people-outline";
              break;
            case "Chats":
              iconName = focused
                ? "chatbubble-ellipses"
                : "chatbubble-ellipses-outline";
              break;
            // case 'Settings':
            //   iconName = focused ? 'settings' : 'settings-outline'
            //   break;
            case "You":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colours.green,
        tabBarInactiveTintColor: colours.lightGrey,
      })}
    >
      <Tab.Screen
        name="You"
        component={User}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />

      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      {/* <Tab.Screen name="Settings" component={ Settings } options={{ headerTitle: (props) => <LogoTitle {...props} /> }}/> */}
    </Tab.Navigator>
  );
}
export default BottomNav;
