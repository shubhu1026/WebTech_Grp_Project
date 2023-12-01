import React from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ date, onDateChange }) => {
  const handleDateChange = (event, selectedDate) => {
    let currentDate = selectedDate || date || new Date();

    if (Platform.OS === "android") {
      currentDate = event.nativeEvent.timestamp
        ? new Date(event.nativeEvent.timestamp)
        : currentDate;
    } else {
      currentDate = selectedDate || date || new Date();
    }

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
