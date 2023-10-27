import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const PatientList = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an API call to fetch patient data
    fetch("https://f27c-184-144-58-216.ngrok-free.app/patients", {
      method: "GET",
      headers: {
        // You can set headers here if needed, e.g., authorization tokens
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
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

  return (
    <View>
      <Text style={styles.listTitle}>List of Patients</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate("PatientDetailsScreen", { id: item._id });
            }}
          >
            <Text style={styles.name}>
              {item.firstName + " " + item.lastName}
            </Text>
            <Text style={styles.info}>Address: {item.address}</Text>
            <Text style={styles.info}>DOB: {item.dateOfBirth}</Text>
            <Text style={styles.info}>Gender: {item.gender}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    elevation: 3, // Add shadow on Android
    shadowColor: "#000", // Add shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  name: {
    fontSize: 18,
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

export default PatientList;
