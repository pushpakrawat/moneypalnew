import React from "react";
import Theme from "../../../assets/Theme/theme";
import { useSelector } from "react-redux";

const AppOptions = () => {
  const isLoggedin = useSelector((state) => state.user.isLoggedin)

  return (
    <>
      {isLoggedin && <Theme />}
    </>
  );
};

export default AppOptions;
