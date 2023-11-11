import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

import PatientList from "../components/PatientList";
import CriticalPatientList from "../components/CriticalPatientList";

const PatientListScreen = ({ route, navigation }) => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefreshList = () => {
    // Set refreshList to true to trigger a re-fetch
    setRefreshList(true);
  };

  // Extract the message from the route parameters
  const message = route.params?.message;

  useEffect(() => {
    if (message) {
      // Show an alert if a message is received
      Alert.alert("Info", message);
    }
  }, [message]);

  return (
    <View style={styles.container}>
      <CriticalPatientList
        navigation={navigation}
        refreshList={refreshList}
        onRefresh={handleRefreshList}
      />
      <View style={styles.patientList}>
        {/* Pass refreshList and handleRefreshList as props to PatientList */}
        <PatientList
          navigation={navigation}
          refreshList={refreshList}
          onRefresh={handleRefreshList}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          color="#199A8E"
          title="+ Add New Patient"
          onPress={() => navigation.navigate("AddPatientScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  patientList: {
    flex: 1,
    marginBottom: 16,
  },
  buttonStyle: {
    margin: 16,
  },
});

export default PatientListScreen;
