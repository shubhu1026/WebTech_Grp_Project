import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import PatientListScreen from "./src/screens/PatientListScreen";
import AddPatientScreen from "./src/screens/AddPatientScreen";
import PatientDetailsScreen from "./src/screens/PatientDetailsScreen";
import PatientTestsScreen from "./src/screens/PatientTestsScreen";
import AddTestScreen from "./src/screens/AddTestScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PatientListScreen" component={PatientListScreen} />
        <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} />
        <Stack.Screen
          name="PatientDetailsScreen"
          component={PatientDetailsScreen}
        />
        <Stack.Screen
          name="PatientTestsScreen"
          component={PatientTestsScreen}
        />
        <Stack.Screen name="AddTestScreen" component={AddTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
