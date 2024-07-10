import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import TileHeader from "../../CommonComponents/TileHeader";
import { height, width } from "../../../constants/Layout";
import { endpoints } from "../../Api";
import Colors from "../../../constants/Colors";
import apiMain from "../../API/APIMain";
import api from "../../API/APIAlerts";
import styles from "../../stylesheets/AlertsStyles/AlertHomeStyles";

import { connect } from "react-redux";

const AlertHomeScreen = (props) => {
  // list to display
  const [alertList, setAlertList] = useState([]);
  const [alertFeedUrl, setAlertFeedUrl] = useState("");
  // loading activity indicator and pull to refresh
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // error status and message to display
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appCustoms, setAppCustoms] = useState();

  const [backgroundImageUrl, setBackgroundImageUrl] = useState();

  useEffect(() => {
    getTileInfo();
  }, []);

  const getAlertsList = (url = alertFeedUrl) => {
    api
      .getAlertsList(url)
      .then((response) => {
        //  console.log('RESPONSE: ' + JSON.stringify(response))
        setAlertList(response.data.response_body.alertsList);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setErrorMessage("Error retrieving alerts list from server");
        setIsLoading(false);
      });
  };

  const getTileInfo = () => {
    // create endpoint with the tileinfourl + appcode
    const apiEndpoints = endpoints(props.dgsomAppObject.apiEnv);
    const apiTileInfoUrl = apiEndpoints.getTileInfoUrl; // + props.dgsomAppObject.currentScreenAppCode;
    // const apiTileInfoUrl = apiEndpoints.getTileInfoUrl;

    apiMain
      .getTileInfo2(apiTileInfoUrl)
      .then((response) => {
        if (response.data.response_code === "Ok") {
          setAppCustoms(response.data.response_body.appCustoms); // for info button
          setAlertFeedUrl(
            response.data.response_body.appTileInternals.getPublishedNewsUrl
          ); // for subsequent refreshes
          getAlertsList(
            response.data.response_body.appTileInternals.getPublishedNewsUrl
          );
          setBackgroundImageUrl(
            response.data.response_body.appCustoms.tileBackgroundImageUrl
          );
        } else {
          // console.log("network issue");
          setIsError(true);
          setErrorMessage("Error contacting servers");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          /*
           * client received an error response (5xx, 4xx)
           * throw 404 not found page/error message
           */
          setIsError(true);
          setErrorMessage("Error received");
          setIsLoading(false);
        } else if (err.request) {
          //console.log(err);
          /*
           * client never received a response, or request never left
           * caused by spotty connection, backend hanging, or unauthorized cross domain requests
           */
          setIsError(true);
          setErrorMessage("Error establishing a connection");
          setIsLoading(false);
        } else {
          //console.log(err);
          // anything else (issue with the app)
          setIsError(true);
          setErrorMessage("APP ERROR");
          setIsLoading(false);
        }
      });
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          paddingHorizontal: 15,
          paddingVertical: 20,
        }}
        onPress={() => {
          props.navigation.navigate("AlertDetails", {
            category: item.category,
            title: item.title,
            body: item.body,
            image64: item.image64,
            image_caption: item.image_caption,
            publish_date: item.publish_date,
            archive_date: item.archive_date,
            creation_date: item.creation_date,
            creator: item.creator,
            revision_number: item.revision_number,
            backgroundImageUrl: backgroundImageUrl,
          });
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={
                  item.category === "Action required"
                    ? require("../../../assets/images/alerts/alerticon_action.png")
                    : item.category === "Alert"
                    ? require("../../../assets/images/alerts/alerticon_alert.png")
                    : item.category === "Invitation"
                    ? require("../../../assets/images/alerts/alerticon_invitation.png")
                    : item.category === "Notice"
                    ? require("../../../assets/images/alerts/alerticon_notification.png")
                    : item.category === "Reminder"
                    ? require("../../../assets/images/alerts/alerticon_reminder.png")
                    : item.category === "Resolved"
                    ? require("../../../assets/images/alerts/alerticon_resolved.png")
                    : item.category === "Update"
                    ? require("../../../assets/images/alerts/alerticon_update.png")
                    : require("../../../assets/images/dgsomapp_generic.png")
                }
                style={
                  item.category === "Alert"
                    ? {
                        height: 28,
                        width: 28,
                        tintColor: "red",
                        marginVertical: 5,
                        marginRight: 5,
                      }
                    : item.category === "Resolved"
                    ? {
                        height: 28,
                        width: 28,
                        tintColor: "#008743",
                        marginVertical: 5,
                        marginRight: 5,
                      }
                    : {
                        height: 28,
                        width: 28,
                        tintColor: "#ffb511",
                        marginVertical: 5,
                        marginRight: 5,
                      }
                }
              />
            </View>
            <Text style={{ fontWeight: "bold" }}>{/* {item.category} */}</Text>
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>
            {item.publish_date}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.title}</Text>
        </View>

        <View style={{ justifyContent: "flex-end" }}>
          <Image
            source={require("../../../assets/images/button_back.png")}
            style={{
              height: 51,
              width: 25,
              tintColor: "rgb(29, 75, 136)",
              transform: [{ rotateY: "180deg" }],
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) => index.toString();

  const onRefresh = () => {
    setRefreshing(true);
    getAlertsList();
    setTimeout(() => setRefreshing(false), 1500); // improves user experience
  };

  if (isLoading) {
    return (
      <ImageBackground
        style={{ height, width, flex: 1 }}
        imageStyle={{ marginTop: 0 }}
        source={
          backgroundImageUrl
            ? { uri: backgroundImageUrl }
            : require("../../../assets/images/dgsomapp_bg.png")
        }
      >
        <TileHeader
          navigation={props.navigation}
          title={
            props.dgsomAppObject.tileTitle !== ""
              ? props.dgsomAppObject.tileTitle
              : "Alerts"
          }
          appCustoms={appCustoms}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={Colors.darkerBlue}
          />
        </View>
      </ImageBackground>
    );
  } else if (isError) {
    return (
      <ImageBackground
        style={{ height, width, flex: 1 }}
        imageStyle={{ marginTop: 0 }}
        source={
          backgroundImageUrl
            ? { uri: backgroundImageUrl }
            : require("../../../assets/images/dgsomapp_bg.png")
        }
      >
        <TileHeader
          navigation={props.navigation}
          title={
            props.dgsomAppObject.tileTitle
              ? props.dgsomAppObject.tileTitle
              : "Alerts"
          }
          appCustoms={appCustoms}
        />
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={[{ title: errorMessage }]}
          renderItem={({ item }) => (
            <View style={styles.loadingContainer}>
              <Image
                source={require("../../../assets/images/alerts/alerticon_alert.png")}
                style={{ height: 100, width: 100, marginTop: 100 }}
              />
              <Text style={{ lineHeight: 50, fontWeight: "bold" }}>
                {item.title}
              </Text>
            </View>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </ImageBackground>
    );
  } else {
    if (alertList && alertList.length < 1) {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ImageBackground
            style={{ height, width, flex: 1 }}
            imageStyle={{ marginTop: 0 }}
            source={
              backgroundImageUrl
                ? { uri: backgroundImageUrl }
                : require("../../../assets/images/dgsomapp_bg.png")
            }
          >
            <TileHeader
              navigation={props.navigation}
              title={
                props.dgsomAppObject.tileTitle
                  ? props.dgsomAppObject.tileTitle
                  : "Alerts"
              }
              appCustoms={appCustoms}
            />
            <Text style={{ textAlign: "center", padding: 15 }}>
              {" "}
              No Alerts Available{" "}
            </Text>
          </ImageBackground>
        </View>
      );
    }
    // successfully shown list of alerts:
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ImageBackground
          style={{ height, width, flex: 1 }}
          imageStyle={{ marginTop: 0 }}
          source={
            backgroundImageUrl
              ? { uri: backgroundImageUrl }
              : require("../../../assets/images/dgsomapp_bg.png")
          }
        >
          <TileHeader
            navigation={props.navigation}
            title={
              props.dgsomAppObject.tileTitle
                ? props.dgsomAppObject.tileTitle
                : "Alerts"
            }
            appCustoms={appCustoms}
          />
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={alertList}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.darkestBlue}
              />
            }
          />
        </ImageBackground>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

export default connect(mapStateToProps)(AlertHomeScreen);

// const styles = StyleSheet.create({
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
