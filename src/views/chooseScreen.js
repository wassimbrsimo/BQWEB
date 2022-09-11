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
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import colors from "../res/value/colors";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconAwesome from "react-native-vector-icons/FontAwesome";

const ChooseScreen = (props) => {
  return (
    <View style={styles.container}>
      {/* Top layout */}
      <ImageBackground
        source={require("../assets/images/bg_dashboard_top.png")}
        style={styles.top}
      >
        <View style={styles.top_left}>
          <Image
            source={require("../assets/images/bg_dashboard_top_left.png")}
            style={styles.img_bg_top}
          />
        </View>

        <View style={styles.top_right}>
          <Image
            source={require("../assets/images/bg_dashboard_top_right.png")}
            style={styles.img_bg_top_right}
          />
        </View>
      </ImageBackground>
      <View style={{ flex: 1, bottom: "10%", width: "60%" }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Book_list_container", {
              userResult: "",
            });
          }}
          style={styles.cardBtn}
        >
          <IconAwesome name="book" size={60} color={"#F99C3F"} />
          <Text style={styles.cardText}>Ebooks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("book_qrcode");
          }}
          style={styles.cardBtn}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="bookshelf" size={60} color="#F99C3F" />
            <Icon name="qrcode-scan" size={30} color="#F99C3F" />
          </View>
          <Text style={styles.cardText}>Paper Books</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    //justifyContent: 'center',
    alignItems: "center",
    backgroundColor: colors.light_grey,
  },
  cardBtn: {
    flex: 1,
    borderRadius: 20,
    margin: 20,
    elevation: 20,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  cardText: { fontWeight: "bold", fontSize: 20, margin: 20, color: "black" },
  top: {
    width: "100%",
    height: "25%",
    paddingTop: 10,
    marginBottom: 10,
    //flex: .7,
    flexDirection: "row",
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  top_left: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
  },
  top_center: {
    flex: 1,
    flexDirection: "column",
    //justifyContent: 'center',
    alignItems: "center",
  },
  username_gradient: {
    marginBottom: 10,
    borderRadius: 50,
    padding: 5,
    width: "140%",
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

  img_bg_top: {
    marginTop: -110,
    marginStart: -70,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  img_bg_top_right: {
    marginTop: 110,
    marginStart: 100,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  middle: {
    width: "85%",
    height: "45%",

    paddingStart: 30,
    paddingEnd: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bookread_box: {
    flexDirection: "column",
    height: "40%",
    width: "30%",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.grey_button,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ranking_box: {
    flexDirection: "column",
    height: "80%",
    width: "40%",
    paddingTop: 20,
    paddingBottom: 80,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  points_box: {
    flexDirection: "column",
    height: "40%",
    width: "30%",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.grey_button,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  bookread_icon: {
    resizeMode: "contain",
  },
  ranking_icon: {
    resizeMode: "contain",
  },

  points_icon: {
    resizeMode: "contain",
  },

  bottom: {
    width: "100%",
    height: "30%",
    //flex: .5,
    flexDirection: "row",
  },

  img_bg_bottom: {
    width: "100%",
    height: "100%",
    //flex: .5,
    flexDirection: "row",
  },

  logout_circle: {
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 0.8,
    backgroundColor: colors.light_grey,
    borderColor: colors.book_card_border,
  },
  logout_btn: {
    resizeMode: "contain",
    // width:60,
    // height:60,
  },
  logout_box: {
    width: "35%",
    paddingTop: "7%",
    paddingEnd: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  play_head_img: {
    marginTop: -150,
    marginStart: -25,
    resizeMode: "cover",
    width: "120%",
    height: "120%",
  },
  bird_body: {},
  bottom_center_box: {
    flex: 1.2,
    height: "180%",
    width: "220%",
    position: "absolute",
    top: "-76%",
    left: "-70%",
    flexDirection: "column",
  },
  play_head_box: {
    flex: 1,

    width: "100%",
    height: "100%",
  },
  avatar: {
    marginTop: 20,
    borderWidth: 10,
    borderColor: "white",
  },
});
export default ChooseScreen;
