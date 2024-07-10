import React from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { height, width } from "../../../constants/Layout";
import MainScreenHeader from "../../HomeComponents/MainScreenHeader";
import styles from "../../stylesheets/MainStyles/ContactStyles";

export default function ContactScreen(props) {
  const _callUs = () => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = "tel:${0000000000}";
    } else {
      phoneNumber = "telprompt:${0000000000}";
    }
    Linking.openURL(phoneNumber);
  };

  const _emailUs = () => {
    let email = "https://www.google.com/";
    Linking.openURL(email);
  };
  const _submitTicket = () => {
    let url = "https://www.google.com/";
    Linking.openURL(url);
  };

  const _ITConnect = () => {
    let url = "https://www.google.com/";
    Linking.openURL(url);
  };

  const helpFunctionalityList = [
    {
      label: "Call us \n24 / 7",
      icon: require("../../../assets/images/contactus/contactus_phone.png"),
      onPress: () => _callUs(),
    },
    {
      label: "Submit a Ticket",
      icon: require("../../../assets/images/contactus/contactus_itconnect.png"),
      onPress: () => _submitTicket(),
    },
    {
      label: "Email \nUs*",
      icon: require("../../../assets/images/contactus/contactus_email.png"),
      onPress: () => _emailUs(),
    },
    {
      label: "Connect Online",
      icon: require("../../../assets/images/contactus/contactus_servicenow.png"),
      onPress: () => _ITConnect(),
    },
  ];

  return (
    <ImageBackground
      style={{ height, width }}
      imageStyle={{ marginVertical: -5 }}
      source={require("../../../assets/images/dark_background.png")}
    >
      <MainScreenHeader title="Need Help?" navigation={props.navigation} />
      <View style={styles.container}>
        <View style={{ paddingTop: 10 }} />
        <View style={styles.contactView}>
          <Text selectable={true} style={styles.contactText}>
            Need support for your desktop or another device? Looking for
            audiovisual consulting or software development assistance? We are
            here to help!
          </Text>
        </View>

        <FlatList
          data={helpFunctionalityList}
          scrollEnabled={false}
          numColumns={2}
          contentContainerStyle={styles.buttonContainer}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.buttonView}
                onPress={item.onPress}
              >
                <View style={styles.buttonIconView}>
                  <Image
                    source={item.icon}
                    style={{
                      flex: 1,
                      resizeMode: "contain",
                      alignSelf: "stretch",
                      width: undefined,
                      height: undefined,
                    }}
                  />
                </View>
                <View style={styles.buttonTextView}>
                  <Text style={styles.buttonText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={{ flex: 1 }}>
          <Text selectable={true} style={styles.contactText}>
            * For Emails, please include details regarding your need and a
            current contact phone number.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
