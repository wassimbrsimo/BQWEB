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
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import * as loginController from "../controllers/LoginController";
import { Button, Avatar } from "react-native-elements";

import * as Session from "../prefs/Session";

import { LinearGradient } from "expo-linear-gradient";
import colors from "../res/value/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import lang_str from "../res/value/res_string/string";
import i18n from "i18n-js";
//import { NativeModules } from 'react-native';

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    super(props);
    // lang checks
    var locale = "fr_FR";
    /* if( Platform.OS === 'ios'){
    locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
    }else{
     locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"
    }*/
    var array = locale.split("_");
    var lang = array[0];
    let rotate_deg = "0deg";
    lang === "ar" ? (rotate_deg = "180deg") : (rotate_deg = "0deg");

    let cloud_w = 400;
    let cloud_h = 300;
    let bird_top = 65;
    let bird_left = 235;
    let cloud_bottom = 110;
    let cloud_left = 50;
    let cloud_txt_bottom = 50;
    let cloud_txt_right = 260;
    let cloud_txt_size = 20;
    let sunrise_top = 170;
    let sunrise_right = 80;
    let sunrise_h = 450;
    let sunrise_w = 320;
    let btn_txt_size = 16;
    let btn_pos_left = "0%";
    let btn_pos_bottom = "0%";
    lang === "ar" ? (btn_pos_left = "-28%") : (btn_pos_left = "-11%"),
      lang === "ar" ? (btn_pos_bottom = "6%") : (btn_pos_bottom = "6%");
    const { width, height } = Dimensions.get("window");
    if (width >= 600) {
      (cloud_w = 400),
        (cloud_h = 300),
        (bird_top = 65),
        (bird_left = 235),
        (cloud_bottom = 110),
        (cloud_left = 50),
        (cloud_txt_bottom = 50),
        (cloud_txt_right = 260),
        (cloud_txt_size = 20),
        (sunrise_top = 170),
        (sunrise_right = 80),
        (sunrise_h = 450),
        (sunrise_w = 320),
        (btn_txt_size = 16),
        lang === "ar" ? (btn_pos_left = "-28%") : (btn_pos_left = "-11%"),
        lang === "ar" ? (btn_pos_bottom = "6%") : (btn_pos_bottom = "6%");
    } else {
      (cloud_w = 300),
        (cloud_h = 200),
        (bird_top = 44),
        (bird_left = 183),
        (cloud_bottom = 50),
        (cloud_left = 40),
        (cloud_txt_bottom = 20),
        (cloud_txt_right = 180),
        (cloud_txt_size = 15),
        (sunrise_top = 90),
        (sunrise_right = 80),
        (sunrise_h = 350),
        (sunrise_w = 250),
        (btn_txt_size = 16),
        lang === "ar" ? (btn_pos_left = "-27%") : (btn_pos_left = "-14%"),
        lang === "ar" ? (btn_pos_bottom = "6%") : (btn_pos_bottom = "6%");
    }
    this.state = {
      width,
      height,
      cloud_w,
      cloud_h,
      bird_top,
      bird_left,
      cloud_bottom,
      cloud_left,
      cloud_txt_bottom,
      cloud_txt_right,
      sunrise_top,
      sunrise_right,
      sunrise_h,
      sunrise_w,
      rotate_deg,
      btn_pos_left,
      btn_pos_bottom,
      btn_txt_size,
      cloud_txt_size,
      quiz: this.props.route.params.quiz,
      avatar: "",
      name: "",
      reader_before_ranking: 1,
      reader_after_ranking: null,
      text_after_quiz: "default text",
    };
    //if(true){
    if (this.state.reader_before_ranking != null) {
      this.state.text_after_quiz =
        i18n.t("after_quiz_msg1_1") +
        " " +
        this.state.quiz.points_diff +
        " " +
        i18n.t("after_quiz_msg1_2");
      //this.state.text_after_quiz = i18n.t('after_quiz_msg1_1+ " " + this.state.bird_top+ " " +lang_str.after_quiz_msg1_2;
    } else if (this.state.reader_after_ranking != null) {
      this.state.text_after_quiz =
        i18n.t("after_quiz_msg2_1") +
        " " +
        this.state.quiz.points_diff +
        " " +
        i18n.t("after_quiz_msg2_1");
    } else {
      //this.setState({text_after_quiz:'You are the first participant in the competition, focusing more to maintain first place .'});
      this.state.text_after_quiz = i18n.t("after_quiz_msg3");
    }
  }

  navigateToAbout() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  navigateStart() {
    const { navigate } = this.props.navigation;
    navigate("start_page");
  }
  logout() {
    Session.logout();
    this.navigateStart();
  }

  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  async componentWillMount() {
    await Session.getAvatar().then((value) => this.setState({ avatar: value }));
    await Session.getFullName().then((value) => this.setState({ name: value }));
  }
  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/images/bg_10.png")}
          style={styles.img_bg_container}
        >
          <View style={{ width: "100%", flex: 1, flexDirection: "column" }}>
            <View style={styles.top_left}></View>

            <View style={styles.top_center}>
              <LinearGradient
                colors={["#F99C3F", "#FE31C4"]}
                style={styles.username_gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text
                  style={[
                    styles.username_text,
                    { fontSize: this.state.width / 24 },
                  ]}
                >
                  {this.state.name}
                </Text>
              </LinearGradient>
              <LinearGradient
                colors={["#F1F1F1", "#FEFEFE", "#FFFFFF"]}
                style={{
                  width: 200,
                  aspectRatio: 1,
                  borderRadius: this.state.width / 3 / 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  containerStyle={styles.avatar}
                  size={200}
                  rounded
                  center
                  source={{
                    uri:
                      "https://adminconsole.quizzito.com/public/assets/img/profile/" +
                      this.state.avatar,
                  }}
                />
              </LinearGradient>

              {/* stat box */}
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={styles.ranking_box}>
                  <Image
                    source={require("../assets/images/ranking_icon.png")}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                    }}
                  />
                  <Text style={{ fontSize: 24 }}>Ranking</Text>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.quiz.reader_ranking_position}
                  </Text>
                </View>
                <View style={styles.points_box}>
                  <Image
                    source={require("../assets/images/points_icon.png")}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                    }}
                  />
                  <Text style={{ fontSize: 24 }}>Points</Text>
                  <Text style={{ fontSize: 20 }}>
                    {this.state.quiz.total_reader_coins}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.top_right}></View>
          </View>
          {/* bottom layout */}
          <View style={{ width: "100%", flex: 1, flexDirection: "row" }}>
            {/* bird view */}
            <View
              style={{
                width: "70%",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/bird_corner.png")}
                style={{
                  position: "relative",
                  top: this.state.bird_top,
                  left: this.state.bird_left,
                  transform: [
                    { rotateY: this.state.rotate_deg },
                  ] /* change the deg (degree of rotation) between 0deg, 360deg*/,
                  resizeMode: "contain",
                  width: this.state.height / 2.5,
                  height: this.state.width / 1.7,
                }}
              />
              {/* cloud view */}

              <Image
                source={require("../assets/images/cloud.png")}
                style={{
                  position: "relative",
                  bottom: this.state.cloud_bottom,
                  left: this.state.cloud_left,
                  transform: [
                    { rotateY: this.state.rotate_deg },
                  ] /* change the deg (degree of rotation) between 0deg, 360deg*/,
                  //small
                  // width:300,
                  // height:200,
                  width: this.state.cloud_w,
                  height: this.state.cloud_h,
                  resizeMode: "contain",
                  zIndex: 100,
                }}
              />
              <Text
                style={{
                  position: "relative",
                  bottom: this.state.cloud_txt_bottom,
                  right: this.state.cloud_txt_right,
                  width: this.state.cloud_w,
                  height: this.state.cloud_h,
                  zIndex: 1000,
                  textAlign: "center",
                  maxWidth: this.state.cloud_w * 0.7,
                  fontSize: 10,
                }}
              >
                {this.state.text_after_quiz}
              </Text>
            </View>

            <View style={{ width: "30%", flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ width: "180%", height: "100%" }}
                  onPress={() => {
                    this.logout();
                  }}
                >
                  {/* sunrise view */}
                  <Image
                    source={require("../assets/images/bg_12.png")}
                    style={{
                      position: "relative",
                      top: this.state.sunrise_top,
                      right: this.state.sunrise_right,
                      height: this.state.sunrise_h,
                      width: this.state.sunrise_w,
                      resizeMode: "contain",
                    }}
                  />

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      position: "absolute",
                      bottom: this.state.btn_pos_bottom, //'6%' ,
                      left: this.state.btn_pos_left, //</TouchableOpacity>'-28%',
                      width: "90%",
                    }}
                  >
                    <Text
                      style={[
                        styles.text_read_other_book,
                        { fontSize: this.state.btn_txt_size },
                      ]}
                    >
                      {i18n.t("read")}{" "}
                    </Text>
                    <Text style={styles.text_read_other_book}>
                      {i18n.t("another_book")}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: 20,
    //justifyContent: 'center',
    alignItems: "center",
  },
  img_bg_container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "center",

    resizeMode: "cover",
  },
  top_left: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  top_center: {
    flex: 1,
    marginTop: "8%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  username_gradient: {
    position: "relative",
    top: 10,
    paddingEnd: 15,
    paddingStart: 15,
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 50,
    zIndex: 1000,
  },
  username_text: {
    textAlign: "center", // <-- the magic
    fontWeight: "bold",

    color: "white",
  },
  top_right: {
    flex: 1,
    //justifyContent: 'center',
  },

  avatar: {
    borderWidth: 10,
    borderColor: "white",
  },
  avatar_circle: {},
  ranking_box: {
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginEnd: "10%",
  },
  points_box: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  text_read_other_book: {
    marginTop: 5,
    width: "100%",

    letterSpacing: 3,
    textAlign: "center",
    color: "white",
    textTransform: "uppercase",
  },
});
