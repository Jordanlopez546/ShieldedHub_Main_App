import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { InputBtnProps } from "../../types/types";

// Custom Button
const CustomButton = ({ text }: InputBtnProps) => {
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const btnContainerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.065, // 6.5% of the screen
  };

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.btnContainer, btnContainerStyles]}
    >
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 144, 255, 0.8)",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});
