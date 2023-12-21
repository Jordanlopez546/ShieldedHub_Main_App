import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
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

  const [email, setEmail] = useState<string>("");
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

  return (
    <View style={styles.container}>
      <View style={styles.doubleCirclesContainer}>
        <TheDoubleCircles />
      </View>
      <View style={styles.getStartedImageContainer}>
        <Text style={[styles.firstText, { marginBottom: 5 }]}>
          Welcome back!
        </Text>
        <GetStartedAndLoginImageView text="first" />
      </View>
      <View style={[styles.inputsContainer]}>
        <Input
          autoFocus={true}
          value={email}
          onChangeText={setEmail}
          text="Enter your email"
        />
        <Input
          autoFocus={false}
          value={password}
          onChangeText={setPassword}
          text="Enter your password"
        />
        <TouchableOpacity activeOpacity={0.3}>
          <Text
            style={[
              styles.firstText,
              {
                color: "rgba(30, 144, 255, 0.77)",
                fontWeight: "400",
                marginVertical: 12,
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
          <TouchableOpacity activeOpacity={0.3}>
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
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  doubleCirclesContainer: {
    flex: 0.15,
  },
  getStartedImageContainer: {
    flex: 0.78,
    alignItems: "center",
    justifyContent: "center",
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
  },
  CustomBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
