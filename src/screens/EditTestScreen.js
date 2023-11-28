import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import API_BASE_URL from "../api/apiconfig";

const EditTestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { testId, patientId } = route.params;

  const [editedTest, setEditedTest] = useState({
    testType: "",
    testDate: "",
    nurse: "",
    testTime: "",
    category: "",
    readings: "",
    condition: "",
    diagnosis: "",
  });

  useEffect(() => {
    // Fetch test details based on testId
    fetchTestDetails();
  }, [testId]);

  const fetchTestDetails = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/patients/${patientId}/medicalTests/${testId}`,
        {
          method: "GET",
          headers: {
            // Set necessary headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch test details");
      }

      const data = await response.json();
      // Update state with fetched test details
      setEditedTest({
        testType: data.testType,
        testDate: data.date,
        nurse: data.nurse,
        testTime: data.testTime,
        category: data.category,
        readings: data.readings,
        condition: data.condition,
        diagnosis: data.diagnosis,
      });
    } catch (error) {
      console.error("Error fetching test details:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/patients/${patientId}/medicalTests/${testId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedTest),
        }
      );

      if (response.ok) {
        // Test data updated successfully
        navigation.goBack();
      } else {
        console.error("Failed to update test data");
        // Handle the case where the update fails
        // You might display an error message to the user
      }
    } catch (error) {
      console.error("Error updating test data:", error);
      // Handle any network errors or other exceptions
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Test</Text>
      <TextInput
        style={styles.input}
        placeholder="Test Name"
        value={editedTest.testName}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, testType: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Test Date"
        value={editedTest.testDate}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, testDate: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Diagnosis"
        value={editedTest.diagnosis}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, diagnosis: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Nurse Name"
        value={editedTest.nurseName}
        onChangeText={(text) => setEditedTest({ ...editedTest, nurse: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Test Time"
        value={editedTest.testTime}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, testTime: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={editedTest.category}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, category: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Readings"
        value={editedTest.readings}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, readings: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Condition"
        value={editedTest.condition}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, condition: text })
        }
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: "#101623",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#A6A6A6",
    borderWidth: 0.5,
    borderRadius: 12,
    paddingLeft: 10,
    marginVertical: 10,
  },
});

export default EditTestScreen;
