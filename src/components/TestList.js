import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const TestList = () => {
  const navigation = useNavigation();
  const tests = [
    {
      id: 1,
      testName: "Blood Pressure Test",
      testDate: "2023-10-30",
      nurseName: "Jane Smith",
      testTime: "10:30 AM",
      category: "Cardiovascular",
      readings: "120/80 mmHg",
      condition: "Normal",
    },
    {
      id: 2,
      testName: "Cholesterol Test",
      testDate: "2023-10-30",
      nurseName: "John Doe",
      testTime: "11:15 AM",
      category: "Cardiovascular",
      readings: "Total: 180 mg/dL",
      condition: "High",
    },
    {
      id: 3,
      testName: "Blood Sugar Test",
      testDate: "2023-10-30",
      nurseName: "Alice Johnson",
      testTime: "12:00 PM",
      category: "Metabolic",
      readings: "Fasting: 90 mg/dL",
      condition: "Normal",
    },
    {
      id: 4,
      testName: "Cholesterol Test",
      testDate: "2023-10-20",
      nurseName: "Jessica Wright",
      testTime: "11:55 AM",
      category: "Cardiovascular",
      readings: "Total: 180 mg/dL",
      condition: "High",
    },
    // Add more test objects as needed
  ];

  const handleEditTest = (test) => {
    // Add code to handle editing the selected test
    // You can navigate to an "EditTestScreen" and pass the test object for editing
    navigation.navigate("EditTestScreen", { test });
  };

  const handleDeleteTest = (test) => {
    // Add code to handle deleting the selected test
    // You can implement a confirmation dialog before deleting
  };

  return (
    <View>
      <Text style={styles.listTitle}>List of Tests</Text>
      <FlatList
        data={tests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.testName}</Text>
            <Text style={styles.info}>Test Date: {item.testDate}</Text>
            <Text style={styles.info}>Nurse: {item.nurseName}</Text>
            <Text style={styles.info}>Test Time: {item.testTime}</Text>
            <Text style={styles.info}>Category: {item.category}</Text>
            <Text style={styles.info}>Readings: {item.readings}</Text>
            <Text style={styles.info}>Condition: {item.condition}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditTest(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTest(item)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    elevation: 3,
    shadowColor: "#000",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default TestList;
