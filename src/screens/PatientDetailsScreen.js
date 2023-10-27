import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const PatientDetailsScreen = ({ route }) => {
  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the patient ID from the route parameters
  const { id } = route.params;

  useEffect(() => {
    // Make an API call to fetch patient details using the ID
    fetch(`https://f27c-184-144-58-216.ngrok-free.app/patients/:${id}`, {
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
  }, [id]);

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
      <Text style={styles.name}>
        {patientDetails.firstName} {patientDetails.lastName}
      </Text>
      <Text style={styles.info}>Address: {patientDetails.address}</Text>
      <Text style={styles.info}>DOB: {patientDetails.dateOfBirth}</Text>
      <Text style={styles.info}>Gender: {patientDetails.gender}</Text>
      <Text style={styles.info}>Email: {patientDetails.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatientDetailsScreen;
