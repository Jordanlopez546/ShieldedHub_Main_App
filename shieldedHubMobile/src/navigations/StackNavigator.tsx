import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GetStarted from "../screens/GetStarted";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import {
  CredentialItemProps,
  CredentialItemScreenNavigationOptions,
  RootStackParams,
} from "../../types/types";
import TabNavigator from "./TabNavigator";
import CredentialItemScreen from "../screens/CredentialItemScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = ({
  staticData,
  setStaticData,
}: CredentialItemScreenNavigationOptions) => {

  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen
        name="CredentialItemScreen"
        options={{ headerShown: true }}
      >
        { (props) => (<CredentialItemScreen {...props} staticData={staticData} setStaticData={setStaticData} />)}
      </Stack.Screen>
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="TheTabBarNavigators">
        {(props) => (
          <DrawerNavigator setStaticData={setStaticData} staticData={staticData} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
