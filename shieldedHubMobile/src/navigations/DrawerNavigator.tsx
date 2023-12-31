import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerContent, createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import { CredentialItemScreenNavigationOptions } from "../../types/types";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({
  staticData,
  setStaticData,
}: CredentialItemScreenNavigationOptions) => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home">
        {
          (props) => (<TabNavigator staticData={staticData} setStaticData={setStaticData} />)
        }
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
