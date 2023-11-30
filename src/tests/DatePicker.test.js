import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DatePicker from "../components/DatePicker";

describe("DatePicker component", () => {
  it("renders DateTimePicker component and triggers onDateChange", () => {
    // Mock function for onDateChange
    const mockOnDateChange = jest.fn();

    // Set a test date
    const testDate = new Date("2023-12-25T12:00:00");

    // Render the DatePicker component with props
    const { getByTestId } = render(
      <DatePicker date={testDate} onDateChange={mockOnDateChange} />
    );

    // Find the DateTimePicker component by testID
    const dateTimePicker = getByTestId("dateTimePicker");

    // Trigger change event on DateTimePicker
    fireEvent(dateTimePicker, "onChange", {
      nativeEvent: { timestamp: testDate.getTime() },
    });

    // Assert that onDateChange has been called with the test date
    expect(mockOnDateChange).toHaveBeenCalledWith(testDate);
  });
});
