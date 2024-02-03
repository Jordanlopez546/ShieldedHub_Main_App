import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  CredentialContextProps,
  CredentialItemProps,
  CredentialItemScreenNavigationOptions,
} from "../../types/types";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";
import { BottomSheet } from "../../Global/sheet";
import ToastNotification from "../../Global/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base_URL } from "../../Urls/Urls";
import axios from "axios";
import moment from "moment";
import { CredentialContext } from "../../Global/CredentialContext";
import Credential from "../components/Credential";

const CredentialsScreen = ({
  isModalVisible,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: CredentialItemScreenNavigationOptions) => {
  const [credentialSearch, setCredentialSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CredentialItemProps[]>([]);
  const [credentialLoading, setCredentialLoading] = useState<boolean>(false);
  const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [successNotification, setSuccessNotification] =
    useState<boolean>(false);

  // New state to track deletingNow for each item
  const [deletingNowStates, setDeletingNowStates] = useState<
    Record<string, boolean>
  >({});

  const { credentialList, setCredentialList } = useContext(
    CredentialContext
  ) as CredentialContextProps;

  // Getting the width of the screen
  const { width } = useWindowDimensions();

  const containerStyles = {
    width: width * 1,
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
      const filteredItems = credentialList.filter((item) =>
        item.credentialTitle.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
      setCredentialLoading(false);
    }, 100); // Simulating an asynchronous search operation
  };

  // To check which data to render
  const renderData = credentialSearch ? filteredData : credentialList;

  const closeBottomSheet = () => {
    if (setIsModalVisible) setIsModalVisible(false);
  };

  // Delete a credential item
  const deleteBtn = useCallback(async (idToDelete: string) => {
    try {
      setDeletingNowStates((prevStates) => ({
        ...prevStates,
        [idToDelete]: true,
      }));

      const token = await AsyncStorage.getItem("authToken");
      const { data } = await axios.delete(
        `${Base_URL}/user/deleteCredential/${idToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newArray = credentialList.filter(
        (item: CredentialItemProps) => item.credentialId !== idToDelete
      );

      setCredentialList(newArray);
      console.log(data);

      setSuccessNotification(true);
    } catch (error) {
      // Nothing
    } finally {
      setDeletingNowStates((prevStates) => ({
        ...prevStates,
        [idToDelete]: false,
      }));
    }
  }, []);

  // Format the date
  const formatDate = (originalDate: string) => {
    const formattedDate = moment(originalDate).format("MMMM Do YYYY, h:mm a");
    return formattedDate;
  };

  // Fetch the credentials data
  const fetchData = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem("authToken");
      const response = await axios.get(`${Base_URL}/user/credentials`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      response.data
        ? setCredentialList(response.data.reverse())
        : setCredentialList([]);
    } catch (e) {
      // Nothing
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [credentialList]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
      ]}
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

      {dataLoading ? (
        <ActivityIndicator size={100} color={"dodgerblue"} />
      ) : credentialList.length === 0 ? (
        <Text
          style={[styles.noDataText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          No available data
        </Text>
      ) : (
        <View style={[styles.credentialsContainer, containerStyles]}>
          {credentialLoading ? (
            <ActivityIndicator size={"large"} color={"dodgerblue"} />
          ) : renderData.length > 0 ? (
            <FlatList
              data={renderData}
              keyExtractor={(index, item) => item.toString() + index}
              renderItem={({ item }) => (
                <Credential
                  item={item}
                  setIsModalVisible={setIsModalVisible}
                  deleteBtn={deleteBtn}
                  formatDate={formatDate}
                  isDarkMode={isDarkMode}
                  deletingNowStates={deletingNowStates}
                />
              )}
            />
          ) : (
            <Text
              style={[
                styles.noDataText,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              No available data
            </Text>
          )}
        </View>
      )}

      {successNotification ? (
        <ToastNotification
          message="Credential Deleted."
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

export default CredentialsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    marginBottom: 25,
  },
  credentialsContainer: {
    flex: 1,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
});
