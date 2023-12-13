import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import API_BASE_URL from "../api/apiconfig";

const PatientDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [patientDetails, setPatientDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get the patient ID from the route parameters
  const { id } = route.params;

  const fetchPatientDetails = useCallback(() => {
    // Make an API call to fetch patient details using the ID
    fetch(`${API_BASE_URL}/patients/${id}`, {
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
  }, [id]);

  // Use useFocusEffect to refetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchPatientDetails();
    }, [fetchPatientDetails])
  );

  const handleUpdatePatient = () => {
    // Navigate to the update screen, passing the patient ID
    navigation.navigate("UpdatePatientScreen", { patientId: id });
  };

  const handleDeletePatient = () => {
    // Display an alert for confirmation
    Alert.alert(
      "Delete Patient",
      "Are you sure you want to delete this patient?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            fetch(`${API_BASE_URL}/patients/${id}`, {
              method: "DELETE",
              headers: {
                // Include any necessary headers
              },
            })
              .then((response) => {
                if (response.ok) {
                  console.log("Patient deleted successfully");
                  // Pass a message to PatientListScreen
                  navigation.navigate("PatientListScreen", {
                    message: "Patient deleted successfully",
                  });
                } else {
                  console.error("Failed to delete patient");
                }
              })
              .catch((error) => {
                console.error("Error deleting patient:", error);
              });
          },
        },
      ]
    );
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
      <Text style={styles.mainText}>Patient Details</Text>
      <View style={styles.detailsCard}>
        <TouchableOpacity
          style={styles.updateIcon}
          onPress={handleUpdatePatient}
        >
          <FontAwesomeIcon name="pencil" size={20} color="#ffffff" />
        </TouchableOpacity>
        <Image
          style={styles.ImageStyle}
          source={{
            uri: "https://ik.imagekit.io/fvlwioahxk/profile%20(1).png",
          }}
        />
        <Text style={styles.name}>
          {patientDetails.firstName} {patientDetails.lastName}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.infoHeading}>Address :</Text>{" "}
          {patientDetails.address}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.infoHeading}>Date Of Birth :</Text>{" "}
          {new Date(patientDetails.dateOfBirth).toLocaleDateString()}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.infoHeading}>Gender :</Text>{" "}
          {patientDetails.gender}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.infoHeading}>Email :</Text> {patientDetails.email}
        </Text>
        <TouchableOpacity
          style={styles.viewTestRecordBtn}
          onPress={() => {
            navigation.navigate("PatientTestsScreen", { patientId: id });
          }}
        >
          <Text style={styles.viewTestRecordBtnText}>View Test Records</Text>
        </TouchableOpacity>

        {/* Add trash bin icon for delete button */}
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={handleDeletePatient}
        >
          <FontAwesomeIcon name="trash" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#101623",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 25,
  },
  detailsCard: {
    position: "relative",
    width: "100%",
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DE1E57",
    borderRadius: 16,
    padding: 10,
  },
  ImageStyle: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "lightgrey",
    marginBottom : 10
  },
  infoHeading: {
    fontSize: 14,
    color: "#f0f0f0",
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    marginTop: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewTestRecordBtn: {
    backgroundColor: "#ffffff",
    width: 160,
    height: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  viewTestRecordBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#DE1E57",
    lineHeight: 40,
    alignSelf: "center",
  },
  updateIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  deleteIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default PatientDetailsScreen;
