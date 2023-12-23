import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";
import { CredentialChildProps } from "../../types/types";

const Credential = ({ item }: CredentialChildProps) => {
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    // height: height * 0.08, // 8% of the screen
  };

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.4}
      style={[styles.credentialContainer, containerStyles]}
    >
      <View style={styles.firstIconContainer}>
        <AntDesign name="profile" size={30} color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{item.name}</Text>
        <Text style={styles.dateText}>Today, 16:45</Text>
      </View>
      <View style={styles.secondIconContainer}>
        <TouchableOpacity activeOpacity={-0.3}>
          <Feather name="more-vertical" size={34} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Credential;

const styles = StyleSheet.create({
  credentialContainer: {
    alignSelf: "center",
    borderColor: "#1E90FF",
    borderRadius: 10,
    flexDirection: "row",
    padding: 3,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "white",
  },
  firstIconContainer: {
    width: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondIconContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: "400",
    fontSize: 19,
    marginBottom: 5,
  },
  dateText: {
    fontWeight: "300",
    fontSize: 17,
  },
});
