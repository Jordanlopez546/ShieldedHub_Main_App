import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { ModalContext } from "./Global/UISettings";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialProvider } from "./Global/CredentialContext";
import { HandleScreenChangeFunction, ThemeContextProps } from "./types/types";
import { ThemeContext, ThemeProvider } from "./Global/ThemeContext";

export default function App() {
  const modalVal = useContext(ModalContext);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(modalVal);

  const [currentScreen, setCurrentScreen] = useState<string>("Credentials");
  const [userToken, setUserToken] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const { isDarkMode } = useContext(ThemeContext) as ThemeContextProps;

  const handleScreenChange: HandleScreenChangeFunction = useCallback(
    (screen: string) => {
      setIsModalVisible(false); // Close modal when switching screens
      setCurrentScreen(screen);
    },
    []
  );

  const changeStatusBarColourAndTheme = () => {
    StatusBar.setBarStyle(!isDarkMode ? "dark-content" : "light-content");
    StatusBar.setBackgroundColor(!isDarkMode ? "#fff" : "#1E272E");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1E272E" : "#fff",
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const fetchUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token !== null) {
        setUserToken(token);
      } else {
        setUserToken(""); // or any other default value you prefer
      }
    } catch (err) {
      // Nothing
    } finally {
      setLoading(false); // Set loading to false after fetching token
    }
  };

  useEffect(() => {
    fetchUserToken();
    changeStatusBarColourAndTheme();
  }, []);

  // Show loading indicator until the token is fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={100} color="dodgerblue" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <CredentialProvider>
        <SafeAreaView style={[styles.container]}>
          <NavigationContainer>
            <StackNavigator
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              currentScreen={currentScreen}
              handleScreenChange={handleScreenChange}
              initialRouteName={
                !userToken ? "GetStarted" : "TheTabBarNavigators"
              }
            />
          </NavigationContainer>
        </SafeAreaView>
      </CredentialProvider>
    </ThemeProvider>
  );
}
