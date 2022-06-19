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
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import i18n from "i18n-js";
import * as loginController from "../controllers/LoginController";

import { Button, ButtonGroup } from "react-native-elements";

import { LinearGradient } from "expo-linear-gradient";
import colors from "../res/value/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import lang_str from "../res/value/res_string/string";
import { BackHandler } from "react-native";
import * as userController from "../controllers/UserController";
import * as Session from "../prefs/Session";
//import { NativeModules } from 'react-native';

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
    let is_ar = false;
    if (lang === "ar") {
      (is_ar = true), (input_txt_alaign = "right"), (icon_dir = "iconLeft");
    } else {
      (is_ar = false), (input_txt_alaign = "left"), (icon_dir = "iconRight");
    }
    const { width, height } = Dimensions.get("window");
    if (width >= 600) {
      (place_holder_txt_size = 20), (btn_h = 90), (btn_w = 90);
    } else {
      (place_holder_txt_size = 15), (btn_h = 60), (btn_w = 60);
    }

    let input_txt_alaign = 0;
    let btn_h = 0;
    let btn_w = 0;
    let place_holder_txt_size = 0;
    let icon_dir = null;
    this.state = {
      input_txt_alaign,
      btn_h,
      btn_w,
      place_holder_txt_size,
      is_ar,
      icon_dir,
      selectedIndex: -1,
      userProfile: {},
      f_name: {},
      l_name: {},
      phone: {},
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  navigateToDashboard() {
    const { navigate } = this.props.navigation;
    navigate("dashboard_page", {
      onGoBack: () => this.refresh(),
    });
  }
  updateFisrtName = (f_name) => {
    this.setState({ f_name: f_name.text });
  };
  updateLasteName = (l_name) => {
    this.setState({ l_name: l_name.text });
  };
  updatePhone = (phone) => {
    this.setState({ phone: phone.text });
  };
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  componentWillMount() {
    userController
      .getReaderProfile()
      .then(({ result, status }) => this.initResultProfile(result));
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }

  initResultProfile(userProfile) {
    // this.setState({ l_name: userProfile.l_name });
    //this.setState({ f_name: userProfile.f_name });
    // this.setState({ phone: userProfile.phone });
    this.setState({ userProfile: userProfile });
    if (userProfile.gender == "boy") {
      this.setState({ selectedIndex: 1 });
    } else {
      this.setState({ selectedIndex: 0 });
    }
  }
  updateProfilChild() {
    var gender = "";
    if (this.state.selectedIndex == 0) {
      gender = "girl";
    } else {
      gender = "boy";
    }
    if (this.state.f_name != "") {
      //Check for the Name TextInput
      if (this.state.l_name != "") {
        //Check for the Email TextInput
        userController
          .updateProfilChild(
            this.state.f_name,
            this.state.l_name,
            this.state.phone,
            gender
          )
          .then(({ result, status }) => this.updateProfile(result));
      } else {
        alert("Please Enter last name");
      }
    } else {
      alert("Please Enter first Name");
    }
  }

  updateProfile(userProfile) {
    if (userProfile.status == "success") {
      this.navigateToDashboard();
    } else {
    }
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    const component1 = () => (
      <Image
        source={require("../assets/images/gender_f_active.png")}
        style={{
          height: this.state.btn_h - 30,
          width: this.state.btn_w - 30,
        }}
      />
    );
    const component2 = () => (
      <Image
        source={require("../assets/images/gender_m_active.png")}
        style={{
          height: this.state.btn_h - 30,
          width: this.state.btn_h - 30,
        }}
      />
    );
    const buttons = [{ element: component1 }, { element: component2 }];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#F3F3F3", "#FEFEFE", "#FFFFFF"]}
          style={styles.container}
        >
          <ImageBackground
            source={require("../assets/images/bg_3.png")}
            style={{ flex: 1, width: "100%" }}
          ></ImageBackground>
          {/* middle laayout where the input + button are */}
          <View
            style={{
              flex: 2,
              width: "100%",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "40%",
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 40,
              }}
            >
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                selectedButtonStyle={styles.selected_answer}
                innerBorderStyle={{ color: "transparent" }}
                buttonStyle={[
                  styles.gender_btn,
                  {
                    height: this.state.btn_h,
                    width: this.state.btn_h,
                  },
                ]}
                containerStyle={[
                  styles.btn_grp_container,
                  {
                    height: this.state.btn_h + 10,
                    width: this.state.btn_h + 10,
                  },
                ]}
              />
            </View>

            {/* <Text style={{ fontSize: 40, color: colors.text_title_form, textAlign: 'center', flex: 1, width: '80%' }}>
              Welcome To Quizzito
                  </Text> */}
            <TextInput
              placeholder={i18n.t("user_info_first_name")}
              onChangeText={(text) => this.updateFisrtName({ text })}
              value={this.state.f_name}
              placeholderTextColor={colors.border_input}
              style={[
                styles.input_text_style,
                {
                  fontSize: this.state.place_holder_txt_size,
                  height: 60,
                  textAlign: this.state.input_txt_alaign,
                },
              ]}
            ></TextInput>
            <TextInput
              placeholder={i18n.t("user_info_last_name")}
              onChangeText={(text) => this.updateLasteName({ text })}
              value={this.state.l_name}
              placeholderTextColor={colors.border_input}
              style={[
                styles.input_text_style,
                {
                  fontSize: this.state.place_holder_txt_size,
                  height: 60,
                  textAlign: this.state.input_txt_alaign,
                },
              ]}
            ></TextInput>
            <TextInput
              placeholder={i18n.t("user_info_phone")}
              onChangeText={(text) => this.updatePhone({ text })}
              value={this.state.phone}
              placeholderTextColor={colors.border_input}
              style={[
                styles.input_text_style,
                {
                  fontSize: this.state.place_holder_txt_size,
                  height: 60,
                  textAlign: this.state.input_txt_alaign,
                },
              ]}
            ></TextInput>
          </View>
          <ImageBackground
            source={require("../assets/images/bg_9.png")}
            style={{ flex: 1, width: "100%", flexDirection: "row" }}
          >
            {
              //back arrow is in the left side when the lang is not ar
              !this.state.is_ar ? (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    flex: 2,
                  }}
                ></View>
              ) : null
            }
            <View
              style={{
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                marginRight: 70,
              }}
            >
              <Button
                title={i18n.t("next")}
                titleStyle={[
                  styles.start_btn_title,
                  {
                    fontSize: 20,
                  },
                ]}
                containerStyle={[
                  styles.container_style_btn,
                  {
                    width: 200,
                    height: 55,
                    marginTop: 45,
                  },
                ]}
                //raised={true}
                onPress={() => {
                  this.updateProfilChild();
                }}
                buttonStyle={[styles.start_btn]}
                icon={<Icon name="arrow-right" size={20} color="white" />}
              />
            </View>
            {
              //back arrow is in the left side when the lang is not ar
              this.state.is_ar ? (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    justifyContent: "center",
                    flex: 2,
                  }}
                ></View>
              ) : null
            }
          </ImageBackground>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,

    //justifyContent: 'center',
    alignItems: "center",
  },

  btn_grp_container: {
    flex: 1,
    flexDirection: "row",

    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 80 / 2,
  },
  gender_btn: {
    margin: 7,
    backgroundColor: colors.grey,
    borderRadius: 50,
    borderColor: "transparent",
  },

  selected_answer: {
    backgroundColor: colors.orange_book_level,
  },
  container_style_btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  start_btn: {
    justifyContent: "center",
    //alignItems: 'center',
    height: 45,

    width: "100%",
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  start_btn_title: {
    letterSpacing: 4,

    marginEnd: 10,
  },
  input_text_style: {
    width: "80%",
    // height:'20%',
    borderRadius: 50,
    borderWidth: 1,
    paddingStart: 20,
    paddingEnd: 20,
    marginTop: 15,
    marginBottom: 15,
    borderColor: colors.border_input,
    backgroundColor: "white",
  },
});
