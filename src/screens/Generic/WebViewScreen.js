import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { endpoints } from "../../Api";
import Colors from "../../../constants/Colors";
import TileHeader from "../../CommonComponents/TileHeader";
import apiMain from "../../API/APIMain";
import DeviceInfo from "react-native-device-info";
import SafariView from "react-native-safari-view";
import { connect } from "react-redux";

const WebViewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false); // activity indicator
  const [url, setUrl] = useState("");
  const [tileInfo, setTileInfo] = useState();
  const [appCustoms, setAppCustoms] = useState();
  const [userAgent, setUserAgent] = useState();

  const WebViewRef = useRef(null);

  const showActivityIndicator = () => {
    setIsLoading(true);
  };
  const hideActivityIndicator = () => {
    setIsLoading(false);
  };
  const handleBackPress = () => {
    props.nvagation.navagate("Home");
  };

  useEffect(() => {
    (async () => {
      setUserAgent(await DeviceInfo.getUserAgent());
    })();
  }, []);

  useEffect(() => {
    // initialize BackHandler (for android. ios hardware navigation disabled )
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    getTileInfo();

    return () => BackHandler.removeEventListener();
  }, []);

  const getTileInfo = () => {
    // create endpoint with the tileinfourl + appcode
    const apiEndpoints = endpoints(props.dgsomAppObject.apiEnv);
    const apiTileInfoUrl = apiEndpoints.getTileInfoUrl;

    apiMain
      .getTileInfo2(apiTileInfoUrl)
      .then((response) => {
        if (response.data.response_code === "Ok") {
          setAppCustoms(response.data.response_body.appCustoms);
          setTileInfo(response.data.response_body);
          // console.log(response.data.response_body.appTileInternals.digestUrl);
          setUrl(response.data.response_body.appTileInternals.webViewUrl);
        }
      })
      .catch((err) => {
        // TODO: ADD ERROR HANDLING
        if (err.response) {
          /*
           * client received an error response (5xx, 4xx)
           * throw 404 not found page/error message
           */
          Alert.alert("ERROR", "" + err, [
            {
              text: "Go Back",
              onPress: () => props.navigation.navigate("Home"),
            },
          ]);
        } else if (err.request) {
          /*
           * client never received a response, or request never left
           * caused by spotty connection, backend hanging, or unauthorized cross domain requests
           */
          Alert.alert("ERROR", "" + err, [
            {
              text: "Go Back",
              onPress: () => props.navigation.navigate("Home"),
            },
          ]);
        } else {
          // anything else (issue with the app)
          Alert.alert("ERROR", "" + err, [
            {
              text: "Go Back",
              onPress: () => props.navigation.navigate("Home"),
            },
          ]);
        }
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <TileHeader
        navigation={props.navigation}
        title={
          props.dgsomAppObject.tileTitle !== ""
            ? props.dgsomAppObject.tileTitle
            : "Ideas"
        }
        appCustoms={appCustoms}
      />
      <WebView
        originWhitelist={["*"]}
        allowsInlineMediaPlayback
        cacheEnabled
        allowsBackForwardNavigationGestures
        useWebKit={true}
        ref={WebViewRef}
        source={{ uri: url }}
        // source={{ uri: 'https://purple-technology.github.io/react-camera-pro/' }} // TODO: testing for webview camera usage
        userAgent={userAgent}
        mediaPlaybackRequiresUserAction={false}
        // backgroundColor='white'
        // startInLoadingState={true}
        onLoadStart={() => {
          showActivityIndicator();
        }}
        onLoadProgress={({ nativeEvent }) => {
          // ends activityIndicator as content begins to load -> better user experience
          if (nativeEvent.progress > 0.5) {
            hideActivityIndicator();
          }
        }}
        onLoadEnd={() => hideActivityIndicator()} // fixes undismissed activityIndicator when navigating to #anchors
        onNavigationStateChange={(event) => {
          // check to see if @ landing page to set canGoBack for navigate(home) vs goback()

          // if ics file
          if (
            event.url.substr(event.url.length - 3) === "vcs" ||
            event.url.substr(event.url.length - 3) === "ics"
          ) {
            // if opening ics link from digest home url - use goBack() for better performance

            SafariView.show({
              url: event.url,
            });

            WebViewRef.current.stopLoading();

            //Linking.openURL(event.url);
          }
        }}
      >
        {
          // platform check to disable activityindicator for android -- app crashes if there are elements present within <WebView> </WebView>
          isLoading && Platform.OS === "ios" ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator
                // style={{ alignSelf:'center', flex:1 }}
                size="large"
                color={Colors.darkestBlue}
              />
            </View>
          ) : undefined
        }
      </WebView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

export default connect(mapStateToProps)(WebViewScreen);
