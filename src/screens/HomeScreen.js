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
        testID="homepageImage"
        style={styles.homepageImage}
        source={{
          uri: "https://qdesq.imagekit.io/image/upload/v1698453219/o5rlevyuun0dxtepezsj.png",
        }}
      />
      <View style={styles.patientListContainer}>
        <Text style={styles.patientContainerText}>
          Consult only with a doctor you trust
        </Text>
        <View style={styles.patientViewContainer}>
          <Text style={styles.viewPatientText}>View Patients List</Text>
          <TouchableOpacity
            style={styles.patientListBtn}
            onPress={() => navigation.navigate("PatientListScreen")}
          >
            <Image
              style={styles.patientListBtnImg}
              source={{
                uri: "https://qdesq.imagekit.io/image/upload/v1698455830/zzy0qeqewtririuryd9f.png",
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
    justifyContent: "space-between",
    height: 200,
    width: "100%",
    alignContent: "right",
  },
  viewPatientText: {
    color: "#101623",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    lineHeight: 50,
  },
  mainContainer: {
    padding: 25,
    backgroundColor: "#FFF",
    height: "100%",
  },
  patientListContainer: {
    borderRadius: 24,
    width: "100%",
    height: 200,
    padding: 25,
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "#f6f7ff",
  },
  patientContainerText: {
    color: "#101623",
    fontSize: 22,
    fontWeight: "700",
    width: "100%",
    marginBottom: 15,
  },
  patientListBtn: {
    backgroundColor: "#199A8E",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  patientListBtnImg: {
    width: 25,
    height: 25,
  },
  homepageImage: {
    height: 467,
    width: "100%",
    objectFit: "contain",
    alignSelf: "center",
  },
});

export default HomeScreen;
