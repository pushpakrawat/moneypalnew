import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  input: {
    width: "80%",
    marginBottom: 10,
    paddingVertical: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "white",
    borderRadius: 5,
  },
  button: {
    width: "80%",
    padding: 10,
    backgroundColor: "#f5d442",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  link: {
    marginTop: 10,
    color: "white",
  },
  errorContainer: {
    minHeight: 20,
  },
  errorText: {
    color: "gray",
    verticalAlign: "middle",
  },
});

export default styles;
