import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: 35,
    width: 27,
    marginTop: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 28,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputLabelStyle: {},
  inputStyle: {
    fontSize: 14,
    height: 38,
    paddingLeft: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 1,
    padding: 10,
  },
  bigInputStyle: {
    fontSize: 14,
    height: 120,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "black",
    marginVertical: 10,
    backgroundColor: "white",
    padding: 10,
  },
});
