import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import {
  useNavigation,
  useIsFocused,
  DrawerActions,
} from "@react-navigation/native";

// Import your screens/components
import HomeScreen from "./HomeScreen";
import PatientListScreen from "./PatientListScreen";

const CustomHeader = ({ title }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [showBackButton, setShowBackButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleDrawer = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setShowBackButton(isFocused && navigation.canGoBack());
    });

    return unsubscribe;
  }, [navigation, isFocused]);

  const renderBackButton = () => {
    if (showBackButton) {
      return (
        <TouchableOpacity onPress={handleBackPress} style={styles.backIcon}>
          <Image
            style={{ width: 25, height: 25 }}
            source={{
              uri: "https://ik.imagekit.io/fvlwioahxk/Back.png",
            }}
          />
        </TouchableOpacity>
      );
    }
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <View style={styles.headerContainer}>
      {renderBackButton()}
      <Text style={styles.headerText}>{title}</Text>
      <TouchableOpacity onPress={toggleDrawer} style={styles.menuIcon}>
        <Image
          style={{ width: 35, height: 35 }}
          source={{
            uri: "https://ik.imagekit.io/fvlwioahxk/menu_icon.png?updatedAt=1702330850917",
          }}
        />
      </TouchableOpacity>

      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeMenu}
        >
          <View style={styles.menuModal}>
            <TouchableOpacity
              style={styles.menuContent}
              onPress={() => setShowMenu(false)}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate("Home");
                }}
              >
                <Text style={styles.menuItem}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate("PatientListScreen");
                }}
              >
                <Text style={styles.menuItem}>Patient's List</Text>
              </TouchableOpacity>
              {/* Add more menu items as needed */}
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: "#DE1E57",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    backgroundColor: "#DE1E57",
    position: "relative",
    top: 0,
    left: 0,
    padding: 10,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100, // Higher zIndex ensures it's on top
  },
  backIcon: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 15,
    top: 55,
  },
  menuIcon: {
    width: 35,
    height: 35,
    position: "absolute",
    right: 15,
    top: 50,
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 35,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuModal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "70%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
  },
  menuContent: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "600",
    color: "#DE1E57",
  },
});

export default CustomHeader;
