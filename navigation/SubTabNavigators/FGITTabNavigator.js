import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../../components/TabBarIcon';
import FGITHomeScreen from '../../src/screens/FgitScreens/FGITHomeScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: { headerLayoutPreset: 'center' },
    
});

const tabNavigator = createBottomTabNavigator({
    FGITHomeScreen,
},
        config,
);



tabNavigator.path = '';

export default tabNavigator;
