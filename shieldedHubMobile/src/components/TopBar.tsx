import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useRef } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const TopBar = ({
  handlePresentModal,
}: {
  handlePresentModal?: () => void;
}) => {
  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const containerStyles = {
    width: width * 0.82,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.overallLogoContainer, containerStyles]}>
        <View style={[styles.logoContainer]}>
          <Image
            style={styles.image}
            source={require("../assets/applogo.png")}
          />
        </View>
        <TouchableOpacity
          onPress={handlePresentModal}
          style={[styles.logoContainer]}
        >
          <Text style={styles.userText}>J</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  overallLogoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#1E90FF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 40,
  },
  userText: {
    fontSize: 33,
    fontWeight: "500",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
});
