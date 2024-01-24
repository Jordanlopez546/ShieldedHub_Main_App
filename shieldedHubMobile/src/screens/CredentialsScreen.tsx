import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  CredentialChildProps,
  CredentialItemProps,
  CredentialItemScreenNavigationOptions,
  CredentialItemScreenParams,
  RootStackParams,
} from "../../types/types";
import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import { BottomSheet } from "../../Global/sheet";

const CredentialsScreen = ({
  staticData,
  setStaticData,
  theme,
  setTheme,
  isModalVisible,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: CredentialItemScreenNavigationOptions) => {
  const [credentialSearch, setCredentialSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CredentialItemProps[]>([]);
  const [credentialLoading, setCredentialLoading] = useState<boolean>(false);
  const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const containerStyles = {
    width: width * 1,
  };
  const credentialContainerStyles = {
    width: width * 0.8, // 80% of the screen
  };

  // Handle the present modal of the bottom sheet
  const handlePresentModal = () => {
    if (setIsModalVisible) {
      setIsModalVisible(!isModalVisible);
    }
  };

  // Clear the search input
  const clearSearch = () => {
    setTimeout(() => {
      setFilteredData([]);
      setCredentialSearch("");
    }, 1);
  };

  // Functionality To search for credentials
  const searchCredential = (text: string) => {
    setCredentialLoading(true);
    setTimeout(() => {
      const filteredItems = staticData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
      setCredentialLoading(false);
    }, 100); // Simulating an asynchronous search operation
  };

  // To check which data to render
  const renderData = credentialSearch ? filteredData : staticData;

  // Clear credential search
  useEffect(() => {
    if (credentialSearch) {
      setClearSearchIcon(true);
    } else {
      setClearSearchIcon(false);
    }
  }, [credentialSearch]);

  const closeBottomSheet = () => {
    if (setIsModalVisible) setIsModalVisible(false);
  };

  // Credential item component
  const renderCredentialItem: ListRenderItem<CredentialItemProps> = ({
    item,
  }) => {
    // Navigate to a credential item
    const navigateToCredentialItem = () => {
      if (setIsModalVisible) {
        setIsModalVisible(false);
      }

      navigation.navigate("CredentialItemScreen", {
        credentialId: item.id,
        credentialTitle: item.title,
        credentialEmail: item.email,
        credentialPassword: item.password,
        credentialNotes: item.notes,
      } as CredentialItemScreenParams);
    };

    // Delete a credential item
    const deleteBtn = (idToDelete: number) => {
      const newArray = staticData.filter(
        (item: CredentialItemProps) => item.id !== idToDelete
      );
      setStaticData(newArray);
    };
    const deleteAction = () => deleteBtn(item.id);

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.4}
        onPress={() => navigateToCredentialItem()}
        style={[
          styles.credentialContainer,
          credentialContainerStyles,
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
            Today, 16:45
          </Text>
        </View>
        <View style={styles.secondIconContainer}>
          <TouchableOpacity onPress={deleteAction} activeOpacity={0.3}>
            <Feather
              name="trash-2"
              size={25}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={[
          styles.topBarContainer,
          containerStyles,
          { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
        ]}
      >
        <TopBar handlePresentModal={handlePresentModal} />
        <SearchInput
          autoFocus={false}
          value={credentialSearch}
          text="Search"
          onChangeText={(text) => {
            setCredentialSearch(text);
            searchCredential(text);
          }}
          iconName={"search"}
          onSearch={() => {}}
          clearSearch={clearSearch}
          clearSearchIcon={clearSearchIcon}
          setIsModalVisible={setIsModalVisible}
          isDarkMode={isDarkMode}
        />
      </View>
      <View style={styles.credentialsContainer}>
        {credentialLoading ? (
          <ActivityIndicator size={"large"} color={"dodgerblue"} />
        ) : renderData.length > 0 ? (
          <FlatList
            data={renderData}
            keyExtractor={(index, item) => item.toString() + index}
            renderItem={renderCredentialItem}
          />
        ) : (
          <Text
            style={[styles.noDataText, { color: isDarkMode ? "#fff" : "#000" }]}
          >
            No available data
          </Text>
        )}
      </View>

      {/* Render the BottomSheet component */}
      <BottomSheet
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onClose={closeBottomSheet}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
    </KeyboardAvoidingView>
  );
};

export default CredentialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBarContainer: {
    flex: 0.2,
    marginBottom: 25,
  },
  credentialsContainer: {
    flex: 0.8,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
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
