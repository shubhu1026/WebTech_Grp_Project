import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";

const CriticalPatientList = ({ navigation, refreshList, onRefresh }) => {
  const [criticalPatients, setCriticalPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const fetchCriticalPatients = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/patients/criticalPatients`,
        {
          method: "GET",
          headers: {
            // set headers if needed
          },
        }
      );
      const data = await response.json();
      setCriticalPatients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching critical patients:", error);
      setLoading(false);
    }
  }, []);
  const toggleExpand = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };
  useFocusEffect(
    useCallback(() => {
      fetchCriticalPatients();

      if (refreshList) {
        onRefresh();
      }
    }, [refreshList, onRefresh, fetchCriticalPatients])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={criticalPatients}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
        renderItem={({ item }) => (
          <View  style={{ marginBottom: 20 }} >
            <TouchableOpacity
             style={[ styles.cardNew, expandedCardId === item._id && styles.cardNewExpanded,]}
            // onPress={() => {
            //   navigation.navigate("PatientDetailsScreen", { id: item._id });
            // }}
            onPress={() => {
              navigation.navigate("PatientTestsScreen", { patientId: item._id });
            }}
            >
            <View 
             style={styles.cardInfoUserImage}>
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
            <TouchableOpacity
              style={styles.cardExpandBtn}
              onPress={() => toggleExpand(item._id)}
            >  
              {expandedCardId != item._id && (
                 <Image
                 style={styles.infoImage}
                 source={{
                   uri: "https://ik.imagekit.io/fvlwioahxk/expand_btn.png",
                 }}
               />
              )}
              {expandedCardId === item._id && (
                  <Image
                  style={styles.infoImage}
                  source={{
                    uri: "https://ik.imagekit.io/fvlwioahxk/Slide%20Up.png",
                  }}
               />
              )}
              {/* https://ik.imagekit.io/fvlwioahxk/Slide%20Up.png?updatedAt=1702249113720 */}
            </TouchableOpacity>
          </TouchableOpacity>
          {expandedCardId === item._id && (
              <View style={styles.additionalDetails}>
                <Text style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Address :</Text> {item.address}
                </Text>
                <Text style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Gender :</Text> {item.gender}
                </Text>
                <TouchableOpacity style={styles.editProfileIcon} onPress={() =>  navigation.navigate("PatientDetailsScreen", { id: item._id })}>  
                   <Image style={{width : "100%", height : "100%"}} source={{ uri: "https://ik.imagekit.io/fvlwioahxk/edit_profile_icon.png",}}/>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )
      }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height : "100%",
    // backgroundColor: "#fff",
  },
  editProfileIcon: {
    width : 25,
    height : 25,
    position : "absolute",
    right : 20,
    bottom : 20
  },
  listTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  cardNew : {
    backgroundColor: "#801232",
    padding: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#801232",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: 90,
    flexDirection: "row",
  },
  cardNewExpanded : {
    borderEndStartRadius : 0,
    borderEndEndRadius : 0,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff",
    marginBottom : 10
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
    marginBottom : 7
  },
  cardInfoUserImage : {
    width: 53,
    height: 55,
    borderRadius: 10,
    shadowColor: "#801232",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    objectFit: "contain",
    alignSelf: "center",
    backgroundColor : "#801232",
  },
  cardInfoUserContent : {
    width: "70%",
    height: "100%",
    padding : 10
  },
  cardExpandBtn : {
    width: 25,
    height: 25,
    borderRadius: 25,
    shadowColor: "#801232",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    objectFit: "contain",
    alignSelf: "center",
    backgroundColor : "#801232",
    position : "absolute",
    right : 20,
    top : 25,
  },
  infoImage : {
    width: "100%",
    height : "100%",
    borderRadius: 10,
    objectFit: "cover",
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  additionalDetails: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#801232", // Background color for additional details
    borderBottomLeftRadius : 12,
    borderBottomRightRadius : 12
  },
});

export default CriticalPatientList;
