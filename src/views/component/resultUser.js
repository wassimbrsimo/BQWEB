import React, {Component} from 'react';

import {View, Platform, TextInput} from 'react-native';

import CustomTextInputStyle from './CustomTextInputStyle';
import {TextField} from 'react-native-material-textfield';

export default class resultUser extends Component {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <View
          style={[CustomTextInputStyle.mainBlock, this.props.containerStyle]}>
          <text>test</text>
        </View>
      );
    }
  }
}
