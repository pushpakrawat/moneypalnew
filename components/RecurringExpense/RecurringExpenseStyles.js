import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  selectedOption: {
    backgroundColor: 'blue',
  },
  optionText: {
    fontSize: 16,
    color: '#007bff',
  },
  selectedOptionText: {
    color: 'white',
  },
});

export default styles;
