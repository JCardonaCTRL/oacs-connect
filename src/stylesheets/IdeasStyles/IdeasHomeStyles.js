import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonViewStyle: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginVertical: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  buttonImageStyle: {
    height: 26,
    width: 26,
  },
});
