/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import i18n from "i18n-js";

import * as booksController from "../controllers/BooksController";

import BooksListView from "./list/books_list_view";

import Book from "../models/Book";

import * as userController from "../controllers/UserController";

import { SearchBar, Avatar, Button } from "react-native-elements";

import { LinearGradient } from "expo-linear-gradient";
import colors from "../res/value/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Session from "../prefs/Session";
import { BackHandler } from "react-native";
//import { NativeModules } from 'react-native';
import lang from "../res/value/res_string/string";
//import firebase  from 'react-native-firebase';

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);
    var locale = "fr_FR";
    /* if( Platform.OS === 'ios'){
    locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
    }else{
     locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"
    }*/
    var array = locale.split("_");
    var lang = array[0];

    let is_ar = lang === "ar";

    let user_info_box_w = 0;
    let user_info_box_h = 0;
    let width_username = 0;
    let start_margin_username = -10;
    let title_font_size = 30;
    let level_font_size = 17;
    let button_font_size = 23;
    const { width, height } = Dimensions.get("window");
    if (width >= 600) {
      (user_info_box_w = 399),
        (user_info_box_h = 100),
        (width_username = 372),
        (start_margin_username = -10),
        (title_font_size = 30),
        (level_font_size = 17),
        (button_font_size = 23);
    } else {
      (user_info_box_w = 260),
        (user_info_box_h = 80),
        (start_margin_username = -10),
        (width_username = 260),
        (title_font_size = 18),
        (level_font_size = 13),
        (button_font_size = 17);
    }
    this.state = {
      width,
      height,
      width_username,
      start_margin_username,
      user_info_box_h,
      user_info_box_w,
      button_font_size,
      title_font_size,
      is_ar,
      level_font_size,
      bookId: this.props.route.params.bookId,
      book: {},
      userProfile: {},
      userResult: {},
      avatar: "",
      name: "",
    };
  }
  navigateToAbout() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  navigateToBooks() {
    const { navigate } = this.props.navigation;
    navigate("Book_list_container", {
      userResult: this.state.userResult,
    });
  }
  playQuiz() {
    const { navigate } = this.props.navigation;
    navigate("play_quiz", { quiz_id: this.state.book.id });
  }
  navigateAlertPlayQuiz() {
    // firebase.analytics().logEvent("play_button", {"BookTitle": this.state.book.Title});
    const { navigate } = this.props.navigation;
    navigate("alert_play_quiz_confirmation", { quiz_id: this.state.bookId });
  }
  navigateToAlreadyPlyed(book) {
    const { navigate } = this.props.navigation;
    navigate("already_played_quiz", { book: book });
  }
  returnToDashboard = () => {
    const { navigate } = this.props.navigation;
    navigate("Book_list_container");
  };
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  componentWillMount() {
    userController
      .getReaderProfile()
      .then(({ result, status }) => this.initResultProfile(result));

    userController
      .getReaderResults()
      .then(({ result, status }) => this.initResultUser(result));

    booksController
      .getDetailBook(this.state.bookId)
      .then(({ result, status }) => this.initBook(result));
  }
  initResultUser(userResult) {
    this.setState({ userResult: userResult });
  }

  initResultProfile(userProfile) {
    this.setState({ userProfile: userProfile });
  }
  initBook(book) {
    if (book.status == "cannot_play") {
      this.navigateToAlreadyPlyed(book);
    } else {
      this.setState({ book: book.kitab });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Top Layout  */}
        <View style={styles.top}>
          <View
            style={{
              flex: 1,
            }}
          >
            {
              //back arrow is in the left side when the lang is not ar
              !this.state.is_ar ? (
                <TouchableOpacity
                  onPress={() => {
                    this.returnToDashboard();
                  }}
                >
                  <Image
                    source={require("../assets/images/arrow_orange_left.png")}
                    style={{
                      resizeMode: "contain",
                      width: this.state.width / 20,
                      height: this.state.width / 25,
                    }}
                  />
                </TouchableOpacity>
              ) : null
            }
          </View>
          {/*box of the avatar + username + stat box  */}

          <View style={styles.reader_info_box}>
            {
              //back arrow is in the right side when the lang is ar
              this.state.is_ar ? (
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.returnToDashboard();
                    }}
                  >
                    <Image
                      source={require("../assets/images/arrow_orange_left.png")}
                      style={{
                        resizeMode: "contain",
                        width: this.state.width / 20,
                        height: this.state.width / 25,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              ) : null
            }
          </View>
          <View style={{ flex: 1 }} />
        </View>

        {/* Bottom layout */}
        <View style={styles.bottom_layout}>
          {/* title + level + cover */}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1.5,
            }}
          >
            <Text
              style={[
                styles.book_title,
                {
                  //fontSize:(this.state.book.Title.length >= 40)?this.state.width/24:this.state.width/20
                  fontSize: this.state.title_font_size,
                },
              ]}
            >
              {this.state.book.Title}
            </Text>
            <Text
              style={[
                styles.level_box,
                {
                  fontSize: this.state.level_font_size,
                  width: this.state.width / 4,
                },
              ]}
            >
              {i18n.t("level_label") + " : " + this.state.book.Class}
            </Text>

            <Image
              source={{ uri: this.state.book.img_path }}
              style={{
                borderRadius: 8,
                marginBottom: 10,
                resizeMode: "contain",
                alignSelf: "flex-start",
                height: "90%",
                aspectRatio: 1.5,
              }}
            />
            <View style={{ flex: 4 }}></View>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              flex: 0.5,
            }}
          >
            <Button
              title={i18n.t("start_btn")}
              titleStyle={[
                styles.play_quiz_btn_title,
                { fontSize: this.state.button_font_size },
              ]}
              containerStyle={[styles.container_style_btn_play_quiz]}
              raised={true}
              buttonStyle={[styles.play_quiz]}
              onPress={() => {
                this.navigateAlertPlayQuiz();
              }}
            />
            {this.state.book && this.state.book.Link && (
              <Button
                title={i18n.t("read")}
                // fontSize={28}
                titleStyle={[
                  styles.pic_other_book_btn_title,
                  {
                    fontSize: this.state.button_font_size,
                    flex: 1,
                    color: "green",
                  },
                ]}
                onPress={() => {
                  this.props.navigation.navigate("Read", {
                    book: this.state.book,
                  });
                }}
                containerStyle={[styles.container_style_btn_pic_other_book]}
                //raised={true}
                buttonStyle={[styles.pic_other_book]}
              />
            )}
            <Button
              title={i18n.t("pick_other_book")}
              // fontSize={28}
              titleStyle={[
                styles.pic_other_book_btn_title,
                { fontSize: this.state.button_font_size },
              ]}
              onPress={() => {
                this.navigateToBooks();
              }}
              containerStyle={[styles.container_style_btn_pic_other_book]}
              //raised={true}
              buttonStyle={[styles.pic_other_book]}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: 20,
    flexDirection: "column",
    //justifyContent: 'center',
    alignItems: "center",
  },
  top: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  ContainerStyle: {
    width: "80%",
    //height:54,
    backgroundColor: "white",
    borderWidth: 0.8,
    borderColor: colors.book_card_border,
    borderRadius: 50,
  },
  inputContainerStyle: {
    width: "100%",
    backgroundColor: "white",
  },
  view_list: {
    width: "90%",
    height: "70%",
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
    borderColor: "white",
    marginBottom: 20,
    padding: 20,
  },

  // info box reader + stat in the top
  reader_info_box: {
    flexDirection: "row",
    width: "100%",
    height: "40%",
    alignItems: "center",
    borderRadius: 23,
  },
  info_box: {
    width: "65%",
    marginBottom: 20,
    flexDirection: "column",
    borderRadius: 20,
  },

  avatar_container: {
    borderWidth: 10,
    borderColor: "white",
  },
  avatar_circle: {
    marginTop: -10,
    marginEnd: -30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1000,
  },

  name_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  stat_cell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  stat_numbers: {
    color: "white",
  },
  stat_icon: {
    marginEnd: 10,
    resizeMode: "contain",
  },
  username_gradient: {
    paddingTop: 6,
    paddingStart: 15,
    paddingEnd: 15,
    paddingBottom: 6,
  },
  username_text: {
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },
  bottom_layout: {
    flex: 1,
    justifyContent: "space-between",
  },

  book_title: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.blue_1,
    paddingStart: 10,
    paddingEnd: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },

  level_box: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: -10,
    marginTop: 5,
    textAlign: "center",
    color: "white",
    backgroundColor: colors.blue_1,
    borderRadius: 30,
  },
  container_style_btn_play_quiz: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  play_quiz: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 50,
  },
  container_style_btn_pic_other_book: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: "90%",
  },
  pic_other_book: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_grey,
    width: "100%",
    borderRadius: 50,
  },
  pic_other_book_btn_title: {
    letterSpacing: 3,
    color: colors.grey_button_text,
  },

  play_quiz_btn_title: {
    fontWeight: "200",
    letterSpacing: 4,
  },
});
