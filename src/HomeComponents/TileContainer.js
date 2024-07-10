import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';
import AppTilesView from './AppTiles';
import Colors from '../../constants/Colors';
import AppTiles2 from './AppTiles2';

const TileContainer = (props) => {
    return (
        <View
            style={{
                flex: 1,
                borderRadius: 30,
                margin: 5,
            }}>
            <AppTiles2 navigation={props.navigation} />
        </View>
    );
};

export default TileContainer;