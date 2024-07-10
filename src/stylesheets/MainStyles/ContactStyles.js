import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  container: {
    height: "105%",
    width: "100%",
  },
  contactView: {
    paddingTop: 25,
  },
  contactText: {
    color: "white",
    lineHeight: 20,
    fontSize: 16,
    paddingHorizontal: 25,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fcb51c",
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    padding: 15,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  buttonIconView: {
    flex: 1,
    marginRight: 0,
  },
  buttonTextView: {
    flex: 3,
    alignSelf: "flex-end",
  },
});
