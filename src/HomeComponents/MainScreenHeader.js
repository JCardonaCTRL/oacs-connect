import React from "react";
import { View, Text } from "react-native";
import { Header } from "react-native-elements";
import HomeButton from "../CommonComponents/HomeButton";
import Colors from "../../constants/Colors";
import DrawerButton from "./DrawerButton";

const MainScreenHeader = (props) => {
  return (
    <Header
      backgroundColor={Colors.darkerBlue}
      leftComponent={<HomeButton navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: {
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          paddingTop: 15,
        },
      }}
      rightComponent={<DrawerButton navigation={props.navigation} />}
      containerStyle={{ marginTop: -10 }}
    />
  );
};

export default MainScreenHeader;
