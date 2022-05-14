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
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Input } from "react-native-elements";


import lang from "../res/value/res_string/string";

import Icon from "react-native-vector-icons/FontAwesome";

import Spinner from "react-native-loading-spinner-overlay";

import * as loginController from "../controllers/LoginController";

import colors from "../res/value/colors";

type Props = {};
export default class MyFirstView extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      status: false,
      result: true,
      message: "hichem",
    };
  }
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
  _onPressButton() {
    Alert.alert("You tapped the button!");
  }

  componentDidMount() {}

  _login = () => {
    // this.setState({ spinner: true })
    // loginController.getAllHeroes().then(({ result, message }) => this.setState({result:result, message: message }));
    loginController
      .getTest()
      .then(({ result, status }) => alert(JSON.stringify(result)));
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        {
          //this view will be hidden when user want to sign in with credential and remains if the user uses scan
          this.state.status ? null : (
            <View>
              <Text
                style={[
                  styles.header_text_1,
                  styles.align_text_center,
                  styles.white,
                  styles.bold_txt,
                ]}
              >
                {i18n.t("headerTitle")}
              </Text>
              <Text
                style={[
                  styles.header_text_2,
                  styles.align_text_center,
                  styles.white,
                ]}
              >
                Read a book then take its quiz
              </Text>
            </View>
          )
        }

        <TouchableOpacity style={styles.start_scan_btn}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image_btn}
          />
        </TouchableOpacity>

        <Text
          style={[styles.quizzito_txt, styles.bold_txt, styles.white]}
          onPress={this.ShowHideTextComponentView}
        >
          QUIZZITO
        </Text>
        {
          //credential LOGIN/PASS view will be shown if user click on the "QUIZZITO" text
          this.state.status ? (
            <View style={styles.login_input_container}>
              <Input
                placeholder="User name"
                inputStyle={[styles.imput_txt, styles.white]}
                containerStyle={styles.container_style_input}
                shake={true}
                leftIcon={<Icon name="user" size={20} color="white" />}
              />
              <Input
                inputStyle={[styles.imput_txt, styles.white]}
                containerStyle={styles.container_style_input}
                secureTextEntry={true}
                placeholder="Password!"
                leftIcon={
                  <Icon
                    name="lock"
                    size={20}
                    color="white"
                    iconStyle={styles.input_icon_style}
                  />
                }
              />
              <Button
                title="SIGN IN"
                fontSize={28}
                fontWeight={"bold"}
                containerStyle={styles.container_style_btn}
                raised={true}
                buttonStyle={[styles.sign_in_btn]}
                iconRight={true}
                onPress={this._login}
                icon={
                  <View style={styles.btn_icon_style}>
                    <Icon name="sign-in" size={25} color={colors.bisque} />
                  </View>
                }
              />
            </View>
          ) : null
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "steelblue",
    flex: 1,
  },
  header_text_1: {
    marginTop: 20,
    fontSize: 30,
    padding: 10,
    alignItems: "center",
  },
  header_text_2: {
    padding: 10,
    fontSize: 20,
  },
  align_text_center: {
    alignItems: "center",
  },
  white: {
    color: "white",
  },
  bold_txt: {
    fontWeight: "bold",
  },
  start_scan_btn: {
    // padding: 5,
    height: 200,
    width: 200, //The Width must be the same as the height
    borderRadius: 400, //Then Make the Border Radius twice the size of width or Height
    backgroundColor: "rgb(195, 125, 198)",

    marginTop: 20,
  },
  image_btn: {
    height: 200,
    width: 200, //The Width must be the same as the height
    borderRadius: 400, //Then Make the Border Radius twice the size of width or Height
  },
  quizzito_txt: {
    padding: 10,
    fontSize: 40,
  },
  imput_txt: {},
  sign_in_btn: {
    height: 70,
  },
  login_input_container: {
    width: 280,
  },
  input_icon_style: {
    marginEnd: 7,
  },
  btn_icon_style: {
    marginStart: 27,
  },
  container_style_input: {
    marginTop: 10,
  },
  container_style_btn: {
    marginTop: 25,
  },
});
