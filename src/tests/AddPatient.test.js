import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { Alert } from "react-native";
import AddPatientScreen from "../screens/AddPatientScreen";
import API_BASE_URL from "../api/apiconfig";

const originalAlert = global.Alert;
global.Alert = jest.fn();

// Mock the useNavigation hook
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

// Mock the Alert.alert function
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

describe("AddPatientScreen component", () => {
  afterEach(() => {
    // Reset mocks after each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore the original Alert object after all tests are done
    global.Alert = originalAlert;
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <AddPatientScreen />
      </NavigationContainer>
    );

    expect(getByText("Add Patient Details")).toBeTruthy();
    expect(getByPlaceholderText("Enter Your First Name Here")).toBeTruthy();
    expect(getByPlaceholderText("Enter Your Last Name Here")).toBeTruthy();
    expect(getByPlaceholderText("Enter Your Address Here")).toBeTruthy();
    expect(getByPlaceholderText("Enter Your Doctor Name Here")).toBeTruthy();
    expect(getByPlaceholderText("Enter Your Email Here")).toBeTruthy();
    expect(getByPlaceholderText("Enter Your Contact Number Here")).toBeTruthy();
    expect(getByText("Submit")).toBeTruthy();
  });

  describe("AddPatientScreen component", () => {
    it("handles missing form fields on submission", () => {
      // Mock the navigation object
      useNavigation.mockReturnValue({
        navigate: jest.fn(),
      });

      const { getByText } = render(
        <NavigationContainer>
          <AddPatientScreen />
        </NavigationContainer>
      );

      fireEvent.press(getByText("Submit"));

      // Check if Alert.alert was called with the correct arguments
      expect(
        require("react-native/Libraries/Alert/Alert").alert
      ).toHaveBeenCalledWith("Error", "All fields must be filled");
    });
  });
});
