import React from "react";
import { Text, View, Image } from "react-native";

import styles from "../stylesheets/MainStyles/MessageStyles";

export const ErrorMessage = (param) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/alerts/alerticon_alert.png")}
        style={{ height: 100, width: 100, marginTop: 100 }}
      />
      <Text style={{ lineHeight: 50, fontWeight: "bold" }}>
        {param.message}
      </Text>
    </View>
  );
};
