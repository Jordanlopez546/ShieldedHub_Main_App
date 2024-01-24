import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";

export const BottomSheet = ({
  isVisible,
  onClose,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: any) => {
  // Getting the width of the screen
  const { height } = useWindowDimensions();

  const sheetHeight = height * 0.4;

  const translateY = useSharedValue(sheetHeight);

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = translateY.value;
      cancelAnimation(translateY);
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const toValue = event.velocityY > 0 ? sheetHeight : 0;
      translateY.value = withSpring(toValue, { damping: 10, stiffness: 100 });

      if (toValue === sheetHeight && isVisible) {
        // Dragged down completely, close the modal
        runOnJS(onClose)();
        runOnJS(setIsModalVisible)(false);
      }
    },
  });

  const handleShowSheet = () => {
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
  };

  const handleHideSheet = () => {
    translateY.value = withSpring(sheetHeight, { damping: 10, stiffness: 100 });
  };

  // ALTERNATIVES IF I NEED TO
  // const handleShowSheet = () => {
  //   translateY.value = withTiming(0, {
  //     duration: 300,
  //     easing: Easing.inOut(Easing.linear),
  //   });
  // };

  // const handleHideSheet = () => {
  //   translateY.value = withTiming(
  //     sheetHeight.height,
  //     { duration: 300, easing: Easing.inOut(Easing.linear) },
  //     () => {
  //       runOnJS(onClose)();
  //     }
  //   );
  // };

  // React to changes in isVisible prop
  useEffect(() => {
    if (isVisible) {
      handleShowSheet();
    } else {
      handleHideSheet();
    }
  }, [isVisible]);

  const styles2 = StyleSheet.create({
    bottomSheet: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      height: sheetHeight,
      borderColor: "white",
      borderWidth: 0.5,
      backgroundColor: isDarkMode ? "#1E272E" : "#0373fc",
    },
    line: {
      height: 4,
      width: 40,
      backgroundColor: "white",
      alignSelf: "center",
      borderRadius: 2,
      marginBottom: 20,
    },
    content: {
      alignItems: "center",
      flexDirection: "row",
      flex: 0.26,
      justifyContent: "space-between",
      marginBottom: 10,
      padding: 8,
      borderRadius: 7,
      borderWidth: 1,
      borderColor: "#fff",
    },
    nameText: {
      fontWeight: "500",
      fontSize: 16,
      maxWidth: "90%",
      color: "#E0E0E0",
    },
    closeModalView: {
      position: "absolute",
      bottom: 10,
      backgroundColor: "#fff",
      alignItems: "center",
      width: 80,
      height: 30,
      justifyContent: "center",
      borderRadius: 7,
      alignSelf: "center",
    },
    logOutDarkMView: {
      flexDirection: "row",
      width: "40%",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles2.bottomSheet, bottomSheetStyle]}>
        <View style={styles2.line} />
        <View style={styles2.content}>
          <Text style={styles2.nameText}>Jordan Nwabuike</Text>
          <FontAwesome5 name="user-alt" size={22} color="#E0E0E0" />
        </View>
        <View style={styles2.content}>
          <Text style={styles2.nameText}>jordannwabuike@gmail.com</Text>
          <Entypo name="email" size={22} color="#E0E0E0" />
        </View>
        <View style={styles2.content}>
          <TouchableOpacity style={[styles2.logOutDarkMView, { width: "32%" }]}>
            <Text style={styles2.nameText}>Log Out</Text>
            <AntDesign name="logout" size={22} color="#E0E0E0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles2.logOutDarkMView}>
            <Text style={styles2.nameText}>Dark Mode</Text>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={22}
              color="#E0E0E0"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onClose} style={styles2.closeModalView}>
          <Text style={[styles2.nameText, { color: "black" }]}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};
