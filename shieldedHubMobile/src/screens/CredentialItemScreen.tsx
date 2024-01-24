import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  CredentialItemProps,
  CredentialItemScreenProps,
  CredentialItemScreenRouteProp,
  RootStackParams,
  StackCredentialItemProps,
} from "../../types/types";
import SearchInput from "../components/SearchInput";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";

const CredentialItemScreen = ({
  route,
  navigation,
  staticData,
  setStaticData,
  isDarkMode,
  setIsDarkMode,
  theme,
  setTheme,
}: StackCredentialItemProps) => {
  const {
    credentialId,
    credentialTitle: initialTitle,
    credentialEmail: initialEmail,
    credentialPassword: initialPassword,
    credentialNotes: initialNotes,
  } = route.params;

  const [credentialTitle, setCredentialTitle] = useState(initialTitle);
  const [credentialEmail, setCredentialEmail] = useState(initialEmail);
  const [credentialPassword, setCredentialPassword] = useState(initialPassword);
  const [credentialNotes, setCredentialNotes] = useState(initialNotes);
  const [editableText, setEditableText] = useState(false);

  const handleUpdateCredentials = () => {
    if (
      credentialEmail.trim() !== "" &&
      credentialTitle.trim() !== "" &&
      credentialPassword.trim() !== ""
    ) {
      // Update the staticData array with the new values
      const updatedData = staticData.map((item: any) => {
        if (item.id === credentialId) {
          return {
            ...item,
            title: credentialTitle,
            email: credentialEmail,
            password: credentialPassword,
            notes: credentialNotes,
          };
        }
        return item;
      });

      // Update the state of staticData
      setStaticData(updatedData);

      // Navigate back to the previous screen
      navigation.goBack();
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

  useLayoutEffect(() => {
    let limitedTitle = credentialTitle || "Credential Title";

    // Check if the title length is greater than 25
    if (limitedTitle.length > 25) {
      // If yes, limit to the first 25 characters and add ellipsis
      limitedTitle = limitedTitle.substring(0, 25) + "...";
    }
    navigation.setOptions({
      title: limitedTitle,
      headerStyle: {
        backgroundColor: isDarkMode ? "#1E272E" : "#FFFFFF",
      },
      headerTintColor: isDarkMode ? "#FFFFFF" : "#000",
    });
  }, [navigation, credentialTitle]);

  const noteInputContainerStyles = {
    width: width * 0.8,
    height: height * 0.16,
  };

  const clearOrCreateContainerWidth = {
    width: width * 0.8,
  };

  const handleClearInputs = () => {
    setCredentialEmail("");
    setCredentialPassword("");
    setCredentialTitle("");
    setCredentialNotes("");
  };

  const editablePress = () => {
    setEditableText(!editableText);
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1E272E" : "#FFFFFF" },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50}
    >
      <View style={styles.inputsContainer}>
        <View style={[styles.inputMargin]}>
          <SearchInput
            iconName={"document-outline"}
            value={credentialTitle}
            autoFocus={true}
            text="Title of Credential"
            showDetail={false}
            editable={editableText}
            onChangeText={(text) => setCredentialTitle(text)}
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"at"}
            value={credentialEmail}
            autoFocus={false}
            text="Email/Username"
            showDetail={false}
            editable={editableText}
            onChangeText={(text) => setCredentialEmail(text)}
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"lock-closed-outline"}
            value={credentialPassword}
            autoFocus={false}
            text="Password"
            showDetail={false}
            editable={editableText}
            onChangeText={(text) => setCredentialPassword(text)}
            isDarkMode={isDarkMode}
          />
        </View>
        <TextInput
          value={credentialNotes}
          textAlignVertical="top"
          multiline={true}
          placeholder="Notes(Optional)"
          placeholderTextColor={
            isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
          }
          style={[
            styles.noteInput,
            noteInputContainerStyles,
            { color: isDarkMode ? "#fff" : "#000" },
          ]}
          editable={editableText}
          onChangeText={(text) => setCredentialNotes(text)}
        />
        {editableText ? (
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
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                Clear
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditableText(!editableText)}
              activeOpacity={0.3}
            >
              <Text
                style={[
                  styles.createOrClearText,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleUpdateCredentials()}
              activeOpacity={0.3}
            >
              <Text
                style={[
                  styles.createOrClearText,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                Update
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.editTextContainer, clearOrCreateContainerWidth]}>
            <TouchableOpacity onPress={editablePress} activeOpacity={0}>
              <Text
                style={[
                  styles.editText,
                  { color: isDarkMode ? "#fff" : "#000" },
                ]}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CredentialItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    fontSize: 17.5,
    color: "#000",
  },
  inputsContainer: {
    flex: 1,
    marginTop: 20,
  },
  editTextContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  editText: {
    fontSize: 21,
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
