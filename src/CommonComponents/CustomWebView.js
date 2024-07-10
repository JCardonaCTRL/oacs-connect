import React, { useState, useEffect, useRef } from "react";
import {
  Platform,
  View,
  Text,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { WebView } from "react-native-webview";
import Colors from "../../constants/Colors";
import DeviceInfo from "react-native-device-info";
import SafariView from "react-native-safari-view";
import { connect } from "react-redux";

const CustomWebView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(props.url);
  const [landingPage, setLandingPage] = useState(props.url);
  const [activePage, setActivePage] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);
  const [isError, setIsError] = useState(props.isError);
  const [errorMessage, setErrorMessage] = useState(props.errorMessage);
  const [userAgent, setUserAgent] = useState();

  const WebViewRef = useRef(null);

  useEffect(() => {
    (async () => {
      setUserAgent(await DeviceInfo.getUserAgent());
    })();

    // initialize BackHandler (for android. ios hardware navigation disabled )
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener();
  }, []);

  const handleBackPress = () => {
    console.log("back pressed");
    if (canGoBack) {
      console.log("canGoBack: " + canGoBack);
      WebViewRef && WebViewRef.current.goBack();
    } else {
      console.log("else cantGoBack: " + canGoBack);
      BackHandler.removeEventListener("hardwareBackPress", null); // for android only
      props.navigation.navigate("Home");
    }
  };

  const showActivityIndicator = () => {
    setIsLoading(true);
  };
  const hideActivityIndicator = () => {
    setIsLoading(false);
  };

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>{errorMessage}</Text>
      </View>
    );
  } else {
    // console.warn(url);
    return (
      <View style={{ flex: 1 }}>
        <WebView
          cacheEnabled
          allowsBackForwardNavigationGestures
          useWebKit={true}
          ref={WebViewRef}
          source={{ uri: url }}
          userAgent={userAgent}
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
            if (
              event.url.substr(event.url.length - 5) ===
              landingPage.substr(url.length - 5)
            ) {
              setCanGoBack(false);
              // check to see if @ landing page w/ anchor
            } else if (
              event.url.split("/")[3] &&
              event.url.split("/")[3].includes("#")
            ) {
              setCanGoBack(false);
            } else {
              setCanGoBack(true);
            }

            // if ics file
            if (
              event.url.substr(event.url.length - 3) === "vcs" ||
              event.url.substr(event.url.length - 3) === "ics"
            ) {
              // if opening ics link from digest home url - use goBack() for better performance
              if (
                activePage.substr(activePage.length - 5) ===
                landingPage.substr(landingPage.length - 5)
              ) {
                SafariView.show({
                  url: event.url,
                });

                WebViewRef.current.stopLoading();

                //Linking.openURL(event.url);
                setCanGoBack(false);

                // if opening ics link from nested url use reload() to avoid going back to home url
              } else {
                SafariView.show({
                  url: event.url,
                });
                WebViewRef && WebViewRef.current.reload();
              }
            } else {
              setActivePage(event.url);
            }
          }}
        >
          {// platform check to disable activityindicator for android -- app crashes if there are elements present within <WebView></WebView>
          isLoading && Platform.OS === "ios" ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator
                // style={{ alignSelf:'center', flex:1 }}
                size="large"
                color={Colors.darkestBlue}
              />
            </View>
          ) : (
            undefined
          )}
        </WebView>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

CustomWebView.navigationOptions = () => ({
  tabBarVisible: false,
});

export default connect(mapStateToProps)(CustomWebView);
