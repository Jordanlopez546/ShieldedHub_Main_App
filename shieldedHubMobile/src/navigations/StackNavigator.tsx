import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "../screens/GetStarted";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import {
  CredentialItemScreenNavigationOptions,
  RootStackParams,
} from "../../types/types";
import CredentialItemScreen from "../screens/CredentialItemScreen";
import TopTabNavigator from "./TopTabNavigator";

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = ({
  isModalVisible,
  setIsModalVisible,
  currentScreen,
  handleScreenChange,
  isDarkMode,
  setIsDarkMode,
  initialRouteName,
  token,
}: CredentialItemScreenNavigationOptions & {
  initialRouteName: keyof RootStackParams;
}) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="CredentialItemScreen" options={{ headerShown: true }}>
        {(props) => (
          <CredentialItemScreen
            token={token}
            isDarkMode={isDarkMode}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="TheTabBarNavigators">
        {(props) => (
          <TopTabNavigator
            {...props}
            currentScreen={currentScreen}
            handleScreenChange={handleScreenChange}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            token={token}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
