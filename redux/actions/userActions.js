import {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    REGISTER_USER_SUCCESS,
    SET_USER_ID,
    UPDATE_DEVICE_TOKEN,
    SET_LOGGED_STATUS
  } from "../actionTypes"; 
  
export const setName = (name) => {
  return {
    type: SET_NAME,
    payload: name,
  };
};

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
};

export const registerUserSuccess = (userId) => ({
  type: REGISTER_USER_SUCCESS,
  payload: userId,
});

export const setUserId = (userId) => {
  return {
    type: SET_USER_ID,
    payload: userId,
  };
};

export const updateDeviceToken = (token) => {
  return {
    type: UPDATE_DEVICE_TOKEN,
    payload: token,
  };
};

export const setLoggedStatus = (isLoggedIn) => {
  return {
    type: SET_LOGGED_STATUS,
    payload: isLoggedIn,
  };
};
