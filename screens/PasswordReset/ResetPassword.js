import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../firebase/firebaseconfig";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetStatus, setResetStatus] = useState(null);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      setResetStatus("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email: ", error.message);
      setResetStatus("Error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <Text onPress={handleResetPassword} style={styles.button}>Reset Password</Text>
      {resetStatus && <Text style={styles.status}>{resetStatus}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "white"
  },
  input: {
    width: 320,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white"
  },
  status: {
    marginTop: 20,
    color: "red",
  },
  button: {
    borderWidth: 1,
    borderColor:"white",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: "gray",
    color: "white"
  },
});

export default ResetPassword;
