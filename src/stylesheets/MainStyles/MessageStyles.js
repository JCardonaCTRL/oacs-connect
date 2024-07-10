import { StyleSheet, Dimensions } from "react-native";

module.exports = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  messageContainer: {
    flex: 1,
    marginHorizontal: 15,
    alignItems: "center",
  },
  card: { backgroundColor: "#ccc", padding: 20, flexWrap: "wrap" },
  messageHeaderText: {
    fontSize: 16,
    paddingVertical: 5,
    marginBottom: 5,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    color: "black",
    justifyContent: "center",
    textAlignVertical: "center",
  },

  messageBodyText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    color: "#333",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  messageBodyTextWhite: {
    fontSize: 16,
    paddingHorizontal: 3,

    fontFamily: "Avenir",
    textAlign: "center",
    color: "#2774AE",
    justifyContent: "center",
    textAlignVertical: "center",
    elevation: 0,
    shadowColor: "#2774AE",
    shadowOffset: { width: 0, height: 0 },
  },
  messageBodyProminentText: {
    fontSize: 16,
    paddingVertical: 2,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    color: "black",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  messageFooterText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    color: "#666",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  buttonSet: {
    backgroundColor: "#0F6A87",
    flexDirection: "row",
    padding: 10,
    margin: 10,
    justifyContent: "center",
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.6,
    alignItems: "center",
  },
  buttonSet3: {
    backgroundColor: "#118335",
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonSet4: {
    backgroundColor: "#118335",
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.3,
  },
  buttonSetGray: {
    backgroundColor: "#6D6D6D",
    minWidth: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonSetRed: {
    backgroundColor: "#EE242F",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    //width: Dimensions.get("window").width * 0.3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    color: "white",
    justifyContent: "center",
    textAlignVertical: "center",
    paddingVertical: 10,
  },
  circleAround: {
    backgroundColor: "#FFD100",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 50,
  },
  // uclaBlue: "#2774AE",
  //darkestBlue: "#003B5C",
  // darkerBlue: "#005587",
  //  lighterBlue: "#8BB8E8",

  //uclaGold: "#FFD100",
  borderAround: {
    borderColor: "#ddd",
    borderWidth: 1,
    elevation: 5,
    shadowColor: "#2774AE",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
  },
  null: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center",
    //width: Dimensions.get("window").width * 0.3,
  },

  icon: { paddingRight: 2 },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    color: "seagreen",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  elementCenter: {
    flexDirection: "row",
    justifyContent: "center",
  },
  elementLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  elementRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginVertical: 5,
  },
  separator: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#ccc",
    elevation: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  paddingVertical: { paddingVertical: 5 },
  displayInline: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paddingHorizontal: { paddingHorizontal: 6 },
});
