import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        onPress={() => navigation.navigate("PatientListScreen")}
        title="Patients List"
        color="#007BFF" // Set the button color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Set the background color
  },
  text: {
    fontSize: 30,
    marginBottom: 20, // Add some spacing between the text and the button
  },
});

export default HomeScreen;
