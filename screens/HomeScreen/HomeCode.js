import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataLoaded, getExpenses } from "../../redux/actions/expenseActions";
import { useNavigation } from "@react-navigation/native";
import { getExpensesFromFirestore } from "../../firebase/firebaseUtils";
import HomeStructure from "./HomeStructure";
import { FIREBASE_DB } from "../../firebase/firebaseconfig";
import {toggleThemeColors} from "../../redux/actions/appActions"
import { doc, getDoc } from "firebase/firestore"; 
import { light, dark } from "../../assets/Theme/themeColors";

const HomeCode = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isDataLoaded = useSelector((state) => state.expense.isDataLoaded);
  const userId = useSelector((state) => state.expense.expenseDocId);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Home Screen: Fetching data...");
      try {
        const expensesData = await getExpensesFromFirestore(userId);
        const expenses = expensesData.map((expense) => ({
          ...expense,
          date: new Date(expense.date.seconds * 1000),
          expenseEndDate: expense.expenseEndDate
            ? new Date(expense.expenseEndDate.seconds * 1000)
            : null,
        }));

        dispatch(getExpenses(expenses));
        dispatch(setDataLoaded(true)); // Indicate that data is loaded

        navigation.navigate("Home");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (!isDataLoaded) {
      fetchData();
    }
  }, [dispatch, isDataLoaded, navigation, userId]);

  const updateThemeColorsToRedux = (themeMode) => {
    console.log("themeMode to update function: ", themeMode);
    const themeColors = themeMode === "light" ? light : dark;
    console.log("themeColors to redux:", themeColors);
    dispatch(toggleThemeColors(themeColors));
  };

  useEffect(() => {
    const fetchThemeMode = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          console.log("Fetched theme from Firestore:", userData.themeMode);

          //updating themeColors to redux
          updateThemeColorsToRedux(userData.themeMode);
        }
      } catch (error) {
        console.error("Error fetching Firestore document:", error);
      }
    };

    fetchThemeMode();
  }, [userId]);

  return <HomeStructure />;
};

export default HomeCode;
