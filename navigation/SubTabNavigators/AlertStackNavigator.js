import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import AlertHomeScreen from '../../src/screens/AlertScreens/AlertHomeScreen';
import AlertDetailsScreen from '../../src/screens/AlertScreens/AlertDetailsScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const AlertStackNavigator = createSwitchNavigator({
    AlertHome: AlertHomeScreen,
    AlertDetails: AlertDetailsScreen,
});

export default AlertStackNavigator;