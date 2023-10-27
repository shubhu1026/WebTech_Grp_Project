import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const TestList = ({ navigation }) => {
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
    // Add more test objects as needed
  ];

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
});

export default TestList;
