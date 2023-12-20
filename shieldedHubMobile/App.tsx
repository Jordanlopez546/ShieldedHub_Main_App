import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import "react-native-gesture-handler";
import { ThemeContext, AuthContext } from "./Global/UISettings";
import { useContext, useEffect } from "react";
import CustomButton from "./src/components/CustomButton";
import MyFonts from "./src/components/MyFonts";
import Input from "./src/components/Input";
import GetStarted from "./src/screens/GetStarted";


export default function App() {
  
  const currentUser = useContext(AuthContext);
  const theme = useContext(ThemeContext);

  const changeStatusBarColour = () => {
    StatusBar.setBarStyle('light-content')
    StatusBar.setBackgroundColor('black');
  }

  useEffect(() => {
    changeStatusBarColour();
  }, [])

  return (
    <ThemeContext.Provider value={theme}>
      <AuthContext.Provider value={currentUser}>
        <SafeAreaView style={styles.container}>
          {/* <CustomButton text="Log In"/> */}
          {/* <Input text="Enter your email" /> */}
          <GetStarted/>
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
