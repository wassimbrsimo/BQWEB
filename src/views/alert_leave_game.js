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

    this.state = {};
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
        <View style={styles.alert_container}>
          <Text style={styles.alert_title}>
            ARE YOU SURE THAT YOU WANT TO LEAVE ?
          </Text>
          <Image
            source={require('../assets/images/triangle_alert.png')}
            style={styles.read_play_img}
          />
          <Text style={styles.alert_msg_text}>
            You can return to complete the quiz later but you will lose the
            current question.
          </Text>
          <View style={styles.button_container}>
            <Button
              title={i18n.t('leave_btn')}
              titleStyle={styles.no_btn_title}
              type="clear"
            />
            <Button
              title={i18n.t('play_btn')}
              titleStyle={styles.play_quiz_btn_title}
              containerStyle={styles.container_style_btn}
              //raised={true}
              buttonStyle={[styles.yes_btn]}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#F99C3F', '#FE31C4'],
                start: {x: 0, y: 0},
                end: {x: 1, y: 0},
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
    opacity: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert_container: {
    padding: 30,
    flexDirection: 'column',
    width: '65%',
    height: '55%',
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'white',
  },
  alert_title: {
    color: colors.grey_button_text,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 2,
    marginTop: 20,
  },
  read_play_img: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  alert_msg_text: {
    justifyContent: 'space-between',
    fontSize: 20,
    textAlign: 'center',
    color: colors.grey_button_text,
    width: '100%',
    marginBottom: 20,
  },
  button_container: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',

    paddingTop: 20,
    borderTopWidth: 0.8,
    borderTopColor: colors.book_card_border,
  },
  container_style_btn: {
    marginStart: 20,
    //alignItems: 'right',
    borderRadius: 50,
    width: 100,
    height: 45,
  },
  yes_btn: {
    //justifyContent: 'center',
    //alignItems: 'center',
    height: 45,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.confirm_btn_green,
  },
  no_btn_title: {
    fontSize: 16,
    letterSpacing: 4,
    color: colors.grey_button_text,
  },
  play_quiz_btn_title: {
    fontSize: 16,
    letterSpacing: 4,
  },
});
