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
  Dimensions,
} from 'react-native';
import i18n from 'i18n-js';

import {SearchBar, Avatar, Button} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../res/value/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import lang from '../res/value/res_string/string';
import {BackHandler} from 'react-native';

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);
    this.quiz_id = this.props.route.params.quiz_id;

    const {width, height} = Dimensions.get('window');
    this.state = {
      width,
      height,
    };
  }
  navigateToAbout() {
    const {navigate} = this.props.navigation;
    navigate('Home');
  }
  playQuiz() {
    const {navigate} = this.props.navigation;
    navigate('play_quiz', {quiz_id: this.quiz_id});
  }
  navigateToBooks() {
    const {navigate} = this.props.navigation;
    navigate('Book_list_container', {
      userResult: '',
    });
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
          <Text
            style={[
              styles.alert_title,
              {
                fontSize: 35,
              },
            ]}>
            {i18n.t('confirmation')}
          </Text>
          <Image
            source={require('../assets/images/confirm_play.png')}
            style={{
              width:350,
              height: 350,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={[
              styles.alert_msg_text,
              {
                fontSize:35,
              },
            ]}>
            {i18n.t('msg_confirm_play_quiz')}
          </Text>
          <View style={styles.button_container}>
            <Button
              title={i18n.t('no_btn')}
              titleStyle={[
                styles.no_btn_title,
                {
                  fontSize: 35,
                },
              ]}
              type="clear"
              onPress={() => {
                this.navigateToBooks();
              }}
              r
            />
            <Button
              title={i18n.t('yes_btn')}
              titleStyle={{
                fontSize:35,
              }}
              containerStyle={[
                styles.container_style_btn,
                {
                  width: 150,
                  height: 50,
                },
              ]}
              raised={true}
              onPress={() => {
                this.playQuiz();
              }}
              buttonStyle={[
                styles.yes_btn,
                {
                  width: 150,
                  height: 50,
                },
              ]}
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
    width: '70%',
    height: '50%',
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'white',
  },
  alert_title: {
    color: colors.grey_button_text,
    letterSpacing: 3,
  },

  alert_msg_text: {
    justifyContent: 'space-between',
    fontSize: 22,
    textAlign: 'center',
    color: colors.grey_button_text,
    width: '100%',
  },
  button_container: {
    height: '20%',
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
    // width:100,
    // height:45,
  },
  yes_btn: {
    //justifyContent: 'center',
    //alignItems: 'center',
    // height:45,
    // width:100,
    borderRadius: 50,
    backgroundColor: colors.confirm_btn_green,
  },
  no_btn_title: {
    color: colors.grey_button_text,
  },
});
