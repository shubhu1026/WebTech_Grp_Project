import React from "react";
import { View, StyleSheet, Button } from "react-native";

import PatientList from "../components/PatientList";

const PatientListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <PatientList navigation={navigation} />
      <Button color="#199A8E"
        onPress={() => navigation.navigate("AddPatientScreen")}
        title="+ Add New Patient"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width : "100%",
    height : "100%",
    backgroundColor : "#fff"
  },
  buttonStyle : {
    color : 'red'
  }
});

export default PatientListScreen;
