import React from "react";
import { View, StyleSheet, Button } from "react-native";

import PatientList from "../components/PatientList";

const PatientListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PatientList navigation={navigation} />

      <Button
        onPress={() => navigation.navigate("AddPatientScreen")}
        title="Add Patient"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PatientListScreen;
