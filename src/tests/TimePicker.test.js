import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TimePicker from "../components/TimePicker";

describe("TimePicker component", () => {
  it("triggers onTimeChange with selected time", () => {
    // Mock function for onTimeChange
    const mockOnTimeChange = jest.fn();

    // Set a test time
    const testTime = new Date("2023-12-25T14:30:00");

    // Render the TimePicker component with props
    const { getByTestId } = render(
      <TimePicker testTime={testTime} onTimeChange={mockOnTimeChange} />
    );

    // Find the DateTimePicker component by testID
    const dateTimePicker = getByTestId("dateTimePicker");

    // Trigger change event on DateTimePicker
    fireEvent(dateTimePicker, "onChange", {
      nativeEvent: { timestamp: testTime.getTime() },
    });

    // Assert that onTimeChange has been called with the test time
    expect(mockOnTimeChange).toHaveBeenCalledWith(testTime);
  });
});
