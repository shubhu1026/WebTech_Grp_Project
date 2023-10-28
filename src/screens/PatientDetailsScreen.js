import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

const PatientDetailsScreen = ({ route }) => {
  const navigation = useNavigation();

  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the patient ID from the route parameters
  const { id } = route.params;

  useEffect(() => {
    // Make an API call to fetch patient details using the ID
    fetch(`${API_BASE_URL}/patients/${id}`, {
      method: "GET",
      headers: {
        //set headers here
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
      <Text style={styles.name}>
        {patientDetails.firstName} {patientDetails.lastName}
      </Text>
      <Text style={styles.info}>Address: {patientDetails.address}</Text>
      <Text style={styles.info}>DOB: {patientDetails.dateOfBirth}</Text>
      <Text style={styles.info}>Gender: {patientDetails.gender}</Text>
      <Text style={styles.info}>Email: {patientDetails.email}</Text>

      <Button
        title="View Tests"
        onPress={() => {
          navigation.navigate("PatientTestsScreen", { patientId: id });
        }}
      />
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
