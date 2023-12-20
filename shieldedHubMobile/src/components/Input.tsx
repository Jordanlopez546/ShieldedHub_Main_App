import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { InputBtnProps } from "../../types/types";
import { regular } from "./MyFonts";

// Create the input
const Input = ({ text }: InputBtnProps) => {
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const inputContainerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.06, // 6% of the screen
  };

  return (
    <TextInput
      placeholder={text}
      style={[styles.inputContainer, inputContainerStyles]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1E90FF",
    fontSize: 17.5,
  },
});
