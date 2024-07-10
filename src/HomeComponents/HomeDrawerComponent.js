import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import Colors from "../../constants/Colors";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";
import {
  updateApiEnv,
  purge,
  logout,
} from "../redux/actions/dgsomObjectActions";
import { purgeTileListObject } from "../redux/actions/tileListObjectActions";

const pkg = require("../../package.json");

const appVersion = pkg.version;

const visualPassword = "spongebob";

const HomeDrawerComponent = (props) => {
  const handleSubmit = (password) => {
    if (password === visualPassword) {
      props.updateApiEnv("VISUAL");
      props.navigation.navigate("Sync"); // forces re-render of homescreen to use appropriate endpoints
    }
  };

  // REMOVED PROD/VISUAL switch -- only can be used in authHomeScreen now for correct JWT tokens

  // const handleOnLongPress = () => {
  //     if (props.dgsomAppObject.apiEnv === 'VISUAL') {
  //         Alert.alert(
  //             'PROD',
  //             'Switched to production',
  //             [{
  //                 text: 'Ok', onPress: () => {
  //                     console.log('Prod switch')
  //                     props.updateApiEnv('PROD');
  //                     props.navigation.navigate('Sync'); // forces re-render of homescreen to use appropriate endpoints
  //                 }
  //             }]);
  //     } else {
  //         //alert w/ password
  //         Alert.prompt(
  //             "Enter password",
  //             "Enter password for visual.",
  //             [
  //                 {
  //                     text: "Cancel",
  //                     onPress: () => console.log("Cancel Pressed"),
  //                     style: "cancel"
  //                 },
  //                 {
  //                     text: "OK",
  //                     onPress: password => handleSubmit(password)
  //                 }
  //             ],
  //             "secure-text"
  //         );
  //     }
  // }

  return (
    <ScrollView style={{ backgroundColor: "#043450" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        forceInset={{ top: "always", horizontal: "never" }}
      >
        <View style={{ flex: 1 }}>
          {/* <TouchableOpacity
                        onLongPress={() => handleOnLongPress()}
                        delayLongPress={2000}
                    > */}
          <Image
            style={{
              height: 100,
              width: 100,
              alignSelf: "center",
              marginTop: 20,
              borderWidth: 1,
              borderColor: "white",
            }}
            source={require("../../assets/images/icon.png")}
          />
          {/* </TouchableOpacity> */}
          {props.dgsomAppObject.apiEnv === "PROD" ? (
            <Text style={{ textAlign: "center", color: "white", padding: 5 }}>
              v
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
              v
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
        </View>
        <View style={{ paddingLeft: 50 }}>
          <DrawerItems
            {...props}
            activeTintColor="#e5a433"
            inactiveTintColor="white"
            activeBackgroundColor={Colors.uclaBlue}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Logout", "Are you sure you want to log out?", [
                {
                  text: "Yes",
                  onPress: () => {
                    // on logout, purge persisted state and navigate to authHome
                    (async () => {
                      props.purge();
                      props.purgeTileListObject();
                      props.logout();
                    })().then(() => props.navigation.navigate("AuthHome"));
                  },
                },
                { text: "Cancel", onPress: () => undefined },
              ]);
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "left",
                paddingLeft: 67,
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    purge: () => dispatch(purge()),
    updateApiEnv: (payload) => dispatch(updateApiEnv(payload)),
    purgeTileListObject: () => dispatch(purgeTileListObject()),
  };
};

HomeDrawerComponent.propTypes = {
  navigation: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeDrawerComponent);
