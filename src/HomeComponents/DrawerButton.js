/* DrawerButton.js */

import React from "react";
import { TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from "react-native-vector-icons/Ionicons";
const DrawerButton = (props) => {
  return (
    <TouchableOpacity
      style={{ paddingRight: 20, paddingTop: 8 }}
      onPress={() => props.navigation.openDrawer()}
    >
      <Ionicons name="md-menu" size={42} color="white" />
    </TouchableOpacity>
  );
};
export default DrawerButton;
