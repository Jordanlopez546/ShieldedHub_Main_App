import { StyleSheet, View } from "react-native";
import React from "react";

const TheDoubleCircles = () => {
  return (
    <View>
      <View style={[styles.semiCircle]}></View>
      <View style={[styles.semiCircle, styles.secondCircle]}></View>
    </View>
  );
};

export default TheDoubleCircles;

const styles = StyleSheet.create({
  semiCircle: {
    backgroundColor: "rgba(30, 144, 255, 0.7)",
    borderRadius: 105, // Half of the width (or height) to make a semi-circle
    overflow: "hidden", // Hide the top half
    marginTop: -120,
    height: 200,
    width: 200,
  },
  secondCircle: {
    position: "absolute",
    marginTop: -90,
    left: -80,
  },
});
