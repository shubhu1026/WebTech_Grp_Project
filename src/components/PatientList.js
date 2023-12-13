import React, { useState, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import API_BASE_URL from "../api/apiconfig";
import PatientCard from "./PatientCard";

const PatientList = ({ navigation, refreshList, onRefresh }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patients`, {
        method: "GET",
        headers: {
          // set headers
        },
      });
      const data = await response.json();
      setPatients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
      if (refreshList) {
        onRefresh();
      }
    }, [refreshList, onRefresh, fetchData])
  );

  const toggleExpand = (id) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          testID="loading-indicator"
          size="large"
          color="#007AFF"
        />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={patients}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
        renderItem={({ item }) => (
          <PatientCard
            item={item}
            expanded={expandedCardId === item._id}
            onExpand={() => toggleExpand(item._id)}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatientList;
