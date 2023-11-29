import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

const TestTypeDropdown = ({ onValueChange }) => {
  const data = [
    { key: "Blood Pressure Test", value: "Blood Pressure Test" },
    { key: "Blood Sugar Test", value: "Blood Sugar Test" },
    { key: "Cholesterol Test", value: "Cholesterol Test" },
    { key: "Complete Blood Count (CBC)", value: "Complete Blood Count (CBC)" },
  ];

  return (
    <SelectList
      placeholder="Select Test Type"
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
    margin: 10,
  },
  dropdownContainerStyle: {
    borderWidth: 0.5,
    borderColor: "#A6A6A6",
    borderRadius: 12,
    margin: 10,
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

export default TestTypeDropdown;
