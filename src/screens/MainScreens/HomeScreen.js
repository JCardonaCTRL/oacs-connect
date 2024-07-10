/* HomeScreen.js*/
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { height, width } from "../../../constants/Layout";
import Colors from "../../../constants/Colors";
import { endpoints } from "../../Api";
import Carousel from "react-native-snap-carousel";
import AppTiles2 from "../../HomeComponents/AppTiles2";
import { connect } from "react-redux";
import {
  logout,
  purge,
  setCurrentDigestUrl,
  updateCurrentScreenAppCode,
  updateAppVersion,
  updateCurrentEventsUrl,
  updateDeepLinkPath,
  updateUserTagObject,
  updateHeaderColor,
  updateTileTitle,
} from "../../redux/actions/dgsomObjectActions";
import {
  addTileListObject,
  removeTileListObject,
  purgeTileListObject,
} from "../../redux/actions/tileListObjectActions";

import Ionicons from "react-native-vector-icons/Ionicons";
import apiMain from "../../API/APIMain";

const HomeScreen = (props) => {
  const defaultEventsList = [
    {
      title: "OpenACS and Tcl/Tk Conference",
      start_date: "July 11th & 12th, 2024",
      location: "VIENNA",
    },
    {
      title: "Meet & Greet",
      start_date: "July 10th, 2024",
      location: "VIENNA",
    },
    {
      title: "Notification of acceptance",
      start_date: "June 19th, 2024",
      location: null,
    },
    {
      title: "Deadline for submissions of abstracts",
      start_date: "June 17th, 2024",
      location: null,
    },
    {
      title: "OpenACS and Tcl/Tk Conference - Registration opens",
      start_date: "March 18th, 2024",
      location: null,
    },
  ];

  const [carouselLoaded, setCarouselLoaded] = useState(false);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState();
  const carouselRef = useRef();
  const [tilesLoaded, setTilesLoaded] = useState(false);
  const defaultTileList = [];

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener();
  }, []);

  const handleBackPress = () => {
    props.navigation.navigate("Home");
    return true;
  };

  useEffect(() => {
    if (props.dgsomAppObject.isLoggedIn === false) {
      props.navigation.navigate("Auth");
    } else {
      props.updateCurrentScreenAppCode("");
      props.updateHeaderColor(""); // tile header color on banner click
      props.updateTileTitle(""); // tile header title on banner click

      getTileList();
    } // END is !loggedIn else
  }, []); // END initial api call useEffect

  const getTileList = () => {
    const apiEndpoints = endpoints(props.dgsomAppObject.apiEnv);
    const apiTileListUrl = apiEndpoints.getTileListUrl;

    apiMain
      .getUserTilesList(apiTileListUrl)
      .then((response) => {
        if (response && response.message) {
          if (response.message === "logout")
            props.navigation.navigate("AuthHome");
          return;
        }

        console.warn(response.data.response_body.dgsomAppInfo.currentEventsUrl);
        if (response !== undefined && response.data.response_code === "Ok") {
          if (
            JSON.stringify(props.dgsomAppObject.userTagObject) !==
            JSON.stringify(response.data.response_body.tagsList)
          ) {
            props.updateUserTagObject(response.data.response_body.tagsList);
          }

          if (response.data.response_body.dgsomAppInfo.appBackgroundImageUrl) {
            setBackgroundImageUrl(
              response.data.response_body.dgsomAppInfo.appBackgroundImageUrl
            );
          }

          props.updateAppVersion(
            response.data.response_body.dgsomAppInfo.appVersion
          );

          props.updateCurrentEventsUrl(
            response.data.response_body.dgsomAppInfo.currentEventsUrl
          );

          setCarouselLoaded(true);

          const updatedTileList = response.data.response_body.tileList.map(
            (tile) => {
              if (tile.refName === "tile--connect-videos") {
                // add fgit values
                if (tile.appCustoms.tileIcon) {
                  return {
                    ...tile,
                    screen: "tile--connect-videos",
                    bgColor: Colors.fgitBlue,
                  };
                } else {
                  return {
                    ...tile,
                    screen: "tile--connect-videos",
                    bgColor: Colors.fgitBlue,
                    icon: require("../../../assets/images/dgsomapp_fgitvids.png"),
                  };
                }
              } else if (tile.refName === "tile--alerts") {
                if (tile.appCustoms.tileIcon) {
                  return {
                    ...tile,
                    screen: "tile--alerts",
                    bgColor: Colors.ordersBlue,
                  };
                } else {
                  return {
                    ...tile,
                    screen: "tile--alerts",
                    bgColor: Colors.ordersBlue,
                    icon: require("../../../assets/images/dgsomapp_alerts.png"),
                  };
                }
              } else if (tile.refName === "tile--generic") {
                if (tile.appCustoms.tileIcon) {
                  return {
                    ...tile,
                    screen: "tile--generic",
                    bgColor: Colors.igrokRed,
                  };
                } else {
                  return {
                    ...tile,
                    screen: "tile--generic",
                    bgColor: "black",
                    icon: require("../../../assets/images/dgsomapp_generic.png"),
                  };
                }
              } else if (tile.refName === "tile--ideas") {
                if (tile.appCustoms.tileIcon) {
                  return {
                    ...tile,
                    screen: "tile--ideas",
                    bgColor: Colors.igrokRed,
                  };
                } else {
                  return {
                    ...tile,
                    screen: "tile--ideas",
                    bgColor: "black",
                    icon: require("../../../assets/images/dgsomapp_generic.png"),
                  };
                }
              } else {
                return {
                  ...tile,
                  screen: null,
                  bgColor: Colors.defaultGrey,
                  icon: require("../../../assets/images/icon.png"),
                };
              }
            }
          );

          updatedTileList != undefined &&
            props.addTileListObject(updatedTileList);
          setTilesLoaded(true);

          return updatedTileList;
        } else {
          setTilesLoaded(true);
          props.addTileListObject(defaultTileList);
        }
      })
      .catch((err) => {
        setTilesLoaded(true);

        if (err.response) {
          props.addTileListObject(defaultTileList);
        } else if (err.request) {
          props.addTileListObject(defaultTileList);
        } else {
          props.addTileListObject(defaultTileList);
        }
      });
  };

  // renderContent for carousel card
  const renderCarouselCard = ({ item, k }) => (
    <TouchableOpacity
      style={{
        width: Dimensions.get("window").width,
        alignItems: "center",
      }}
      key={k}
    >
      <View
        style={{
          minHeight: Dimensions.get("window").height * 0.22,
          maxHeight: Dimensions.get("window").height * 0.22,
          maxWidth: Dimensions.get("window").width * 0.9,
          minWidth: Dimensions.get("window").width * 0.9,
          borderWidth: 0.4,
          borderColor: "white",
          paddingHorizontal: 30,
          paddingVertical: 20,
          borderRadius: 10,
          overflow: "scroll",
          backgroundColor: Colors.darkerBlue,
          justifyContent: "space-around",
        }}
      >
        <Text style={styles.AlertBodyHighlightText}>{item.title}</Text>
        <Text style={styles.AlertBodyText}>{item.start_date}</Text>
        <Text style={styles.AlertBodyText}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const nameToDisplay =
    props.dgsomAppObject.userData.firstname &&
    props.dgsomAppObject.userData.firstname[0].toUpperCase() +
      props.dgsomAppObject.userData.firstname.slice(1);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ height, width }}
        source={
          backgroundImageUrl
            ? { uri: backgroundImageUrl }
            : require("../../../assets/images/dgsomapp_bg.png")
        }
      >
        <View style={{ height: "100%", width }}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              paddingTop: 20,
              marginTop: 20,
            }}
          >
            <View style={{ flex: 2, paddingTop: 40, alignSelf: "flex-start" }}>
              <Text
                testID="welcomeText"
                style={{
                  color: "#043450",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Welcome {nameToDisplay}!
              </Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <Ionicons
                name="md-menu"
                size={42}
                color={"#043450"}
                onPress={() => props.navigation.openDrawer()}
              />
            </View>
          </View>

          <View style={styles.AlertBodyView}>
            {carouselLoaded ? (
              <Carousel
                ref={carouselRef}
                data={defaultEventsList}
                sliderWidth={Dimensions.get("window").width}
                scrollEnabled={true}
                itemWidth={Dimensions.get("window").width}
                autoplay
                autoplayInterval={7000}
                lockScrollWhileSnapping={true}
                renderItem={renderCarouselCard}
                loop
                removeClippedSubviews={false}
              />
            ) : (
              <View />
            )}
          </View>

          <AppTiles2
            navigation={props.navigation}
            getTileList={getTileList}
            loaded={tilesLoaded}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

HomeScreen.navigationOptions = {
  header: null,
};

// redux state
const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
    tileListObject: state.tileListObjectReducer,
  };
};

// redux mutators
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    purge: () => dispatch(purge()),
    addTileListObject: (tileList) => dispatch(addTileListObject(tileList)),
    removeTileListObject: (tileList) =>
      dispatch(removeTileListObject(tileList)),
    purgeTileListObject: () => dispatch(purgeTileListObject()),

    updateCurrentScreenAppCode: (appCode) =>
      dispatch(updateCurrentScreenAppCode(appCode)),
    setCurrentDigestUrl: (digestUrl) =>
      dispatch(setCurrentDigestUrl(digestUrl)),
    updateAppVersion: (version) => dispatch(updateAppVersion(version)),
    updateCurrentEventsUrl: (url) => dispatch(updateCurrentEventsUrl(url)),
    updateDeepLinkPath: (path) => dispatch(updateDeepLinkPath(path)),
    updateUserTagObject: (obj) => dispatch(updateUserTagObject(obj)),
    updateHeaderColor: (color) => dispatch(updateHeaderColor(color)),
    updateTileTitle: (title) => dispatch(updateTileTitle(title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginVertical: -5,
  },
  CurrentEventsHeaderView: {
    alignItems: "center",
    height: "10%",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: -15,
  },
  AlertBodyView: {
    backgroundColor: "rgba(255,255,255, 0)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingTop: 10,
    minHeight: Dimensions.get("window").height * 0.22,
    opacity: 1,
    marginBottom: 20,
  },
  AlertBodyHighlightText: {
    textAlign: "center",
    color: "#FFE574",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 25,
    opacity: 1,
  },
  AlertBodyText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    opacity: 1,
  },
  navBarText: {
    color: Colors.darkerBlue,
    fontSize: 14,
    fontWeight: "bold",
    opacity: 1,
    zIndex: 2,
  },
});
