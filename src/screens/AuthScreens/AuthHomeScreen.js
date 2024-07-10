import React from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from "react-native";
import Colors from "../../../constants/Colors";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import { setEnv, updateApiEnv } from "../../redux/actions/dgsomObjectActions";
import { endpoints } from "../../Api";

import DeviceInfo from "react-native-device-info";

const AuthHomeScreen = (props) => {
  const apiEndpoints = endpoints(props.dgsomAppObject.apiEnv);

  const _onFocus = () => {
    BackHandler.addEventListener("hardwareBackPress", _handleBackButtonPress);
  };
  const _onBlur = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      _handleBackButtonPress
    );
  };
  const _handleBackButtonPress = () => true;

  return (
    <ImageBackground
      style={{ height: "100%", width: "100%" }}
      source={require("../../../assets/images/dgsomapp_bg.png")}
    >
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => _onFocus()}
          onWillBlur={() => _onBlur()}
        />
        <TouchableOpacity
          testID="btnEnvSwitch"
          style={{
            alignItems: "center",
          }}
        >
          <Image
            style={styles.imageStyle}
            source={require("../../../assets/images/icon.png")}
          />

          {props.dgsomAppObject.apiEnv === "PROD" ? (
            <Text style={{ textAlign: "center", color: "black", padding: 5 }}>
              {Platform.OS === "android"
                ? DeviceInfo.getReadableVersion()
                    .toString()
                    .split(".")
                    .reverse()
                    .join(".")
                : DeviceInfo.getReadableVersion()}
            </Text>
          ) : (
            <Text style={{ textAlign: "center", color: "red", padding: 5 }}>
              {Platform.OS === "android"
                ? DeviceInfo.getReadableVersion()
                    .toString()
                    .split(".")
                    .reverse()
                    .join(".")
                : DeviceInfo.getReadableVersion()}
              - VISUAL
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.signupView}
            onPress={() => {
              BackHandler.removeEventListener("hardwareBackPress");
              props.navigation.navigate("AuthOkta", {
                loginUrl: apiEndpoints.oktaUrl,
              });
            }}
          >
            <Text style={styles.signupText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            testID="localSignIn"
            style={{
              paddingBottom: 20,
            }}
            onPress={() => {
              BackHandler.removeEventListener("hardwareBackPress");
              props.navigation.navigate("AuthOkta", {
                loginUrl: apiEndpoints.localLoginUrl,
              });
            }}
          ></TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEnv: (env) => dispatch(setEnv(env)),
    updateApiEnv: (env) => dispatch(updateApiEnv(env)),
  };
};

AuthHomeScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "40%",
  },
  imageStyle: {
    height: 200,
    width: 200,
    borderRadius: 5,
  },
  buttonView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  signupView: {
    backgroundColor: Colors.lighterBlue,
    borderWidth: 0.1,
    borderColor: Colors.darkerBlue,
    borderRadius: 5,
    padding: 15,
    margin: 20,
  },
  signupText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.darkerBlue,
  },
  altButtonText: {
    textAlign: "center",
    color: "steelblue",
    fontWeight: "bold",
  },
});
