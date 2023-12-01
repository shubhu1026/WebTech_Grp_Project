import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";
import DatePicker from "../components/DatePicker";

const AddPatientScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(new Date());
  const [doctor, setDoctor] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedBirthDate, setFormattedBirthDate] = useState("");

  const handleAddPatient = () => {
    if (
      !firstName ||
      !lastName ||
      !address ||
      !dob ||
      !doctor ||
      !email ||
      !gender ||
      !contactNumber
    ) {
      // Display an error message or handle it as needed
      console.error("All fields must be filled");
      Alert.alert("Error", "All fields must be filled");
      return;
    }

    // Create a new patient object with the entered data
    const newPatient = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      dateOfBirth: dob,
      doctor: doctor,
      email: email,
      gender: gender,
      contactNumber: contactNumber,
    };

    fetch(`${API_BASE_URL}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((response) => {
        if (response.ok) {
          // Patient added successfully
          console.log("Patient added successfully");
          // Display an alert
          Alert.alert("Success", "Patient added successfully", [
            {
              text: "OK",
              onPress: () => {
                // Navigate to the previous screen or handle it as needed
                navigation.goBack();
              },
            },
          ]);
        } else {
          // Handle error response from the server
          console.error("Failed to add patient");
          Alert.alert("Error", "Failed to add patient");
        }
      })
      .catch((error) => {
        // Handle network error or other issues
        console.error("Error adding patient:", error);
        Alert.alert("Error", "Error adding patient");
      });
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const showDatePickerOnClick = () => {
    Keyboard.dismiss();
    setShowDatePicker(true);
  };

  const onDateChange = (selectedDate) => {
    setDob(selectedDate); // Store the date as a Date object
    setFormattedBirthDate(formatDate(selectedDate)); // Format and store the string representation
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
      <View>
        <Text style={styles.title}>Add Patient Details</Text>
        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460686/bqrc8ao181l4juqchgeg.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your First Name Here"
            underlineColorAndroid="transparent"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460686/bqrc8ao181l4juqchgeg.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Last Name Here"
            underlineColorAndroid="transparent"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460893/eu1gi8oyhafhlxdmdcfj.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Address Here"
            underlineColorAndroid="transparent"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <TouchableOpacity
          style={[styles.SectionStyle, { alignItems: "center" }]}
          onPress={showDatePickerOnClick}
          testID="datePickerButton"
        >
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460916/lxurygprl4beniwteddn.png",
            }}
          />
          <Text
            testID="dateOfBirthText"
            style={{ flex: 1, paddingLeft: 5, color: "#000" }}
          >
            {formattedBirthDate || "Enter Date of Birth"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DatePicker
            date={dob ? dob : new Date()} // Pass the Date object
            themeVariant="light"
            onDateChange={onDateChange}
          />
        )}

        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460939/zi2knr00xg6st5nv4szz.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Doctor Name Here"
            underlineColorAndroid="transparent"
            value={doctor}
            onChangeText={setDoctor}
          />
        </View>
        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460939/zi2knr00xg6st5nv4szz.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Email Here"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View
          style={[
            styles.SectionStyle,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.ImageStyle}
              source={{
                uri: "https://qdesq.imagekit.io/image/upload/v1698460939/zi2knr00xg6st5nv4szz.png",
              }}
            />
            <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Gender:</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => handleGenderChange("Male")}
              style={[
                styles.genderButton,
                {
                  borderColor: gender === "Male" ? "#199A8E" : "#A6A6A6",
                },
              ]}
            >
              {gender === "Male" && (
                <View style={styles.genderButtonSelected} />
              )}
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Male</Text>

            <TouchableOpacity
              onPress={() => handleGenderChange("Female")}
              style={[
                styles.genderButton,
                {
                  borderColor: gender === "Female" ? "#199A8E" : "#A6A6A6",
                },
              ]}
            >
              {gender === "Female" && (
                <View style={styles.genderButtonSelected} />
              )}
            </TouchableOpacity>
            <Text style={{ marginLeft: 10 }}>Female</Text>
          </View>
        </View>

        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460939/zi2knr00xg6st5nv4szz.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Contact Number Here"
            underlineColorAndroid="transparent"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button color="#199A8E" title="Submit" onPress={handleAddPatient} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: "#101623",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    padding: 8,
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#A6A6A6",
    height: 50,
    borderRadius: 12,
    paddingLeft: 5,
    margin: 10,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: "stretch",
    alignItems: "center",
    marginRight: 10,
  },
  genderButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  genderButtonSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#199A8E",
  },
  buttonContainer: {
    marginVertical: 20,
  },
});

export default AddPatientScreen;
