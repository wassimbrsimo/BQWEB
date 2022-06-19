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
  Button,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import * as loginController from "../controllers/LoginController";

import BooksListView from "./list/books_list_view";

import Book from "../models/Book";

import * as booksController from "../controllers/BooksController";
import * as Session from "../prefs/Session";

import { SearchBar, Avatar } from "react-native-elements";

import { LinearGradient } from "expo-linear-gradient";
import colors from "../res/value/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import * as userController from "../controllers/UserController";
//import { NativeModules } from 'react-native';
//import lang from '../res/value/res_string/string';

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
    let start_margin_username = 0;
    let search_container_w = 0;
    let search_container_h = 0;
    const { width, height } = Dimensions.get("window");
    if (width >= 600) {
      (user_info_box_w = 399),
        (user_info_box_h = 100),
        (width_username = 372),
        (start_margin_username = -10),
        (search_container_w = 400),
        (search_container_h = 70);
    } else {
      (user_info_box_w = 260),
        (user_info_box_h = 80),
        (start_margin_username = -10),
        (width_username = 260),
        (search_container_w = 320),
        (search_container_h = 45);
    }
    this.state = {
      width,
      height,
      width_username,
      start_margin_username,
      user_info_box_h,
      user_info_box_w,
      search_container_w,
      search_container_h,
      is_ar,
      search: "",
      spinner: true,
      books: [],
      avatar: "",
      name: "",
      userResult: this.props.route.params && this.props.route.params.userResult,
    };
  }

  updateSearch = (search) => {
    this.setState({ search: search });
    booksController
      .listBook(this.state.search.text)
      .then(({ messager, result }) =>
        this.setState({ books: result, spinner: false })
      );
  };
  navigateToAbout() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }
  returnToDashboard = () => {
    const { navigate } = this.props.navigation;
    navigate("dashboard_page");
  };
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };
  async componentWillMount() {
    // loginController.getAllHeroes().then(({ result, message }) => this.setState({result:result, message: message }));
    //loginController.getTest().then((  {result,message} ) => this.setState({ result:result,message: message }));
    await Session.getAvatar().then((value) => this.setState({ avatar: value }));
    await Session.getFullName().then((value) => this.setState({ name: value }));

    this.initListBooks();
  }
  initListBooks = () => {
    booksController
      .listBook("")
      .then(({ messager, result }) =>
        this.setState({ books: result, spinner: false })
      );
  };

  render() {
    const { search } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#FFFFFF", "#F2F2F2"]}
          style={{ width: "100%", height: "100%", flexDirection: "column" }}
        >
          <ImageBackground
            source={require("../assets/images/bg_book_search.png")}
            style={styles.img_bg_container}
          >
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
              <LinearGradient
                colors={["#F89f00", "#E519ab"]}
                style={[
                  styles.info_box,
                  {
                    height: this.state.user_info_box_h, //this.state.width/5,
                    width: this.state.user_info_box_w, //</View>this.state.width/1.5
                  },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.reader_info_box}>
                  <View
                    style={[
                      styles.avatar_circle,
                      {
                        width: this.state.width / 9,
                        height: this.state.width / 9,
                        borderRadius: this.state.width / 9 / 2,
                        marginStart: this.state.start_margin_username,
                      },
                    ]}
                  >
                    <Avatar
                      containerStyle={styles.avatar}
                      size={this.state.width / 10}
                      rounded
                      center
                      source={{
                        uri:
                          "https://adminconsole.quizzito.com/public/assets/img/profile/" +
                          this.state.avatar,
                      }}
                    />
                  </View>
                  <LinearGradient
                    colors={["#F99C3F", "#FE31C4"]}
                    style={[
                      styles.info_box,
                      {
                        height: this.state.user_info_box_h, //this.state.width/5,
                        width: this.state.user_info_box_w, //</View>this.state.width/1.5
                      },
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text
                      style={[
                        styles.username_text,
                        {
                          fontSize: 20,
                          width: "100%",
                        },
                      ]}
                    >
                      {this.state.name}
                    </Text>
                  </LinearGradient>
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
                {/* stat box */}

                {/* <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={styles.stat_cell}>
                    <Image
                      source={require("../assets/images/ranking_icon.png")}
                      style={[
                        styles.stat_icon,
                        {
                          width: this.state.width / 16,
                          height: this.state.width / 16,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.stat_numbers,
                        { fontSize: this.state.width / 26 },
                      ]}
                    >
                      {this.state.userResult && this.state.userResult.rank}
                    </Text>
                  </View>
                  <View style={styles.stat_cell}>
                    <Image
                      source={require("../assets/images/bookread_icon.png")}
                      style={[
                        styles.stat_icon,
                        {
                          width: this.state.width / 16,
                          height: this.state.width / 16,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.stat_numbers,
                        { fontSize: this.state.width / 26 },
                      ]}
                    >
                      {this.state.userResult &&
                        this.state.userResult.total_books}
                    </Text>
                  </View>
                  <View style={styles.stat_cell}>
                    <Image
                      source={require("../assets/images/points_icon.png")}
                      style={[
                        styles.stat_icon,
                        {
                          width: this.state.width / 16,
                          height: this.state.width / 16,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.stat_numbers,
                        { fontSize: this.state.width / 26 },
                      ]}
                    >
                      {this.state.userResult &&
                        this.state.userResult.total_points}
                    </Text>
                  </View>
                </View> */}
              </LinearGradient>
              <View style={{ flex: 1 }} />
            </View>

            {/* layout for the search bar */}
            <View
              style={{
                marginTop: 100,
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <SearchBar
                // placeholder="Type Here..."
                onChangeText={(text) => this.updateSearch({ text })}
                value={this.state.search.text}
                searchIcon={
                  <Icon
                    name="search"
                    size={50}
                    iconStyle={styles.searchIconStyle}
                  />
                }
                containerStyle={{
                  width: 300,
                  height: 50,
                  padding: -20,
                  backgroundColor: "transparent",
                  borderWidth: 0.8,
                  borderColor: colors.book_card_border,
                  borderRadius: 50,
                }} //{[styles.ContainerStyle,]}
                inputContainerStyle={{
                  marginTop: -2,
                  backgroundColor: "white",
                  borderWidth: 0.8,
                  borderColor: colors.book_card_border,
                  borderRadius: 50,
                }} //{[styles.inputContainerStyle,]}
              />
            </View>
            <View style={styles.view_list}>
              <BooksListView
                books={this.state.books}
                navigation={this.props.navigation}
              />
            </View>
          </ImageBackground>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchIconStyle: {
    color: colors.search_icon,
  },
  container: {
    width: "100%",
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.book_card_bg,
    alignItems: "center",
  },
  img_bg_container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    width: "90%",
    // marginTop:-4,
    // marginStart:-20,
    borderRadius: 23,
  },
  info_box: {
    flex: 1,
    marginBottom: 20,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
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
  name: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: 48,
    width: 396,
    borderRadius: 48 / 2,
    opacity: 100,
    backgroundColor: colors.grey_transparent,
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
});
