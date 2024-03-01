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

  // const userId = "VtxzLHQ2jc3aro8Dg2Fy";  
  const userId = useSelector((state) => state.user.userId); //switch this when using in component

  const dispatch = useDispatch();

  const themeColorRedux = useSelector((state) => state.app.themeColors);
  console.log("ThemeColors fetched from redux:", themeColorRedux);

  const updateThemeColorsToRedux = (themeMode) => {
    console.log("themeMode to update function: ", themeMode)
    const themeColors = themeMode === "light" ? light : dark;
    console.log("themeColors to redux:", themeColors);
    dispatch(toggleThemeColors(themeColors));

  }

  useEffect(() => {
    const fetchThemeMode = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log("Fetched theme from Firestore:", userData.themeMode);
          setThemeMode(userData.themeMode);
          
          //updating themeColors to redux
          updateThemeColorsToRedux(userData.themeMode);
        }
        setInitialFetchDone(true);
      } catch (error) {
        console.error("Error fetching Firestore document:", error);
      }
    };

    fetchThemeMode();
  }, [userId]); // Include userId as a dependency to refetch when it changes

  const updateFirestore = async (newThemeMode) => {
    try {
      const userDocRef = doc(FIREBASE_DB, "users", userId);

      // Update the existing document
      await updateDoc(userDocRef, { themeMode: newThemeMode });
      console.log("Updated Firestore with theme:", newThemeMode);
    } catch (error) {
      console.error("Error updating/fetching Firestore document:", error);
    }
  };

  const toggleSwitch = () => {
    // Use the callback version of setThemeMode to ensure up-to-date state
    setThemeMode((prevThemeMode) => {
      const newThemeMode = prevThemeMode === "light" ? "dark" : "light";
      console.log("Toggled switch. New theme mode:", newThemeMode);
      
      updateThemeColorsToRedux(newThemeMode);

      // Only update Firestore if initial fetch is complete
      if (initialFetchDone) {
        updateFirestore(newThemeMode);
      }

      return newThemeMode;
    });
  };

  if (themeMode === null) {
    // Loading state or default value until the initial fetch is complete
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
    // paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    // marginBottom: 20,
  },
  themeText: {
    fontSize: 18,
    // marginBottom: 20,
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
