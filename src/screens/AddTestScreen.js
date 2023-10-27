import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const AddTestScreen = ({ navigation }) => {
  const [testName, setTestName] = useState("");
  const [testDate, setTestDate] = useState("");
  const [nurseName, setNurseName] = useState("");
  const [testTime, setTestTime] = useState("");
  const [category, setCategory] = useState("");
  const [readings, setReadings] = useState("");
  const [condition, setCondition] = useState("");

  const handleAddTest = () => {
    // Add code to handle adding a new test
    // You can use the state variables (testName, testDate, nurseName, etc.) to create a new test object
    // and save it to your data source
    // After adding the test, you can navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Test</Text>
      <TextInput
        style={styles.input}
        placeholder="Test Name"
        value={testName}
        onChangeText={(text) => setTestName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Test Date"
        value={testDate}
        onChangeText={(text) => setTestDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nurse Name"
        value={nurseName}
        onChangeText={(text) => setNurseName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Test Time"
        value={testTime}
        onChangeText={(text) => setTestTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Readings"
        value={readings}
        onChangeText={(text) => setReadings(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Condition"
        value={condition}
        onChangeText={(text) => setCondition(text)}
      />
      <Button title="Add Test" onPress={handleAddTest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default AddTestScreen;
