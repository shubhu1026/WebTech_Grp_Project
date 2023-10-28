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
    fetch("http://127.0.0.1:5000/patients", {
      method: "GET",
      headers: {
        // set headers
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
    <View style={styles.mainContainer}>
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
            <Text style={styles.name}>{item.firstName + " " + item.lastName}
            </Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Address :</Text>  {item.address}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Date Of Birth :</Text>  {item.dateOfBirth}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Gender :</Text>  {item.gender}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer : {
    width : "100%",
    padding : 20,
    backgroundColor : "#fff",
  },
  listTitle: {
    color : "#101623",
    fontSize: 16,
    fontWeight: "600",
    marginTop : 15,
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
    height: 125
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#101623",
  },
  infoHeading : {
    fontSize: 16,
    color : "#000",
    fontWeight : "600",
  },
  info: {
    fontSize: 14,
    color : "#3B4453",
    marginTop: 7, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatientList;
