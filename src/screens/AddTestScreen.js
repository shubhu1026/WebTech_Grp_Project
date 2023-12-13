import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

import TestTypeDropdown from "../components/TestTypeDropdown";
import ConditionDropdown from "../components/ConditionDropdown";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";

const AddTestScreen = ({ navigation }) => {
  const route = useRoute();
  const { patientId } = route.params;

  const [testType, setTestType] = useState("");
  const [testDate, setTestDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [nurse, setNurse] = useState("");
  const [testTime, setTestTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [category, setCategory] = useState("");
  const [readings, setReadings] = useState("");
  const [condition, setCondition] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const [formattedTestDate, setFormattedTestDate] = useState("");
  const [formattedTestTime, setFormattedTestTime] = useState("");

  const handleAddTest = async () => {
    try {
      if (
        !testType.trim() ||
        !testDate ||
        !diagnosis.trim() ||
        !nurse.trim() ||
        !testTime ||
        !category.trim() ||
        !readings.trim()
      ) {
        Alert.alert("Error", "All fields must be filled");
        return;
      }

      // Additional validation for testDate (assuming it's a string)
      const isValidDate =
        new Date(testDate) instanceof Date && !isNaN(new Date(testDate));
      if (!isValidDate) {
        Alert.alert("Error", "Please enter a valid test date");
        return;
      }

      const conditionForTestType = getConditionBasedOnReadings(
        testType,
        readings
      );
      if (!conditionForTestType) {
        Alert.alert("Error", "Invalid test type");
        return;
      }

      const newTest = {
        testType,
        testDate,
        nurse,
        testTime,
        category,
        readings,
        condition: conditionForTestType,
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

  const getConditionBasedOnReadings = (testType, readings) => {
    switch (testType.toLowerCase()) {
      case "blood pressure test":
        const bpReadings = parseFloat(readings);
        if (bpReadings < 90 || bpReadings > 140) {
          return "Critical";
        } else {
          return "Normal";
        }
      case "blood sugar test":
        const sugarReadings = parseFloat(readings);
        if (sugarReadings < 80 || sugarReadings > 180) {
          return "Critical";
        } else {
          return "Normal";
        }
      case "cholesterol test":
        const cholesterolReadings = parseFloat(readings);
        if (cholesterolReadings > 240) {
          return "Critical";
        } else {
          return "Normal";
        }
      case "complete blood count (cbc)":
        const cbcReadings = parseFloat(readings);
        if (cbcReadings < 4.5 || cbcReadings > 10) {
          return "Critical";
        } else {
          return "Healthy";
        }
      default:
        return "";
    }
  };

  const showDatePickerOnClick = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  };

  const onDateChange = (selectedDate) => {
    setTestDate(selectedDate); // Store the date as a Date object
    setFormattedTestDate(formatDate(selectedDate)); // Format and store the string representation
    setShowDatePicker(false);
  };

  const onTimeChange = (selectedTime) => {
    setTestTime(selectedTime); // Store the time as a Date object
    setFormattedTestTime(formatTime(selectedTime)); // Format and store the string representation
    setShowTimePicker(false);
  };

  const formatDate = (date) => {
    // Function to format the date as needed (for example)
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "2-digit" };
    return time.toLocaleTimeString(undefined, options);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Add Test Details </Text>
        <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
          <TestTypeDropdown onValueChange={setTestType} />
        </View>

        <View style={styles.SectionStyle}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Test Date"
            onFocus={showDatePickerOnClick}
            value={formattedTestDate}
            onChangeText={(text) => setFormattedTestDate(text)}
          />
          {showDatePicker && (
            <DatePicker
              date={testDate ? testDate : new Date()} // Pass the Date object
              themeVariant="light"
              onDateChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.SectionStyle}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Test Time"
            onFocus={() => setShowTimePicker(true)}
            value={formattedTestTime}
            onChangeText={(text) => setFormattedTestTime(text)}
          />
        </View>

        {showTimePicker && (
          <TimePicker
            testTime={testTime ? testTime : new Date()}
            onTimeChange={onTimeChange}
          />
        )}

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
            placeholder="Enter Nurse Name"
            underlineColorAndroid="transparent"
            value={nurse}
            onChangeText={(text) => setNurse(text)}
          />
        </View>

        <View style={styles.SectionStyle}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Readings"
            underlineColorAndroid="transparent"
            value={readings}
            onChangeText={(text) => setReadings(text)}
            keyboardType="numeric"
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
            style={{ flex: 1, color: "#101010" }}
            placeholder="Condition"
            underlineColorAndroid="transparent"
            value={getConditionBasedOnReadings(testType, readings)}
            editable={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button color="#DE1E57" title="Submit" onPress={handleAddTest} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  innerContainer: {
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
  buttonContainer: {
    marginVertical: 20,
  },
});

export default AddTestScreen;
