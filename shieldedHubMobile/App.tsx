import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { ThemeContext, AuthContext } from "./Global/UISettings";
import { useContext, useEffect } from "react";
import CustomButton from "./src/components/CustomButton";
import MyFonts from "./src/components/MyFonts";
import Input from "./src/components/Input";
import GetStarted from "./src/screens/GetStarted";
import LogIn from "./src/screens/LogIn";
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";

export default function App() {
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
            <StackNavigator/>
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
