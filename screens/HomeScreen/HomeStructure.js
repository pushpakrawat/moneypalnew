import React, { useEffect, useState } from "react";
import { View, ScrollView, FlatList } from "react-native";
import MonthYearSelectorStructure from "../../components/MonthYearSelector/MonthYearSelectorStructure";
import ExpenseListStructure from "../../components/ExpenseList/ExpenseListStructure";
import ExpenseSummary from "../../components/smallComponents/ExpenseSummary";
import styles from "./HomeStyle";
import { BackHandler } from "react-native";
import HSgraph from "../../components/smallComponents/HSgraph";
import useDynamicStyles from "./HomeStyle"; // Import your dynamic styles
import NotificationsComponent from "../../components/notifications/notifications";

const HomeStructure = () => {
  // const [showHSgraph, setShowHSgraph] = useState(false);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const dynamicStyles = useDynamicStyles(); // Use dynamic styles

  const data = [
    { key: "HSgraph", component: <HSgraph /> },
    { key: "MonthYearSelector", component: <MonthYearSelectorStructure /> },
    { key: "ExpenseSummary", component: <ExpenseSummary /> },
    { key: "ExpenseList", component: <ExpenseListStructure /> },
  ];

  return (
    <>
      <NotificationsComponent />
      <FlatList
        style={dynamicStyles.container} // Apply the dynamic styles to set the background color
        data={data}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
      />
    </>
  );
};

export default HomeStructure;
