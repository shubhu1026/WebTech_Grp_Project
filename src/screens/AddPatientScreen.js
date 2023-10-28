import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet , Image  } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddPatientScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [doctor, setDoctor] = useState("");

  const handleAddPatient = () => {
    //add a patient

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Patient Details</Text>
      <View style={styles.SectionStyle}>
        <Image style={styles.ImageStyle} source={{uri: 'https://qdesq.imagekit.io/image/upload/v1698460686/bqrc8ao181l4juqchgeg.png',}}/>
        <TextInput style={{ flex: 1 }} placeholder="Enter Your Name Here" underlineColorAndroid="transparent"
         value={name}
         onChangeText={setName}/>
      </View>
      <View style={styles.SectionStyle}>
        <Image style={styles.ImageStyle} source={{uri: 'https://qdesq.imagekit.io/image/upload/v1698460893/eu1gi8oyhafhlxdmdcfj.png',}}/>
        <TextInput style={{ flex: 1 }} placeholder="Enter Your Address Here" underlineColorAndroid="transparent"
         value={address}
         onChangeText={setAddress}/>
      </View>
      <View style={styles.SectionStyle}>
        <Image style={styles.ImageStyle} source={{uri: 'https://qdesq.imagekit.io/image/upload/v1698460916/lxurygprl4beniwteddn.png',}}/>
        <TextInput style={{ flex: 1 }} placeholder="Enter Your Date of Birth Here" underlineColorAndroid="transparent"
         value={dob}
         onChangeText={setDob}/>
      </View>
      <View style={styles.SectionStyle}>
        <Image style={styles.ImageStyle} source={{uri: 'https://qdesq.imagekit.io/image/upload/v1698460939/zi2knr00xg6st5nv4szz.png',}}/>
        <TextInput style={{ flex: 1 }} placeholder="Enter Your Doctor Name Here" underlineColorAndroid="transparent"
         value={doctor}
         onChangeText={setDoctor}/>
      </View>
      <Button color="#199A8E" title="Submit" onPress={handleAddPatient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color : "#101623",
    fontSize: 16,
    fontWeight: "600",
    marginTop : 15,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#A6A6A6',
    height: 50,
    borderRadius: 12,
    paddingLeft : 5,
    margin: 10,
  },
   ImageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
    marginRight : 10
  }
});

export default AddPatientScreen;
