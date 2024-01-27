import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import TheDoubleCircles from "../components/TheDoubleCircles";
import GetStartedAndLoginImageView from "../components/GetStartedAndLoginImageView";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { RootStackParams } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Login Screen
const LogIn = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.05, // 5% of the screen
  };

  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (token) {
        navigation.replace("TheTabBarNavigators");
      } else {
        // Token not found, show the login screen itself
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogIn = async () => {
    setLoading(true);
    try {
      if (email.trim() !== "" && password.trim() !== "") {
        const user = {
          email: email,
          password: password,
        };

        const loginUser = await axios.post(
          "http://192.168.0.109:3000/auth/login",
          user
        );

        if (loginUser.status === 200) {
          const { token, user } = loginUser.data;
          const userEmail = user.email;
          const userName = user.username;

          AsyncStorage.setItem("authToken", token);
          AsyncStorage.setItem("userName", userName);
          AsyncStorage.setItem("userEmail", userEmail);
          // Reset the navigation stack to only contain "TheTabBarNavigators"
          navigation.reset({
            index: 0,
            routes: [{ name: "TheTabBarNavigators" }],
          });
        } else {
          Alert.alert("Login Failed", "Invalid Credentials.");
        }
      } else {
        Alert.alert("Instruction", "Fill in the inputs completely.");
      }
    } catch (error: any) {
      console.log(error.message);
      Alert.alert("Login Failed", "Invalid Credentials.");
    }
    setLoading(false);
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
          value={email}
          onChangeText={(text) => setEmail(text)}
          text="Enter your email"
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
        {loading ? (
          <ActivityIndicator size={"large"} color={"dodgerblue"} />
        ) : (
          <CustomButton onPress={handleLogIn} text="Log In" />
        )}
        <View style={[styles.dontHaveContainer, containerStyles]}>
          <Text style={[styles.firstText, { fontWeight: "400", fontSize: 18 }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            activeOpacity={0.3}
          >
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
