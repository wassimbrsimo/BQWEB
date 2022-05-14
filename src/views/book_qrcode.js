/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

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
import i18n from 'i18n-js';
import { LinearGradient } from 'expo-linear-gradient';

// import QRCodeScanner from 'react-native-qrcode-scanner';
import * as loginController from '../controllers/LoginController';
import lang from '../res/value/res_string/string';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as Session from '../prefs/Session';
import {BackHandler} from 'react-native';
//import firebase  from 'react-native-firebase';

export default class BookQrCode extends Component {
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
      username: '',
      password: '',
      hasPermission: null,
      scanned: false,
    };
  }

  //const [hasPermission, setHasPermission] = useState(null);
  //const [scanned, setScanned] = useState(false);

  handleBarCodeScanned = ({type, data}) => {
    this.setState({scanned: true});
    this.onSuccess({type, data});
  };

  navigateToDetailBook(id) {
    //firebase.analytics().logEvent("search_book_with_QR", {"bookID": id});
    const {navigate} = this.props.navigation;
    navigate('DetailBook', {bookId: id});
  }

  backToBooks() {
    const {navigate} = this.props.navigation;
    navigate('Book_list_container', {
      userResult: '',
    });
  }
  onSuccess = e => {
    var book = JSON.parse(e.data);
    this.navigateToDetailBook(book.id);
  };

  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  _login = data => {
    loginController
      .login(data.username, data.password)
      .then(({status, result}) => this.loginNavigate(result, status));
    //loginController.getTest().then(({ result, status }) => alert(JSON.stringify(result)));
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.backToBooks();
    });
    async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      this.setState({hasPermission: status === 'granted'});
    };
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
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
          {i18n.t('show_book_qr')}
        </Text>
        {/* <QRCodeScanner
          onRead={this.state.scanned ? undefined : this.handleBarCodeScanned}
          style={{flex: 4}}
          cameraType="front"
        /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.buttonTouchable}>
            <Image
              source={require('../assets/images/book_qr.png')}
              style={{
                width: this.state.qr_card_img_w,
                height: this.state.qr_card_img_h,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonTouchable,
              {
                flex: 1,
                flexDirection: 'row',
                elevation: 13,
                borderRadius: 20,
                backgroundColor: 'white',
                margin: 20,
              },
            ]}
            onPress={() => {
              this.props.navigation.navigate('Book_list_container', {
                userResult: '',
              });
            }}>
            <LinearGradient
              colors={['#F99C3F', '#FE31C4']}
              style={[styles.username_gradient]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Icon name="search" size={30} color={'white'} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: 'white',
                  left: 20,
                  flex: 1,
                }}>
                Search
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  username_gradient: {
    borderRadius: 20,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {},
});
