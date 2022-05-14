import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import colors from "../../res/value/colors";

export default class BookCard extends Component<Props> {
  constructor(props: Props) {
    super(props);
    const { width, height } = Dimensions.get("window");

    if (width > 600) {
      (card_h = 188), //width/3.5,
        (level_margin_top = 30);
    } else {
      card_h = 120;
      level_margin_top = 30;
    }

    this.state = {
      height,
      width,
      level_margin_top,
      card_h,
      book: this.props.book, // we pass hero through props
    };
  }
  navigateToDetailBook() {
    const { navigate } = this.props.navigation;

    navigate("DetailBook", { bookId: this.state.book.id });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ book: nextProps.book });
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.listViewItemContainer, { height: this.state.card_h }]}
        onPress={() => this.navigateToDetailBook()}
      >
        {/* <ImageBackground source={require( '../../assets/images/bg_book_card.png')} style={styles.img_bg_container}> */}
        <Image
          source={{ uri: this.state.book.urlImage }}
          style={styles.Cover}
        />
        <View
          style={{
            flexDirection: "column",
            height: "100%",
            width: "75%",
            paddingStart: 10,
          }}
        >
          {/* title */}
          <View
            style={{
              width: "100%",
              height: "30%",
              flexDirection: "column",
              paddingTop: 7,
            }}
          >
            <Text
              style={[styles.bookTitle, { fontSize: this.state.width / 24 }]}
            >
              {this.state.book.title}
            </Text>
          </View>
          {/* edition */}
          <View
            style={{
              width: "100%",
              height: "20%",
              flexDirection: "row",
              paddingTop: 7,
            }}
          >
            <Text
              style={[
                styles.text,
                { fontSize: this.state.width / 26, color: "gray" },
              ]}
            >
              {this.state.book.description}
            </Text>
          </View>

          {/* level */}
          <View
            style={{
              width: "100%",
              height: "50%",
              flexDirection: "row",
              paddingEnd: 10,
            }}
          >
            <View style={{ width: "65%" }}></View>
            <View
              style={{
                position: "relative",
                top: this.state.level_margin_top, //this.state.book.title.length>30? this.state.level_margin_top:30,
                width: "25%",
                //paddingTop:10
              }}
            >
              <Text
                style={[
                  styles.level_box,
                  {
                    width: this.state.width / 5,
                    fontSize: this.state.width / 27,
                    height: this.state.width / 17,
                    //widht:this.state.width/7,
                    //paddingTop:3,
                    //paddingBottom:3,
                    paddingStart: 5,
                    paddingEnd: 5,
                  },
                ]}
              >
                Level {this.state.book.level}
              </Text>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listViewItemContainer: {
    width: "100%",
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 0.8,
    //paddingTop:8,
    paddingEnd: 10,
    //paddingBottom:10,
    opacity: 100,
    borderColor: colors.book_card_border,
  },
  info: {
    padding: 10,
    flexDirection: "column",
  },
  Cover: {
    width: "25%",
    height: "100%",
    zIndex: 1000,
    borderBottomLeftRadius: 15, //TODO: Hichem try to look why it's not working
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  text: {
    fontSize: 15,
  },
  bookTitle: {
    fontWeight: "bold",
    color: colors.book_title,
  },
  img_bg_container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 25,
  },
  level_box: {
    // position:'relative',
    // top:'72%',
    // left:'22%',
    // width:70,
    textAlign: "center",
    color: "white",

    backgroundColor: colors.blue_1,
    borderRadius: 30,
  },
});
