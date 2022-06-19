/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import i18n from "i18n-js";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";

import * as loginController from "../controllers/LoginController";

import * as Session from "../prefs/Session";

import { LinearGradient } from "expo-linear-gradient";
import colors from "../res/value/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import lang from "../res/value/res_string/string";
import Spinner from "react-native-loading-spinner-overlay";
import { BackHandler } from "react-native";
//import { NativeModules } from 'react-native';
//import firebase  from 'react-native-firebase';

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});

type Props = {};
export default class Test extends Component<Props> {
  constructor(props) {
    //  const firebaseApp = firebase.initializeApp({ debug: false });
    // firebase.analytics().logEvent("your_custom_event", {"custom_parm": "cp_value"});

    var locale = "fr_FR";
    /* if( Platform.OS === 'ios'){
    locale = NativeModules.SettingsManager.settings.AppleLocale // "fr_FR"
    }else{
     locale = NativeModules.I18nManager.localeIdentifier // "fr_FR"
    }*/
    var array = locale.split("_");
    var lang = array[0];
    var imag;
    let input_txt_alaign = "right";
    let arrow_top = 120;
    let arrow_left_pos = 80;
    let btn_h = 60;
    let btn_w = 200;
    if (lang === "ar") {
      imag = require("../assets/images/logo_text_ar.png");
      input_txt_alaign = "right";
    } else {
      imag = require("../assets/images/quizzito_text_en.png");
      input_txt_alaign = "left";
    }
    super(props);
    Session.getUserId().then((value) => {
      if (value != null) {
        this.navigateToDashpord();
      }
    });
    const { width, height } = Dimensions.get("window");
    if (width >= 600) {
      (arrow_top = 120), (arrow_left_pos = 80), (btn_h = 60), (btn_w = 200);
    } else {
      (arrow_top = 72), (arrow_left_pos = 22), (btn_h = 45), (btn_w = 120);
    }
    this.state = {
      imag,
      input_txt_alaign,
      width,
      height,
      arrow_top,
      btn_h,
      btn_w,
      arrow_left_pos,
      H1: 60,
      H2:  40,
      start_btn_font: width / 20,
      spinner: false,
      username: "",
      password: "",
    };
  }

  qrCodeLogin = () => {
    this.navigateQrCodeLogin();
  };

  navigateQrCodeLogin() {
    const { navigate } = this.props.navigation;
    navigate("login_qrcode");
  }
  _login = () => {
    this.setState({ spinner: true });
    //firebase.analytics().logEvent("login_with_btn", {"userName": this.state.username.text});

    loginController
      .login(this.state.username.text, this.state.password.text)
      .then(({ status, result }) => this.loginNavigate(result, status));
    // loginController.getTest();
  };

  loginNavigate = (result, status) => {
    this.setState({ spinner: false });

    if (true) {
      if (result.role == "reader") {
        Session.setUserId(result.id);
        this.navigateToDashpord();
      }
    }
  };
  navigateToAbout() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }
  navigateToDashpord() {
    const { navigate } = this.props.navigation;
    navigate("dashboard_page");
  }
  updateUserName = (username) => {
    console.log("UPDATE USER NAME ", username);
    this.setState({ username: username.text });
  };
  updatePassword = (password) => {
    this.setState({ password: password.text });
  };
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  ShowHideTextComponentView = () => {
    if (this.state.status == true) {
      this.setState({ status: false });
    } else {
      this.setState({ status: true });
    }
  };

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {/* Top */}
        <View style={styles.top}>
          <View style={styles.top_left}>
            <Image
              source={require("../assets/images/2_circles_top_right.png")}
              style={styles.img_bg_top}
            />
            {
              //back button will be shown if user click on the "QUIZZITO" text
              this.state.status ? (
                <TouchableOpacity
                  style={[
                    styles.arrow_left,
                    {
                      width: this.state.width / 10,
                      height: this.state.width / 20,
                      position: "absolute",
                      top: this.state.arrow_top,
                      left: this.state.arrow_left_pos,
                    },
                  ]}
                  onPress={this.ShowHideTextComponentView}
                >
                  <Image
                    source={require("../assets/images/arrow_white_left.png")}
                    style={[
                      styles.arrow_left_img,
                      {
                        width: this.state.width / 10,
                        height: this.state.width / 20,
                      },
                    ]}
                  />
                </TouchableOpacity>
              ) : null
            }
          </View>
          {/* top right for headers */}
          <View style={styles.top_right}>
            <Text
              style={[
                styles.header_text_1,
                { margin: 20, fontSize: this.state.H2 },
              ]}
            >
              {i18n.t("read_play_win")}
            </Text>
            <Text style={[styles.header_text_2, { fontSize: this.state.H2 }]}>
              {i18n.t("login_header_2")}
            </Text>
          </View>
        </View>

        {/* middle */}
        <View style={styles.middle}>
          {
            //credential LOGIN/PASS view will be shown if user click on the "QUIZZITO" text
            this.state.status ? (
              <View
                style={{
                  flex: 1.5,
                  width: "100%",
                  height: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <KeyboardAvoidingView behavior="padding" style={{ flex:1.5,width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}> */}
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 50,
                  }}
                >
                  <Image
                    source={require("../assets/images/transparent_logo.png")}
                    style={styles.logo_small}
                  />

                  <TextInput
                    placeholder={i18n.t("user_name_placeholder")}
                    onChangeText={(text) => this.updateUserName({ text })}
                    value={this.state.username}
                    placeholderTextColor={colors.border_input}
                    style={[
                      styles.input_text_style,
                      {
                        fontSize: 30,
                        height: 60,
                        textAlign: this.state.input_txt_alaign,
                      },
                    ]}
                  />

                  <TextInput
                    placeholder={i18n.t("passowrd_placeholder")}
                    onChangeText={(text) => {
                      console.log("changed ", text);
                      this.updatePassword({ text });
                    }}
                    value={this.state.password}
                    type={"password"}
                    secureTextEntry={true}
                    placeholderTextColor={colors.border_input}
                    style={[
                      styles.input_text_style,
                      {
                        fontSize: 30,
                        height: 60,
                        textAlign: this.state.input_txt_alaign,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    style={{
                      padding: 5,
                      backgroundColor: "white",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 20,
                      backgroundColor: "#F99C3F",
                      paddingHorizontal: 30,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      margin: 20,
                      padding: 10,

                      elevation: 5,
                    }}
                    onPress={() => {
                      this._login();
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {i18n.t("log_in_btn")}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* </KeyboardAvoidingView> */}
              </View>
            ) : null
          }

          {
            //here is the view of the Logo + start button will be hidden if the user click on the quizzito text
            this.state.status ? null : (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "80%",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 50,
                  }}
                >
                  <Image
                    source={require("../assets/images/transparent_logo.png")}
                    style={styles.logo}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      console.log("pressed");
                      this.qrCodeLogin();
                    }}
                    style={{
                      width: "100%",
                      height: "20%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={this.ShowHideTextComponentView}
                  >
                    <Image source={this.state.imag} style={styles.logo_small} />
                  </TouchableOpacity>
                </View>

                {Platform.OS != "web" && (
                  <View
                    style={{
                      width: "100%",
                      height: "20%",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTo: 30,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        padding: 5,
                        backgroundColor: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        backgroundColor: "#F99C3F",
                        paddingHorizontal: 30,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }}
                      onPress={() => {
                        console.log("pressed");
                        this.qrCodeLogin();
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {i18n.t("start_btn")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )
          }
        </View>

        {/* bottom */}
        <View style={styles.bottom}>
          <View
            style={{
              width: "50%",
              height: "100%",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          ></View>
          <View style={{ width: "50%", height: "100%" }}>
            <Image
              source={require("../assets/images/circle_left_down.png")}
              style={styles.img_bg_bottom}
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
    flexDirection: "column",
  },
  top: {
    width: "100%",
    height: "60%",
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
  },
  middle: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    width: "100%",
    flex: 0.7,
    flexDirection: "row",
    alignContent: "flex-end",
  },
  top_left: {
    flexDirection: "row",
    alignContent: "flex-start",
    width: "37%",
    height: "100%",
    paddingTop: 10,
  },
  img_bg_top: {
    marginTop: -50,
    marginStart: -70,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  top_right: {
    paddingTop: 30,
    paddingEnd: 30,
    width: "67%",
    height: "100%",
    flexDirection: "column",
  },
  img_bg_bottom: {
    marginStart: 60,
    marginTop: 180,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  container_style_btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  start_btn: {
    justifyContent: "center",
    width: "100%",
    borderRadius: 50,
  },
  start_btn_title: {
    letterSpacing: 4,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  logo_small: {
    width: "40%",
    height: "40%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  header_text_1: {
    textAlign: "center",
    fontStyle: "normal",
    color: colors.grey_button_text,
  },
  header_text_2: {
    fontStyle: "italic",
    color: colors.grey_button_text,
    textAlign: "center",
  },
  quizzito_text: {
    fontSize: 40,
    color: colors.blue_1,
    textAlign: "center",
  },

  arrow_left_img: {
    resizeMode: "contain",
  },

  input_text_style: {
    width: "80%",
    // height:'20%',
    borderRadius: 50,
    borderWidth: 1,
    paddingStart: 20,
    paddingEnd: 20,
    marginTop: 15,
    borderColor: colors.border_input,
    backgroundColor: "white",
  },
});
