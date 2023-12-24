import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";
import Credential from "../components/Credential";
import { CredentialItemProps } from "../../types/types";

const RecycleBin = () => {
  const [recyclebinSearch, setRecyclebinSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CredentialItemProps[]>([]);
  const [recyclebinLoading, setRecyclebinLoading] = useState<boolean>(false);
  const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const containerStyles = {
    width: width * 1,
  };

  const staticData: CredentialItemProps[] = [
    {
      id: 1,
      name: "Facebook Login",
    },
    {
      id: 2,
      name: "Whatsapp Login",
    },
    {
      id: 3,
      name: "Instagram Login",
    },
    {
      id: 4,
      name: "Snapchat Login",
    },
  ];

  // Functionality To search for credentials
  const searchRecyclebin = (text: string) => {
    setRecyclebinLoading(true);
    setTimeout(() => {
      const filteredItems = staticData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
      setRecyclebinLoading(false);
    }, 100); // Simulating an asynchronous search operation
  };

  const renderData = recyclebinSearch ? filteredData : staticData;

  const clearSearch = () => {
    setTimeout(() => {
      setFilteredData([]);
      setRecyclebinSearch("");
    }, 1);
  };

  const recoverBtnFunc = () => {
    console.log("Recovering...");
  };
  const deleteBtnFunc = () => {
    console.log("Deleting...");
  };

  useEffect(() => {
    if (recyclebinSearch) {
      setClearSearchIcon(true);
    } else {
      setClearSearchIcon(false);
    }
  }, [recyclebinSearch]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -250} // Adjust the offset as needed
    >
      <View style={[styles.topBarContainer, containerStyles]}>
        <TopBar />
        <SearchInput
          autoFocus={false}
          value={recyclebinSearch}
          text="Search"
          onChangeText={(text) => {
            setRecyclebinSearch(text);
            searchRecyclebin(text);
          }}
          iconName={"search"}
          onSearch={() => {}}
          clearSearch={clearSearch}
          clearSearchIcon={clearSearchIcon}
        />
      </View>
      <View style={styles.credentialsContainer}>
        {recyclebinLoading ? (
          <ActivityIndicator size={"large"} color={"dodgerblue"} />
        ) : renderData.length > 0 ? (
          <FlatList
            data={renderData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Credential
                recoverBtn={recoverBtnFunc}
                deleteBtn={deleteBtnFunc}
                expireText="Expires in 30 days"
                colour="red"
                item={item}
              />
            )}
          />
        ) : (
          <Text style={styles.noDataText}>No available data</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default RecycleBin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topBarContainer: {
    flex: 0.2,
  },
  credentialsContainer: {
    flex: 0.8,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    color: "black", // Adjust the color as needed
  },
});
