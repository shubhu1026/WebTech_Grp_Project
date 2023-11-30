import React from "react";
import { View, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimePicker = ({ testTime, onTimeChange }) => {
  const onChange = (event, selectedTime) => {
    if (Platform.OS === "android") {
      // On Android, the event listener returns a null event and the selected time
      if (selectedTime) {
        onTimeChange(selectedTime);
      }
    } else {
      // On iOS, the event listener returns the selected time directly
      onTimeChange(selectedTime);
    }
  };

  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={testTime}
        mode="time"
        is24Hour={false}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

export default TimePicker;
