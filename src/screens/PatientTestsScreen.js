import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";

import TestList from "../components/TestList";

const PatientTestsScreen = ({ route, navigation }) => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the patient ID from the route parameters
  const { patientId } = route.params;

  useEffect(() => {
    // Make an API call to fetch patient details using the ID
    fetch(`https://f27c-184-144-58-216.ngrok-free.app/patients/${patientId}`, {
      method: "GET",
      headers: {
        // You can set headers here if needed, e.g., authorization tokens
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
        <TestList />
      </View>

      {/* Add New Test Button with margin top */}
      <Button
        title="Add New Test"
        onPress={() => {
          // Navigate to the screen for adding a new test
          navigation.navigate("AddTestScreen");
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
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
  testListContainer: {
    flex: 1,
    maxHeight: "70%", // Set a maximum height for the TestList component
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
    marginTop: 16, // Add margin top to the button
  },
});

export default PatientTestsScreen;
