import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

const ConditionDropdown = ({ onValueChange }) => {
  const data = [
    { key: "Critical", value: "Critical" },
    { key: "Normal", value: "Normal" },
    { key: "Healthy", value: "Healthy" },
  ];

  return (
    <SelectList
      placeholder="Condition"
      search={false}
      data={data}
      setSelected={onValueChange}
      boxStyles={styles.inputContainerStyle}
      dropdownStyles={styles.dropdownContainerStyle}
    />
  );
};

const styles = {
  inputContainerStyle: {
    // Style similar to other inputs
    height: 50,
    borderWidth: 0.5,
    borderColor: "#A6A6A6",
    borderRadius: 12,
    paddingLeft: 10,
  },
  dropdownContainerStyle: {
    borderWidth: 0.5,
    borderColor: "#A6A6A6",
    borderRadius: 12,
    marginBottom: 10,
  },
  inputStyle: {
    // Text input style
    flex: 1,
  },
  placeholderStyle: {
    // Placeholder style
    color: "#A6A6A6",
  },
  selectedItemTextStyle: {
    // Selected item text style
    color: "#101623",
  },
};

export default ConditionDropdown;
