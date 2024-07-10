import { createAppContainer, createSwitchNavigator } from "react-navigation";

import AuthStackNavigator from "./SubTabNavigators/AuthStackNavigator";
import MainTabNavigator from "./MainTabNavigator";
import FGITTabNavigator from "./SubTabNavigators/FGITTabNavigator";
import AlertStackNavigator from "./SubTabNavigators/AlertStackNavigator";
import IdeasStackNavigator from "./SubTabNavigators/IdeasStackNavigator";
import GenericWebViewStackNavigator from "./SubTabNavigators/GenericWebViewStackNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: {
        screen: AuthStackNavigator, // 0 app entry point
      },
      Main: {
        screen: MainTabNavigator,
        path: "home",
      },
      "tile--alerts": {
        screen: AlertStackNavigator,
        path: "alerts",
      },
      "tile--connect-videos": {
        screen: FGITTabNavigator,
        path: "connectvideos",
      },
      "tile--ideas": {
        screen: IdeasStackNavigator,
        path: "ideas",
      },
      "tile--generic": {
        screen: GenericWebViewStackNavigator,
        path: "generic",
      },
    },
    {
      initialRouteName: "Auth",
    }
  )
);
