import React from "react";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
import HomeButton from "./HomeButton";
import InfoButton from "./InfoButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../../constants/Colors";
const TileHeaderWithBack = (props) => {
  if (props) {
    return (
      <Header
        backgroundColor={Colors.darkerBlue}
        leftComponent={
          <Icon
            name={"chevron-left"}
            onPress={() => {
              props.navigation.goBack();
            }}
            size={30}
            color="white"
            style={{
              paddingLeft: 20,
              marginTop: 20,
            }}
          />
        }
        centerComponent={{
          text: props.title ? props.title : "DGIT ",
          style: {
            paddingTop: 15,
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
          },
        }}
        containerStyle={{ marginTop: -10 }}
        rightComponent={
          props.appCustoms.appDisplayInformation ? (
            <InfoButton appCustoms={props.appCustoms} />
          ) : (
            undefined || undefined
          )
        }
      />
    );
  } else {
    return (
      <Header
        backgroundColor={Colors.darkerBlue}
        leftComponent={
          <Icon
            name={"chevron-left"}
            onPress={() => {
              props.navigation.goBack();
            }}
            size={30}
            color="white"
            style={{
              paddingLeft: 20,
              marginTop: 10,
            }}
          />
        }
        centerComponent={{
          text: props.title,
          style: {
            paddingTop: 15,
            color: "white",
            fontSize: 22,
            fontWeight: "bold",
          },
        }}
        containerStyle={{ marginTop: -10 }}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
  };
};

export default connect(mapStateToProps)(TileHeaderWithBack);
