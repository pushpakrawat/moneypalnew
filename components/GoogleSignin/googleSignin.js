import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';
import GoogleSignInButton from './GoogleSignInButton';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { setUserId, setLoggedStatus } from "../../redux/actions/userActions";
import { setExpenseDocId } from "../../redux/actions/expenseActions";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_DB } from '../../firebase/firebaseconfig';
import { doc, setDoc } from 'firebase/firestore';

GoogleSignin.configure({
  webClientId: '446258025611-engbllr6j6egsktst9rl0tn9rj3rn94k.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Sign in with Google
    const { idToken, user } = await GoogleSignin.signIn();
    console.log('Google Sign-In Response:', { idToken, user });

    // Get the access token separately
    const { accessToken } = await GoogleSignin.getTokens();
    console.log('Access Token:', accessToken);

    // Ensure that both idToken and accessToken are available
    if (!idToken || !accessToken) {
      throw new Error("Missing idToken or accessToken");
    }

    await AsyncStorage.setItem('authCredentials', JSON.stringify({ idToken, accessToken }));

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);

    // Sign-in the user with the credential
    const signInResult = await auth().signInWithCredential(googleCredential);

    // Access the user's UID from the result
    const userId = signInResult.user.uid;
    console.log('Signed in with Google! User UID:', userId);

    // Set themeMode to 'light' in Firestore
    const userDocRef = doc(FIREBASE_DB, 'users', userId);
    await setDoc(userDocRef, { themeMode: 'light' }, { merge: true });

    return userId;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

export function GoogleSignIn() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userUId, setUserUId] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      const uid = await onGoogleButtonPress();
      console.log('Signed in with Google! User UID:', uid);
      dispatch(setLoggedStatus(true));
      dispatch(setUserId(uid));
      dispatch(setExpenseDocId(uid));
      setUserUId(uid);
      navigation.navigate('TabNavigator');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      // Handle error as needed
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoogleSignIn}>
      <GoogleSignInButton />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
  },
});


