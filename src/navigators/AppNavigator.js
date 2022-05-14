import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Book_list_container from "../views/Book_list_container";
import start_page from "../views/start_page";
import dashboard_page from "../views/dashboard_page";
import detail_book from "../views/detail_book";
import already_played_quiz from "../views/already_played_this_quiz";
import alert_play_quiz_confirmation from "../views/alert_play_quiz_confirmation";
import login_welcome_page from "../views/first_view_test";
import after_quiz_1 from "../views/after_quiz_1";
import alert_after_quiz from "../views/alert_after_quiz";
import alert_leave_game from "../views/alert_leave_game";
// import play_quiz from "../views/play_quiz";
import reader_info_form from "../views/reader_info_form";
import login_qrcode from "../views/loginQrcode";
import book_qrcode from "../views/book_qrcode";
import chooseScreen from "../views/chooseScreen";
import Test from "../views/scan_book";
import read_book from "../views/read_book";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="start_page" component={start_page} />
        <Stack.Screen name="reader_info_form" component={reader_info_form} />
        <Stack.Screen name="login_qrcode" component={login_qrcode} />
        <Stack.Screen name="alert_after_quiz" component={alert_after_quiz} />

        <Stack.Screen
          name="Book_list_container"
          component={Book_list_container}
        />
        <Stack.Screen name="DetailBook" component={detail_book} />
        <Stack.Screen name="Read" component={read_book} />
        <Stack.Screen name="book_qrcode" component={book_qrcode} />
        <Stack.Screen name="after_quiz_1" component={after_quiz_1} />
        <Stack.Screen name="dashboard_page" component={dashboard_page} />
        <Stack.Screen name="choose" component={chooseScreen} />
        <Stack.Screen name="scan_book" component={Test} />
        {/* <Stack.Screen name="play_quiz" component={play_quiz} /> */}
        <Stack.Screen
          name="alert_play_quiz_confirmation"
          component={alert_play_quiz_confirmation}
        />
        <Stack.Screen name="Test" component={login_welcome_page} />
        <Stack.Screen
          name="already_played_quiz"
          component={already_played_quiz}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

/**
 * expo install react-native-camera react-native-elements react-native-gesture-handler react-native-linear-gradient react-native-loading-spinner-overlay react-native-permissions react-native-progress-bar-animated react-native-progress-circle react-native-qrcode-scanner react-native-reanimated react-native-safe-area-context react-native-screens react-native-step-indicator
 *  "@gorhom/bottom-sheet": "*",
    "@react-native-async-storage/async-storage": "*",
    "@react-navigation/native": "*",
    "@react-navigation/native-stack": "*",
    "axios": "*",
    "i18n-js": "*",
    "react": "17.0.2",
    "react-dom": "*",
    "react-native": "0.66.3",
    "react-native-camera": "^4.2.1",
    "react-native-elements": "*",
    "react-native-gesture-handler": "*",
    "react-native-linear-gradient": "^2.5.6",
    "react-native-loading-spinner-overlay": "*",
    "react-native-permissions": "^3.1.0",
    "react-native-progress-bar-animated": "*",
    "react-native-progress-circle": "*",
    "react-native-qrcode-scanner": "^1.5.4",
    "react-native-reanimated": "*",
    "react-native-safe-area-context": "*",
    "react-native-screens": "*",
    "react-native-step-indicator": "*",
    "react-native-unimodules": "*",
    "react-native-web": "*",
    "react-native-webview": "*"
 */
