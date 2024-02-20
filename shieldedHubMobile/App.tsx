import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { IsDarkModeContext, ModalContext } from "./Global/UISettings";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";
import { CredentialProvider } from "./Global/CredentialContext";
import { HandleScreenChangeFunction, RootStackParams } from "./types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";

export default function App() {
  const modalVal = useContext(ModalContext);
  const isDarkModeVal = useContext(IsDarkModeContext);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(modalVal);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isDarkModeVal);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userIsActive, setUserIsActive] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const [currentScreen, setCurrentScreen] = useState<string>("Credentials");

  const handleScreenChange: HandleScreenChangeFunction = useCallback(
    (screen: string) => {
      setIsModalVisible(false); // Close modal when switching screens
      setCurrentScreen(screen);
    },
    []
  );

  const changeStatusBarColourAndTheme = () => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    StatusBar.setBackgroundColor(isDarkMode ? "#1E272E" : "#fff");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1E272E" : "#fff",
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

  useEffect(() => {
    checkTokenAndTheme();
  }, [token]);

  const checkTokenAndTheme = async () => {
    try {
      const userToken = await AsyncStorage.getItem("authToken");
      const themePreference = await AsyncStorage.getItem("themePreference");
      if (userToken === null) {
        setUserIsActive(false);
      } else if (userToken !== null) {
        setToken(userToken);
      }
      if (themePreference !== null) {
        setIsDarkMode(themePreference === "dark");
      }
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async () => {
    try {
      await AsyncStorage.setItem(
        "themePreference",
        isDarkMode ? "dark" : "light"
      );
    } catch (err) {
      // Nothing
    }
  };

  useEffect(() => {
    saveThemePreference();
    changeStatusBarColourAndTheme();
  }, [isDarkMode]);

  if (isLoading) {
    return null;
  }

  return (
    <IsDarkModeContext.Provider value={isDarkMode}>
      <CredentialProvider>
        <SafeAreaView style={[styles.container]}>
          <NavigationContainer>
            <StackNavigator
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              currentScreen={currentScreen}
              handleScreenChange={handleScreenChange}
              initialRouteName={userIsActive ? "TheTabBarNavigators" : "LogIn"}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              token={token}
            />
          </NavigationContainer>
        </SafeAreaView>
      </CredentialProvider>
    </IsDarkModeContext.Provider>
  );
}
