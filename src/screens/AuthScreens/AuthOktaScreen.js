import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import Colors from "../../../constants/Colors";
import { WebView } from "react-native-webview";
import { NavigationActions } from "react-navigation";
import { endpoints } from "../../Api";
import { connect } from "react-redux";

import {
  login,
  addUserData,
  removeUserData,
  updateAppVersion,
  updateLastLogin,
} from "../../redux/actions/dgsomObjectActions";
import { addTileListObject } from "../../redux/actions/tileListObjectActions";
import Axios from "axios";
import DeviceInfo from "react-native-device-info";

import "react-native-get-random-values";

const AuthOktaScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false); // activity indicator
  const [authenticated, setAuthenticated] = useState(false);
  const [userAgent, setUserAgent] = useState();

  const apiEndpoints = endpoints(props.dgsomAppObject.apiEnv);

  const loginUrl = props.navigation.getParam("loginUrl", apiEndpoints.oktaUrl);
  useEffect(() => {
    (async () => {
      setUserAgent(await DeviceInfo.getUserAgent());
    })();

    if (authenticated) {
      props.navigation.navigate(
        NavigationActions.navigate({
          index: 1,
          routeName: "Home",
          action: NavigationActions.navigate({ routeName: "Home" }),
        })
      );
    }
  }, [authenticated]);

  const onMessage = (event) => {
    let { data } = event.nativeEvent;
    if (data.includes("HTML: ") && data.includes("uclaID")) {
      var d = "{" + data.split("{")[1].split("}")[0] + "}";
      var jdata = JSON.parse(d);
      if (jdata.name != undefined) {
        (async () => {
          props.addUserData({
            uid: jdata.uclaID,
            email: jdata.email,
            lastname: jdata.lastName,
            firstname: jdata.firstName,
            jwtToken: jdata.jwtToken,
            department: jdata.department,
            office: jdata.officeLocation,
            mobileNumber: jdata.mobilePhone,
          });
          Axios.defaults.headers.common["Authorization"] =
            "Bearer " + jdata.jwtToken; // FIX by moving here
        })().then(() => {
          props.login();
          setAuthenticated(true);
        });
      }
    }
  };

  const displaySpinner = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color={Colors.darkestBlue} />
      </View>
    );
  };
  const showActivityIndicator = () => {
    setIsLoading(true);
  };
  const hideActivityIndicator = () => {
    setIsLoading(false);
  };
  const jsCode =
    'ReactNativeWebView.postMessage("HTML: " + document.documentElement.innerHTML),true;';

  return (
    <Fragment>
      {authenticated ? (
        props.navigation.navigate(
          NavigationActions.navigate({
            index: 1,
            routeName: "Home",
            action: NavigationActions.navigate({ routeName: "Home" }),
          })
        )
      ) : (
        <View>
          <View
            style={{
              height: "95%",
              paddingTop: 100,
              backgroundColor: "white",
            }}
          >
            <WebView
              source={{
                uri: loginUrl,
              }}
              startInLoadingState={true}
              renderLoading={() => {
                return displaySpinner();
              }}
              onMessage={onMessage}
              injectedJavaScript={jsCode}
              userAgent={userAgent}
              incognito={true}
              cacheEnabled={false}
              onLoadStart={() => {
                showActivityIndicator();
              }}
              onLoadProgress={({ nativeEvent }) => {
                if (nativeEvent.progress > 0.5) {
                  hideActivityIndicator();
                }
              }}
              onLoadEnd={() => hideActivityIndicator()} // fixes undismissed activityIndicator when navigating to #anchors
            />
          </View>
          <View styl={styles.backView}>
            <Button
              title="Go back"
              onPress={() => props.navigation.navigate("AuthHome")}
              color={Platform.OS === "ios" ? "white" : Colors.uclaBlue}
            />
          </View>
        </View>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
    tileListObject: state.tileListObjectReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
    addUserData: (userData) => dispatch(addUserData(userData)),
    updateAppVersion: (version) => dispatch(updateAppVersion(version)),
    updateLastLogin: (dateTime) => dispatch(updateLastLogin(dateTime)),
    addTileListObject: (tileList) => dispatch(addTileListObject(tileList)),
  };
};

AuthOktaScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    borderRadius: 40,
    width: 200,
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },

  context: {
    marginTop: 20,
  },
  backView: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthOktaScreen);
