import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));

  // Format the time as needed
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedTime;
};

const TestCard = ({ item, expanded, onExpand, onDelete, onEdit }) => {
  const formattedTestTime = formatTime(item.testTime);

  return (
    <View
      style={
        item.condition.toLowerCase() === "critical"
          ? styles.cardCriticalContainer
          : styles.cardNormalContainer
      }
    >
      <View style={[styles.cardNew, expanded && styles.cardNewExpanded]}>
        <View style={styles.cardInfoUserContent}>
          <Text style={styles.cardInfoName}>{item.testType}</Text>
        </View>
        {expanded && (
          <View style={styles.additionalDetails}>
            <Text style={styles.cardTitle}>Test Date</Text>
            <Text style={styles.cardContent}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            {/* Additional details for Nurse, Test Time, Category, Readings, Condition */}
            <View style={styles.cardBorderBottom}></View>
            <Text style={styles.cardTitle}>Nurse</Text>
            <Text style={styles.cardContent}>{item.nurse}</Text>
            <View style={styles.cardBorderBottom}></View>
            <Text style={styles.cardTitle}>Test Time</Text>
            <Text style={styles.cardContent}>{formattedTestTime}</Text>
            <View style={styles.cardBorderBottom}></View>
            <Text style={styles.cardTitle}>Category</Text>
            <Text style={styles.cardContent}>{item.category}</Text>
            <View style={styles.cardBorderBottom}></View>
            <Text style={styles.cardTitle}>Readings</Text>
            <Text style={styles.cardContent}>{item.readings}</Text>
            <View style={styles.cardBorderBottom}></View>
            <Text style={styles.cardTitle}>Condition</Text>
            <Text style={styles.cardContent}>{item.condition}</Text>
          </View>
        )}
        <TouchableOpacity onPress={onDelete} style={styles.deleteContainer}>
          <Text style={styles.deleteText}>Delete</Text>
          <Image
            source={{
              uri: "https://ik.imagekit.io/fvlwioahxk/Trash.png",
            }}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardExpandBtn} onPress={onExpand}>
          {!expanded && (
            <Image
              style={styles.infoImage}
              source={{
                uri: "https://ik.imagekit.io/fvlwioahxk/down_button_white.png",
              }}
            />
          )}
          {expanded && (
            <Image
              style={styles.infoImage}
              source={{
                uri: "https://ik.imagekit.io/fvlwioahxk/slide_up_updated.png",
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={styles.editContainer}>
          <Text style={styles.editText}>Edit</Text>
          <Image
            source={{
              uri: "https://ik.imagekit.io/fvlwioahxk/edit_icon.png",
            }}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardNormalContainer: {
    backgroundColor: "#DE1E57",
    borderRadius: 16,
    marginBottom: 20,
  },
  cardCriticalContainer: {
    backgroundColor: "#801232",
    borderRadius: 16,
    marginBottom: 20,
  },
  cardNew: {
    padding: 15,
    elevation: 3,
    shadowColor: "#DE1E57",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 110,
    flexDirection: "row",
    width: "100%",
  },
  cardNewExpanded: {
    height: 520,
  },
  cardInfoName: {
    fontSize: 22,
    fontWeight: "500",
    color: "#ffffff",
  },
  cardExpandBtn: {
    width: 25,
    height: 25,
    borderRadius: 25,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    objectFit: "contain",
    alignSelf: "flex-start",
    position: "absolute",
    right: 15,
    top: 15,
  },
  infoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
    alignSelf: "center",
  },
  deleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 15,
    bottom: 15,
  },
  deleteText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginLeft: 0,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  editText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  editIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginBottom: 3,
  },
  additionalDetails: {
    position: "absolute",
    left: 15,
    top: 50,
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D9D9D9",
    marginBottom: 8,
    marginTop: 8,
  },
  cardContent: {
    fontSize: 14,
    fontWeight: "400",
    color: "#ffffff",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    width: "100%",
  },
});

export default TestCard;
