import React, { useState } from "react";
import { Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TestDatePicker = ({ value, onChange }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    onChange(date.toISOString());
    hideDatePicker();
  };

  return (
    <>
      <Button title="Select Test Date" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default TestDatePicker;
