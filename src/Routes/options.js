import { fromBottom, fromLeft, fromRight, fromTop } from 'react-navigation-transitions';
import TRANSICTION from '../Consts/Transitions';
import { Animated, Easing } from 'react-native';

let Screens = [];
let currentScreen = "";

export default {
  initialRouteName: 'AuthLoading',
  screenInterpolator: screenProps => {
    return {}
  }
};