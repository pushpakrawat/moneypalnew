import React, { useEffect } from 'react';
import { Button, Alert } from 'react-native';
import { setUserId, setLoggedStatus } from "../../redux/actions/userActions";
import { setExpenseDocId } from "../../redux/actions/expenseActions";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebase/firebaseconfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const LogoutButton = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (!user) {
        // User has logged out, clear user authentication token
        await AsyncStorage.removeItem('authCredentials');
      }
    });
    
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH); // Sign out the user using Firebase Auth instance
      dispatch(setLoggedStatus(false));
      dispatch(setUserId(null));
      dispatch(setExpenseDocId(null));
      navigation.navigate("AuthStackNavigator");
      Alert.alert('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error logging out');
    }
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
