/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import i18n from 'i18n-js';

import {BackHandler} from 'react-native';

import * as quizController from '../controllers/QuizController';

import * as loginController from '../controllers/LoginController';
import * as Session from '../prefs/Session';

import {Button, ButtonGroup, ThemeConsumer} from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient';
import colors from '../res/value/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import lang from '../res/value/res_string/string';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Quiz from '../models/Quiz';
import {Overlay} from 'react-native-elements';
//import { NativeModules } from 'react-native';
//import console = require('console');
//import Quiz from '../models/Quiz';

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
    // lang checks
    var locale = 'fr_FR';
    /* if( Platform.OS === 'ios'){
   locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
   }else{
    locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"
   }*/
    var array = locale.split('_');
    var lang = array[0];
    if (lang === 'ar') {
      (is_ar = true),
        (trefl_left_side = require('../assets/images/trefl_left.png'));
      trefl_right_side = require('../assets/images/trefl_right.png');
    } else {
      (is_ar = false),
        (trefl_left_side = require('../assets/images/trefl_right.png'));
      trefl_right_side = require('../assets/images/trefl_left.png');
    }
    (this.quiz_id = this.props.route.params.quiz_id),
      (this.battel_id = 'V9zqM8KYZWQYBZ1a');
    this.play_mode = 'battle_selected';

    let quiznew = new Quiz();
    const {width, height} = Dimensions.get('window');
    if (width >= 600) {
      (emoji_w = 53),
        (emoji_h = 51),
        (alert_msg_fs = 17),
        (alert_title_fs = 20),
        (alert_img_s = 230),
        (alert_btn_txt_s = 18),
        (alert_w = 400),
        (alert_h = 600),
        (alert_yes_w = 130),
        (alert_yes_h = 45);
    } else {
      (emoji_w = 33),
        (emoji_h = 31),
        (alert_msg_fs = 12),
        (alert_title_fs = 15),
        (alert_img_s = 120),
        (alert_btn_txt_s = 13),
        (alert_w = 220),
        (alert_h = 430),
        (alert_yes_w = 90),
        (alert_yes_h = 33);
    }
    this.state = {
      leavel: false,
      timer: 60,
      width,
      height,
      emoji_w,
      emoji_h,
      alert_msg_fs,
      alert_title_fs,
      alert_img_s,
      alert_w,
      alert_h,
      alert_yes_w,
      alert_yes_h,
      alert_btn_txt_s,
      trefl_left_side,
      trefl_right_side,
      showBtnConfirm: false,
      selectedIndex: -1,
      progress: 100,
      progressWithOnComplete: 0,
      progressCustomized: 0,
      quiz: quiznew,
      answers: ['Answer 1', 'Answer 2', 'Answer 3'],
      isCorrectAnswer: false,
      selected_answer_style: styles.selected_answer,
      questionCounterGradientStartColor: '#E9E9E9',
      questionCounterGradientEndColor: '#E9E9E9',

      questionNumber: 0,
      listQuestionStatus: [
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
        {img: require('../assets/images/emptyemoji.png')},
      ],
      listQuestionIndicator: [
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
        {img: require('../assets/images/mothaleth_faregh.png')},
      ],
    };

    this.updateIndex = this.updateIndex.bind(this);
  }

  increase = (key, value) => {
    this.setState({
      [key]: this.state[key] + value,
    });
  };
  updateIndex(selectedIndex) {
    if (this.state.selectedIndex == -1 || this.state.showBtnConfirm) {
      this.setState({selectedIndex});
      this.state.showBtnConfirm = true;
    }
  }

  navigateToAbout() {
    const {navigate} = this.props.navigation;
    navigate('Home');
  }
  navigateToAlertAffterQuiz(quiz) {
    this.clockCall = null;
    const {navigate} = this.props.navigation;
    this.backHandler.remove();
    navigate('alert_after_quiz', {quiz: quiz});
  }

  leaveGame() {
    this.clockCall = null;
    //this.validateAnswerTimerfalse();
    this.setState({leavel: false});
    this.logout();
  }
  navigateStart() {
    const {navigate} = this.props.navigation;
    navigate('start_page');
  }
  logout() {
    Session.logout();
    this.navigateStart();
  }
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };

  startTimerPlayQuiz = () => {
    this.clockCall = setInterval(() => {
      this.onTimerFincher();
    }, 1000);
  };
  onTimerFincher = () => {
    if (this.state.timer === 0) {
      //this false reponce
      this.validateAnswerTimerfalse();
    }
    this.setState(prevstate => ({
      timer: prevstate.timer - 1,
      progress: prevstate.progress - 1.66,
    }));
  };

  componentWillMount() {
    quizController
      .initQuiz(this.play_mode, this.quiz_id, this.battel_id)
      .then(({status, result}) => this.initQuiz(result));
  }
  componentDidMount() {
    this.startTimerPlayQuiz();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.setState({leavel: true});
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  resetViewForTheNextQuestion() {
    this.setGradientColor(false);
    this.setState({showBtnConfirm: false});

    this.setState({selected_answer_style: styles.selected_answer});
    this.setState({isCorrectAnswer: false});
  }

  showQuestion(quiz) {
    //alert(JSON.stringify(quiz));

    if (this.state.questionNumber <= quiz.nbr_questions_per_quiz) {
      this.resetViewForTheNextQuestion();
      var answers = [
        quiz.answers[0].text,
        quiz.answers[1].text,
        quiz.answers[2].text,
      ];
      this.setState({
        quiz: quiz,
        answers: answers,
        questionNumber: quiz.answers_status_table.length + 1,
        selectedIndex: -1,
        timer: quiz.nbr_sec_per_question,
        progress: 100,
      });
      //SharedPreferences.setItem("session_ci", quiz.session_id);
      //to do hamid show button confirm
      this.setState({showBtnConfirm: false});
    } else {
      this.navigateToAlertAffterQuiz(quiz);
    }
  }
  initQuiz(quiz) {
    if (quiz.status != 'fail') {
      this.setState({
        quiz: quiz,
        questionNumber: quiz.answers_status_table.length + 1,
        timer: quiz.nbr_sec_per_question,
      });

      for (var i = 0; i < quiz.answers_status_table.length; i++) {
        if (quiz.answers_status_table[i] == true) {
          this.showEmoji(i, true);
          // this.state.listQuestionStatus[i].img=require('../assets/images/happyemoji.png');
        } else {
          this.showEmoji(i, false);
          // this.state.listQuestionStatus[i].img=require('../assets/images/sademoji.png');
        }
      }
      var answers = [
        quiz.answers[0].text,
        quiz.answers[1].text,
        quiz.answers[2].text,
      ];
      this.setState({answers: answers});

      Session.setSessionId(quiz.session_id);
    } else {
      alert(quiz.message);
    }
  }
  validateAnswerTimerfalse() {
    var answerId = 0;
    this.setState({showBtnConfirm: false});
    this.setState({isCorrectAnswer: false});
    this.setState({selected_answer_style: styles.selected_wrong_answer});
    this.showEmoji(this.state.questionNumber - 1, false);
    this.setGradientColor(false);

    setTimeout(() => {
      //TODO:@Hichem IMPORTANT !!! we need to deactivate all click during this
      this.nextQuestion(answerId);
    }, 1000);
  }
  validateAnswer() {
    //to do  hamid  hide button confirm
    if (this.state.selectedIndex !== -1) {
      //user selected an answer
      this.setState({showBtnConfirm: false});
      var answerId = this.state.quiz.answers[this.state.selectedIndex].order_a; //get selected answer ID
      if (
        this.state.quiz.answers[this.state.selectedIndex].IsCorrect == 'true'
      ) {
        //check if the selected answer is correct
        this.setState({isCorrectAnswer: true});
        this.setState({selected_answer_style: styles.selected_right_answer});
        this.showEmoji(this.state.questionNumber - 1, true);
        this.setGradientColor(true);
      } else {
        this.setState({isCorrectAnswer: false});
        this.setState({selected_answer_style: styles.selected_wrong_answer});
        this.showEmoji(this.state.questionNumber - 1, false);
        this.setGradientColor(false);
      }
      setTimeout(() => {
        //TODO:@Hichem IMPORTANT !!! we need to deactivate all click during this
        this.nextQuestion(answerId);
      }, 1000);
    }
  }

  nextQuestion(answerId) {
    console.log('NEXT QUESTION ID ', answerId);
    //send the answerID to quizcontroller and run showNextQuestion
    quizController
      .nextQuestion(answerId, this.quiz_id)
      .then(({messager, result}) => this.showQuestion(result));
  }

  showEmoji(questionIndex, right_answer) {
    var happy_emoji = '../assets/images/happyemoji.png';
    var sad_emoji = '../assets/images/sademoji.png';
    var mothaleth = '../assets/images/mothaleth.png';
    var mothaleth_faregh = '../assets/images/mothaleth_faregh.png';
    if (right_answer) {
      this.state.listQuestionStatus[questionIndex].img = require(happy_emoji);
      this.state.listQuestionIndicator[
        questionIndex
      ].img = require(mothaleth_faregh);
      if (this.state.quiz.nbr_questions_per_quiz > questionIndex + 1)
        this.state.listQuestionIndicator[
          questionIndex + 1
        ].img = require(mothaleth);
    } else {
      this.state.listQuestionStatus[questionIndex].img = require(sad_emoji);
      this.state.listQuestionIndicator[
        questionIndex
      ].img = require(mothaleth_faregh);
      if (this.state.quiz.nbr_questions_per_quiz > questionIndex + 1)
        this.state.listQuestionIndicator[
          questionIndex + 1
        ].img = require(mothaleth);
    }
  }

  //change the color of the container of the question counter (set it to green if correct answer)
  setGradientColor(right_answer) {
    if (right_answer) {
      this.setState({
        questionCounterGradientStartColor: '#27C236',
        questionCounterGradientEndColor: '#26C135',
      });
    } else {
      this.setState({
        questionCounterGradientEndColor: '#E9E9E9',
        questionCounterGradientStartColor: '#E9E9E9',
      });
    }
  }

  generateImageStauts() {
    var imageStatus = [];

    for (var i = 0; i < this.state.quiz.nbr_questions_per_quiz; i++) {
      imageStatus.push(
        <Image
          key={'imageStatus' + i}
          source={this.state.listQuestionStatus[i].img}
          style={{
            width: this.state.emoji_w,
            height: this.state.emoji_h,
          }}
        />,
      );
    }
    return imageStatus;
  }
  generateCurrentQuestionIndicator() {
    var iconStatus = [];

    for (var i = 0; i < this.state.quiz.nbr_questions_per_quiz; i++) {
      iconStatus.push(
        <View
          key={'iconStatus' + i}
          style={{
            width: this.state.emoji_w,
            height: this.state.emoji_h,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: this.state.emoji_w / 4,
              height: this.state.emoji_h / 4,
            }}
            source={this.state.listQuestionIndicator[i].img}
          />
        </View>,
      );
    }
    return iconStatus;
  }
  _renderConfirm() {
    if (this.state.showBtnConfirm) {
      return (
        <Button
          title="CONFIRM"
          titleStyle={[
            styles.start_btn_title,
            {fontSize: this.state.width / 22},
          ]}
          containerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            width: this.state.width / 2,
            height: this.state.width / 9,
            marginBottom: this.state.width / 10,
            marginTop: this.state.width / 12,
          }}
          raised={true}
          onPress={() => {
            this.validateAnswer();
          }}
          buttonStyle={[
            styles.start_btn,
            {
              width: this.state.width / 2,
              height: this.state.width / 9,
              //width: "100%",
            },
          ]}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const {selectedIndex} = this.state;
    const barWidth = 300; //Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
    return (
      <View style={styles.container}>
        <Overlay
          overlayStyle={styles.alert_container}
          height={'55%'}
          width={'65%'}
          isVisible={this.state.leavel}>
          <Text
            style={[styles.alert_title, {fontSize: this.state.alert_title_fs}]}>
            {i18n.t('msg_leave_game_title')}
          </Text>
          <Image
            source={require('../assets/images/triangle_alert.png')}
            style={{
              width: this.state.alert_img_s,
              height: this.state.alert_img_s,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={[
              styles.alert_msg_text,
              {fontSize: this.state.alert_msg_fs},
            ]}>
            {i18n.t('msg_leave_game')}
          </Text>
          <View style={styles.button_container}>
            <Button
              title={i18n.t('leave_btn')}
              titleStyle={[
                styles.no_btn_title,
                {
                  fontSize: this.state.alert_btn_txt_s,
                },
              ]}
              type="clear"
              onPress={() => {
                this.leaveGame();
              }}
            />
            <Button
              title={i18n.t('play_btn')}
              titleStyle={{
                fontSize: this.state.alert_btn_txt_s,
                letterSpacing: 3,
              }}
              containerStyle={[
                styles.container_style_btn,
                {
                  width: this.state.alert_yes_w,
                  height: this.state.alert_yes_h,
                },
              ]}
              //raised={true}
              buttonStyle={[
                styles.yes_btn,
                {
                  width: this.state.alert_yes_w,
                  height: this.state.alert_yes_h,
                },
              ]}
              ViewComponent={LinearGradient}
              linearGradientProps={{
                colors: ['#F99C3F', '#FE31C4'],
                start: {x: 0, y: 0},
                end: {x: 1, y: 0},
              }}
              onPress={() => {
                this.setState({leavel: false});
              }}
            />
          </View>
        </Overlay>
        {/* top view */}
        <View style={styles.radius_view}>
          <ImageBackground
            source={require('../assets/images/bg_5.png')}
            style={styles.img_bg_container}>
            {/* emoji layout TODO @Hishem  control based on the answer and the current question position */}
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                flex: 0.1,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 7,
              }}>
              {this.generateImageStauts()}
            </View>
            {/* layout of almothaleth TODO @Hishem  move the mothaleth png with the current question position*/}
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                flex: 0.1,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: -10,
              }}>
              {this.generateCurrentQuestionIndicator()}
            </View>
            <View
              style={{
                width: '90%',
                height: 7,
                borderRadius: 5,
                height: 5,
                backgroundColor: colors.orange_book_level,
                marginTop: 7,
              }}></View>

            {/* question counter container  */}
            <View style={styles.question_counter_container}>
              {/* trefle to show if the answer is right  in the right side */}
              {this.state.isCorrectAnswer ? (
                <Image
                  source={this.state.trefl_right_side}
                  style={{width: 38, height: 53, marginEnd: 30}}
                />
              ) : null}

              <LinearGradient
                colors={[
                  this.state.questionCounterGradientStartColor,
                  this.state.questionCounterGradientEndColor,
                ]}
                //colors={['#F99C3F', '#FE31C4']}

                style={styles.question_counter}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View
                  style={{
                    width: 98,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.question_number}>
                    {' '}
                    {this.state.questionNumber}{' '}
                  </Text>
                  <Text style={styles.question_number}> / </Text>
                  <Text style={styles.question_number}>
                    {' '}
                    {this.state.quiz.nbr_questions_per_quiz}{' '}
                  </Text>
                </View>
                <View
                  style={{
                    width: '85%',
                    height: 8,
                    borderRadius: 8,
                    backgroundColor: 'white',
                    position: 'relative',
                    top: 18,
                  }}></View>
                <Image
                  source={require('../assets/images/cha7ta.png')}
                  style={{width: 66, height: 66, marginTop: -10}}
                />
              </LinearGradient>
              {/* trefle to show if the answer is right in the left side  */}

              {this.state.isCorrectAnswer ? (
                <Image
                  source={this.state.trefl_left_side}
                  style={{width: 38, height: 53, marginStart: 30}}
                />
              ) : null}
            </View>
            {/* question container */}

            <Text
              style={{
                width: '70%',
                textAlign: 'center',
                color: colors.grey_button_text,
                fontSize: this.state.width / 27,
                flex: 0.5,
                marginTop: this.state.width / 10,
              }}>
              {this.state.quiz.question}
            </Text>
            {/* answers button group */}
            <View
              style={{
                width: '90%',
                flex: 1.5,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={this.state.answers}
                containerBorderRadius={20}
                buttonStyle={[
                  styles.btn_answer,
                  {
                    height: 80,
                    margin: 10,
                  },
                ]}
                containerStyle={styles.btn_grp_container}
                selectedButtonStyle={this.state.selected_answer_style}
                selectedTextStyle={styles.selected_text}
                textStyle={{
                  fontSize: this.state.alert_msg_fs,
                  textAlign: 'center',
                  paddingEnd: 7,
                  paddingStart: 7,
                  color: colors.grey_button_text,
                }}
              />
            </View>
            {this._renderConfirm()}
          </ImageBackground>
        </View>
        {/* bottom view forr the timer  */}
        <View style={styles.bottom_container}>
          <ProgressBarAnimated
            width={barWidth}
            value={this.state.progress}
            backgroundColorOnComplete="#6CC644"
            backgroundColor={colors.confirm_btn_green}
            borderWidth={5}
            height={20}
            borderRadius={20 / 2}
            borderColor="white"
            underlyingColor="white"
          />

          <View style={styles.buttonContainer}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 60 / 2,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                buttonStyle={{
                  width: 37,
                  height: 37,
                  borderRadius: 37 / 2,
                  backgroundColor: colors.orange_book_level,
                }}
                onPress={this.increase.bind(this, 'progress', 20)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    flex: 1,

    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_1,
  },
  img_bg_container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    resizeMode: 'contain',
    borderRadius: 20,
    paddingTop: 20,
  },
  bottom_container: {
    flexDirection: 'row',
    flex: 0.1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    resizeMode: 'center',
    backgroundColor: colors.blue_1,
  },
  radius_view: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'white',
  },
  question_counter: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 182,
    height: 101,
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 30,
    borderRadius: 15,
  },
  question_number: {
    fontSize: 27,
    color: 'white',
    fontWeight: 'bold',
  },
  question_counter_container: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 33,
    justifyContent: 'center',
  },
  answer_text: {
    fontSize: 17,
    color: colors.grey_button_text,
  },
  btn_grp_container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
  },
  btn_answer: {
    backgroundColor: colors.light_grey,
    borderRadius: 15,
  },
  selected_answer: {
    backgroundColor: colors.orange_book_level,
  },
  selected_wrong_answer: {
    backgroundColor: colors.red,
  },
  selected_right_answer: {
    backgroundColor: colors.confirm_btn_green,
  },
  selected_text: {
    color: 'white',
  },

  start_btn: {
    justifyContent: 'center',
    //alignItems: 'center',

    backgroundColor: colors.confirm_btn_green,
    borderRadius: 50,
  },
  start_btn_title: {
    letterSpacing: 4,
    fontSize: 20,
  },
  buttonContainer: {
    marginStart: -10,
  },
  alert_container: {
    padding: 30,
    flexDirection: 'column',

    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'white',
  },
  alert_title: {
    color: colors.grey_button_text,
    //fontSize: 24,
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
    //fontSize: 20,
    textAlign: 'center',
    color: colors.grey_button_text,
    width: '100%',
    marginBottom: 20,
  },
  button_container: {
    height: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',

    paddingTop: 20,
    borderTopWidth: 0.8,
    borderTopColor: colors.book_card_border,
  },
  container_style_btn: {
    marginStart: 20,
    //alignItems: 'right',
    borderRadius: 50,
  },
  yes_btn: {
    //justifyContent: 'center',
    //alignItems: 'center',
    // height: 45,
    // width: 100,
    borderRadius: 50,
    backgroundColor: colors.confirm_btn_green,
  },
  no_btn_title: {
    // fontSize: 16,
    letterSpacing: 4,
    color: colors.grey_button_text,
  },
  play_quiz_btn_title: {
    //fontSize: 16,
    letterSpacing: 4,
  },
});
