import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import WebViewScreen from '../../src/screens/Generic/WebViewScreen';


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const GenericWebViewStackNavigator = createSwitchNavigator({
    GenericWebVieHome: WebViewScreen,
});

export default GenericWebViewStackNavigator;