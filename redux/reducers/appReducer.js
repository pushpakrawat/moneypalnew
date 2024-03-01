const initialState = {
  themeColors: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME_COLORS":
      console.log(
        "Payload received to reducer for themeColors: ",
        action.payload
      );
      return {
        ...state,
        themeColors: action.payload,
      };
    default:
      return state;
  }
};