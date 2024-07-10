import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  avoidingView: {},
  container: {
    height: "105%",
    width: "100%",
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoView: {
    paddingVertical: 15,
    alignItems: "center",
  },
  infoText: {
    color: Colors.uclaGold,
    lineHeight: 20,
    fontSize: 15,
    paddingHorizontal: 25,
  },
  infoTextList: {
    color: Colors.uclaGold,
    lineHeight: 20,
    fontSize: 14,
    paddingHorizontal: 35,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  rowTextWhite: {
    color: "white",
  },
  imageStyle: {
    height: 50,
    width: 50,
  },

  InputRowView: {
    flexDirection: "column",
    flexWrap: "nowrap",
    paddingTop: 10,
    width: "80%",
    borderBottomWidth: 0.5,
    borderColor: "white",
  },
  inputStyleEditable: {
    backgroundColor: "white",
    color: "black",
    height: 35,
    borderColor: "white",
    // textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  inputStyle: {
    // backgroundColor: "white",
    color: "yellow",
    height: 35,
    borderColor: "white",
    // textAlign: 'center',
    padding: 5,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  inputLabel: {
    paddingBottom: 5,
    color: "white",
    fontSize: 16,
    textAlign: "left",
  },
  submitViewStyle: {
    backgroundColor: Colors.darkestGold,
    alignItems: "center",
    borderWidth: 0.1,
    borderColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginTop: 50,
    marginHorizontal: 5,
  },
  cancelViewStyle: {
    backgroundColor: "grey",
    alignItems: "center",
    borderWidth: 0.1,
    borderColor: "white",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginTop: 50,
    marginHorizontal: 5,
  },
  submitTextStyle: {
    fontSize: 16,
    color: "black",
  },
  buttonView: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  savingTextStyle: {
    fontSize: 16,
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginTop: 50,
    marginHorizontal: 5,
    alignItems: "center",
  },
});
