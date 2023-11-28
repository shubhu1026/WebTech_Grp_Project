import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import API_BASE_URL from "../api/apiconfig";

import TestList from "../components/TestList";

const PatientTestsScreen = ({ route, navigation }) => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the patient ID from the route parameters
  const { patientId } = route.params;

  useEffect(() => {
    // Make an API call to fetch patient details using the ID
    fetch(`${API_BASE_URL}/patients/${patientId}`, {
      method: "GET",
      headers: {
        // set headers here
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatientDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleEditTest = (testId) => {
    navigation.navigate("EditTestScreen", { testId, patientId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!patientDetails) {
    return (
      <View>
        <Text>Error fetching patient details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{patientDetails.firstName}'s Tests</Text>
      <View style={styles.testListContainer}>
        <TestList
          patientId={patientId}
          handleEditTest={handleEditTest}
          navigation={navigation}
        />
      </View>

      <Button
        color="#199A8E"
        title="Add New Test"
        onPress={() => {
          navigation.navigate("AddTestScreen", { patientId });
        }}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    color: "#101623",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    marginBottom: 20,
  },
  testListContainer: {
    flex: 1,
    maxHeight: "90%",
  },
  testItem: {
    fontSize: 16,
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    marginTop: 16,
  },
});

export default PatientTestsScreen;
