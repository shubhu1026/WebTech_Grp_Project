import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

const UpdatePatientScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { patientId } = route.params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [doctor, setDoctor] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });
  };

  const handleUpdatePatient = () => {
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
      console.error("All fields must be filled");
      showAlert("Error", "All fields must be filled");
      return;
    }

    const updatedPatient = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      dateOfBirth: dob,
      doctor: doctor,
      email: email,
      gender: gender,
      contactNumber: contactNumber,
    };

    setLoading(true);

    fetch(`${API_BASE_URL}/patients/${patientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPatient),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Patient updated successfully");
          showAlert("Success", "Patient updated successfully");
          navigation.goBack();
        } else {
          console.error("Failed to update patient");
          showAlert("Error", "Failed to update patient");
        }
      })
      .catch((error) => {
        console.error("Error updating patient:", error);
        showAlert("Error", "Error updating patient");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // Fetch patient details on component mount
    fetch(`${API_BASE_URL}/patients/${patientId}`, {
      method: "GET",
      headers: {
        // set headers here
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setAddress(data.address);
        setDob(data.dateOfBirth);
        setDoctor(data.doctor);
        setEmail(data.email);
        setGender(data.gender);
        setContactNumber(data.contactNumber);
      })
      .catch((error) => {
        console.error("Error fetching patient details:", error);
      });
  }, [patientId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Patient Details</Text>
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
      <Button
        color="#199A8E"
        title={loading ? "Updating..." : "Update"}
        onPress={handleUpdatePatient}
        disabled={loading}
      />
    </View>
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

export default UpdatePatientScreen;
