import React from "react";
import Credentials from "../screens/Credentials";
import NewDetail from "../screens/NewDetail";
import RecycleBin from "../screens/RecycleBin";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Credentials"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconColor, iconSize;
          iconColor = focused ? "#1E90FF" : "#fff";
          iconSize = focused ? 28 : 24;
          if (route.name === "Credentials") {
            return (
              <FontAwesome5 name="tasks" size={iconSize} color={iconColor} />
            );
          } else if (route.name === "New Detail") {
            return (
              <Entypo name="add-to-list" size={iconSize} color={iconColor} />
            );
          } else if (route.name === "Recycle Bin") {
            return (
              <Ionicons
                name="trash-bin-outline"
                size={iconSize}
                color={iconColor}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Credentials" component={Credentials} />
      <Tab.Screen name="New Detail" component={NewDetail} />
      <Tab.Screen name="Recycle Bin" component={RecycleBin} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
