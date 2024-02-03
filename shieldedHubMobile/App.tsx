import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { ModalContext, IsDarkModeContext } from "./Global/UISettings";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialProvider } from "./Global/CredentialContext";
import { HandleScreenChangeFunction } from "./types/types";

export default function App() {
  const modalVal = useContext(ModalContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(modalVal);

  const [currentScreen, setCurrentScreen] = useState<string>("Credentials");
  const [userActiveSc, setUserActiveSc] = useState<boolean>(false);

  const darkModeVal = useContext(IsDarkModeContext);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(darkModeVal);

  const handleScreenChange: HandleScreenChangeFunction = useCallback(
    (screen: string) => {
      setIsModalVisible(false); // Close modal when switching screens
      setCurrentScreen(screen);
    },
    []
  );

  const changeStatusBarColourAndTheme = () => {
    StatusBar.setBarStyle(!isDarkMode ? "dark-content" : "light-content");
    StatusBar.setBackgroundColor(!isDarkMode ? "white" : "#1E272E");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1E272E" : "#fff",
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

  const fetchUserToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem("authToken");

      if (userToken) {
        setUserActiveSc(true);
      }
    } catch (err) {
      // Nothing
    }
  };

  useEffect(() => {
    fetchUserToken();
    changeStatusBarColourAndTheme();
  }, [isDarkMode]);

  return (
    <CredentialProvider>
      <SafeAreaView style={[styles.container]}>
        <NavigationContainer>
          <StackNavigator
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            currentScreen={currentScreen}
            handleScreenChange={handleScreenChange}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            userActiveSc={userActiveSc}
          />
        </NavigationContainer>
      </SafeAreaView>
    </CredentialProvider>
  );
}
