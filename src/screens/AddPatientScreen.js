import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

const AddPatientScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [doctor, setDoctor] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleAddPatient = () => {
    // Validate required fields before making the request
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

    // Make a POST request to your server to add the new patient
    fetch(`${API_BASE_URL}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPatient),
    })
      .then((response) => {
        if (response.ok) {
          // Patient added successfully, you can navigate or handle it as needed
          console.log("Patient added successfully");
          navigation.goBack();
        } else {
          // Handle error response from the server
          console.error("Failed to add patient");
        }
      })
      .catch((error) => {
        // Handle network error or other issues
        console.error("Error adding patient:", error);
      });
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
        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460916/lxurygprl4beniwteddn.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Date of Birth Here"
            underlineColorAndroid="transparent"
            value={dob}
            onChangeText={setDob}
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
        <View style={styles.SectionStyle}>
          <Image
            style={styles.ImageStyle}
            source={{
              uri: "https://qdesq.imagekit.io/image/upload/v1698460939/zi2knr00xg6st5nv4szz.png",
            }}
          />
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Gender Here"
            underlineColorAndroid="transparent"
            value={gender}
            onChangeText={setGender}
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
            placeholder="Enter Your Contact Number Here"
            underlineColorAndroid="transparent"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
        </View>
        <Button color="#199A8E" title="Submit" onPress={handleAddPatient} />
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
});

export default AddPatientScreen;
