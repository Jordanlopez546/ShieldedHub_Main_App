import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  CredentialContextProps,
  CredentialItemProps,
  RecycleScreenGlobalProps,
} from "../../types/types";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import { BottomSheet } from "../../Global/sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base_URL } from "../../Urls/Urls";
import axios from "axios";
import Recycle from "../components/Recycle";
import moment from "moment";
import { CredentialContext } from "../../Global/CredentialContext";
import ToastNotification from "../../Global/toast";

const RecycleBinScreen = ({
  isModalVisible,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: RecycleScreenGlobalProps) => {
  const [recyclebinSearch, setRecyclebinSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CredentialItemProps[]>([]);
  const [recyclebinLoading, setRecyclebinLoading] = useState<boolean>(false);
  const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const { recycleBList, setRecycleBList, setCredentialList } = useContext(
    CredentialContext
  ) as CredentialContextProps;

  const [deletingNowStates, setDeletingNowStates] = useState<
    Record<string, boolean>
  >({});
  const [successNotification, setSuccessNotification] =
    useState<boolean>(false);

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 1,
  };

  // Fetch the recycle bin data
  const fetchData = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem("authToken");
      const response = await axios.get(`${Base_URL}/user/recycleData`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      response.data
        ? setRecycleBList(response.data.reverse())
        : setRecycleBList([]);
    } catch (e) {
      // Nothing
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [recycleBList]);

  // Functionality To search for credentials
  const searchRecyclebin = (text: string) => {
    setRecyclebinLoading(true);
    setTimeout(() => {
      const filteredItems = recycleBList.filter((item) =>
        item.credentialTitle.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
      setRecyclebinLoading(false);
    }, 100); // Simulating an asynchronous search operation
  };

  // To clear the search input
  const clearSearch = () => {
    setTimeout(() => {
      setFilteredData([]);
      setRecyclebinSearch("");
    }, 1);
  };

  // Render data
  const renderData = recyclebinSearch ? filteredData : recycleBList;

  // Handle the present modal of the bottom sheet
  const handlePresentModal = () => {
    if (setIsModalVisible) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const closeBottomSheet = () => {
    if (setIsModalVisible) setIsModalVisible(false);
  };

  // Delete a recycle bin item
  const deleteBtn = useCallback(async (idToDelete: string) => {
    try {
      setDeletingNowStates((prevStates) => ({
        ...prevStates,
        [idToDelete]: true,
      }));

      const token = await AsyncStorage.getItem("authToken");
      const { data } = await axios.delete(
        `${Base_URL}/user/deleteReycleData/${idToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newArray = recycleBList.filter(
        (item: CredentialItemProps) => item.credentialId !== idToDelete
      );

      setRecycleBList(newArray);
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

  // Recover a recycle bin item
  const recoverBtn = useCallback(async (idToRecover: string) => {
    try {
      setDeletingNowStates((prevStates) => ({
        ...prevStates,
        [idToRecover]: true,
      }));

      const token = await AsyncStorage.getItem("authToken");
      const { data } = await axios.delete(
        `${Base_URL}/user/recoverReycleData/${idToRecover}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newArray = recycleBList.filter(
        (item: CredentialItemProps) => item.credentialId !== idToRecover
      );

      setRecycleBList(newArray);

      // Update the credentials state with the recovered credential
      setCredentialList((prevCredentials: CredentialItemProps[]) => [
        data,
        ...prevCredentials,
      ]);

      console.log(data);

      setSuccessNotification(true);
    } catch (error) {
      // Nothing
    } finally {
      setDeletingNowStates((prevStates) => ({
        ...prevStates,
        [idToRecover]: false,
      }));
    }
  }, []);

  // Format the date
  const formatDate = (originalDate: string) => {
    const expirationDate = moment(originalDate);
    const currentDate = moment();
    const daysRemaining = expirationDate.diff(currentDate, "days");

    let formattedDate = "";

    if (daysRemaining > 0) {
      formattedDate = `Expires in ${daysRemaining} ${
        daysRemaining > 1 ? "days" : "day"
      }`;
    } else if (daysRemaining === 0) {
      formattedDate = "Expires Today";
    } else {
      formattedDate = "Expired";
    }

    return formattedDate;
  };

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
          setIsModalVisible={setIsModalVisible}
          isDarkMode={isDarkMode}
        />
      </View>
      {dataLoading ? (
        <ActivityIndicator size={100} color={"dodgerblue"} />
      ) : recycleBList.length === 0 ? (
        <Text
          style={[styles.noDataText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          No available data
        </Text>
      ) : (
        <View style={[styles.recycleBContainer, containerStyles]}>
          {recyclebinLoading ? (
            <ActivityIndicator size={"large"} color={"dodgerblue"} />
          ) : renderData.length > 0 ? (
            <FlatList
              data={renderData}
              keyExtractor={(index, item) => item.toString() + index}
              renderItem={({ item }) => (
                <Recycle
                  item={item}
                  setIsModalVisible={setIsModalVisible}
                  deleteBtn={deleteBtn}
                  formatDate={formatDate}
                  isDarkMode={isDarkMode}
                  recoverBtn={recoverBtn}
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
          message={"Request successful."}
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

export default RecycleBinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    marginBottom: 25,
  },
  recycleBContainer: {
    flex: 1,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
});
