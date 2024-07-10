import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  CurrentEventsHeaderView: {
    alignItems: "center",
    height: "10%",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: -15,
  },
  CurrentEventsHeaderText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  AlertBodyView: {
    backgroundColor: "rgba(255,255,255, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingTop: 25,
    height: "28%",
  },
  AlertBodyHighlightText: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  AlertBodyText: {
    textAlign: "center",
    color: "rgb(211,105,0)",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 20,
    lineHeight: 5,
  },
  navBarText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
