import React from "react";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
import HomeButton from "./HomeButton";
import InfoButton from "./InfoButton";
import Colors from "../../constants/Colors";

const TileHeader = (props) => {
  // console.warn(props.appCustoms);
  if (props.appCustoms) {
    return (
      <Header
        backgroundColor={Colors.darkerBlue}
        leftComponent={<HomeButton navigation={props.navigation} />}
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
        backgroundColor={props.dgsomAppObject.headerColor}
        leftComponent={<HomeButton navigation={props.navigation} />}
        centerComponent={{
          text: props.title ? props.title : "DGIT ",
          style: {
            paddingTop: 15,
            color: "white",
            fontSize: 28,
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

export default connect(mapStateToProps)(TileHeader);
