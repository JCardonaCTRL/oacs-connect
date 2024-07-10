import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  BackHandler,
  Linking,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { Header, ListItem } from "react-native-elements";
import { height, width } from "../../../constants/Layout";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../stylesheets/IdeasStyles/IdeasDetailsStyles";
import TileHeader from "../../CommonComponents/TileHeader";
import TileHeaderWithBack from "../../CommonComponents/TileHeaderWithBack";
import api from "../../API/APIIdeas";

const IdeasDetailsScreen = (props) => {
  const commentRef = useRef(null);

  // get IdeasDetailsScreen data from navigation getParam in IdeasHomeScreen --
  const ideaId = props.navigation.getParam("ideaId", 0);
  const category = props.navigation.getParam("category", "default category");
  const categoryId = props.navigation.getParam(
    "categoryId",
    "default categoryId"
  );
  const subject = props.navigation.getParam("subject", "default subject");
  const rootUrl = props.navigation.getParam("rootUrl", "default root");
  const backgroundImageUrl = props.navigation.getParam(
    "backgroundImageUrl",
    ""
  );

  const creationDate = props.navigation.getParam(
    "creationDate",
    "default creationDate"
  );

  const [commenting, setCommenting] = useState(
    props.navigation.getParam("commenting", false),
    false
  );
  const [comment, setComment] = useState("");
  const [myVote, setMyVote] = useState(props.navigation.getParam("myVote", ""));

  const [commentsList, setCommentsList] = useState([]);
  const [creationName, setCreationName] = useState("");
  const [details, setDetails] = useState("");
  const [voteUpNumber, setVoteUpNumber] = useState(0);
  const [voteDownNumber, setVoteDownNumber] = useState(0);

  useEffect(() => {
    // if coming from comment button, focus commentRef
    if (commenting) commentRef.current.focus();

    // getting and setting details
    getDetails();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [handleBackPress]);

  const handleBackPress = () => {
    props.navigation.navigate("IdeasHome");
  };

  const getDetails = () => {
    const getDetailsUrl = rootUrl + "details/" + ideaId;
    api
      .getDetails(getDetailsUrl)
      .then((response) => {
        if (response.data.response_code === "Ok") {
          setCommentsList(response.data.response_body.ideaDetails.commentsList);
          setCreationName(response.data.response_body.ideaDetails.creationName);
          setDetails(response.data.response_body.ideaDetails.details);
          setVoteUpNumber(response.data.response_body.ideaDetails.voteUpNumber);
          setVoteDownNumber(
            response.data.response_body.ideaDetails.voteDownNumber
          );
        } else {
          // response.data.response_code != 'Ok'
          Alert.alert("Error: network issue");
        }
      })
      .catch((e) => {
        Alert.alert("Error retrieving idea details");
      }); // end getList
  };

  const onUpVote = () => {
    let newDownVoteNumber = voteDownNumber;
    let newUpVoteNumber = voteUpNumber;
    if (myVote === "down") {
      setVoteUpNumber(++newUpVoteNumber);
      setVoteDownNumber(--newDownVoteNumber);
      setMyVote("up");
    } else {
      setVoteUpNumber(++newUpVoteNumber);
      setMyVote("up");
    }
    postVote("up");
  };

  const onDownVote = () => {
    let newDownVoteNumber = voteDownNumber;
    let newUpVoteNumber = voteUpNumber;
    if (myVote === "up") {
      setVoteUpNumber(--newUpVoteNumber);
      setVoteDownNumber(++newDownVoteNumber);
      setMyVote("down");
    } else {
      setVoteDownNumber(++newDownVoteNumber);
      setMyVote("down");
    }
    postVote("down");
  };

  const postVote = (voteValue) => {
    let jsonData = {
      ideaId: ideaId,
      voteType: voteValue,
      creationUser: props.dgsomAppObject.userData.uid,
    };
    const postVoteUrl = rootUrl + "vote";
    api
      .postVote(postVoteUrl, jsonData)
      .then((response) => {
        if (response.data.response_code.toLowerCase() === "ok") {
          Alert.alert("Success!", "Your vote has been submitted.", [
            { text: "OK", onPress: () => console.log("success: ok pressed") },
          ]);

          // add hasVoted: true to idealist[index] -- only allows fist vote to go through to backend
          // TODO fix multi vote instances on backend?
        } else {
          Alert.alert(
            "ERROR",
            "There was an error processing your vote. Please try again.",
            [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          Alert.alert(
            "ERROR",
            "There was an error processing your request. " + err,
            [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
          );
          /*
           * client received an error response (5xx, 4xx)
           * throw 404 not found page/error message
           */
        } else if (err.request) {
          Alert.alert(
            "ERROR",
            "There was an error processing your request. " + err,
            [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
          );
          /*
           * client never received a response, or request never left
           * caused by spotty connection, backend hanging, or unauthorized cross domain requests
           */
        } else {
          Alert.alert(
            "ERROR",
            "There was an error processing your request. " + err,
            [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
          );
          // anything else (issue with the app)
        }
      });
  }; // end postVote()

  const submitComment = (id, uid, body) => {
    setCommenting(false);
    if (body) {
      let jsonData = {
        ideaId: id,
        creationUser: uid,
        comments: body,
      };
      let postCommentUrl = rootUrl + "comment";
      api
        .postComment(postCommentUrl, jsonData)
        .then((response) => {
          setComment("");

          if (response.data.response_code.toLowerCase() === "ok") {
            Alert.alert("Success!", "Your comment has been submitted.", [
              {
                text: "OK",
                onPress: () => {
                  console.log("success: ok pressed");
                  // close commenting textInput:
                  setCommenting(false);
                  // get new commentList:
                  getDetails();
                },
              },
            ]);
          } else {
            Alert.alert(
              "ERROR",
              "There was an error processing your comment. Please try again.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setCommenting(false);
                    console.log("error: ok pressed");
                  },
                },
              ]
            );
          }
        })
        .catch((err) => {
          setComment("");
          setCommenting(false);
          console.log(err);
          if (err.response) {
            Alert.alert(
              "ERROR",
              "There was an error processing your request. " + err,
              [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
            );
            /*
             * client received an error response (5xx, 4xx)
             * throw 404 not found page/error message
             */
          } else if (err.request) {
            Alert.alert(
              "ERROR",
              "There was an error processing your request. " + err,
              [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
            );
            /*
             * client never received a response, or request never left
             * caused by spotty connection, backend hanging, or unauthorized cross domain requests
             */
          } else {
            Alert.alert(
              "ERROR",
              "There was an error processing your request. " + err,
              [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
            );
            // anything else (issue with the app)
          }
        });
    } else {
      setComment("");
      Keyboard.dismiss();
      setCommenting(false);
    }
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
        text: "Idea Details",
        style: {
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          paddingTop: 15,
        },
      }}
    />
  );

  const keyExtractor = (item, index) => index.toString();
  //console.warn(props.navigation);
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
        <TileHeader
          navigation={props.navigation}
          title={"Idea Details"}
          appCustoms={props.navigation.state.params.appCustoms}
        />
        <View style={styles.paddingVertical} />
        <View style={[styles.buttonSet]} key="date">
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("IdeasHome", {});
            }}
          >
            <Text style={styles.cancelButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView
          style={styles.container}
          extraScrollHeight={80}
          // uncovers submit button below textinput while keyboard is open
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ flex: 2, flexDirection: "column", alignItems: "center" }}
            >
              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: "black" }}
              >
                {Number(voteUpNumber) + Number(voteDownNumber)}
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                votes
              </Text>
              <View style={{ margin: 2 }} />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ color: "green", fontWeight: "bold" }}>
                  {Number(voteUpNumber)}{" "}
                </Text>
                <Image
                  source={require("../../../assets/images/ideas/miniicons_thumbsup.png")}
                  style={{
                    tintColor: "rgb(136,168,10)",
                    height: 18,
                    width: 20,
                  }}
                />
              </View>
              <View style={{ margin: 2 }} />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  {Number(voteDownNumber)}{" "}
                </Text>
                <Image
                  source={require("../../../assets/images/ideas/miniicons_thumbsdown.png")}
                  style={{
                    tintColor: "rgb(245,60,61)",
                    height: 20,
                    width: 20,
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 5 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "blue",
                  fontWeight: "bold",
                  marginTop: 5,
                }}
              >
                {subject}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "grey",
                  fontWeight: "bold",
                  marginTop: 5,
                  lineHeight: 16,
                }}
              >
                By {creationName}
                {"\n"}
                Created {creationDate}
                {"\n"}
                Category: {category}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, paddingVertical: 16 }}>
            <View>
              <Text
                style={{
                  paddingBottom: 6,
                  color: "rgb(92,154,200)",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Details
              </Text>
              <Text style={{ lineHeight: 16 }}>{details}</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                height: 50,
                marginVertical: 10,
              }}
            >
              <TouchableOpacity
                style={
                  myVote === "down"
                    ? [styles.buttonViewStyle, { backgroundColor: "grey" }]
                    : [
                        styles.buttonViewStyle,
                        { backgroundColor: "rgb(136,168,10)" },
                      ]
                }
                onPress={() => {
                  onUpVote();
                }}
                disabled={myVote === "up"} // removed to disable vote re-casting
                // disabled={myVote}
              >
                <Image
                  source={require("../../../assets/images/ideas/miniicons_thumbsup.png")}
                  style={styles.buttonImageStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  myVote === "up"
                    ? [styles.buttonViewStyle, { backgroundColor: "grey" }]
                    : [
                        styles.buttonViewStyle,
                        { backgroundColor: "rgb(245,60,61)" },
                      ]
                }
                onPress={() => {
                  onDownVote();
                }}
                disabled={myVote === "down"} // removed to disable vote re-casting
                // disabled={myVote}
              >
                <Image
                  source={require("../../../assets/images/ideas/miniicons_thumbsdown.png")}
                  style={styles.buttonImageStyle}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonViewStyle,
                  { backgroundColor: "rgb(48,132,192)" },
                ]}
                onPress={() => {
                  setCommenting(!commenting);
                  if (!commenting)
                    setTimeout(() => commentRef.current.focus(), 100);
                }}
              >
                <Image
                  source={require("../../../assets/images/ideas/miniicons_comments.png")}
                  style={styles.buttonImageStyle}
                />
              </TouchableOpacity>
            </View>

            {commenting ? (
              <View>
                <TextInput
                  ref={commentRef}
                  style={styles.bigInputStyle}
                  multiline
                  // textAlignVertical
                  clearTextOnFocus={false}
                  defaultValue="test"
                  onChangeText={(text) => setComment(text)}
                  value={comment}
                  returnKeyType="done"
                  onSubmitEditing={(textInput) => {
                    console.log("postComment");
                    Keyboard.dismiss();
                  }}
                />
                <View style={styles.commentButtonsView}>
                  <TouchableOpacity
                    style={styles.submitView}
                    onPress={() => {
                      submitComment(
                        ideaId,
                        props.dgsomAppObject.userData.uid,
                        comment
                      );
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelView}
                    onPress={() => {
                      setComment("");
                      Keyboard.dismiss();
                      setCommenting(false);
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <View>
              <Text
                style={{
                  color: "rgb(92,154,200)",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Comments: {commentsList.length}
              </Text>
              <FlatList
                contentContainerStyle={{
                  paddingVertical: 4,
                  paddingHorizontal: 0,
                }}
                data={commentsList}
                keyExtractor={keyExtractor}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      paddingVertical: 10,
                      marignVertical: 5,
                      borderBottomWidth: 0.5,
                      borderColor: "grey",
                    }}
                  >
                    <Text style={{ fontSize: 12, color: "grey" }}>
                      date: {item.creationDate.substr(0, 11)}
                    </Text>
                    <Text style={{ fontSize: 12, color: "grey" }}>
                      by: {item.creationName}
                    </Text>
                    <Text style={{ fontSize: 16, color: "black" }}>
                      {item.comments}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
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

export default connect(mapStateToProps)(IdeasDetailsScreen);
