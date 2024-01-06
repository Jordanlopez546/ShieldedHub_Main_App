import React, { useEffect } from "react";
import Credentials from "../screens/Credentials";
import NewDetail from "../screens/NewDetail";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CredentialItemScreenNavigationOptions,
  TabNavigatorProps,
  TabParamList,
} from "../../types/types";
import RecycleBin from "../screens/RecycleBin";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const TabNavigator = ({
  staticData,
  setStaticData,
  theme,
  setTheme,
  isModalVisible,
  setIsModalVisible,
  currentScreen,
  handleScreenChange,
  navigation,
  isDarkMode,
  setIsDarkMode,
}: TabNavigatorProps) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (isModalVisible) {
        e.preventDefault(); // Prevent the screen from being removed
        if (setIsModalVisible) {
          setIsModalVisible(false); // Close the modal
          navigation.dispatch(e.data.action); // Dispatch the action
        }
      }
    });

    return unsubscribe;
  }, [navigation, isModalVisible, setIsModalVisible]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "#1E272E" : "#fff",
      }}
    >
      <Tab.Navigator
        initialRouteName="Credentials"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#1E272E" : "#000",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconColor, iconSize;
            iconColor = focused
              ? isDarkMode
                ? "#fff"
                : "#1E90FF"
              : isDarkMode
              ? "rgba(240, 240, 240, 0.6)"
              : "rgba(240, 240, 240, 0.6)";

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
          tabBarActiveTintColor: isDarkMode ? "#fff" : "#1E90FF", // Active tab text and icon color
        })}
      >
        <Tab.Screen
          name="Credentials"
          listeners={{
            tabPress: (e) => {
              if (handleScreenChange) {
                handleScreenChange("Credentials");
              }
            },
          }}
        >
          {(props) => (
            <Credentials
              {...props}
              currentScreen={currentScreen}
              handleScreenChange={handleScreenChange}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              theme={theme}
              setTheme={setTheme}
              staticData={staticData}
              setStaticData={setStaticData}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="New Detail"
          listeners={{
            tabPress: (e) => {
              if (handleScreenChange) {
                handleScreenChange("New Detail");
              }
            },
          }}
        >
          {(props) => (
            <NewDetail
              {...props}
              currentScreen={currentScreen}
              handleScreenChange={handleScreenChange}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              theme={theme}
              setTheme={setTheme}
              staticData={staticData}
              setStaticData={setStaticData}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Recycle Bin"
          listeners={{
            tabPress: (e) => {
              if (handleScreenChange) {
                handleScreenChange("Recycle Bin");
              }
            },
          }}
        >
          {(props) => (
            <RecycleBin
              currentScreen={currentScreen}
              handleScreenChange={handleScreenChange}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              theme={theme}
              setTheme={setTheme}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              {...props}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
