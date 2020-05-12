import React from 'react';
import {Platform, Dimensions, StatusBar, PixelRatio, Alert,Share} from 'react-native';
import {getDeviceId} from 'react-native-device-info';
import moment from 'moment';

const [_deviceName] = getDeviceId().split(',');
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const scaleW = SCREEN_WIDTH / 374;
const scaleH = SCREEN_HEIGHT / 812;

export {moment};

export const OS_IOS = Platform.OS == 'ios';
export const OS_ANDROID = Platform.OS == 'android';
export const OS_VERSION = Platform.Version;
export const deviceWidth = SCREEN_WIDTH;
export const deviceHeight =
  SCREEN_HEIGHT + (OS_IOS ? 0 : OS_VERSION > 19 ? StatusBar.currentHeight : 0);
export const LAST_IOS = OS_IOS
  ? ['iPhone10', 'iPhone11'].indexOf(_deviceName) > -1
  : false;

export const applyOs = function (iOsProp, androidProp) {
  return OS_IOS ? iOsProp : androidProp;
};

export function normalize(size, type) {
  const scaleType =
    typeof type === 'undefined' || type == 'W'
      ? scaleW
      : typeof type === 'H'
      ? scaleH
      : scaleW;
  const newSize = size * scaleType;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function listToMatrix(list, elementsPerSubArray) {
  var matrix = [],
    i,
    k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}

export function toArray(json) {
  return typeof json == 'object' ? Object.keys(json) : [];
}

export function recursiveMap(children, fn,fnref) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      let merge = {
        children: recursiveMap(child.props.children, fn),
        ref:(element)=> fnref(element)
      };
     
      child = React.cloneElement(child,merge );
    }

    return fn(child);
  });
}

export function openAlert(data) {
  Alert.alert(
    data.title ? data.title : '',
    data.msg ? data.msg : '',
    data.actions
      ? data.actions
      : [
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancelar',
          },
        ],
    {cancelable: data.cancelable == true ? true : false},
  );
}

export function randomString(length, chars) {
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}

export function generate_sync(length) {
  return randomString(length, 'aA#');
}

export function getFilterData(data, field, value) {
  return data.filter((item) => item[field] == value);
}


export function format(mask, number) {
  var s = '' + number,
    r = '';
  for (var im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask.charAt(im) == 'X' ? s.charAt(is++) : mask.charAt(im);
  }
  return r;
}

export function phoneFormat(phone) {
  const cleanPhone = ( phone.replace(/[^\d]/g, "") ).slice(0,10);
  return cleanPhone? cleanPhone.replace(/(\d{2})(\d{1,4})(\d{0,4})/, "($1) $2-$3").replace(/-$/,'') : '';
}

export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}