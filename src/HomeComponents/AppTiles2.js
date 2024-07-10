/* AppTiles.js */

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  SectionList,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import {
  updateCurrentScreenAppCode,
  updateHeaderColor,
  updateTileTitle,
} from "../redux/actions/dgsomObjectActions";
import Colors from "../../constants/Colors";

const AppTiles2 = (props) => {
  const [refreshing, setRefreshing] = useState();
  const flatlistRef = useRef();
  const onRefresh = () => {
    setRefreshing(true);
    props.getTileList();
    setTimeout(() => setRefreshing(false), 1500); // improves user experience
  };

  // no tiles
  if (props.tileListObject.tileList.length < 1) {
    return (
      <ScrollView
        style={{ flex: 1, alignItem: "center", paddingVertical: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
        <View>
          {props.loaded && (
            <Text style={{ textAlign: "center", color: "black" }}>
              Error loading tiles {"\n"}pull to refresh
            </Text>
          )}
          {!props.loaded && (
            <Text style={{ textAlign: "center", color: "black" }}>
              Loading...
            </Text>
          )}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          ref={flatlistRef}
          contentContainerStyle={styles.listContainer}
          onScroll={() => {}}
          data={props.tileListObject.tileList}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEnabled={true}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  if (item.screen === null) {
                    console.log("nothing to navigate to");
                  } else {
                    props.updateCurrentScreenAppCode(item.appCustoms.appCode); // used for get tile info api call in tile module
                    props.updateHeaderColor(
                      item.appCustoms.tileBackgroundColor
                    );
                    props.updateTileTitle(item.appCustoms.tileTitle);

                    props.navigation.navigate(item.screen);
                  }
                }}
              >
                <View
                  style={[
                    styles.iconView,
                    { backgroundColor: item.appCustoms.tileBackgroundColor },
                  ]}
                >
                  <Image
                    style={styles.appIcon}
                    source={
                      item.appCustoms.tileIcon
                        ? { uri: item.appCustoms.tileIcon }
                        : item.icon
                    }
                    // defaultSource={require("../../assets/images/dgsomapp_generic.png")}
                  />
                </View>
                <Text style={[styles.cardFooterText]}>
                  {item.appCustoms.tileTitle}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
    tileListObject: state.tileListObjectReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentScreenAppCode: (appCode) =>
      dispatch(updateCurrentScreenAppCode(appCode)),
    updateHeaderColor: (color) => dispatch(updateHeaderColor(color)),
    updateTileTitle: (title) => dispatch(updateTileTitle(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTiles2);

const styles = StyleSheet.create({
  listContainer: {
    alignItems: "flex-start",
    paddingBottom: 50,
    padding: 12,
    margin: 5,
  },

  card: {
    marginVertical: 20,
    flexBasis: "50%",
    flexDirection: "column",
    flex: 1,
    margin: 1,
  },
  cardFooter: {
    flexDirection: "row",
  },
  cardFooterText: {
    color: Colors.darkerBlue,
    fontSize: 15,
    paddingVertical: 8,
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "normal",
    fontFamily: "Avenir",
  },
  iconView: {
    padding: 0,
    alignSelf: "center",
  },
  appIcon: {
    height: 100,
    width: 100,
  },
});
