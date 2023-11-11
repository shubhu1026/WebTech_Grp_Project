import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

const CriticalPatientList = ({ navigation, refreshList, onRefresh }) => {
  const [criticalPatients, setCriticalPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCriticalPatients = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/patients/criticalPatients`,
        {
          method: "GET",
          headers: {
            // set headers if needed
          },
        }
      );
      const data = await response.json();
      setCriticalPatients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching critical patients:", error);
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCriticalPatients();

      if (refreshList) {
        onRefresh();
      }
    }, [refreshList, onRefresh, fetchCriticalPatients])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Critical Patients</Text>
      <FlatList
        data={criticalPatients}
        keyExtractor={(item) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.patientCard}
            onPress={() => {
              navigation.navigate("PatientDetailsScreen", {
                id: item._id,
              });
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
              {item.dateOfBirth}
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
  container: {},
  listTitle: {
    color: "#101623",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  patientCard: {
    backgroundColor: "#FE5F55",
    padding: 10,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#FE5F55",
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

export default CriticalPatientList;
