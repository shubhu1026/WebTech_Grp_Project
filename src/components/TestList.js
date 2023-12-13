import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "../api/apiconfig";

import TestCard from "./TestCard";

const TestList = ({ navigation, refreshList, onRefresh, patientId }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = tests.filter(
      (test) =>
        test.testType.toLowerCase().includes(lowerCaseQuery) ||
        test.nurse.toLowerCase().includes(lowerCaseQuery) ||
        test.category.toLowerCase().includes(lowerCaseQuery) ||
        test.condition.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredTests(filtered);
  };

  const toggleExpand = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredTests([]);
  };

  const renderTests = filteredTests.length > 0 ? filteredTests : tests;

  const handleEditTest = (testId) => {
    navigation.navigate("EditTestScreen", { testId, patientId });
  };

  const handleDeleteTest = (testId) => {
    // Display an alert for confirmation
    Alert.alert("Delete Test", "Are you sure you want to delete this test?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          fetch(
            `${API_BASE_URL}/patients/${patientId}/medicalTests/${testId}`,
            {
              method: "DELETE",
              headers: {
                // Include any necessary headers
              },
            }
          )
            .then((response) => {
              if (response.ok) {
                console.log("Test deleted successfully");
                // Refresh the test list
                fetchData();
              } else {
                console.error("Failed to delete test");
              }
            })
            .catch((error) => {
              console.error("Error deleting test:", error);
            });
        },
      },
    ]);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/patients/${patientId}/medicalTests`,
        {
          method: "GET",
          headers: {
            // set headers
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setTests(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Display an error message to the user, e.g., setTests([]);
    }
  }, [patientId]);

  useFocusEffect(
    useCallback(() => {
      fetchData();

      // Reset refreshList to false after fetching data
      if (refreshList) {
        onRefresh();
      }
    }, [refreshList, onRefresh, fetchData])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color="#007AFF"
        />
      </View>
    );
  }

  const handleDeleteTests = () => {
    Alert.alert(
      "Delete All Tests",
      "Are you sure you want to delete all tests for this patient?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            fetch(`${API_BASE_URL}/patients/${patientId}/medicalTests`, {
              method: "DELETE",
              headers: {
                // Include any necessary headers
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log("All tests deleted successfully");
                  // Refresh the test list
                  fetchData();
                } else {
                  console.error("Failed to delete tests");
                }
              })
              .catch((error) => {
                console.error("Error deleting tests:", error);
              });
          },
        },
      ]
    );
  };

  // Check if the tests array is empty
  if (tests.length === 0) {
    return (
      <View style={styles.mainContainer}>
        <Text testID="no-records-text" style={styles.listTitle}>
          No test records found.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.colorCodeContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.colorCodeText}>Normal</Text>
          <View style={styles.colorPaleteContainer}></View>
          <Text style={styles.colorCodeCriticalText}>Critical</Text>
          <View style={styles.colorCriticalPaleteContainer}></View>
        </View>
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDeleteTests}>
          <Ionicons name="trash-outline" size={24} color="#DE1E57" />
          <Text style={styles.deleteText}>Delete All Tests</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
        />
        <TouchableOpacity onPress={clearSearch}>
          <Image
            source={{
              uri: "https://ik.imagekit.io/fvlwioahxk/search_bar_updated.png",
            }}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
        {/* <Image
        source={{ uri: 'https://ik.imagekit.io/fvlwioahxk/search_icon.png' }}
        style={styles.searchIcon}
      /> */}
      </View>
      {/* <Text style={styles.listTitle}>List of Tests</Text> */}
      <FlatList
        data={renderTests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TestCard
            item={item}
            expanded={expandedCardId === item._id}
            onExpand={() => toggleExpand(item._id)}
            onDelete={() => handleDeleteTest(item._id)}
            onEdit={() => handleEditTest(item._id)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  colorCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  colorCodeText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 5,
    color: "#DE1E57",
  },
  colorCodeCriticalText: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    marginRight: 5,
    color: "#801232",
  },

  colorPaleteContainer: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: "#DE1E57",
  },
  colorCriticalPaleteContainer: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: "#801232",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 40,
    width: "100%",
    height: 56,
    padding: 8,
    paddingLeft: 15,
    marginVertical: 10,
    marginBottom: 20,
  },
  // background:

  deleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 15,
    bottom: 15,
  },
  deleteText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginLeft: 0,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  editText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  editIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginBottom: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    // Additional styling for TextInput
  },
  searchIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },

  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  listTitle: {
    color: "#101623",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  cardNormalContainer: {
    backgroundColor: "#DE1E57",
    borderRadius: 16,
    marginBottom: 20,
  },
  cardCriticalContainer: {
    backgroundColor: "#801232",
    borderRadius: 16,
    marginBottom: 20,
  },
  cardNew: {
    padding: 15,
    elevation: 3,
    shadowColor: "#DE1E57",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 110,
    flexDirection: "row",
    width: "100%",
  },
  cardNewExpanded: {
    height: 520,
  },
  cardInfoName: {
    fontSize: 22,
    fontWeight: "500",
    color: "#ffffff",
  },
  cardExpandBtn: {
    width: 25,
    height: 25,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    objectFit: "contain",
    alignSelf: "flex-start",
    position: "absolute",
    right: 15,
    top: 15,
  },
  infoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#E8F3F1",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#E8F3F1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 270,
  },
  criticalCard: {
    backgroundColor: "#FE5F55",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#E8F3F1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 270,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#101623",
    marginTop: 10,
    marginBottom: 10,
  },
  infoHeading: {
    fontSize: 15,
    color: "#000",
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    position: "absolute",
    right: 10,
  },
  deleteButton: {
    position: "absolute",
    left: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  additionalDetails: {
    position: "absolute",
    left: 15,
    top: 50,
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D9D9D9",
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    fontWeight: "400",
    color: "#ffffff",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff", // Change this to a contrasting color
    width: "100%",
  },
  cardBorderBottom: {
    height: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },
  deleteIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
  },
  deleteText: {
    color: "#DE1E57",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "700", // Adjust margin as needed
  },
});

export default TestList;
