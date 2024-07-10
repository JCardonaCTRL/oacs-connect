/* ProfileScreen2.js */

import React, { useCallback, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import HomeButton from "../../CommonComponents/HomeButton";
import DrawerButton from "../../HomeComponents/DrawerButton";
import MainScreenHeader from "../../HomeComponents/MainScreenHeader";
import Colors from "../../../constants/Colors";
import { height, width } from "../../../constants/Layout";
import { connect } from "react-redux";
import {
  updateUserDataFirstname,
  updateUserDataLastname,
  updateUserDataEmail,
  updateUserDataDepartment,
  updateUserDataOffice,
  updateUserDataMobileNumber,
} from "../../redux/actions/dgsomObjectActions";
import styles from "../../stylesheets/MainStyles/ProfileStyles";
import { endpoints } from "../../Api";
import api from "../../API/APIUserProfile";

function ProfileScreen2(props) {
  const [firstname, setFirstname] = useState(
    props.dgsomAppObject.userData.firstname
  );
  const [lastname, setLastname] = useState(
    props.dgsomAppObject.userData.lastname
  );
  const [email, setEmail] = useState(props.dgsomAppObject.userData.email);
  const [dept, setDept] = useState(props.dgsomAppObject.userData.department);
  const [office, setOffice] = useState(props.dgsomAppObject.userData.office);
  const [mobileNumber, setMobileNumber] = useState(
    props.dgsomAppObject.userData.mobileNumber
  );

  const [editable, setEditable] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <ImageBackground
      style={{ height, width }}
      imageStyle={{ marginTop: -5 }}
      source={require("../../../assets/images/dark_background.png")}
    >
      <MainScreenHeader title="My Profile" navigation={props.navigation} />
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingTop: 50 }} />

        <View style={styles.InputRowView}>
          <Text style={styles.inputLabel}> First Name: </Text>
          <TextInput
            ref={(ref) => {
              firstInput = ref;
            }}
            style={editable ? styles.inputStyleEditable : styles.inputStyle}
            autoCorrect={false}
            editable={editable}
            onChangeText={(text) => setFirstname(text)}
            value={firstname}
            require={true}
            returnKeyType="next"
            onSubmitEditing={() => secondInput.focus()}
          />
        </View>
        <View style={styles.InputRowView}>
          <Text style={styles.inputLabel}> Last Name: </Text>
          <TextInput
            ref={(ref) => {
              secondInput = ref;
            }}
            style={editable ? styles.inputStyleEditable : styles.inputStyle}
            autoCorrect={false}
            editable={editable}
            onChangeText={(text) => setLastname(text)}
            value={lastname}
            require={true}
            returnKeyType="next"
            onSubmitEditing={() => thirdInput.focus()}
          />
        </View>
        <View style={styles.InputRowView}>
          <Text style={styles.inputLabel}> Email: </Text>
          <TextInput
            ref={(ref) => {
              thirdInput = ref;
            }}
            autoCorrect={false}
            editable={editable}
            style={editable ? styles.inputStyleEditable : styles.inputStyle}
            onChangeText={(text) => setEmail(text)}
            value={email}
            require={true}
            returnKeyType="next"
            onSubmitEditing={() => fourthInput.focus()}
          />
        </View>
        <View style={styles.InputRowView}>
          <Text style={styles.inputLabel}> Department: </Text>
          <TextInput
            ref={(ref) => {
              fourthInput = ref;
            }}
            autoCorrect={false}
            editable={editable}
            style={editable ? styles.inputStyleEditable : styles.inputStyle}
            onChangeText={(text) => setDept(text)}
            value={dept}
            require={true}
            returnKeyType="done"
            onSubmitEditing={() => fifthInput.focus()}
          />
        </View>
        <View style={styles.InputRowView}>
          <Text style={styles.inputLabel}> Office Location: </Text>
          <TextInput
            ref={(ref) => {
              fifthInput = ref;
            }}
            autoCorrect={false}
            editable={editable}
            style={editable ? styles.inputStyleEditable : styles.inputStyle}
            onChangeText={(text) => setOffice(text)}
            value={office}
            require={true}
            returnKeyType="done"
            onSubmitEditing={() => sixthInput.focus()}
          />
        </View>
        <View style={styles.InputRowView}>
          <Text style={styles.inputLabel}> Mobile Number: </Text>
          <TextInput
            ref={(ref) => {
              sixthInput = ref;
            }}
            autoCorrect={false}
            editable={editable}
            style={editable ? styles.inputStyleEditable : styles.inputStyle}
            onChangeText={(number) => setMobileNumber(number)}
            value={mobileNumber}
            require={true}
            returnKeyType="done"
            keyboardType="phone-pad"
            onSubmitEditing={() => _handleSubmit()}
          />
        </View>

        <View style={{ marginBottom: 200 }} />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const mapStatetoProps = (state) => {
  return {
    dgsomAppObject: state.dgsomAppObjectReducer,
    tileListObject: state.tileListObjectReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFirstname: (firstname) =>
      dispatch(updateUserDataFirstname(firstname)),
    updateLastname: (lastname) => dispatch(updateUserDataLastname(lastname)),
    updateEmail: (email) => dispatch(updateUserDataEmail(email)),
    updateDepartment: (department) =>
      dispatch(updateUserDataDepartment(department)),
    updateOffice: (office) => dispatch(updateUserDataOffice(office)),
    updateMobileNumber: (number) =>
      dispatch(updateUserDataMobileNumber(number)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(ProfileScreen2);
