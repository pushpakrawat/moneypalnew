import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useSelector } from 'react-redux';
import { collection, getDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../firebase/firebaseconfig';
import {updateDeviceTokenInFirestore} from "../../../components/notifications/updateNotification"

const DeviceOptions = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); 
  const mode = useSelector((state) => state.app.themeColors);
  const userId = useSelector((state) => state.user.userId);
  const deviceToken = useSelector((state) => state.user.deviceToken);
  const [allowance, setAllowance] = useState(); // State to hold the allowance value

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mode.background,
      alignItems: "center",
    },
    switchContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    switchLabel: {
      fontSize: 16,
      marginRight: 100,
      color: mode.text,
    },
  });

  // Function to handle switch toggle
  const toggleSwitch = async (value) => {
    setNotificationsEnabled(value); 
    try {
      // Update device token in Firestore
      // Pass the updated value based on the current value of allowance
      await updateDeviceTokenInFirestore(userId, deviceToken, !allowance); 
      console.log('Device token updated successfully.');
    } catch (error) {
      console.error('Error updating device token:', error);
      // Handle error here
    }
  };

  useEffect(() => {
    // Fetch allowance value from Firestore when component mounts
    const fetchAllowance = async () => {
      try {
        const userDocRef = doc(collection(FIREBASE_DB, 'users'), userId);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();
        
        if (userData && userData.deviceTokens && userData.deviceTokens.allowance !== undefined) {
          setAllowance(userData.deviceTokens.allowance);
          console.log("Allowance: ", allowance)
        }
      } catch (error) {
        console.error('Error fetching allowance:', error);
        // Handle error here
      }
    };

    fetchAllowance(); 
  }); 

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Allow Notifications</Text>
        <Switch
          value={allowance} // Use allowance as the value for the switch
          onValueChange={toggleSwitch} // Call toggleSwitch function on switch change
        />
      </View>
    </View>
  );
};

export default DeviceOptions;
