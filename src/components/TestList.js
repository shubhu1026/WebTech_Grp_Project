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
  // sample data
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
  ];

  const handleEditTest = (test) => {
    // Add code to handle editing the selected test
    navigation.navigate("EditTestScreen", { test });
  };

  const handleDeleteTest = (test) => {
    // Add code to handle deleting the selected test
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.listTitle}>List of Tests</Text>
      <FlatList
        data={tests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.testName}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Test Date :</Text>  {item.testDate}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Nurse :</Text>  {item.nurseName}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Test Time :</Text>  {item.testTime}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Category :</Text>  {item.category}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Readings :</Text>  {item.readings}</Text>
            <Text style={styles.info}><Text style={styles.infoHeading}>Condition :</Text>  {item.condition}</Text>
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
  mainContainer: {
    width : '100%',
    height : '100%',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#E8F3F1",
    padding: 10,
    margin: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#E8F3F1",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 270
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#101623",
    marginTop : 10,
    marginBottom: 10, 
  },
  infoHeading : {
    fontSize: 15,
    color : "#000",
    fontWeight : "600",
  },
  info: {
    fontSize: 14,
    color : "#3B4453",
    marginBottom: 8, 
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    marginTop : 10,
    backgroundColor: "#199A8E",
    padding: 10,
    width : 70,
    borderRadius: 8,
  },
  deleteButton: {
    marginTop : 10,
    backgroundColor: "#e22f28",
    padding: 10,
    width : 70,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default TestList;
