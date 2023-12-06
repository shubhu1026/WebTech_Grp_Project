import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

const PatientList = ({ navigation, refreshList, onRefresh }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Make an API call to fetch patient data
      const response = await fetch(`${API_BASE_URL}/patients`, {
        method: "GET",
        headers: {
          // set headers
        },
      });
      const data = await response.json();
      setPatients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();

      // Reset refreshList to false after fetching data
      if (refreshList) {
        onRefresh(); // Call the onRefresh callback to reset refreshList in the parent
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

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.listTitle}>List of Patients</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Address :</Text> {item.address}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Date Of Birth :</Text>{" "}
              {new Date(item.dateOfBirth).toLocaleDateString()}
            </Text>
            <Text style={styles.info}>
              <Text style={styles.infoHeading}>Gender :</Text> {item.gender}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
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
    padding: 10,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#E8F3F1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 125,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#101623",
  },
  infoHeading: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    color: "#3B4453",
    marginTop: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatientList;
