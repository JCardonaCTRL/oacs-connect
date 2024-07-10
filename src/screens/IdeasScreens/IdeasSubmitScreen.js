import React, { useState, useEffect } from "react";
import {
  Platform,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { Header } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { height, width } from "../../../constants/Layout";
import { connect } from "react-redux";
import CheckBox from "@react-native-community/checkbox";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "../../stylesheets/IdeasStyles/IdeasSubmitStyles";
import api from "../../API/APIIdeas";

const IdeasSubmitScreen = (props) => {
  const categories = props.navigation.getParam("categories", []);
  const rootUrl = props.navigation.getParam("rootUrl", "");
  const backgroundImageUrl = props.navigation.getParam(
    "backgroundImageUrl",
    ""
  );
  const [saving, setSaving] = useState(false);
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [toggleNotifyMe, setToggleNotifyMe] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [handleBackPress]);

  const handleBackPress = () => {
    props.navigation.navigate("IdeasHome");
  };

  const BackButton = () => (
    <TouchableOpacity
      onPress={() => handleBackPress()}
      style={{ paddingHorizontal: 20 }}
    >
      <Image
        source={require("../../../assets/images/button_back.png")}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
  );

  const CustomHeader = () => (
    <Header
      containerStyle={{ marginTop: -10, height: "13%" }}
      backgroundColor={props.dgsomAppObject.headerColor}
      leftComponent={<BackButton />}
      centerComponent={{
        text: "Submit an Idea",
        style: {
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          paddingTop: 15,
        },
      }}
    />
  );

  const handleCancel = () => {
    setToggleNotifyMe(false);
    setCategoryId("");
    setSubject("");
    setDetails("");
    props.navigation.navigate("IdeasHome");
  };

  const handleSubmit = async () => {
    await setSaving(true);
    if (subject && categoryId) {
      let jsonData = {
        creationUser: props.dgsomAppObject.userData.uid,
        categoryId: categoryId,
        subject: subject,
        details: details,
        notifyMeP: toggleNotifyMe,
      };
      let postIdeaUrl = rootUrl + "idea";
      api
        .postIdea(postIdeaUrl, jsonData)
        .then((response) => {
          if (response.data.response_code.toLowerCase() === "ok") {
            Alert.alert(
              "Successful Submission",
              "Your submission will be visible on the feed shortly.",
              [
                {
                  text: "Ok",
                  onPress: () => {
                    setSaving(false);
                    handleCancel();
                    props.navigation.navigate("IdeasHome");
                  },
                },
              ]
            );
          } else {
            Alert.alert(
              "ERROR",
              "There was an error processing your idea. Please try again.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setSaving(false);
                    console.log("error: ok pressed");
                  },
                },
              ]
            );
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            Alert.alert(
              "ERROR",
              "There was an error processing your request. " + err,
              [
                {
                  text: "OK",
                  onPress: () => {
                    setSaving(false);
                    console.log("error: ok pressed");
                  },
                },
              ]
            );
            /*
             * client received an error response (5xx, 4xx)
             * throw 404 not found page/error message
             */
          } else if (err.request) {
            Alert.alert(
              "ERROR",
              "There was an error processing your request. " + err,
              [
                {
                  text: "OK",
                  onPress: () => {
                    setSaving(false);
                    console.log("error: ok pressed");
                  },
                },
              ]
            );
            /*
             * client never received a response, or request never left
             * caused by spotty connection, backend hanging, or unauthorized cross domain requests
             */
          } else {
            Alert.alert(
              "ERROR",
              "There was an error processing your request. " + err,
              [
                {
                  text: "OK",
                  onPress: () => {
                    setSaving(false);
                    console.log("error: ok pressed");
                  },
                },
              ]
            );
            // anything else (issue with the app)
          }
        });
    } else {
      setSaving(false);
      Alert.alert(
        "Error",
        "Please complete the missing entries and try again."
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ height, width, flex: 1 }}
        imageStyle={{ marginTop: 0 }}
        source={
          backgroundImageUrl
            ? { uri: backgroundImageUrl }
            : require("../../../assets/images/dgsomapp_bg.png")
        }
      >
        <CustomHeader />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          enableAutoAutomaticScroll={Platform.OS === "ios"}
          extraScrollHeight={40}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ paddingTop: 20, marginBottom: 10 }}>
            <Text
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            >
              We welcome your ideas!
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              position: "relative",
              zIndex: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Category</Text>
            <DropDownPicker
              items={categories}
              value={categoryId}
              placeholder="Select a category..."
              placeholderStyle={{
                fontWeight: "bold",
                color: "grey",
              }}
              style={{
                borderColor: "black",
                borderWidth: 0.5,
              }}
              dropDownStyle={{
                color: "black",
                borderColor: "black",
                borderWidth: 0.5,
              }}
              containerStyle={{ height: 40, marginVertical: 10 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              labelStyle={{
                color: "black",
              }}
              selectedtLabelStyle={{
                color: "black",
              }}
              onChangeItem={(item) => setCategoryId(item.categoryId)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Subject</Text>
            <TextInput
              ref={(ref) => {
                firstInput = ref;
              }}
              style={styles.inputStyle}
              onChangeText={(text) => setSubject(text)}
              color={"black"}
              value={subject}
              require={true}
              autoCompleteType="off"
              returnKeyType="next"
              onSubmitEditing={() => fourthInput.focus()}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Details(optional)</Text>
            <TextInput
              ref={(ref) => {
                fourthInput = ref;
              }}
              style={styles.bigInputStyle}
              multiline
              // textAlignVertical
              clearTextOnFocus={false}
              defaultValue="test"
              onChangeText={(text) => setDetails(text)}
              value={details}
              require={true}
              autoCompleteType="off"
              returnKeyType="default"
              // onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
          {saving === false && (
            <>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <CheckBox
                  style={{}}
                  disabled={false}
                  value={toggleNotifyMe}
                  boxType="square"
                  border
                  tintColor="#000000"
                  onValueChange={(newValue) => setToggleNotifyMe(true)}
                />
                <Text
                  style={{
                    paddingHorizontal: 10,

                    color: "black",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Notify me when a comment is made
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 30,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleCancel()}
                  style={{
                    flex: 1,
                    height: 40,
                    justifyContent: "center",
                    backgroundColor: "grey",
                    borderRadius: 7,
                    marginRight: 10,

                    // paddingVertical: 3,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={{
                    flex: 1,
                    height: 40,
                    justifyContent: "center",
                    backgroundColor: "green",
                    borderRadius: 7,
                    paddingVertical: 1,
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          {saving === true && (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                Saving...
              </Text>
            </View>
          )}
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

export default connect(mapStateToProps)(IdeasSubmitScreen);
