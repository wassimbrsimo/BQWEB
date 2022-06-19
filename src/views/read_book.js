import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome";

export default function read_book(props) {
  const navigation = useNavigation();
  const webView = () =>
    Platform.OS === "web" ? (
      <iframe
        src={props.route.params.book.Link}
        height={"100%"}
        width={"100%"}
      />
    ) : (
      <View style={{ flex: 1 }}>
        :
        <WebView
          originWhitelist={["*"]}
          source={{ uri: props.route.params.book.Link, baseUrl: "" }}
          style={{ flex: 1, height: 2 }}
        />
      </View>
    );
  return (
    <View style={{ height: "100%", width: "100%" }}>
      {webView()}
      <TouchableOpacity
        style={[
          styles.buttonTouchable,
          {
            flexDirection: "row",
            justifyContent: "center",
            elevation: 13,
            borderRadius: 20,
            backgroundColor: "red",
            margin: 20,
          },
        ]}
        onPress={() => {
          navigation.navigate("play_quiz", {
            quiz_id: props.route.params.book.ID,
          });
        }}
      >
        <LinearGradient
          colors={["#F99C3F", "#FE31C4"]}
          style={[styles.username_gradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name="book" size={30} color={"white"} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              left: 20,
              flex: 1,
            }}
          >
            Play
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  username_gradient: {
    borderRadius: 20,
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {},
});
