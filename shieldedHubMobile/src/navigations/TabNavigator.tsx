import React, { useEffect } from "react";
import NewDetail from "../screens/NewDetail";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavigatorProps } from "../../types/types";
import { View } from "react-native";
import CredentialsScreen from "../screens/CredentialsScreen";
import RecycleBinScreen from "../screens/RecycleBinScreen";

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
            <CredentialsScreen
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
            <RecycleBinScreen
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
