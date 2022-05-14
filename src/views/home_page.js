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
  Animated,
} from "react-native";
import { Button, Input, Avatar } from "react-native-elements";

import lang from "../res/value/res_string/string";

import Icon from "react-native-vector-icons/FontAwesome";

import colors from "../res/value/colors";
import i18n from "i18n-js";

type Props = {};
export default class HomePage extends Component<Props> {
  constructor(props) {
    super(props);
  }
  state = {
    rankingBadgeScale: new Animated.Value(0),
    booksBadgeScale: new Animated.Value(0),
    pointsBadgeScale: new Animated.Value(0),

    isBookAnimationDisplayed: true,
    isPointsAnimationDisplayed: true,
  };
  componentDidMount() {
    //this.animateRankingBadge();
    this.animateBooksBadge();
    // this.animatePointsBadge();
    // setTimeout(() => {this.animateBooksBadge()},1000);
    //setTimeout(() => {this.animatePointsBadge()},2000);
  }
  animateRankingBadge() {
    Animated.timing(this.state.rankingBadgeScale, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  animateBooksBadge() {
    Animated.sequence([
      Animated.timing(this.state.rankingBadgeScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.booksBadgeScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(this.state.pointsBadgeScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }
  animatePointsBadge() {
    Animated.sequence([]).start();

    //()=> this.setState({ isPointsAnimationDisplayed: true })
  }
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  };

  //onClick play button
  navigateToListBook() {
    const { navigate } = this.props.navigation;
    navigate("viewTest");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <ImageBackground
            source={require("../assets/images/Surface.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <Text style={styles.username_text}>User name</Text>
          </ImageBackground>
          <View style={styles.avatar_circle}>
            <Avatar
              containerStyle={styles.avatar}
              size={244}
              rounded
              center
              source={require("../assets/images/hichem.jpg")}
            />
            <Animated.View
              style={{
                position: "absolute",
                justifyContent: "center",
                left: "25%",
                top: "75%",
                alignItems: "center",
                width: 124,
                height: 124,
                borderRadius: 124 / 2,
                borderColor: "grey",
                borderWidth: 1,
                backgroundColor: "white",
                transform: [
                  {
                    scale: this.state.rankingBadgeScale,
                  },
                ],
              }}
            >
              <Text>{i18n.t("ranking_label")}</Text>
            </Animated.View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottom_sub_container}>
            {this.state.isBookAnimationDisplayed ? (
              <Animated.View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  left: "4%",
                  top: "35%",
                  alignItems: "center",
                  width: 152,
                  height: 152,
                  borderRadius: 152 / 2,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "grey",
                  transform: [
                    {
                      scale: this.state.booksBadgeScale,
                    },
                  ],
                }}
              >
                <View style={styles.books_read_inside}>
                  <Text>Books</Text>
                </View>
              </Animated.View>
            ) : null}
            {this.state.isPointsAnimationDisplayed ? (
              <Animated.View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  right: "4%",
                  top: "35%",
                  alignItems: "center",
                  width: 152,
                  height: 152,
                  borderRadius: 152 / 2,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "grey",
                  transform: [
                    {
                      scale: this.state.pointsBadgeScale,
                    },
                  ],
                }}
              >
                <View style={styles.points_inside}>
                  <Text>{i18n.t("points_label")}</Text>
                </View>
              </Animated.View>
            ) : null}
          </View>

          <View style={styles.bottom_sub_container}>
            <Button
              title="P L A Y"
              fontSize={28}
              fontWeight={"bold"}
              containerStyle={styles.container_style_btn}
              //raised={true}
              onPress={() => {
                this.navigateToListBook();
              }}
              buttonStyle={[styles.sign_in_btn]}
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
    height: "100%",
    backgroundColor: colors.light_grey,
  },

  topContainer: {
    width: "100%",
    flex: 6,
    //height:275,
  },
  username_text: {
    marginTop: 50,
    textAlign: "center", // <-- the magic
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  avatar: {
    borderWidth: 10,
    borderColor: "white",
  },
  avatar_circle: {
    position: "absolute",
    justifyContent: "center",
    left: "29%",
    top: "55%",
    alignItems: "center",
    width: 249,
    height: 249,
    borderRadius: 249 / 2,
    backgroundColor: "orange",
  },
  // ranking_circle: {
  //     position:'absolute',
  //     justifyContent: 'center',
  //     left:"25%",
  //     top:"75%",
  //     alignItems: 'center',
  //     width: 124,
  //     height: 124,
  //     borderRadius: 124/2,
  //     borderColor:'grey',
  //     borderWidth:1,
  //     backgroundColor: 'white',
  //     transform:[{
  //         scale:this.state.badgeScale

  //     }]
  //   },

  ranking_point_container: {
    width: "100%",
    height: "100%",
    flex: 10,
    backgroundColor: "yellow",
  },

  bottomContainer: {
    width: "100%",
    height: "100%",
    flex: 20,
    //backgroundColor:'grey'
  },

  bottom_sub_container: {
    flex: 1,
    marginTop: 20,
    //justifyContent: 'center',
    alignItems: "center",
    //backgroundColor:'azure',
  },

  books_read: {
    position: "absolute",
    justifyContent: "center",
    left: "4%",
    top: "35%",
    alignItems: "center",
    width: 152,
    height: 152,
    borderRadius: 152 / 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },

  books_read_inside: {
    justifyContent: "center",
    alignItems: "center",
    width: 116,
    height: 116,
    borderRadius: 116 / 2,
    backgroundColor: colors.blue_1,
  },
  points: {
    position: "absolute",
    justifyContent: "center",
    right: "4%",
    top: "35%",
    alignItems: "center",
    width: 152,
    height: 152,
    borderRadius: 152 / 2,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },

  points_inside: {
    justifyContent: "center",
    alignItems: "center",
    width: 116,
    height: 116,
    borderRadius: 116 / 2,
    backgroundColor: colors.blue_1,
  },
  container_style_btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    width: "60%",

    marginTop: 25,
  },
  sign_in_btn: {
    justifyContent: "center",
    alignItems: "center",

    height: 70,
    width: "100%",
    borderRadius: 50,
  },
});
