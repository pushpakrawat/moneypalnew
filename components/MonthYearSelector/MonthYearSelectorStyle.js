import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Define your styles as a functional component
const useDynamicStyles = () => {
  const mode = useSelector((state) => state.app.themeColors);

  return StyleSheet.create({
    container: {
      backgroundColor: mode.background,
      borderTopWidth: 1,
      borderTopColor: mode.borderColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    button: {
      borderColor: mode.focussedBorder,
      backgroundColor: mode.background,
      padding: 8,
      borderRadius: 15,
      borderWidth: 3,
      marginLeft: 8,
      marginRight: 10,
    },
    dateContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dateText: {
      color: mode.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    goToCurrentButton: {
      borderColor: mode.focussedBorder,
      backgroundColor: mode.background,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
    },
  });
};

export default useDynamicStyles;