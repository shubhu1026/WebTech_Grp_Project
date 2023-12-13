import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  TouchableOpacity,
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
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {patientDetails.firstName}'s Test Records
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PatientDetailsScreen", { id: patientId });
          }}
        >
          <View style={styles.cardInfoUserImage}>
            <Image
              style={styles.infoImage}
              source={{
                uri: "https://ik.imagekit.io/fvlwioahxk/profile%20(1).png",
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.testListContainer}>
        <TestList
          patientId={patientId}
          handleEditTest={handleEditTest}
          navigation={navigation}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("AddTestScreen", { patientId })}
      >
        <Text style={styles.buttonTextStyle}>Add New Test</Text>
      </TouchableOpacity>
      {/* <Button
        color="#199A8E"
        title="Add New Test"
        onPress={() => {
          navigation.navigate("AddTestScreen", { patientId });
        }}
        style={styles.addButton}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#DE1E57",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 20,
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
  buttonStyle: {
    height: 100,
    width: "100%",
    backgroundColor: "#DE1E57",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  buttonTextStyle: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: "#DE1E57",
    fontSize: 20,
    fontWeight: "600",
  },
  profileContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: "10%",
    height: "10%",
    borderRadius: 15,
  },
  cardInfoUserImage: {
    width: 53,
    height: 55,
    borderRadius: 10,
    shadowColor: "#292F3F",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    objectFit: "contain",
    alignSelf: "center",
  },
  infoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
    alignSelf: "center",
  },
});

export default PatientTestsScreen;
