import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

module.exports = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  listContainer: {
    paddingBottom: 25,
  },
  itemView: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: "5%",
    paddingRight: "10%",
    flexDirection: "row",
  },
  itemViewGray: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: "5%",
    paddingRight: "10%",
    flexDirection: "row",
    backgroundColor: "lightgray",
  },
  youtubePlayerView: {
    flex: 3,
    paddingBottom: 5,
  },
  flatListView: {
    flex: 4,
  },
  titleView: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    flexShrink: 1,
    lineHeight: 30,
  },
  titleMeta: {
    fontSize: 16,
    color: Colors.darkerBlue,
    lineHeight: 30,
  },
  itemText: {
    fontSize: 16,
    paddingLeft: 5,
    lineHeight: 20,
    color: Colors.darkestBlue,
    fontWeight: "bold",
  },
});
