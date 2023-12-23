import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { SearchInputProps } from "../../types/types";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// Create the input
const SearchInput = ({
  text,
  autoFocus,
  value,
  onChangeText,
  iconName,
  onSearch,
  clearSearch,
  clearSearchIcon,
  multiline,
  showDetail
}: SearchInputProps) => {
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const inputContainerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.06, // 6% of the screen
  };

  return (
    <View style={[inputContainerStyles, styles.inputMainCont]}>
      <Ionicons name={iconName} size={26} color="black" />
      <TextInput
        secureTextEntry={showDetail}
        textContentType="password"
        placeholder={text}
        autoFocus={autoFocus}
        value={value}
        multiline={multiline}
        onChangeText={onChangeText}
        style={[styles.inputContainer, {width: clearSearchIcon ? "80%" : "85%"}]}
        onEndEditing={onSearch}
      />
      {clearSearchIcon && (
        <TouchableOpacity onPress={clearSearch}>
          <FontAwesome5 name="times-circle" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    padding: 10,
    fontSize: 17.5,
    marginVertical: 8,
    height: "100%",
    width: "85%",
  },
  inputMainCont: {
    borderColor: "rgba(30, 144, 255, 0.77)",
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
