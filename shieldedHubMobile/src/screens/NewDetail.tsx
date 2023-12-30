import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";

const NewDetail = () => {
  const [title, setTitle] = useState<string>("");
  const [showTitle, setShowTitle] = useState(true);
  const [showEmailOrUsername, setShowEmailorUsername] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const containerStyles = {
    width: width * 1,
  };

  const noteInputContainerStyles = {
    width: width * 0.8,
    height: height * 0.16,
  };

  const clearOrCreateContainerWidth = {
    width: width * 0.8,
  };

  const handleClearInputs = () => {
    setTitle("");
    setEmailOrUsername("");
    setPassword("");
    setNotes("");
  };

  const responsiveMargin = width * 0.12;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50} // Adjust the offset as needed
    >
      <View style={[styles.topBarContainer, containerStyles]}>
        <TopBar />
      </View>
      <View style={styles.inputsContainer}>
        <View style={[styles.inputMargin]}>
          <SearchInput
            iconName={"document-outline"}
            value={title}
            onChangeText={(text) => setTitle(text)}
            autoFocus={true}
            text="Title of Credential"
            showDetail={showTitle}
          />
          {title && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ position: "absolute", right: responsiveMargin }}
              onPress={() => setShowTitle(!showTitle)}
            >
              <Text style={[styles.showHideText, {marginLeft: 10}]}>
                {showTitle ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"at"}
            value={emailOrUsername}
            onChangeText={(text) => setEmailOrUsername(text)}
            autoFocus={false}
            text="Email/Username"
            showDetail={showEmailOrUsername}
          />
          {emailOrUsername && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ position: "absolute", right: responsiveMargin }}
              onPress={() => setShowEmailorUsername(!showEmailOrUsername)}
            >
              <Text style={styles.showHideText}>
                {showEmailOrUsername ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"lock-closed-outline"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoFocus={false}
            text="Password"
            showDetail={showPassword}
          />
          {password && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ position: "absolute", right: responsiveMargin }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showHideText}>
                {showPassword ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          value={notes}
          onChangeText={(text) => setNotes(text)}
          textAlignVertical="top"
          multiline={true}
          placeholder="Notes(Optional)"
          style={[styles.noteInput, noteInputContainerStyles]}
        />
        <View
          style={[
            styles.createOrClearTextContainer,
            clearOrCreateContainerWidth,
          ]}
        >
          <TouchableOpacity
            onPress={() => handleClearInputs()}
            activeOpacity={-0}
          >
            <Text style={styles.createOrClearText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={-0}>
            <Text style={styles.createOrClearText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBarContainer: {
    flex: 0.13,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    fontSize: 17.5,
  },
  inputsContainer: {
    flex: 0.87,
  },
  createOrClearTextContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  createOrClearText: {
    fontSize: 21,
  },
  inputMargin: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  showHideText: {
    color: "blue",
  },
});
