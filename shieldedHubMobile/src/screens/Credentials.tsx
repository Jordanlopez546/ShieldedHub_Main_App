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

const Credentials = () => {
  const [credentialSearch, setCredentialSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CredentialItemProps[]>([]);
  const [credentialLoading, setCredentialLoading] = useState<boolean>(false);
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
      id: 4,
      name: "Instagram Login",
    },
    {
      id: 5,
      name: "Snapchat Login",
    },
    {
      id: 6,
      name: "2go Login",
    },
    {
      id: 7,
      name: "Facebook Login",
    },
    {
      id: 8,
      name: "Whatsapp Login",
    },
    {
      id: 9,
      name: "Instagram Login",
    },
    {
      id: 11,
      name: "Snapchat Login",
    },
    {
      id: 12,
      name: "2go Login",
    },
    {
      id: 13,
      name: "Facebook Login",
    },
    {
      id: 14,
      name: "Whatsapp Login",
    },
    {
      id: 15,
      name: "Instagram Login",
    },
    {
      id: 16,
      name: "Snapchat Login",
    },
    {
      id: 17,
      name: "2go Login",
    },
    {
      id: 18,
      name: "Snapchat Login",
    },
    {
      id: 19,
      name: "2go Login",
    },
  ];

  // Functionality To search for credentials
  const searchCredential = (text: string) => {
    setCredentialLoading(true);
    setTimeout(() => {
      const filteredItems = staticData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
      setCredentialLoading(false);
    }, 100); // Simulating an asynchronous search operation
  };

  const renderData = credentialSearch ? filteredData : staticData;

  const clearSearch = () => {
    setTimeout(() => {
      setFilteredData([]);
      setCredentialSearch("");
    }, 1);
  };

  useEffect(() => {
    if (credentialSearch) {
      setClearSearchIcon(true);
    } else {
      setClearSearchIcon(false);
    }
  }, [credentialSearch]);

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
        />
      </View>
      <View style={styles.credentialsContainer}>
        {credentialLoading ? (
          <ActivityIndicator size={"large"} color={"dodgerblue"} />
        ) : renderData.length > 0 ? (
          <FlatList
            data={renderData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Credential item={item} />}
          />
        ) : (
          <Text style={styles.noDataText}>No available data</Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Credentials;

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
