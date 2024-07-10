import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const width2 = Dimensions.get('window').width/2;
const height2 = Dimensions.get('window').height/2;

const width10 = Dimensions.get('window').width/10;
const height10 = Dimensions.get('window').height/10;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
