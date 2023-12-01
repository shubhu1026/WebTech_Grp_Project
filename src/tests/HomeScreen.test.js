import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../screens/HomeScreen";

describe("HomeScreen component", () => {
  it("renders correctly", () => {
    const { getByText, getByTestId } = render(<HomeScreen />);

    // Check if essential elements are present
    expect(getByTestId("homepageImage")).toBeTruthy();
    expect(getByText("Consult only with a doctor you trust")).toBeTruthy();
    expect(getByText("View Patients List")).toBeTruthy();
  });
});
