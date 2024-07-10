import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import IdeasHomeScreen from '../../src/screens/IdeasScreens/IdeasHomeScreen';
import IdeasDetailsScreen from '../../src/screens/IdeasScreens/IdeasDetailsScreen';
import IdeasSubmitScreen from '../../src/screens/IdeasScreens/IdeasSubmitScreen';


const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const IdeasStackNavigator = createSwitchNavigator({
    IdeasHome: IdeasHomeScreen,
    IdeasDetails: IdeasDetailsScreen,
    IdeasSubmit: IdeasSubmitScreen, 
    // TODO -- add IdeasSettingsScreen

});

export default IdeasStackNavigator;