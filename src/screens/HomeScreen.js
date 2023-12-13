import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Image,
  div,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        testID="homepageLogo"
        style={styles.homepageLogo}
        source={{
          uri: "https://ik.imagekit.io/fvlwioahxk/logo_updated_EAzrsyS8m",
        }}
      />
      <Image
        testID="homepageImage"
        style={styles.homepageImage}
        source={{
          uri: "https://ik.imagekit.io/fvlwioahxk/homepage_main_icon.png",
        }}
      />
      <View style={styles.patientListContainer}>
        <Text style={styles.patientContainerText}>
          Consult Only With A Doctor You Trust!
        </Text>
        <Text style={styles.viewPatientText}>
          Schedule appointments, monitor vital signs, and access lab results
          effortlessly. Your well-being, simplified.
        </Text>
        <View style={styles.patientViewContainer}>
          <TouchableOpacity
            style={styles.patientListBtn}
            onPress={() => navigation.navigate("PatientListScreen")}
          >
            <Image
              style={styles.patientListBtnImg}
              source={{
                uri: "https://ik.imagekit.io/fvlwioahxk/get_started_btn.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  patientViewContainer: {
    flexDirection: "row",
    justifyContent: "center",
    height: 200,
    width: "100%",
    alignContent: "right",
  },
  viewPatientText: {
    color: "#f6f6f6",
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 25,
    textAlign: "center",
  },
  mainContainer: {
    paddingTop: 15,
    backgroundColor: "#FFF",
    height: "100%",
  },
  patientListContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
    height: 200,
    padding: 25,
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "#DE1E57",
  },
  patientContainerText: {
    color: "#f6f6f6",
    fontSize: 24,
    fontWeight: "700",
    width: "100%",
    marginBottom: 15,
    textAlign: "center",
  },
  patientListBtn: {
    borderRadius: 50,
    width: 161,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  patientListBtnImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    alignSelf: "center",
  },
  homepageImage: {
    height: 370,
    width: "100%",
    objectFit: "contain",
    alignSelf: "center",
  },
  homepageLogo: {
    height: 100,
    width: "100%",
    objectFit: "contain",
    alignSelf: "center",
  },
});

export default HomeScreen;
