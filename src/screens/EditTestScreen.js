import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import API_BASE_URL from "../api/apiconfig";

import TestTypeDropdown from "../components/TestTypeDropdown";
import ConditionDropdown from "../components/ConditionDropdown";
import DatePicker from "../components/DatePicker";
import TimePicker from "../components/TimePicker";

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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formattedTestDate, setFormattedTestDate] = useState("");
  const [formattedTestTime, setFormattedTestTime] = useState("");

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

      // Format the fetched date and time for display
      setFormattedTestDate(formatDate(new Date(data.date)));
      setFormattedTestTime(formatTime(new Date(data.testTime)));
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Edit Test</Text>
        <TestTypeDropdown
          onValueChange={(value) =>
            setEditedTest({ ...editedTest, testType: value })
          }
        />
        <View style={styles.SectionStyle}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Test Date"
            onFocus={() => setShowDatePicker(true)}
            value={formattedTestDate}
            onChangeText={(text) => setFormattedTestDate(text)}
          />
          {showDatePicker && (
            <DatePicker
              date={
                editedTest.testDate ? new Date(editedTest.testDate) : new Date()
              }
              themeVariant="light"
              onDateChange={(date) => {
                setEditedTest({ ...editedTest, testDate: date });
                setFormattedTestDate(formatDate(date));
                setShowDatePicker(false);
              }}
            />
          )}
        </View>
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
        <View style={styles.SectionStyle}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Test Time"
            onFocus={() => setShowTimePicker(true)}
            value={formattedTestTime}
            onChangeText={(text) => setFormattedTestTime(text)}
          />
          {showTimePicker && (
            <TimePicker
              testTime={
                editedTest.testTime ? new Date(editedTest.testTime) : new Date()
              }
              onTimeChange={(time) => {
                setEditedTest({ ...editedTest, testTime: time });
                setFormattedTestTime(formatTime(time));
                setShowTimePicker(false);
              }}
            />
          )}
        </View>
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
        <ConditionDropdown
          onValueChange={(value) =>
            setEditedTest({ ...editedTest, condition: value })
          }
        />
        <Button color="#199A8E" title="Save" onPress={handleSave} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default EditTestScreen;
