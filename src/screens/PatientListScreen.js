import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import PatientList from "../components/PatientList";
import CriticalPatientList from "../components/CriticalPatientList";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "../api/apiconfig";

const PatientListScreen = ({ route, navigation }) => {
  const [refreshList, setRefreshList] = useState(false);
  const [activeTab, setActiveTab] = useState("Critical");

  const handleRefreshList = () => {
    setRefreshList(true);
  };

  const handleDeletePatients = () => {
    Alert.alert(
      "Delete All Patients",
      "Are you sure you want to delete all patients?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_BASE_URL}/patients`, {
                method: "DELETE",
              });

              if (response.ok) {
                console.log("Patients deleted successfully!");
                handleRefreshList();
              } else {
                console.error("Failed to delete patients:", response.status);
              }
            } catch (error) {
              console.error("Error deleting patients:", error);
            }
          },
        },
      ]
    );
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (route.params?.message) {
      Alert.alert("Info", route.params.message);
    }
  }, [route.params?.message]);

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor: "#DE1E57" }}>
      <View style={styles.container}>
        <View style={styles.toggleButtonCss}>
          <TouchableOpacity
            style={[
              styles.toggleMenuButtonCss,
              activeTab === "Critical" && styles.activeTab,
            ]}
            onPress={() => {
              toggleTab("Critical");
              handleRefreshList();
            }}
          >
            <Text
              style={[
                styles.toggleButtonTextCss,
                activeTab === "Critical" && styles.activeTabButtonTextCss,
              ]}
            >
              Critical Patients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleMenuButtonCss,
              activeTab === "All" && styles.activeTab,
            ]}
            onPress={() => {
              toggleTab("All");
              handleRefreshList();
            }}
          >
            <Text
              style={[
                styles.toggleButtonTextCss,
                activeTab === "All" && styles.activeTabButtonTextCss,
              ]}
            >
              All Patients
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "Critical" ? (
          <View style={styles.patientList}>
            <CriticalPatientList
              navigation={navigation}
              refreshList={refreshList}
              onRefresh={handleRefreshList}
            />
          </View>
        ) : (
          <View style={styles.patientList}>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={handleDeletePatients}
            >
              <Ionicons name="trash-outline" size={24} color="#ffffff" />
              <Text style={styles.deleteText}>Delete All Patients</Text>
            </TouchableOpacity>
            <PatientList
              navigation={navigation}
              refreshList={refreshList}
              onRefresh={handleRefreshList}
            />
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate("AddPatientScreen")}
      >
        <Text style={styles.buttonTextStyle}>Add New Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButtonCss: {
    flexDirection: "row",
    height: 65,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    padding: 8,
    marginBottom: 20,
    marginTop: 20,
  },
  toggleMenuButtonCss: {
    borderRadius: 10,
    backgroundColor: "#ffffff",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonTextCss: {
    color: "#2F394B",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabButtonTextCss: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTab: {
    backgroundColor: "#DE1E57",
  },
  container: {
    flex: 1,
    backgroundColor: "#DE1E57",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  patientList: {
    flex: 1,
  },
  buttonStyle: {
    height: 100,
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
  },
  buttonTextStyle: {
    color: "#DE1E57",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  deleteIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 10,
    marginBottom: 5,
  },
  deleteText: {
    color: "#ffffff",
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 16, // Adjust margin as needed
  },
});

export default PatientListScreen;
