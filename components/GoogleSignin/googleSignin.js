import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import auth from '@react-native-firebase/auth';
import GoogleSignInButton from './GoogleSignInButton';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { setUserId } from "../../redux/actions/userActions";
import { setExpenseDocId } from "../../redux/actions/expenseActions";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '446258025611-engbllr6j6egsktst9rl0tn9rj3rn94k.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // Get the users ID token and user information
    const { idToken, user } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const signInResult = await auth().signInWithCredential(googleCredential);

    // Access the user's UID from the result
    const userId = signInResult.user.uid;

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
      <GoogleSignInButton/>
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


