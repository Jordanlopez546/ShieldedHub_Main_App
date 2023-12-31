import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { ThemeContext, AuthContext } from "./Global/UISettings";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";
import { CredentialItemProps } from "./types/types";
import "react-native-gesture-handler";
import DrawerNavigator from "./src/navigations/DrawerNavigator";

export default function xApp() {
  const staticDataInitial = [
    {
      id: 1,
      title: "Facebook Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 2,
      title: "Whatsapp Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 4,
      title: "Instagram Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 5,
      title: "Snapchat Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 6,
      title: "2go Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 7,
      title: "Facebook Login",
      email: "jordan@gmail.com",
      password: "102030",
    },
    {
      id: 8,
      title: "Whatsapp Login",
      email: "jordan@gmail.com",
      password: "102030",
    },
    {
      id: 9,
      title: "Instagram Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 11,
      title: "Snapchat Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 12,
      title: "2go Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 13,
      title: "Facebook Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 14,
      title: "Whatsapp Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 15,
      title: "Instagram Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 16,
      title: "Snapchat Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 17,
      title: "2go Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 18,
      title: "Snapchat Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
    {
      id: 19,
      title: "2go Login",
      email: "jordan@gmail.com",
      password: "102030",
      notes: "Something really good!",
    },
  ];
  const [staticData, setStaticData] =
    useState<CredentialItemProps[]>(staticDataInitial);

  const currentUser = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  const changeStatusBarColour = () => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("black");
  };

  useEffect(() => {
    changeStatusBarColour();
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={currentUser}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <StackNavigator
              staticData={staticData}
              setStaticData={setStaticData}
            />
          </NavigationContainer>
        </SafeAreaView>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
