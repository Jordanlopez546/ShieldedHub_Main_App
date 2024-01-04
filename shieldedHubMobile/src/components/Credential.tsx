import {
  Alert,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  CredentialChildProps,
  CredentialItemProps,
  CredentialItemScreenParams,
  RootStackParams,
} from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const Credential = ({
  item,
  colour,
  createdText,
  recoverBtn,
  setStaticData,
  staticData,
  isDarkMode,
}: CredentialChildProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    // height: height * 0.08, // 8% of the screen
  };

  const deleteBtn = (idToDelete: number) => {
    const newArray = staticData.filter(
      (item: CredentialItemProps) => item.id !== idToDelete
    );
    setStaticData(newArray);
  };

  const deleteAction = () => deleteBtn(item.id);

  const showAlert = () => {
    const buttons: any = recoverBtn
      ? [
          { text: "Recover", onPress: () => recoverBtn && recoverBtn() },
          { text: "Delete", onPress: deleteAction },
          { text: "Cancel", style: "cancel" },
        ]
      : [
          { text: "Delete", onPress: deleteAction },
          { text: "Cancel", style: "cancel" },
        ];

    Alert.alert("Confirm", "Choose the respective action", buttons);
  };

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate("CredentialItemScreen", {
          credentialId: item.id,
          credentialTitle: item.title,
          credentialEmail: item.email,
          credentialPassword: item.password,
          credentialNotes: item.notes,
        } as CredentialItemScreenParams)
      }
      style={[
        styles.credentialContainer,
        containerStyles,
        { backgroundColor: isDarkMode ? "#1E272E" : "#FFFFFF" },
      ]}
    >
      <View style={styles.firstIconContainer}>
        <AntDesign
          name="profile"
          size={25}
          color={isDarkMode ? "#fff" : "#000"}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[styles.headerText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          {item.title.length > 25
            ? item.title.substring(0, 20) + "..."
            : item.title}
        </Text>
        <Text
          style={[styles.dateText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          {createdText ? createdText : "Today, 16:45"}
        </Text>
      </View>
      <View style={styles.secondIconContainer}>
        <TouchableOpacity onPress={deleteAction} activeOpacity={-0.3}>
          <Feather
            name="trash-2"
            size={25}
            // style={{ marginRight: 10 }}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Credential;

const styles = StyleSheet.create({
  credentialContainer: {
    alignSelf: "center",
    borderColor: "#1E90FF",
    borderRadius: 10,
    flexDirection: "row",
    padding: 3,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "white",
  },
  firstIconContainer: {
    width: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondIconContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: "400",
    fontSize: 17,
    marginBottom: 5,
  },
  dateText: {
    fontWeight: "300",
    fontSize: 15,
  },
});
