import React, { useRef } from "react";
import { Linking } from "react-native";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import Colors from "../../constants/Colors";
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from "react-native-vector-icons/Ionicons";
export default InfoModal = (props) => {
  const WebViewRef = useRef(null);
  const body = props.appCustoms.appDisplayInformation;
  const source = body
    ? {
        html: `<head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/> 
                <style>
                    body {font-family: 'helvetica'}
                </style>
                </head>
                <body>
                <FONT COLOR="white">
                ${body.replace(/\\n/g, "").replace(/\\r/g, "")}
                </FONT COLOR>
                </body>
                </html>`,
      }
    : {};

  return (
    <Modal visible={props.modalVisible} animationType="fade">
      <View
        style={[
          styles.container,
          { backgroundColor: props.appCustoms.tileBackgroundColor },
        ]}
      >
        <View style={styles.imageViewStyle}>
          <TouchableOpacity
            style={{ alignSelf: "flex-end", justifyContent: "center" }}
            onPress={() => props.setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={40} />
          </TouchableOpacity>
          <Text style={styles.titleTextStyle}>
            {props.appCustoms.tileTitle}
          </Text>
          <Image
            source={{ uri: props.appCustoms.tileIcon }}
            style={styles.iconImageStyle}
            defaultSource={require("../../assets/images/dgsomapp_generic.png")}
          />
        </View>

        <View style={styles.displayInformationViewStyle}>
          {/* <Text style={styles.appDisplayInformationTextStyle}>
                        {props.appCustoms.appDisplayInformation}
                    </Text> */}
          <WebView
            ref={WebViewRef}
            originWhitelist={["*"]}
            source={source}
            style={{
              backgroundColor: "rgba(0,0,0,0)",
            }}
            onNavigationStateChange={(event) => {
              if (event.url !== "about:blank") {
                WebViewRef.current.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          />
          {props.appCustoms.helpUrl ? (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(props.appCustoms.helpUrl);
                //console.log(props.appCustoms.tileIcon);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                Learn more
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        <TouchableOpacity style={styles.closeButtonViewStyle} 
          onPress={() => {
            props.setModalVisible(false);
          }}>
          <Text style={styles.backButtonViewStyle}>{"Close"}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  //Views
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 35 : 0,
    marginBottom: Platform.OS === "ios" ? 15 : 0,
    // backgroundColor: Colors.lighterBlue,
    borderWidth: 20,
    borderColor: "white",
    borderRadius: 40,
  },
  imageViewStyle: {
    // encloses: close button, title, Image
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 0: 20,
  },
  displayInformationViewStyle: {
    flex: 6,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  backButtonViewStyle: {
    flex: 1,
    marginVertical: 10,
    color: "white",
    fontSize: 16,
  },
  closeButtonViewStyle: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  //Text
  titleTextStyle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  appDisplayInformationTextStyle: {
    fontSize: 14,
    textAlign: "center",
    paddingBottom: 20,
    color: "white",
  },
  //Images / icons
  iconImageStyle: {
    height: 100,
    width: 100,
  },
});
