import React from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ date, onDateChange }) => {
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date || new Date();
    onDateChange(currentDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode="date"
      is24Hour={true}
      display={Platform.OS === "ios" ? "spinner" : "default"}
      onChange={handleDateChange}
    />
  );
};

export default DatePicker;
