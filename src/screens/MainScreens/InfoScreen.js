/* InfoScreen.js AKA About Us screen */

import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking,
  BackHandler,
} from "react-native";
import HomeButton from "../../CommonComponents/HomeButton";
import DrawerButton from "../../HomeComponents/DrawerButton";
import Colors from "../../../constants/Colors";
import { height, width } from "../../../constants/Layout";
import MainScreenHeader from "../../HomeComponents/MainScreenHeader";
import styles from "../../stylesheets/MainStyles/InfoStyles";
import { connect } from "react-redux";
import {
  updateCurrentScreenAppCode,
  updateHeaderColor,
  updateTileTitle,
} from "../../redux/actions/dgsomObjectActions";

function InfoScreen(props) {
  const emailUs = () => {
    let email = "mailto:dgsomconnectsupport@mednet.ucla.edu";
    Linking.openURL(email);
  };

  const ideasTile = () => {
    let item = props.tileListObject.tileList.find(
      (tile) => tile.refName === "tile--ideas"
    );

    return (
      item && (
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            props.updateCurrentScreenAppCode(item.appCustoms.appCode); // used for get tile info api call in tile module
            props.updateHeaderColor(item.appCustoms.tileBackgroundColor); // used for tile header color
            props.updateTileTitle(item.appCustoms.tileTitle);
            props.navigation.navigate(item.screen);
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
            />
          </View>
          <Text
            style={[
              styles.cardFooterText,
              { color: item.appCustoms.tileLabelColor },
            ]}
          >
            {item.appCustoms.tileTitle}
          </Text>
        </TouchableOpacity>
      )
    );
  };

  return (
    <ImageBackground
      style={{ height, width }}
      imageStyle={{ marginTop: -5 }}
      source={require("../../../assets/images/dark_background.png")}
    >
      <MainScreenHeader title="About Us" navigation={props.navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.infoView}>
          <Text style={styles.infoText}>
            OACS Connect is our new mobile phone/device platform to support
            communications and collaborations within the Open ACS family and
            with our clients and colleagues in research, education, and
            administration.
          </Text>
          <Text style={styles.infoText}>
            The OACS Connect app is a product of the UCLA Health DGIT 2.0
            innovation initiative that seeks to provide novel informatics
            solutions to meaningful problems within the UCLA health science
            community.
          </Text>
          <Text style={styles.infoText}>
            We invite you to take part in innovation efforts and partner with
            UCLA Health. We can work together to engineer new functionality into
            the OACS Connect platform. Submit your ideas using the Ideas Tile in
            OACS Connect.
          </Text>
        </View>
        {ideasTile()}
        {/* paddingBottom 200 added for user exp - scrollability  */}
        <View style={{ paddingBottom: 100 }} />
      </ScrollView>
    </ImageBackground>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen);
