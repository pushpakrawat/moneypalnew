import React, { useState, useEffect, useRef } from "react";
import { Alert } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { FIREBASE_DB } from "../../firebase/firebaseconfig";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { updateDeviceToken } from "../../redux/actions/userActions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const updateDeviceTokenInFirestore = async (userId, token) => {
  try {
    const userDocRef = doc(collection(FIREBASE_DB, 'users'), userId);
    
    // Update the device token in Firestore
    await updateDoc(userDocRef, {
      deviceTokens: {
        token : [token], 
        allowance : true,
      },
    });

    console.log('Device token updated in Firestore.');
  } catch (error) {
    console.error('Error updating device token in Firestore:', error);
  }
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Permission Denied", "Failed to get push token for push notification!");
      return;
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    Alert.alert("Device Not Supported", "Must use a physical device for Push Notifications");
  }

  return token.data;
}

const NotificationsComponent = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  console.log("userId in NotificationsComponent: ", userId);
  const responseListener = useRef();
  const notificationListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState('');
  console.log("userId received: ", userId)
  useEffect(() => {
    const fetchTokenAndRegister = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setExpoPushToken(token);
        await updateDeviceTokenInFirestore(userId, token);
        dispatch(updateDeviceToken(token));
      } catch (error) {
        console.error('Error fetching or updating token:', error);
      }
    };

    fetchTokenAndRegister();

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [userId]);

  return null; 
};

export default NotificationsComponent;
