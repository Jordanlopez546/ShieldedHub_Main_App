import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "../screens/GetStarted";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import {
  CredentialItemScreenNavigationOptions,
  RootStackParams,
} from "../../types/types";
import TabNavigator from "./TabNavigator";
import CredentialItemScreen from "../screens/CredentialItemScreen";

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = ({
  staticData,
  setStaticData,
  isModalVisible,
  setIsModalVisible,
  currentScreen,
  handleScreenChange,
  isDarkMode,
  setIsDarkMode,
  currentUser,
}: CredentialItemScreenNavigationOptions) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="GetStarted"
    >
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="CredentialItemScreen" options={{ headerShown: true }}>
        {(props) => (
          <CredentialItemScreen
            {...props}
            staticData={staticData}
            setStaticData={setStaticData}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="TheTabBarNavigators">
        {(props) => (
          <TabNavigator
            {...props}
            currentScreen={currentScreen}
            handleScreenChange={handleScreenChange}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            setStaticData={setStaticData}
            staticData={staticData}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            currentUser={currentUser}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
