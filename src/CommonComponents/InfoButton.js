/* HomeButton.js */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
//import { Ionicons } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import InfoModal from "./InfoModal";

const InfoButton = (props) => {
  useEffect(() => {
    // console.log(props.appCustoms);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <View>
      {/* put modal here */}
      <InfoModal
        appCustoms={props.appCustoms}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity
        style={{ paddingRight: 20 }}
        onPress={() => openModal()}
      >
        <Ionicons
          name="information-circle-outline"
          size={42}
          color="white"
          // height={51}
          // width={32}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    </View>
  );
};
export default InfoButton;

/*
 * home_button.png icon 35x35 px
 */

const styles = StyleSheet.create({
  imageStyle: {
    height: 40,
    // width: 39,
    marginTop: 10,
  },
});
