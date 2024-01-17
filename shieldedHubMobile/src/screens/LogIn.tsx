import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import TheDoubleCircles from "../components/TheDoubleCircles";
import GetStartedAndLoginImageView from "../components/GetStartedAndLoginImageView";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { RootStackParams } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// Login Screen
const LogIn = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.05, // 5% of the screen
  };

  const handleLogIn = () => {
    navigation.navigate("SignUp");
  };

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("white");
  }, []);

  return (
    <ScrollView
      scrollEnabled
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.doubleCirclesContainer}>
        <TheDoubleCircles />
      </View>
      <View style={styles.getStartedImageContainer}>
        <Text style={[styles.firstText, { marginBottom: 15 }]}>
          Welcome back!
        </Text>
        <GetStartedAndLoginImageView text="first" />
      </View>
      <View style={[styles.inputsContainer]}>
        <Input
          autoFocus={true}
          value={username}
          onChangeText={(text) => setUsername(text)}
          text="Enter your username"
        />
        <Input
          autoFocus={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          text="Enter your password"
        />
        <TouchableOpacity activeOpacity={0.3}>
          <Text
            style={[
              styles.firstText,
              {
                color: "rgba(30, 144, 255, 0.77)",
                fontWeight: "400",
                marginVertical: 25,
              },
            ]}
          >
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.CustomBtnContainer}>
        <CustomButton onPress={handleLogIn} text="Log In" />
        <View style={[styles.dontHaveContainer, containerStyles]}>
          <Text style={[styles.firstText, { fontWeight: "400", fontSize: 18 }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={handleLogIn} activeOpacity={0.3}>
            <Text
              style={[
                styles.firstText,
                {
                  color: "rgba(30, 144, 255, 0.9)",
                  fontWeight: "500",
                  fontSize: 18,
                },
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  doubleCirclesContainer: {
    flex: 0.15,
    marginBottom: 90,
  },
  getStartedImageContainer: {
    flex: 0.78,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  firstText: {
    fontSize: 20,
    fontWeight: "500",
  },
  firstTextContainer: {
    marginTop: 20,
    justifyContent: "center",
  },
  inputsContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  CustomBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
  },
});
