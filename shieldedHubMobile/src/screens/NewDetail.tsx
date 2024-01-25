import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";
import {
  CredentialItemScreenNavigationOptions,
  RootStackParams,
} from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheet } from "../../Global/sheet";
import ToastNotification from "../../Global/toast";

const NewDetail = ({
  staticData,
  setStaticData,
  theme,
  setTheme,
  isModalVisible,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: CredentialItemScreenNavigationOptions) => {
  const [title, setTitle] = useState<string>("");
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const [successNotification, setSuccessNotification] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const handleAddCredentials = () => {
    if (
      title.trim() !== "" &&
      emailOrUsername.trim() !== "" &&
      password.trim() !== ""
    ) {
      // Find the maximum id in the existing data
      const maxId = staticData.reduce(
        (max, credential) => Math.max(max, credential.id || 0),
        0
      );

      // Create a new credential
      const newCredential = {
        id: maxId + 1,
        title: title,
        email: emailOrUsername,
        password: password,
        notes: notes,
      };

      // Add the new credential to the staticData array
      const updatedData = [newCredential, ...staticData];

      // Update the state of staticData
      setStaticData(updatedData);
      setSuccessNotification(true);

      // Clear the input fields
      setEmailOrUsername("");
      setTitle("");
      setNotes("");
      setPassword("");

      // Navigate back to the credentials screen
      // navigation.goBack();
    } else {
      Alert.alert("Instruction", "Please fill in the inputs.", [
        {
          text: "Okay",
          style: "cancel",
        },
      ]);
    }
  };

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

  // Handle the present modal of the bottom sheet
  const handlePresentModal = () => {
    if (setIsModalVisible) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const closeBottomSheet = () => {
    if (setIsModalVisible) setIsModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1E272E" : "#FFFFFF" },
      ]}
    >
      <View style={[styles.topBarContainer, containerStyles]}>
        <TopBar handlePresentModal={handlePresentModal} />
      </View>
      <View>
        <View style={[styles.inputMargin]}>
          <SearchInput
            iconName={"document-outline"}
            value={title}
            onChangeText={(text) => setTitle(text)}
            text="Title of Credential"
            isDarkMode={isDarkMode}
            setIsModalVisible={setIsModalVisible}
          />
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"at"}
            value={emailOrUsername}
            onChangeText={(text) => setEmailOrUsername(text)}
            autoFocus={false}
            text="Email/Username"
            isDarkMode={isDarkMode}
            setIsModalVisible={setIsModalVisible}
          />
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"lock-closed-outline"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoFocus={false}
            text="Password"
            showDetail={showPassword}
            isDarkMode={isDarkMode}
            setIsModalVisible={setIsModalVisible}
          />
          {password && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ position: "absolute", right: responsiveMargin }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text
                style={[
                  styles.showHideText,
                  { color: isDarkMode ? "white" : "blue" },
                ]}
              >
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
          placeholderTextColor={
            isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
          }
          style={[
            styles.noteInput,
            noteInputContainerStyles,
            { color: isDarkMode ? "white" : "black" },
          ]}
          onPressIn={
            setIsModalVisible
              ? () => setIsModalVisible(false)
              : () => console.log("Modal is invisible")
          }
        />
        <View
          style={[
            styles.createOrClearTextContainer,
            clearOrCreateContainerWidth,
          ]}
        >
          <TouchableOpacity
            onPress={() => handleClearInputs()}
            activeOpacity={0.3}
          >
            <Text
              style={[
                styles.createOrClearText,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              Clear
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddCredentials()}
            activeOpacity={0.3}
          >
            <Text
              style={[
                styles.createOrClearText,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {successNotification ? (
        <ToastNotification
          message="Credential Added."
          iconName="done"
          setSuccessNotification={setSuccessNotification}
        />
      ) : null}

      {/* Render the BottomSheet component */}
      <BottomSheet
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onClose={closeBottomSheet}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </View>
  );
};

export default NewDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    marginBottom: 20,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    fontSize: 17.5,
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
