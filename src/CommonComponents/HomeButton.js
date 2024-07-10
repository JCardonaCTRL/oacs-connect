/* HomeButton.js */

import React from "react";
import { StyleSheet, TouchableOpacity, Platform, Image } from "react-native";
import { NavigationActions } from "react-navigation";

const HomeButton = (props) => {
  const navigateHomeScreen = () => {
    props.navigation.navigate(
      NavigationActions.navigate({
        index: 1,
        routeName: "Home",
        action: NavigationActions.navigate({ routeName: "Home" }),
      })
    );
  };

  return (
    <TouchableOpacity
      style={{ paddingLeft: 20 }}
      onPress={() => navigateHomeScreen()}
    >
      <Image
        source={require("../../assets/images/button_home.png")}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
  );
};
export default HomeButton;

/*
 * home_button.png icon 35x35 px
 */

const styles = StyleSheet.create({
  imageStyle: {
    height: 51,
    width: 32,
    marginTop: 4,
  },
});
