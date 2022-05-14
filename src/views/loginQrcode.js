/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import i18n from 'i18n-js';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
} from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';
import * as loginController from '../controllers/LoginController';
import lang from '../res/value/res_string/string';
import * as Session from '../prefs/Session';
//import firebase  from 'react-native-firebase';

type Props = {};
export default class LoginQrCode extends Component<Props> {
  constructor(props) {
    super(props);
    const {width, height} = Dimensions.get('window');
    if (width >= 600) {
      (qr_card_img_w = 300), (qr_card_img_h = 130), (text_size = 28);
    } else {
      (qr_card_img_w = 200), (qr_card_img_h = 80), (text_size = 20);
    }
    this.state = {
      width,
      qr_card_img_w,
      qr_card_img_h,
      text_size,
      height,
      username: '',
      password: '',
      hasPermission: null,
      scanned: false,
    };
  }

  async getPermission() {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    this.setState({hasPermission: status === 'granted'});
  }
  componentDidMount() {
    this.getPermission();
  }
  handleBarCodeScanned = ({type, data}) => {
    this.setState({scanned: true});
    this.onSuccess({type, data});
  };

  onSuccess = e => {
    this._login(JSON.parse(e.data));
  };

  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  _login = data => {
    //firebase.analytics().logEvent("login_with_QR", {"userName": data.username});

    loginController
      .login(data.username, data.password)
      .then(({status, result}) => this.loginNavigate(result, status));
  };

  loginNavigate = (result, status) => {
    if (status == 'succes') {
      if (result.role == 'reader') {
        Session.setUserId(result.id);
        this.navigateToDashpord();
      }
    }
  };
  navigateToDashpord() {
    const {navigate} = this.props.navigation;
    navigate('dashboard_page');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 60,
            fontSize: 30,
          }}>
          {i18n.t('show_your_card')}
        </Text>
        {/* <QRCodeScanner
          onRead={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={{flex: 4}}
          cameraType="front"
        /> */}
        <TouchableOpacity style={styles.buttonTouchable}>
          <Image
            source={require('../assets/images/qr_card.png')}
            style={{
              width: this.state.qr_card_img_w,
              height: this.state.qr_card_img_h,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    flex: 1,
    padding: 16,
  },
});
