import { useWindowDimensions } from "react-native";


// Getting the height and width of the screen
const { height, width } = useWindowDimensions();

// Calculate the height and width based on the current screen dimensions
const containerStyles = {
  width: width * 0.8, // 80% of the screen
  height: height * 0.065, // 6.5% of the screen
};

export { containerStyles };
