import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
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
  buttonViewStyle: {
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginVertical: 10,
    paddingVertical: 4,
    paddingHorizontal: 18,
  },
  buttonImageStyle: {
    height: 26,
    width: 26,
  },
  bigInputStyle: {
    fontSize: 14,
    height: 120,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 0.5,
    padding: 10,
  },
  submitView: {
    backgroundColor: "rgb(48,132,192)",
    alignSelf: "center",
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
  },
  submitButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  cancelView: {
    backgroundColor: "grey",
    alignSelf: "center",
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 7,
  },
  commentButtonsView: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonSet: {
    backgroundColor: "gray",
    minWidth: Dimensions.get("window").width * 0.3,
    padding: 10,
    justifyContent: "center",
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  paddingVertical: {
    paddingVertical: 5,
  },
});
