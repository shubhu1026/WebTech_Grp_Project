import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const PatientCard = ({
  item,
  expanded,
  onExpand,
  onDelete,
  onEdit,
  navigation,
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity
        style={[styles.cardNew, expanded && styles.cardNewExpanded]}
        onPress={() => {
          navigation.navigate("PatientTestsScreen", { patientId: item._id });
        }}
      >
        <View style={styles.cardInfoUserImage}>
          <Image
            style={styles.infoImage}
            source={{
              uri: "https://ik.imagekit.io/fvlwioahxk/profile%20(1).png",
            }}
          />
        </View>
        <View style={styles.cardInfoUserContent}>
          <Text style={styles.cardName}>
            {item.firstName + " " + item.lastName}
          </Text>
          <Text style={styles.cardContent}>
            <Text style={styles.cardTitle}>Date of Birth :</Text>{" "}
            {new Date(item.dateOfBirth).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity style={styles.cardExpandBtn} onPress={onExpand}>
          {!expanded && (
            <Image
              style={styles.infoImage}
              source={{
                uri: "https://ik.imagekit.io/fvlwioahxk/expand_btn.png",
              }}
            />
          )}
          {expanded && (
            <Image
              style={styles.infoImage}
              source={{
                uri: "https://ik.imagekit.io/fvlwioahxk/Slide%20Up.png",
              }}
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.additionalDetails}>
          <Text style={styles.cardContent}>
            <Text style={styles.cardTitle}>Address :</Text> {item.address}
          </Text>
          <Text style={styles.cardContent}>
            <Text style={styles.cardTitle}>Gender :</Text> {item.gender}
          </Text>
          <TouchableOpacity
            style={styles.editProfileIcon}
            onPress={() =>
              navigation.navigate("PatientDetailsScreen", { id: item._id })
            }
          >
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: "https://ik.imagekit.io/fvlwioahxk/edit_profile_icon.png",
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardNew: {
    backgroundColor: "#292F3F",
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#292F3F",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 90,
    flexDirection: "row",
  },
  cardNewExpanded: {
    borderEndStartRadius: 0,
    borderEndEndRadius: 0,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
  cardContent: {
    fontSize: 14,
    fontWeight: "300",
    color: "#ffffff",
    marginBottom: 7,
  },
  cardInfoUserImage: {
    width: 53,
    height: 55,
    borderRadius: 10,
    shadowColor: "#292F3F",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    objectFit: "contain",
    alignSelf: "center",
    backgroundColor: "#292F3F",
  },
  cardInfoUserContent: {
    width: "70%",
    height: "100%",
    padding: 10,
  },
  cardExpandBtn: {
    width: 25,
    height: 25,
    borderRadius: 25,
    shadowColor: "#292F3F",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    objectFit: "contain",
    alignSelf: "center",
    backgroundColor: "#292F3F",
    position: "absolute",
    right: 20,
    top: 25,
  },
  infoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
    alignSelf: "center",
  },
  additionalDetails: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#292F3F",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  editProfileIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

export default PatientCard;
