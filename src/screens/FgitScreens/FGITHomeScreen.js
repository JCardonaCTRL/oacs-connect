/* FGITHomeScreen.js */

"use-strict";
import React, { useEffect, useState, useRef } from "react";
import {
  ImageBackground,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
//import * as ScreenOrientation from "expo-screen-orientation";
import { height, deviceWidth } from "../../../constants/Layout";
import { endpoints } from "../../Api";
import Colors from "../../../constants/Colors";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import YouTube from "react-native-youtube";
import { connect } from "react-redux";
import TileHeader from "../../CommonComponents/TileHeader";
import apiMain from "../../API/APIMain";
import api from "../../API/APIFgit";
import styles from "../../stylesheets/FgitStyles/FgitHomeStyles";

const FGITHomeScreen = (props) => {
  const [vidsList, setVidsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("g1e11lsrSvw");
  const [activeVideoTitle, setActiveVideoTitle] = useState(
    "Welcome to the OpenACS and Tcl/Tk Conference 2024"
  );
  const [activeVideoAuth, setActiveVideoAuth] = useState("");
  const [activeVideoChannel, setActiveVideoChannel] = useState(
    "https://www.youtube.com/channel/UCPpw6jRIL1B9nU0k7-GujOQ"
  );
  const [appCustoms, setAppCustoms] = useState();
  const [rootURL, setRootURL] = useState();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState();

  useEffect(() => {
    getTileInfo();
  }, []);

  const getTileInfo = () => {
    // create endpoint with the tileinfourl + appcode
    const apiEndpoints = endpoints(props.dgsomAppObject.apiEnv);
    const apiTileInfoUrl = apiEndpoints.getTileInfoUrl;

    apiMain
      .getTileInfo2(apiTileInfoUrl)
      .then((response) => {
        if (response.data.response_code.toLowerCase() === "ok") {
          setAppCustoms(response.data.response_body.appCustoms);
          setRootURL(response.data.response_body.appTileInternals.getRootUrl);
          setBackgroundImageUrl(
            response.data.response_body.appCustoms.tileBackgroundImageUrl
          );

          api
            .getVideos(
              response.data.response_body.appTileInternals.getRootUrl +
                "app/tile/videos/list"
            )
            .then((response) => {
              if (response.data.response_code.toLowerCase() === "ok") {
                setIsLoading(false);
                setVidsList(response.data.response_body.videoList);
              } else {
                Alert.alert("ERROR", "" + response.data.response_code, [
                  {
                    text: "Go Back",
                    onPress: () => props.navigation.navigate("Home"),
                  },
                ]);
              }
            })
            .catch((err) => {
              if (err.response) {
                /*
                 * client received an error response (5xx, 4xx)
                 * throw 404 not found page/error message
                 */

                Alert.alert("ERROR", "" + err, [
                  {
                    text: "Go Back",
                    onPress: () => props.navigation.navigate("Home"),
                  },
                ]);
              } else if (err.request) {
                console.log(err);
                /*
                 * client never received a response, or request never left
                 * caused by spotty connection, backend hanging, or unauthorized cross domain requests
                 */
                console.log(err);
                Alert.alert("ERROR", "" + err, [
                  {
                    text: "Go Back",
                    onPress: () => props.navigation.navigate("Home"),
                  },
                ]);
              } else {
                console.log(err);
                // anything else (issue with the app)
                console.log(err);
                Alert.alert("ERROR", "" + err, [
                  {
                    text: "Go Back",
                    onPress: () => props.navigation.navigate("Home"),
                  },
                ]);
              }
            });
        } else {
          // response.data.response_code !== 'Ok'
          console.log("network issue");
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          /*
           * client received an error response (5xx, 4xx)
           * throw 404 not found page/error message
           */
          console.log(err);
          Alert.alert("ERROR", "" + err, [
            {
              text: "Go Back",
              onPress: () => props.navigation.navigate("Home"),
            },
          ]);
        } else if (err.request) {
          console.log(err);
          /*
           * client never received a response, or request never left
           * caused by spotty connection, backend hanging, or unauthorized cross domain requests
           */
          console.log(err);
          Alert.alert("ERROR", "" + err, [
            {
              text: "Go Back",
              onPress: () => props.navigation.navigate("Home"),
            },
          ]);
        } else {
          console.log(err);
          // anything else (issue with the app)
          console.log(err);
          Alert.alert("ERROR", "" + err, [
            {
              text: "Go Back",
              onPress: () => props.navigation.navigate("Home"),
            },
          ]);
        }
      });
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = (item) => {
    console.warn(item);
    return (
      <TouchableOpacity
        style={
          activeVideoId == item.video_link.split("=")[1]
            ? styles.itemViewGray
            : styles.itemView
        }
        onPress={() => {
          setActiveVideoId(item.video_link.split("=")[1]);
          setActiveVideoTitle(item.title);
          getYoutubeMeta(item.video_link.split("=")[1]).then((meta) => {
            setActiveVideoAuth(meta.author_name);
            setActiveVideoChannel(meta.author_url);
          });
        }}
      >
        <Image
          source={{ uri: "data:image/png;base64," + item.image64 }}
          style={{ width: 100, height: 60, resizeMode: "contain" }}
        />
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <ImageBackground
        style={{ height, flex: 1 }}
        imageStyle={{ marginTop: -5 }}
        source={
          backgroundImageUrl
            ? { uri: backgroundImageUrl }
            : require("../../../assets/images/dgsomapp_bg.png")
        }
      >
        <TileHeader
          title={
            props.dgsomAppObject.tileTitle
              ? props.dgsomAppObject.tileTitle
              : "Videos"
          }
          navigation={props.navigation}
          appCustoms={appCustoms}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={Colors.darkestBlue}
          />
        </View>
      </ImageBackground>
    );
  } else {
    // console.warn(activeVideoId);
    return (
      <ImageBackground
        style={{ height, flex: 1 }}
        imageStyle={{ marginTop: -5 }}
        source={
          backgroundImageUrl
            ? { uri: backgroundImageUrl }
            : require("../../../assets/images/dgsomapp_bg.png")
        }
      >
        <TileHeader
          title={props.dgsomAppObject.tileTitle}
          navigation={props.navigation}
          appCustoms={appCustoms}
        />
        <View style={styles.container}>
          <View style={styles.youtubePlayerView}>
            <YouTube
              showFullscreenButton
              allowsFullscreenVideo
              ref={playerRef}
              apiKey="AIzaSyCu3OTry4IvXmOYidpaZoeDU_j6DjOvHEs"
              videoId={activeVideoId}
              origin="http://www.youtube.com"
              play={false}
              style={{ alignSelf: "stretch", flex: 4 }}
              onChangeFullscreen={(playerRef) => {
                console.log("is full screen: " + playerRef.isFullscreen);
                if (playerRef.isFullscreen) {
                  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                }
              }}
            />
          </View>

          <View style={styles.titleView}>
            <Text style={styles.titleText}>{activeVideoTitle}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(activeVideoChannel)}
            >
              <Text style={styles.titleMeta}>{activeVideoAuth}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.flatListView}>
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={vidsList}
              horizontal={false}
              keyExtractor={keyExtractor}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
};

FGITHomeScreen.navigationOptions = () => ({
  tabBarVisible: false,
});

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

export default connect(mapStateToProps)(FGITHomeScreen);
