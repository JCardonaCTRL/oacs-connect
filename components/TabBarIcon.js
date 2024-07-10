import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  return (
    <AntIcon
      name={props.name}
      size={26}
      style={{ paddingBottom: -1 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
