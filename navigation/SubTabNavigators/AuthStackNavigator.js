import { Platform } from "react-native";
import { createSwitchNavigator } from "react-navigation";

import AuthOktaScreen from "../../src/screens/AuthScreens/AuthOktaScreen";
import AuthHomeScreen from "../../src/screens/AuthScreens/AuthHomeScreen";

const AuthStackNavigator = createSwitchNavigator({
  AuthHome: AuthHomeScreen,
  AuthOkta: AuthOktaScreen,
});

export default AuthStackNavigator;
