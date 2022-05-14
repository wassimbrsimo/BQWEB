/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import StepIndicator from 'react-native-step-indicator';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import i18n from 'i18n-js';
import * as loginController from '../controllers/LoginController';

import * as userController from '../controllers/UserController';

import * as Session from '../prefs/Session';

// import ProgressCircle from 'react-native-progress-circle';
import {Button} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../res/value/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import lang from '../res/value/res_string/string';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const labels = [
  i18n.t('score_alert_1'),
  i18n.t('score_alert_2'),
  i18n.t('score_alert_3'),
  i18n.t('score_alert_4'),
  i18n.t('score_alert_5'),
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: '#fe7013',
};
type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);

    const {width, height} = Dimensions.get('window');
    if (width >= 600) {
    } else {
    }
    var postion = 0;
    if (
      parseFloat(this.props.route.params.quiz.quiz_performance_percentage) ==
      100
    ) {
      postion = 4;
    } else if (
      parseFloat(this.props.route.params.quiz.quiz_performance_percentage) >=
        70 &&
      parseFloat(this.props.route.params.quiz.quiz_performance_percentage) <= 90
    ) {
      postion = 3;
    } else if (
      parseFloat(this.props.route.params.quiz.quiz_performance_percentage) >=
        40 &&
      parseFloat(this.props.route.params.quiz.quiz_performance_percentage) <= 60
    ) {
      postion = 2;
    } else if (
      parseFloat(this.props.route.params.quiz.quiz_performance_percentage) >=
        10 &&
      parseFloat(this.props.route.params.quiz.quiz_performance_percentage) <= 30
    ) {
      postion = 1;
    } else {
      postion = 0;
    }
    this.state = {
      width,
      height,
      currentPosition: postion,
      quiz: this.props.route.params.quiz,
      userResult: {},
    };
  }
  navigateToAbout() {
    const {navigate} = this.props.navigation;
    navigate('Home');
  }
  navigateToAfterQuiz() {
    const {navigate} = this.props.navigation;
    navigate('after_quiz_1', {quiz: this.state.quiz});
  }
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  componentWillMount() {
    // userController.getReaderResults().then(({result,status})=> this.setState({userResult:result}) );
  }
  onPageChange(position) {
    this.setState({currentPosition: position});
  }
  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.alert_container}>
          <View
            style={{
              width: '100%',
              flex: 1.5,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <LinearGradient
              colors={['#F99C3F', '#FE31C4']}
              style={styles.green_bar}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
            <Text style={{fontSize: this.state.width / 25, letterSpacing: 5}}>
              RATING
            </Text>
            {/* <ProgressCircle
              percent={parseFloat(this.state.quiz.quiz_performance_percentage)} //TODO:hichem : replace value of the percentage here
              radius={this.state.width / 10}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff">
              <Text style={{fontSize: 18}}>
                {this.state.quiz.quiz_performance_percentage}
              </Text>
            </ProgressCircle> */}
            <View style={{width: '100%', marginTop: 20}}>
              <StepIndicator
                style={{width: '100%', flex: 1}}
                currentPosition={this.state.currentPosition}
                labels={labels}
                stepCount={5}
              />
            </View>
          </View>
          <ImageBackground
            source={require('../assets/images/bg_1.png')}
            style={styles.bg_alert}></ImageBackground>
          <View
            style={{
              width: '100%',
              flex: 0.3,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Button
              title="CONTINUE"
              titleStyle={{
                letterSpacing: 4,
                fontSize: this.state.width / 24,
              }}
              containerStyle={[
                styles.container_style_btn,
                {
                  width: this.state.width / 2.5,
                  height: this.state.width / 11,
                  marginTop: -(this.state.width / 10),
                },
              ]}
              //raised={true}
              onPress={() => {
                this.navigateToAfterQuiz();
              }}
              buttonStyle={[styles.start_btn]}
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
    paddingTop: 30,
    flexDirection: 'column',
    width: '80%',
    height: '60%',
    borderRadius: 25,

    alignItems: 'center',
    backgroundColor: 'white',
  },
  bg_alert: {
    flex: 0.7,
    flexDirection: 'column',
    width: '100%',
    height: '100%',

    borderRadius: 25,

    alignItems: 'center',
    backgroundColor: 'white',

    resizeMode: 'cover',
  },
  green_bar: {
    width: 200,
    height: 5,
    borderRadius: 5,
  },
  container_style_btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  start_btn: {
    justifyContent: 'center',
    //alignItems: 'center',
    // height:45,
    width: '100%',
    borderRadius: 50,
  },
});
