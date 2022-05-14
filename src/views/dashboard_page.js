/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import * as userController from '../controllers/UserController';
import * as QuizzitoConstant from '../constants/QuizzitoConstant';
import * as Session from '../prefs/Session';

import {Button, Avatar} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../res/value/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import lang from '../res/value/res_string/string';
import {BackHandler} from 'react-native';
import {TouchableOpacity} from 'react-native';
import i18n from 'i18n-js';

//import { NativeModules } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    // lang checks
    var locale = 'fr_FR';
    /* if( Platform.OS === 'ios'){
    locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
    }else{
     locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"
    }*/
    var array = locale.split('_');
    var lang = array[0];
    var bird_img_src, bird_style;
    const {width, height} = Dimensions.get('window');
    bird_img_src = require('../assets/images/complete_bird_ar.png');

    super(props);
    //alert("left pos " + bird_pos_left);
    this.state = {
      width,
      bird_img_src,
      bird_style,
      height,
      userProfile: {},
      userResult: {},
    };
  }
  navigateToAbout() {
    const {navigate} = this.props.navigation;
    navigate('Home');
  }
  navigateToBooks() {
    const {navigate} = this.props.navigation;
    //navigate('choose', {userResult: this.state.userResult});
    navigate('book_qrcode', {userResult: this.state.userResult});
  }
  navigateToEditInfo() {
    const {navigate} = this.props.navigation;
    navigate('reader_info_form');
  }
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  refresh() {
    userController
      .getReaderProfile()
      .then(({result, status}) => this.initResultProfile(result));
    userController
      .getReaderResults()
      .then(({result, status}) => this.initResultUser(result));
  }
  componentWillMount() {}
  componentDidMount() {
    userController
      .getReaderProfile()
      .then(({result, status}) => this.initResultProfile(result));
    userController
      .getReaderResults()
      .then(({result, status}) => this.initResultUser(result));
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    this.backHandler.remove();
  }
  initResultUser(userResult) {
    Session.setBattleId(userResult.id_battle);
    this.setState({userResult: userResult});
  }

  initResultProfile(userProfile) {
    //this.navigateToEditInfo();
    if (userProfile.f_name.includes('quizzito')) {
      this.navigateToEditInfo();
    }

    this.setState({userProfile: userProfile});

    Session.setAvatar(this.state.userProfile.photo);
    Session.setFullName(
      this.state.userProfile.f_name + ' ' + this.state.userProfile.l_name,
    );
  }

  navigateStart() {
    const {navigate} = this.props.navigation;
    navigate('start_page');
  }
  logout() {
    Session.logout();
    this.navigateStart();
  }
  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        {/* Top layout */}
        <ImageBackground
          source={require('../assets/images/bg_dashboard_top.png')}
          style={styles.top}>
          <View style={styles.top_left}>
            <Image
              source={require('../assets/images/bg_dashboard_top_left.png')}
              style={styles.img_bg_top}
            />
          </View>

          <View style={styles.top_center}>
            <Avatar
              containerStyle={styles.avatar}
              size={this.state.width / 3}
              rounded
              center
              source={{
                uri:
                  'https://adminconsole.quizzito.com/public/assets/img/profile/' +
                  this.state.userProfile.photo,
              }}
            />
            <LinearGradient
              colors={['#F99C3F', '#FE31C4']}
              style={[
                styles.username_gradient,
                {marginTop: this.state.width / 30},
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text
                style={[
                  styles.username_text,
                  {fontSize: this.state.width / 23},
                ]}>
                {this.state.userProfile.f_name +
                  ' ' +
                  this.state.userProfile.l_name}
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.top_right}>
            <Image
              source={require('../assets/images/bg_dashboard_top_right.png')}
              style={styles.img_bg_top_right}
            />
          </View>
        </ImageBackground>

        {/* Middle layout */}
        <View style={[styles.middle, {marginTop: this.state.width / 15}]}>
          <View style={styles.bookread_box}>
            <Image
              source={require('../assets/images/bookread_icon.png')}
              style={[
                styles.bookread_icon,
                {width: this.state.width / 9, height: this.state.width / 12},
              ]}
            />
            <Text style={{fontSize: this.state.width / 40, color: 'black'}}>
              {i18n.t('books_read')}
            </Text>
            <Text style={{fontSize: this.state.width / 20, color: 'black'}}>
              {this.state.userResult && this.state.userResult.total_books}
            </Text>
          </View>
          <View style={styles.ranking_box}>
            <Image
              source={require('../assets/images/ranking_icon.png')}
              style={[
                styles.ranking_icon,
                {width: this.state.width / 7, height: this.state.width / 10},
              ]}
            />
            <Text style={{fontSize: this.state.width / 35, color: 'black'}}>
              {i18n.t('ranking_label')}
            </Text>
            <Text style={{fontSize: this.state.width / 15, color: 'black'}}>
              {this.state.userResult && this.state.userResult.rank}
            </Text>
          </View>
          <View style={styles.points_box}>
            <Image
              source={require('../assets/images/points_icon.png')}
              style={[
                styles.points_icon,
                {width: this.state.width / 9, height: this.state.width / 12},
              ]}
            />
            <Text style={{fontSize: this.state.width / 40, color: 'black'}}>
              {i18n.t('points_label')}
            </Text>
            <Text style={{fontSize: this.state.width / 20, color: 'black'}}>
              {this.state.userResult && this.state.userResult.total_points}
            </Text>
          </View>
        </View>

        {/* bottom layout */}
        <View style={styles.bottom}>
          <ImageBackground
            source={require('../assets/images/bg_dashboard_bottom.png')}
            style={styles.img_bg_bottom}>
            <View style={styles.logout_box}>
              <TouchableHighlight
                style={[
                  styles.logout_circle,
                  {
                    width: this.state.width / 8,
                    height: this.state.width / 8,
                    borderRadius: this.state.width / 8 / 2,
                  },
                ]}
                onPress={() => this.logout()}>
                <Image
                  style={[
                    styles.logout_btn,
                    {
                      width: this.state.width / 12,
                      height: this.state.width / 12,
                    },
                  ]}
                  source={require('../assets/images/logout.png')}
                />
              </TouchableHighlight>
            </View>
            <TouchableOpacity
              style={styles.bottom_center_box}
              onPress={() => this.navigateToBooks()}>
              <Image
                style={styles.bottom_center_box_img}
                source={this.state.bird_img_src} //{require('../assets/images/complete_bird.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light_grey,
  },
  top: {
    width: '100%',
    height: '25%',
    paddingTop: 10,
    marginBottom: 10,
    //flex: .7,
    flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  top_left: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  top_center: {
    flex: 1,
    flexDirection: 'column',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  username_gradient: {
    marginBottom: 10,
    borderRadius: 50,
    padding: 5,
    width: '140%',
  },
  username_text: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',

    color: 'white',
  },
  top_right: {
    flex: 1,
    //justifyContent: 'center',
  },

  img_bg_top: {
    marginTop: -110,
    marginStart: -70,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  img_bg_top_right: {
    marginTop: 110,
    marginStart: 100,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  middle: {
    width: '85%',
    height: '45%',

    paddingStart: 30,
    paddingEnd: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookread_box: {
    flexDirection: 'column',
    height: '40%',
    width: '30%',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.grey_button,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ranking_box: {
    flexDirection: 'column',
    height: '80%',
    width: '40%',
    paddingTop: 20,
    paddingBottom: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  points_box: {
    flexDirection: 'column',
    height: '40%',
    width: '30%',
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.grey_button,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  bookread_icon: {
    resizeMode: 'contain',
  },
  ranking_icon: {
    resizeMode: 'contain',
  },

  points_icon: {
    resizeMode: 'contain',
  },

  bottom: {
    width: '100%',
    height: '30%',
    //flex: .5,
    flexDirection: 'row',
  },

  img_bg_bottom: {
    width: '100%',
    height: '100%',
    //flex: .5,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logout_circle: {
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 0.8,
    backgroundColor: colors.light_grey,
    borderColor: colors.book_card_border,
  },
  logout_btn: {
    resizeMode: 'contain',
    // width:60,
    // height:60,
  },
  logout_box: {
    position: 'absolute',
    bottom: 60,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  play_head_img: {
    marginTop: -150,
    marginStart: -25,
    resizeMode: 'cover',
    width: '120%',
    height: '120%',
  },
  bird_body: {},
  bottom_center_box: {
    alignSelf: 'center',
    bottom: '30%',
  },
  bottom_center_box_img: {
    alignSelf: 'center',
    width: Dimensions.get('screen').height * 0.2,
    height: Dimensions.get('screen').height * 0.2,
    resizeMode: 'contain',
  },
  play_head_box: {
    flex: 1,

    width: '100%',
    height: '100%',
  },
  avatar: {
    marginTop: 20,
    borderWidth: 10,
    borderColor: 'white',
  },
});
