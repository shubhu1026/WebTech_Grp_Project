import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const EditTestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { test } = route.params;

  // Initialize state variables to manage edited test data
  const [editedTest, setEditedTest] = useState({
    testName: test.testName,
    testDate: test.testDate,
    nurseName: test.nurseName,
    testTime: test.testTime,
    category: test.category,
    readings: test.readings,
    condition: test.condition,
  });

  const handleSave = () => {
    // Add code to save the edited test data, e.g., make an API call to update the test
    // You can use the "editedTest" state to send the updated data to the server

    // After saving, you can navigate back to the TestList screen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Test</Text>
      <TextInput
        style={styles.input}
        placeholder="Test Name"
        value={editedTest.testName}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, testName: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Test Date"
        value={editedTest.testDate}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, testDate: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Nurse Name"
        value={editedTest.nurseName}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, nurseName: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Test Time"
        value={editedTest.testTime}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, testTime: text })
        }
      />
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
      <TextInput
        style={styles.input}
        placeholder="Condition"
        value={editedTest.condition}
        onChangeText={(text) =>
          setEditedTest({ ...editedTest, condition: text })
        }
      />
      <Button title="Save" onPress={handleSave} />
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
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default EditTestScreen;
