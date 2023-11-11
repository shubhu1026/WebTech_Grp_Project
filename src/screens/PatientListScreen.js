import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";

import PatientList from "../components/PatientList";

const PatientListScreen = ({ navigation }) => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefreshList = () => {
    // Set refreshList to true to trigger a re-fetch
    setRefreshList(true);
  };

  return (
    <View style={styles.container}>
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
