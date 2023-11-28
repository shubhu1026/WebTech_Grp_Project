import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

const AddTestScreen = ({ navigation }) => {
  const route = useRoute();
  const { patientId } = route.params;

  const [testType, setTestType] = useState("");
  const [testDate, setTestDate] = useState("");
  const [nurse, setNurse] = useState("");
  const [testTime, setTestTime] = useState("");
  const [category, setCategory] = useState("");
  const [readings, setReadings] = useState("");
  const [condition, setCondition] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleAddTest = async () => {
    try {
      const newTest = {
        testType,
        testDate,
        nurse,
        testTime,
        category,
        readings,
        condition,
        diagnosis,
      };

      const response = await fetch(
        `${API_BASE_URL}/patients/${patientId}/medicalTests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTest),
        }
      );

      if (response.ok) {
        // Test added successfully
        navigation.goBack();
      } else {
        console.error("Failed to add new test");
        // Handle the case where the addition fails
        // You might display an error message to the user
      }
    } catch (error) {
      console.error("Error adding new test:", error);
      // Handle any network errors or other exceptions
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Test Details </Text>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Test Name"
          underlineColorAndroid="transparent"
          value={testType}
          onChangeText={(text) => setTestType(text)}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Test Date"
          underlineColorAndroid="transparent"
          value={testDate}
          onChangeText={(text) => setTestDate(text)}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Test Diagnosis"
          underlineColorAndroid="transparent"
          value={diagnosis}
          onChangeText={(text) => setDiagnosis(text)}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Nurse Name"
          underlineColorAndroid="transparent"
          value={nurse}
          onChangeText={(text) => setNurse(text)}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Test Time"
          underlineColorAndroid="transparent"
          value={testTime}
          onChangeText={(text) => setTestTime(text)}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Category"
          underlineColorAndroid="transparent"
          value={category}
          onChangeText={(text) => setCategory(text)}
        />
      </View>

      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Readings"
          underlineColorAndroid="transparent"
          value={readings}
          onChangeText={(text) => setReadings(text)}
        />
      </View>
      <View style={styles.SectionStyle}>
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter Condition"
          underlineColorAndroid="transparent"
          value={condition}
          onChangeText={(text) => setCondition(text)}
        />
      </View>
      <Button color="#199A8E" title="Submit" onPress={handleAddTest} />
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
    marginLeft: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#A6A6A6",
    height: 50,
    borderRadius: 12,
    paddingLeft: 10,
    margin: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    alignItems: "center",
    marginRight: 10,
  },
});

export default AddTestScreen;
