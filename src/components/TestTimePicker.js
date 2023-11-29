import React, { useState } from "react";
import { Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TestTimePicker = ({ value, onChange }) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    onChange(time.toTimeString());
    hideTimePicker();
  };

  return (
    <>
      <Button title="Select Test Time" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
    </>
  );
};

export default TestTimePicker;
