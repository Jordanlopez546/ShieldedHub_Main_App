import {
  ActivityIndicator,
  Alert,
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
import React, { useEffect, useState } from "react";
import { RecycleItemProps, RecycleScreenGlobalProps } from "../../types/types";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";
import { AntDesign, Feather } from "@expo/vector-icons";
import { BottomSheet } from "../../Global/sheet";

const RecycleBinScreen = ({
  theme,
  setTheme,
  isModalVisible,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: RecycleScreenGlobalProps) => {
  const [recyclebinSearch, setRecyclebinSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<RecycleItemProps[]>([]);
  const [recyclebinLoading, setRecyclebinLoading] = useState<boolean>(false);
  const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 1,
  };

  const recycleContainerStyles = {
    width: width * 0.8, // 80% of the screen
  };

  // Static data array
  const staticData: RecycleItemProps[] = [
    {
      id: 1,
      title: "Facebook Login",
    },
    {
      id: 2,
      title: "Whatsapp Login",
    },
    {
      id: 3,
      title: "Instagram Login",
    },
    {
      id: 4,
      title: "Snapchat Login",
    },
  ];

  // Functionality To search for credentials
  const searchRecyclebin = (text: string) => {
    setRecyclebinLoading(true);
    setTimeout(() => {
      const filteredItems = staticData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
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
  const renderData = recyclebinSearch ? filteredData : staticData;

  // recycle bin search update functionality
  useEffect(() => {
    if (recyclebinSearch) {
      setClearSearchIcon(true);
    } else {
      setClearSearchIcon(false);
    }
  }, [recyclebinSearch]);

  // Handle the present modal of the bottom sheet
  const handlePresentModal = () => {
    if (setIsModalVisible) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const closeBottomSheet = () => {
    if (setIsModalVisible) setIsModalVisible(false);
  };

  // Recycle item component
  const renderRecycleItem: ListRenderItem<RecycleItemProps> = ({ item }) => {
    // Show menu alert after clicked
    const showAlert = () => {
      if (setIsModalVisible) {
        setIsModalVisible(false);
      }

      {
        recoverBtn
          ? Alert.alert("Confirm", "Choose the respective action", [
              {
                text: "Recover",
                onPress: () => recoverBtn && recoverBtn(),
              },
              {
                text: "Delete",
                onPress: () => deleteBtn && deleteBtn(),
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ])
          : Alert.alert("Confirm", "Choose the respective action", [
              {
                text: "Delete",
                onPress: () => deleteBtn && deleteBtn(),
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]);
      }
    };

    // recover btn functionality
    const recoverBtn = () => {
      console.log("Recovering...");
    };

    // delete btn functionality
    const deleteBtn = () => {
      console.log("Deleting...");
    };

    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.4}
        style={[
          styles.recycleContainer,
          recycleContainerStyles,
          { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
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
          <Text style={[styles.headerText, { color: "red" }]}>
            {item.title.length > 25
              ? item.title.substring(0, 20) + "..."
              : item.title}
          </Text>
          <Text style={[styles.dateText, { color: "red" }]}>
            Expires in 30 days
          </Text>
        </View>
        <View style={styles.secondIconContainer}>
          <TouchableOpacity onPress={showAlert} activeOpacity={0.3}>
            <Feather
              name="more-vertical"
              size={29}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
      ]}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
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
      <View style={styles.recycleBContainer}>
        {recyclebinLoading ? (
          <ActivityIndicator size={"large"} color={"dodgerblue"} />
        ) : renderData.length > 0 ? (
          <FlatList
            data={renderData}
            keyExtractor={(index, item) => item.toString() + index}
            renderItem={renderRecycleItem}
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
  recycleContainer: {
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
