/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import {SearchBar, Avatar, Button} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../res/value/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import i18n from 'i18n-js';

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

    this.state = {
      book: this.props.route.params.book,
    };
  }

  navigateStart() {
    const {navigate} = this.props.navigation;
    navigate('start_page');
  }
  logout() {
    Session.logout();
    this.navigateStart();
  }

  navigateToAbout() {
    const {navigate} = this.props.navigation;
    navigate('Home');
  }

  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  componentWillMount() {
    //loginController.getTest().then((  {result,message} ) => this.setState({ result:result,message: message }));
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#2187D5', '#1FA5E5']}
          style={styles.top_layout}>
          <Image
            source={require('../assets/images/ghost_book.png')}
            style={styles.ghost_book}
          />
          <Text style={styles.alert_text}>{this.state.book.message}</Text>
          <Button
            title={i18n.t('read') + ' ' + i18n.t('another_book')}
            titleStyle={styles.play_quiz_btn_title}
            containerStyle={styles.container_style_btn}
            //raised={true}
            onPress={() => {
              this.props.navigation.navigate('dashboard_page');
            }}
            buttonStyle={[styles.play_quiz]}
            ViewComponent={LinearGradient}
            linearGradientProps={{
              colors: ['#F99C3F', '#FE31C4'],
              start: {x: 0, y: 0},
              end: {x: 1, y: 0},
            }}
          />
        </LinearGradient>
        <View style={styles.bottom_layout}></View>
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
  },
  top_layout: {
    width: '100%',
    height: '90%',
  },
  bottom_layout: {
    width: '100%',
    height: '10%',
  },
  ghost_book: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '80%',
    height: '70%',
    marginTop: 40,
  },
  alert_text: {
    paddingRight: 35,
    lineHeight: 56,
    position: 'absolute',
    right: '0%',
    fontWeight: '500',
    textAlign: 'right',
    bottom: '8%',
    fontSize: 38,
    color: 'white',
    width: 250,
    height: 250,
  },
  container_style_btn: {
    marginTop: 30,
    //justifyContent: 'center',
    position: 'absolute',
    top: '93%',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
    height: 70,
    marginTop: 25,
  },
  play_quiz: {
    justifyContent: 'center',
    //alignItems: 'center',
    height: 60,
    width: '70%',
    borderRadius: 50,
    backgroundColor: colors.orange_book_level,
  },
  play_quiz_btn_title: {
    fontSize: 24,
  },
});
