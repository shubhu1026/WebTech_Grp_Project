import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
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
    // Perform the delete operation here
    // After deleting, you may want to navigate back to the patient list or any other screen
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
          <FontAwesomeIcon name="pencil" size={20} color="#199A8E" />
        </TouchableOpacity>
        <Image
          style={styles.ImageStyle}
          source={{
            uri: "https://qdesq.imagekit.io/tr:n-listing_image_hq/image/upload/v1698461447/r4vffzt1a5urnkvyqnis.png",
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
          {patientDetails.dateOfBirth}
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
          <FontAwesomeIcon name="trash" size={20} color="#FF6347" />
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
    backgroundColor: "#E8F3F1",
    borderRadius: 16,
    padding: 10,
  },
  ImageStyle: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#101623",
  },
  infoHeading: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  info: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3B4453",
    marginTop: 7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewTestRecordBtn: {
    backgroundColor: "#199A8E",
    width: 160,
    height: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  viewTestRecordBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
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
