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
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import * as loginController from '../controllers/LoginController';

import {SearchBar, Avatar, Button} from 'react-native-elements';
import i18n from 'i18n-js';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../res/value/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Session from '../prefs/Session';
import * as userController from '../controllers/UserController';
import {BackHandler} from 'react-native';
//import { NativeModules } from 'react-native';
import lang from '../res/value/res_string/string';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(props));
    var locale = 'fr_FR';
    /* if( Platform.OS === 'ios'){
    locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
    }else{
     locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"
    }*/
    var array = locale.split('_');
    var lang = array[0];

    if (lang === 'ar') {
      is_ar = true;
    } else {
      is_ar = false;
    }
    const {width, height} = Dimensions.get('window');
    if (width >= 600) {
      (user_info_box_w = 399),
        (user_info_box_h = 100),
        (width_username = 372),
        (start_margin_username = -10),
        (search_container_w = 500),
        (search_container_h = 60),
        (padding_start_arrow = '7%');
    } else {
      (user_info_box_w = 260),
        (user_info_box_h = 80),
        (start_margin_username = -10),
        (width_username = 260),
        (search_container_w = 320),
        (search_container_h = 45),
        (padding_start_arrow = '4%');
    }
    this.state = {
      width,
      height,
      width_username,
      start_margin_username,
      user_info_box_h,
      user_info_box_w,
      search_container_w,
      search_container_h,
      is_ar,
      padding_start_arrow,
      result: true,
      message: '',
      search: '',
      avatar: '',
      name: '',
      userResult: this.props.route.params && this.props.route.params.userResult,
    };
  }
  updateSearch = search => {
    this.navigateFindBook();
  };
  navigateFindBook = () => {
    const {navigate} = this.props.navigation;
    navigate('Book_list_container', {userResult: this.state.userResult});
  };

  navigateScaneBook = () => {
    const {navigate} = this.props.navigation;
    navigate('book_qrcode');
  };
  returnToDashboard = () => {
    const {navigate} = this.props.navigation;
    navigate('dashboard_page');
  };
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  async componentWillMount() {
    // loginController.getAllHeroes().then(({ result, message }) => this.setState({result:result, message: message }));
    //loginController.getTest().then((  {result,message} ) => this.setState({ result:result,message: message }));
    await Session.getAvatar().then(value => this.setState({avatar: value}));
    await Session.getFullName().then(value => this.setState({name: value}));
  }

  componentWillUnmount() {}

  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FFFFFF', '#F2F2F2']}
          style={{width: '100%', height: '100%', flexDirection: 'column'}}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <ImageBackground
            source={require('../assets/images/bg_book_search.png')}
            style={styles.img_bg_container}>
            <View style={styles.top}>
              <View
                style={{
                  width: '17%',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  paddingStart: 20,
                  paddingBottom: '25%',
                }}>
                {
                  //back arrow is in the left side when the lang is not ar
                  !this.state.is_ar ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.returnToDashboard();
                      }}>
                      <Image
                        source={require('../assets/images/arrow_orange_left.png')}
                        style={{
                          resizeMode: 'contain',
                          width: this.state.width / 20,
                          height: this.state.width / 25,
                        }}
                      />
                    </TouchableOpacity>
                  ) : null
                }
              </View>

              {/*box of the avatar + username + stat box  */}
              <LinearGradient
                colors={['#F89f00', '#E519ab']}
                style={[
                  styles.info_box,
                  {
                    height: this.state.user_info_box_h, //this.state.width/5,
                    width: this.state.user_info_box_w, //</View>this.state.width/1.5
                  },
                ]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View style={styles.reader_info_box}>
                  <View
                    style={[
                      styles.avatar_circle,
                      {
                        width: this.state.width / 9,
                        height: this.state.width / 9,
                        borderRadius: this.state.width / 9 / 2,
                        marginStart: this.state.start_margin_username,
                      },
                    ]}>
                    <Avatar
                      containerStyle={styles.avatar}
                      size={this.state.width / 10}
                      rounded
                      center
                      source={{
                        uri:
                          'https://adminconsole.quizzito.com/public/assets/img/profile/' +
                          this.state.avatar,
                      }}
                    />
                  </View>
                  <LinearGradient
                    colors={['#F99C3F', '#FE31C4']}
                    style={[
                      styles.username_gradient,
                      {
                        width: this.state.width_username,
                        marginTop: -6,
                        borderRadius: 25,
                      },
                    ]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text
                      style={[
                        styles.username_text,
                        {
                          fontSize: this.state.width / 23,
                          width: '100%',
                        },
                      ]}>
                      {this.state.name}
                    </Text>
                  </LinearGradient>
                </View>
                {/* stat box */}

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <View style={styles.stat_cell}>
                    <Image
                      source={require('../assets/images/ranking_icon.png')}
                      style={[
                        styles.stat_icon,
                        {
                          width: this.state.width / 16,
                          height: this.state.width / 16,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.stat_numbers,
                        {fontSize: this.state.width / 26},
                      ]}>
                      {this.state.userResult && this.state.userResult.rank}
                    </Text>
                  </View>
                  <View style={styles.stat_cell}>
                    <Image
                      source={require('../assets/images/bookread_icon.png')}
                      style={[
                        styles.stat_icon,
                        {
                          width: this.state.width / 16,
                          height: this.state.width / 16,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.stat_numbers,
                        {fontSize: this.state.width / 26},
                      ]}>
                      {this.state.userResult &&
                        this.state.userResult.total_books}
                    </Text>
                  </View>
                  <View style={styles.stat_cell}>
                    <Image
                      source={require('../assets/images/points_icon.png')}
                      style={[
                        styles.stat_icon,
                        {
                          width: this.state.width / 16,
                          height: this.state.width / 16,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.stat_numbers,
                        {fontSize: this.state.width / 26},
                      ]}>
                      {this.state.userResult &&
                        this.state.userResult.total_points}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
              {
                //back arrow is in the right side when the lang is ar
                this.state.is_ar ? (
                  <View
                    style={{
                      width: '17%',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      paddingStart: this.state.padding_start_arrow,
                      paddingBottom: '15%',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.returnToDashboard();
                      }}>
                      <Image
                        source={require('../assets/images/arrow_orange_left.png')}
                        style={{
                          resizeMode: 'contain',
                          width: this.state.width / 20,
                          height: this.state.width / 25,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null
              }
            </View>

            {/* layout for the search bar */}
            <View
              style={{
                width: '100%',
                height: '3%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.navigateFindBook();
                }}>
                <SearchBar
                  //placeholder="Type Here..."
                  onChangeText={this.updateSearch}
                  value={search}
                  onPress={() => {
                    this.navigateFindBook();
                  }}
                  searchIcon={
                    <Icon
                      name="search"
                      size={this.state.width / 20}
                      iconStyle={styles.searchIconStyle}
                    />
                  }
                  containerStyle={{
                    width: this.state.search_container_w,
                    height: this.state.search_container_h,
                    padding: -20,
                    backgroundColor: 'transparent',
                    borderWidth: 0.8,
                    borderColor: colors.book_card_border,
                    borderRadius: 50,
                  }} //{[styles.ContainerStyle,]}
                  inputContainerStyle={{
                    width: this.state.search_container_w,
                    height: this.state.search_container_h + 2,
                    marginTop: -2,
                    backgroundColor: 'white',
                    borderWidth: 0.8,
                    borderColor: colors.book_card_border,
                    borderRadius: 50,
                  }} //{[styles.inputContainerStyle,]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.bottom_layout}>
              <View style={styles.scan_book_layout}>
                <Image
                  source={require('../assets/images/bg_book_scan.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
                {/* <Image source={require('../assets/images/qr_code.jpg')} style={styles.qr_code}/>
                <Text style={styles.qr_code_text}>Pick a book with its QR Code</Text> */}

                <Button
                  title={i18n.t('pick_a_book_btn')}
                  titleStyle={[
                    styles.play_quiz_btn_title,
                    {fontSize: this.state.width / 20},
                  ]}
                  containerStyle={[
                    styles.container_style_btn,
                    {height: this.state.width / 10},
                  ]}
                  //raised={true}
                  onPress={() => {
                    this.navigateScaneBook();
                  }}
                  buttonStyle={[
                    styles.play_quiz,
                    {height: this.state.width / 10},
                  ]}
                />
                {/* <BooksListView books={books}  navigation={this.props.navigation} /> */}
              </View>
            </View>
          </ImageBackground>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchIconStyle: {
    color: colors.search_icon,
  },
  container: {
    width: '100%',
    flex: 1,
    paddingTop: 20,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.book_card_bg,
  },
  img_bg_container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  top: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ContainerStyle: {
    width: '80%',
    //height:54,
    backgroundColor: 'white',
    borderWidth: 0.8,
    borderColor: colors.book_card_border,
    borderRadius: 50,
  },
  inputContainerStyle: {
    width: '100%',
    backgroundColor: 'white',
  },
  bottom_layout: {
    flex: 1.5,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    borderColor: 'white',
  },
  scan_book_layout: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
  bg_scan_book: {
    width: '100%',
    height: '100%',
  },
  container_style_btn: {
    position: 'absolute',
    left: '20%',
    top: '58%',
    borderRadius: 50,
    width: '90%',
    marginTop: 5,
  },
  play_quiz: {
    justifyContent: 'center',
    height: 60,
    width: '70%',
    borderRadius: 50,
  },
  play_quiz_btn_title: {
    letterSpacing: 4,
  },

  // info box reader + stat in the top
  reader_info_box: {
    flexDirection: 'row',
    width: '100%',
    height: '40%',
    // marginTop:-4,
    // marginStart:-20,
    alignItems: 'center',
    borderRadius: 23,
  },
  info_box: {
    width: '65%',
    marginBottom: 20,
    flexDirection: 'column',
    borderRadius: 20,
  },

  avatar_container: {
    borderWidth: 10,
    borderColor: 'white',
  },
  avatar_circle: {
    marginTop: -10,
    marginEnd: -30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1000,
  },

  name_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  stat_cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stat_numbers: {
    color: 'white',
  },
  stat_icon: {
    marginEnd: 10,
    resizeMode: 'contain',
  },
  username_gradient: {
    paddingTop: 6,
    paddingStart: 15,
    paddingEnd: 15,
    paddingBottom: 6,
  },
  username_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});
