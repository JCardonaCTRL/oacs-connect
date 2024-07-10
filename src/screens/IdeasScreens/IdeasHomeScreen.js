import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import TileHeader from "../../CommonComponents/TileHeader";
import { height, width } from "../../../constants/Layout";
import { endpoints } from "../../Api";
import Colors from "../../../constants/Colors";
import apiMain from "../../API/APIMain";
import api from "../../API/APIIdeas";
import styles from "../../stylesheets/IdeasStyles/IdeasHomeStyles";

import { connect } from "react-redux";
import { ErrorMessage } from "../../CommonComponents/ErrorMessage";

const IdeasHomeScreen = (props) => {
  // list to display
  const [rootUrl, setRootUrl] = useState("");

  // display list
  const [ideaList, setIdeaList] = useState();
  const [activeIdeaId, setActiveIdeaId] = useState("");

  // urls
  const [urls, setUrls] = useState({});
  const [backgroundImageUrl, setBackgroundImageUrl] = useState();

  const [categories, setCategories] = useState([]);

  // loading activity indicator and pull to refresh
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // error status and message to display
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appCustoms, setAppCustoms] = useState();
  const apiEndpoints = endpoints(props.dgsomAppObject.apiEnv);
  const tileInfoUrl = apiEndpoints.getTileInfoUrl;

  useEffect(() => {
    // get tileInfo and set rootUrl
    apiMain
      .getTileInfo2(tileInfoUrl)
      .then((response) => {
        console.warn(response);
        if (response.data.response_code === "Ok") {
          // set URLs
          const root =
            response.data.response_body.appTileInternals.getRootUrl +
            "app/tile/ideas/";
          setRootUrl(root);
          setUrls({
            getCategories: root + "idea/categories",
            postIdea: root + "idea", //POST
            updateIdea: root + "idea", //PUT
            getList: root + "list",
            postVote: root + "vote",
            postComment: root + "comment",
            getDetails: root + "details/" + activeIdeaId,
          });

          setBackgroundImageUrl(
            response.data.response_body.appCustoms.tileBackgroundImageUrl
          );
          setAppCustoms(response.data.response_body.appCustoms); // for info button

          const getListUrl = root + "list";

          console.warn(getListUrl);
          getIdeasList(getListUrl);

          const getCategoriesUrl = root + "idea/categories";
          getCategoriesList(getCategoriesUrl);
        } else {
          setIsError(true);
          setErrorMessage("Error contacting servers");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          /*
           * client received an error response (5xx, 4xx)
           * throw 404 not found page/error message
           */
          setIsError(true);
          setErrorMessage("Error received");
          setIsLoading(false);
        } else if (err.request) {
          console.log(err);
          /*
           * client never received a response, or request never left
           * caused by spotty connection, backend hanging, or unauthorized cross domain requests
           */
          setIsError(true);
          setErrorMessage("Error establishing a connection");
          setIsLoading(false);
        } else {
          console.log(err);
          // anything else (issue with the app)
          setIsError(true);
          setErrorMessage("APP ERROR");
          setIsLoading(false);
        }
      }); // END axios catch
  }, []);

  const getIdeasList = (url = urls.getList) => {
    api
      .getIdeasList(url)
      .then((response) => {
        console.warn(response.data.response_body.ideaList);
        if (response.data.response_code === "Ok") {
          setIdeaList(response.data.response_body.ideaList);
          setIsError(false);
          setIsLoading(false);
        } else {
          // response.data.response_code != 'Ok'
          console.log("network issue");
          setIsError(true);
          setErrorMessage("Error contacting servers");
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsError(true);
        setErrorMessage("Error retrieving ideas list from server");
      }); // end getList axios and catch
    setIsLoading(false);
  };

  const getCategoriesList = (url) => {
    api
      .getCategories(url)
      .then((response) => {
        setCategories(response.data.response_body.categoryList);
      })
      .catch((e) => {
        setIsError(true);
        setErrorMessage("Error retrieving categories list from server");
      });
  };

  const postVote = (index, voteValue) => {
    let jsonData = {
      ideaId: ideaList[index].ideaId,
      voteType: voteValue,
      creationUser: props.dgsomAppObject.userData.uid,
    };
    api
      .postVote(urls.postVote, jsonData)
      .then((response) => {
        if (response.data.response_code.toLowerCase() === "ok") {
          Alert.alert("Success!", "Your vote has been submitted.", [
            { text: "OK", onPress: () => console.log("success: ok pressed") },
          ]);

          // add hasVoted: true to idealist[index] -- only allows fist vote to go through to backend
          // TODO fix multi vote instances on backend?
          // ? hasVoted check not working?

          let newList = [...ideaList];
          newList[index] = {
            ...newList[index],
            hasVoted: true,
          };
          setIdeaList[newList];
        } else {
          Alert.alert(
            "ERROR",
            "There was an error processing your vote. Please try again.",
            [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
          );
        }
      })
      .catch((err) => {
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
          // anything else (issue with the app)
          Alert.alert(
            "ERROR",
            "There was an error processing your request. " + err,
            [{ text: "OK", onPress: () => console.log("error: ok pressed") }]
          );
        }
      });
  }; // end postVote()

  const onUpVote = (index) => {
    // increment upvote ideaList[index]
    let newList = [...ideaList];
    if (ideaList[index].myVote === "down") {
      newList[index] = {
        ...newList[index],
        voteUpNumber: ++newList[index].voteUpNumber,
        voteDownNumber: --newList[index].voteDownNumber,
        myVote: "up",
      };
    } else {
      newList[index] = {
        ...newList[index],
        voteUpNumber: ++newList[index].voteUpNumber,
        myVote: "up",
      };
    }
    // append myVote w/ appropriate value @ index
    setIdeaList(newList);

    // if (ideaList[index].myVote) {
    //     putVote(index, 'up');
    // } else {
    //     postVote(index, 'up');
    // }
    // if (!ideaList[index].myVote) {
    postVote(index, "up");
    // }
  };

  const onDownVote = (index) => {
    // increment upvote ideaList[index]
    let newList = [...ideaList];
    if (ideaList[index].myVote === "up") {
      newList[index] = {
        ...newList[index],
        voteDownNumber: ++newList[index].voteDownNumber,
        voteUpNumber: --newList[index].voteUpNumber,
        myVote: "down",
      };
    } else {
      newList[index] = {
        ...newList[index],
        voteDownNumber: ++newList[index].voteDownNumber,
        myVote: "down",
      };
    }
    // append myVote w/ appropriate value @ index
    setIdeaList(newList);

    // TODO add check to see if myVote for this exists, if exists, use PUT otherwise POST vote
    // if (ideaList[index].myVote) {
    //     putVote(index, 'down')
    // } else {
    //     postVote(index, 'down');
    // }
    // if (!ideaList[index].myVote) {
    postVote(index, "down");
    // }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "gray",
        }}
        onPress={() => {
          props.navigation.navigate("IdeasDetails", {
            ideaId: item.ideaId,
            category: item.categoryName,
            categoryId: item.categoryId,
            subject: item.subject,
            voteUpNumber: item.voteUpNumber,
            voteDownNumber: item.voteDownNumber,
            creationDate: item.creationDate,
            rootUrl: rootUrl,
            myVote: item.myVote,
            backgroundImageUrl: backgroundImageUrl,
            appCustoms: appCustoms,
          });
          setActiveIdeaId(item.ideaId); // for api call to pass data into ideasDetailsScreen
        }}
      >
        <View style={{ flex: 1, marginVertical: 25 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{ flex: 2, flexDirection: "column", alignItems: "center" }}
            >
              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: "black" }}
              >
                {Number(item.voteUpNumber) + Number(item.voteDownNumber)}
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "black" }}
              >
                votes
              </Text>
              <View style={{ margin: 2 }} />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ color: "green", fontWeight: "bold" }}>
                  {Number(item.voteUpNumber)}{" "}
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
                  {Number(item.voteDownNumber)}{" "}
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
                  fontSize: 17,
                  color: "blue",
                  fontWeight: "bold",
                  marginVertical: 5,
                }}
              >
                {item.subject}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "grey",
                  fontWeight: "bold",
                  marginVertical: 5,
                }}
              >
                {item.creationDate}
              </Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableOpacity
                  // style={[styles.buttonViewStyle, { backgroundColor: 'rgb(136,168,10)' }]}
                  style={
                    item.myVote === "down"
                      ? [styles.buttonViewStyle, { backgroundColor: "grey" }]
                      : [
                          styles.buttonViewStyle,
                          { backgroundColor: "rgb(136,168,10)" },
                        ]
                  }
                  onPress={() => onUpVote(index)}
                  disabled={item.myVote === "up"} // removed to disable vote re-casting
                  // disabled={item.myVote} // disables re-casting
                >
                  <Image
                    source={require("../../../assets/images/ideas/miniicons_thumbsup.png")}
                    style={styles.buttonImageStyle}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    item.myVote === "up"
                      ? [styles.buttonViewStyle, { backgroundColor: "grey" }]
                      : [
                          styles.buttonViewStyle,
                          { backgroundColor: "rgb(245,60,61)" },
                        ]
                  }
                  onPress={() => onDownVote(index)}
                  disabled={item.myVote === "down"} // removed to disable vote re-casting
                  // disabled={item.myVote} // disables re-cassting
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
                    props.navigation.navigate("IdeasDetails", {
                      ideaId: item.ideaId,
                      category: item.categoryName,
                      categoryId: item.categoryId,
                      subject: item.subject,
                      voteUpNumber: item.voteUpNumber,
                      voteDownNumber: item.voteDownNumber,
                      creationDate: item.creationDate,
                      commenting: true,
                      rootUrl: rootUrl,
                      myVote: item.myVote,
                      backgroundImageUrl: backgroundImageUrl,
                      appCustoms: appCustoms,
                    });
                  }}
                >
                  <Image
                    source={require("../../../assets/images/ideas/miniicons_comments.png")}
                    style={styles.buttonImageStyle}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item, index) => index.toString();

  const onRefresh = () => {
    setRefreshing(true);
    getIdeasList();
    // setTimeout(() => setRefreshing(false), 500);
  };

  const SubmitAnIdea = () => (
    <View
      style={{
        height: "11%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "rgb(0,148,68)",
          paddingVertical: 8,
          paddingHorizontal: 25,
          borderRadius: 8,
        }}
        onPress={() => {
          console.log("onpress submit an idea");
          props.navigation.navigate("IdeasSubmit", {
            categories: categories.map((obj) => ({
              ...obj,
              label: obj.name,
            })),
            rootUrl: rootUrl,
            backgroundImageUrl: backgroundImageUrl,
          });
        }}
      >
        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
          Submit an Idea
        </Text>
      </TouchableOpacity>
    </View>
  );

  // RENDERING
  if (isLoading) {
    return (
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
          title={
            props.dgsomAppObject.tileTitle !== ""
              ? props.dgsomAppObject.tileTitle
              : "Ideas"
          }
          appCustoms={appCustoms}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={Colors.darkerBlue}
          />
        </View>
      </ImageBackground>
    );
  } else if (isError) {
    console.warn(isError);
    console.warn(errorMessage);
    return (
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
          title={
            props.dgsomAppObject.tileTitle
              ? props.dgsomAppObject.tileTitle
              : "Ideas"
          }
          appCustoms={appCustoms}
        />
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={[{ title: errorMessage }]}
          renderItem={({ item, index }) => (
            <View style={styles.loadingContainer}>
              <Image
                source={require("../../../assets/images/alerts/alerticon_alert.png")}
                style={{ height: 100, width: 100, marginTop: 100 }}
              />
              <Text style={{ lineHeight: 50, fontWeight: "bold" }}>
                {item.subject}
              </Text>
            </View>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              // onRefresh={getIdeasList}
              tintColor={Colors.darkestBlue}
            />
          }
        />
      </ImageBackground>
    );
  } else {
    if (ideaList < 1) {
      return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
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
              title={
                props.dgsomAppObject.tileTitle
                  ? props.dgsomAppObject.tileTitle
                  : "Ideas"
              }
              appCustoms={appCustoms}
            />
            <SubmitAnIdea />
            <Text
              style={{
                textAlign: "center",
                padding: 15,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {" "}
              Be the first to contribute!{" "}
            </Text>
          </ImageBackground>
        </View>
      );
    }
    // successfully shown list of alerts:
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
            title={
              props.dgsomAppObject.tileTitle
                ? props.dgsomAppObject.tileTitle
                : "Alerts"
            }
            appCustoms={appCustoms}
          />
          <SubmitAnIdea />
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={ideaList}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.darkestBlue}
              />
            }
          />
        </ImageBackground>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

export default connect(mapStateToProps)(IdeasHomeScreen);
