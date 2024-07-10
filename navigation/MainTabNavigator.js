import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../src/screens/MainScreens/HomeScreen";

import ContactScreen from "../src/screens/MainScreens/ContactScreen";

import InfoScreen from "../src/screens/MainScreens/InfoScreen";
import ProfileScreen2 from "../src/screens/MainScreens/ProfileScreen2";

import HomeDrawercomponent from "../src/HomeComponents/HomeDrawerComponent";

const config = Platform.select({
  web: { headerMode: "screen" },
  // default: { headerLayoutPreset: 'center'},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarVisible: false,
};

HomeStack.path = "";

const InfoStack = createStackNavigator(
  {
    Info: InfoScreen,
  },
  config
);

InfoStack.navigationOptions = {
  tabBarVisible: false,
};

InfoStack.path = "info";

const ContactStack = createStackNavigator(
  {
    Contact: ContactScreen,
  },
  config
);

ContactStack.navigationOptions = {
  tabBarVisible: false,
};

ContactStack.path = "contact";

// TEMP NEWSCREENS BELOW

const InfoStack2 = createStackNavigator(
  {
    Info2: InfoScreen,
  },
  config
);
InfoStack2.navigationOptions = {
  tabBarVisible: false,
};

const ContactStack2 = createStackNavigator(
  {
    Contact2: ContactScreen,
  },
  config
);
ContactStack2.navigationOptions = {
  tabBarVisible: false,
};

const ProfileStack2 = createStackNavigator(
  {
    Profile2: ProfileScreen2,
  },
  config
);
ProfileStack2.navigationOptions = {
  tabBarVisible: false,
};

const drawerNavigator = createDrawerNavigator(
  {
    Home: HomeStack,

    "About Us": InfoScreen,

    "Need Help?": ContactScreen,

    "My Profile": ProfileScreen2,
  },
  {
    drawerPosition: "right",
    initialRouteName: "Home",
    backBehavior: "Home",
    contentComponent: (props) => <HomeDrawercomponent {...props} />,
  }
);

drawerNavigator.path = "";

export default drawerNavigator;
