import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FIREBASE_DB } from "../../firebase/firebaseconfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { toggleThemeColors } from "../../redux/actions/appActions";
import { Switch } from "react-native-paper";
import { light, dark } from "./themeColors";
import { useSelector, useDispatch } from "react-redux";

const Theme = () => {
  const [themeMode, setThemeMode] = useState(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  const updateThemeColorsToRedux = (themeMode) => {
    const themeColors = themeMode === "light" ? light : dark;
    dispatch(toggleThemeColors(themeColors));
  };

  const updateFirestore = async (newThemeMode) => {
    try {
      const userDocRef = doc(FIREBASE_DB, "users", userId);
      await updateDoc(userDocRef, { themeMode: newThemeMode });
    } catch (error) {
      console.error("Error updating/fetching Firestore document:", error);
    }
  };

  const toggleSwitch = () => {
    if (initialFetchDone) {
      const newThemeMode = themeMode === "light" ? "dark" : "light";
      setThemeMode(newThemeMode);
      updateThemeColorsToRedux(newThemeMode);
      updateFirestore(newThemeMode);
    }
  };

  useEffect(() => {
    const fetchThemeMode = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setThemeMode(userData.themeMode);
          updateThemeColorsToRedux(userData.themeMode);
        }
        setInitialFetchDone(true);
      } catch (error) {
        console.error("Error fetching Firestore document:", error);
      }
    };

    fetchThemeMode();
  }, [userId]);

  if (themeMode === null) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.themeText}>Dark Mode</Text>
      </View>
      <Switch
        value={themeMode === "dark"}
        onValueChange={toggleSwitch}
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  textContainer: {
    flex: 1,
  },
  themeText: {
    fontSize: 18,
  },
});

export default Theme;





// actionType ***********************************
// export const TOGGLE_THEME_COLORS = 'TOGGLE_THEME_COLORS';

//action ****************************************
// export const toggleThemeColors = (themeColors) => {
//   console.log("Payload received to action for themeColors: ", themeColors);
//   return {
//     type: "TOGGLE_THEME_COLORS",
//     payload: themeColors,
//   };
// };

//Reducer ***************************************
// const initialState = {
//   themeColors: [],
// };

// export const appReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "TOGGLE_THEME_COLORS":
//       console.log(
//         "Payload received to reducer for themeColors: ",
//         action.payload
//       );
//       return {
//         ...state,
//         themeColors: action.payload,
//       };
//     default:
//       return state;
//   }
// };
