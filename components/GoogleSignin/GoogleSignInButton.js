// GoogleSignInButton.js

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const GoogleSignInButton = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./google-logo.png')}  
      />
      <Text style={styles.text}>Sign in with Google</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Google's blue color
    padding: 10,
    borderRadius: 50,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default GoogleSignInButton;
