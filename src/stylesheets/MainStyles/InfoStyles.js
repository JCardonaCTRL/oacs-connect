import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  container: {
    height: "105%",
    width: "100%",
  },
  infoView: {
    paddingTop: 35,
  },
  subtitleText: {
    color: Colors.uclaGold,
    paddingHorizontal: 35,
    fontSize: 18,
  },
  infoText: {
    color: "white",
    lineHeight: 20,
    fontSize: 16,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  infoTextList: {
    color: "white",
    lineHeight: 25,
    fontSize: 16,
    paddingHorizontal: 45,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  rowTextBlue: {
    color: Colors.darkerBlue,
  },
  rowTextWhite: {
    color: "white",
  },
  emailCTRL: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    height: 80,
    width: "35%",
    flexDirection: "row",
    backgroundColor: "#fcb51c",
    borderRadius: 6,
    padding: 15,
    borderWidth: 0.5,
    borderColor: "white",
  },
  emailCTRLImage: {
    flex: 2,
    resizeMode: "contain",
    margin: 4,
  },
  emailCTRLText: {
    flex: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 5,
  },
  listContainer: {
    alignItems: "flex-start",
    paddingBottom: 50,
    padding: 12,
    margin: 5,
  },
  card: {
    marginVertical: 5,
    flexBasis: "33%",
    flexDirection: "column",
  },
  cardFooter: {
    flexDirection: "row",
  },
  cardFooterText: {
    color: "white",
    fontSize: 13,
    paddingVertical: 3,
    textAlign: "center",
  },
  iconView: {
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    borderColor: "white",
    borderWidth: 0.5,
  },
  appIcon: {
    height: 60,
    width: 60,
  },
});
