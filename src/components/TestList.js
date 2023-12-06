import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const TestList = ({ navigation, refreshList, onRefresh, patientId }) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Text style={styles.listTitle}>List of Tests</Text>
      <FlatList
        data={tests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={
              item.condition.toLowerCase() === "critical"
                ? styles.criticalCard
                : styles.card
            }
          >
            <Text style={styles.name}>{item.testType}</Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Test Date :</Text>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Nurse :</Text> {item.nurse}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Test Time :</Text>{" "}
              {item.testTime}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Category :</Text> {item.category}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Readings :</Text> {item.readings}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Condition :</Text>{" "}
              {item.condition}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditTest(item._id)}
              >
                <FontAwesomeIcon name="pencil" size={20} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTest(item._id)}
              >
                <FontAwesomeIcon name="trash" size={20} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
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
});

export default TestList;
