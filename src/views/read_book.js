import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

 import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function read_book(props) {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: props.route.params.book.Link}}
        style={{flex: 1, paddingBottom: 80}}
      />
      <TouchableOpacity
        style={[
          styles.buttonTouchable,
          {
            flexDirection: 'row',
            justifyContent: 'center',
            elevation: 13,
            borderRadius: 20,
            backgroundColor: 'white',
            margin: 20,
          },
        ]}
        onPress={() => {
          props.navigation.navigate('play_quiz', {
            quiz_id: props.route.params.book.ID,
          });
        }}>
        <LinearGradient
          colors={['#F99C3F', '#FE31C4']}
          style={[styles.username_gradient]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Icon name="book" size={30} color={'white'} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white',
              left: 20,
              flex: 1,
            }}>
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
    color: '#777',
  },
  username_gradient: {
    borderRadius: 20,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {},
});
