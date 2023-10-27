import React from "react";
import { View, Text, FlatList } from "react-native";

const patients = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const PatientList = () => {
  return (
    <View>
      <Text>List of Patients</Text>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default PatientList;
