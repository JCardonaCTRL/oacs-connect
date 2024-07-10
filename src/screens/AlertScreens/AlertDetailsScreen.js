import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
  Linking,
  Dimensions,
} from "react-native";
import { Header } from "react-native-elements";
import { height, width } from "../../../constants/Layout";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import styles from "../../stylesheets/AlertsStyles/AlertDetailsStyles";
import Colors from "../../../constants/Colors";

const AlertDetailsScreen = (props) => {
  const category = props.navigation.getParam("category", "default category");
  const title = props.navigation.getParam("title", "default title");
  const body = props.navigation.getParam("body", "default body");
  const image64 = props.navigation.getParam("image64", "default image64");
  const imageCaption = props.navigation.getParam("image_caption", null);
  const publishDate = props.navigation.getParam("publish_date", "default date");

  const backgroundImageUrl = props.navigation.getParam(
    "backgroundImageUrl",
    ""
  );

  const WebViewRef = useRef(null);
  const source = body
    ? {
        html: `<head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/> 
                <style>
                    body { font-family: helvetica, helvetica nueue, sans-serif }
                    h1 { color: #2975AA }
                    h2 { color: #2975AA }
                    h3 { color: #2975AA }
                    h4 { color: #2975AA }
                    h5 { color: #2975AA }
                    h6 { color: #2975AA }
                </style>
                </head>

                <body>${body.replace(/\\n/g, "").replace(/\\r/g, "")}</body>

                </html>`,
      }
    : {};

  // TODO micro adjustments
  const webViewHeight =
    body.length > 1000
      ? 650
      : body.length > 750
      ? 550
      : body.length > 500
      ? 400
      : body.legnth > 250
      ? 300
      : 200;

  useEffect(() => {
    //console.log(source);
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [handleBackPress]);

  const handleBackPress = () => {
    props.navigation.navigate("AlertHome");
  };

  const BackButton = () => (
    <TouchableOpacity
      onPress={() => handleBackPress()}
      style={{ paddingHorizontal: 20 }}
    >
      <Image
        source={require("../../../assets/images/button_back.png")}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
  );
  const CustomHeader = () => (
    <Header
      containerStyle={{ marginTop: -10 }}
      backgroundColor={Colors.darkerBlue}
      leftComponent={<BackButton />}
      centerComponent={{
        text: "Details",
        style: {
          color: "white",
          fontSize: 22,
          fontWeight: "bold",
          paddingTop: 15,
        },
      }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ height, width, flex: 1 }}
        imageStyle={{ marginTop: 0 }}
        source={
          backgroundImageUrl
            ? { uri: backgroundImageUrl }
            : require("../../../assets/images/dgsomapp_bg.png")
        }
      >
        <CustomHeader />
        <View style={styles.container}>
          <View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Image
                  source={
                    category === "Action required"
                      ? require("../../../assets/images/alerts/alerticon_action.png")
                      : category === "Alert"
                      ? require("../../../assets/images/alerts/alerticon_alert.png")
                      : category === "Invitation"
                      ? require("../../../assets/images/alerts/alerticon_invitation.png")
                      : category === "Notice"
                      ? require("../../../assets/images/alerts/alerticon_notification.png")
                      : category === "Reminder"
                      ? require("../../../assets/images/alerts/alerticon_reminder.png")
                      : category === "Resolved"
                      ? require("../../../assets/images/alerts/alerticon_resolved.png")
                      : category === "Update"
                      ? require("../../../assets/images/alerts/alerticon_update.png")
                      : require("../../../assets/images/dgsomapp_generic.png")
                  }
                  style={
                    category === "Alert"
                      ? {
                          height: 28,
                          width: 28,
                          tintColor: "red",
                          marginVertical: 5,
                          marginRight: 5,
                        }
                      : category === "Resolved"
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
              <View style={{ flex: 1 }}>
                <Image
                  resizeMode={"contain"}
                  source={require("../../../assets/images/icon.png")}
                  style={{
                    height: 60,
                    width: "100%",
                    margin: 5,
                  }}
                />
              </View>
            </View>

            {/* <Text style={styles.titleText}>
                                Category: {JSON.stringify(props.navigation.getParam('category', 'default category'))}
                            </Text> */}
            <View style={{ paddingTop: 50 }}>
              <Text style={styles.titleText}>
                {props.navigation.getParam(
                  "publish_date",
                  "default publish_date"
                )}
              </Text>
            </View>
            {/* <Text style={styles.titleText}>
                                Creator: {JSON.stringify(props.navigation.getParam('creator', 'default creator'))}
                            </Text> */}
            {/* <Text style={styles.titleText}>
                                Revision #: {JSON.stringify(props.navigation.getParam('revision_number', 'default revision'))}
                            </Text> */}

            <Text style={styles.titleText}>
              {props.navigation.getParam("title", "default title")}
            </Text>

            {/* ADDED WEBVIEW HERE FOR EMBEDDED HTML BODY */}
            <View style={{ height: Dimensions.get("window").height * 0.8 }}>
              <WebView
                ref={WebViewRef}
                originWhitelist={["*"]}
                source={source}
                style={{
                  backgroundColor: "rgba(0,0,0,0)",
                  // height: Dimensions.get("window").height * 0.8,
                }}
                onNavigationStateChange={(event) => {
                  if (event.url !== "about:blank") {
                    WebViewRef.current.stopLoading();
                    Linking.openURL(event.url);
                  }
                }}
              />
            </View>
            {/* END WEBVIEW */}
            {/* 
                        <Text style={styles.bodyText}>
                            {body}
                        </Text> */}
          </View>
          <View style={{ flex: 1, paddingBottom: 100 }}>
            <Image
              source={{
                uri:
                  "data:image/png;base64," +
                  props.navigation.getParam("image64"),
              }}
              style={{ resizeMode: "contain", height: 200, marginVertical: 20 }}
            />
            <Text>{imageCaption ? imageCaption : ""}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

export default connect(mapStateToProps)(AlertDetailsScreen);
